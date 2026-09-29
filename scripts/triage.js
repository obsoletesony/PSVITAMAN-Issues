const ACK_MARKER = "<!-- psvitaman-triage-ack -->";

const MANAGED_PREFIXES = [
  "type:",
  "area:",
  "model:",
  "log:",
  "language:",
];

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function extractSection(body, labels) {
  for (const label of labels) {
    const pattern = new RegExp(
      `(?:^|\\n)###\\s+${escapeRegExp(label)}\\s*\\n+([\\s\\S]*?)(?=\\n###\\s|$)`,
      "i"
    );
    const match = String(body || "").match(pattern);
    if (match) return match[1].trim();
  }
  return "";
}

function issueLabelNames(issue) {
  return (issue.labels || [])
    .map((label) => (typeof label === "string" ? label : label.name))
    .filter(Boolean);
}

function hasUploadedLog(body) {
  const uploadValue = extractSection(body, [
    "Attach PSVITAMAN-HW-DIAG.log",
    "PSVITAMAN-HW-DIAG.log を添付",
  ]);

  if (!uploadValue || /^_?No response_?$/i.test(uploadValue)) return false;

  return (
    /\[[^\]]*PSVITAMAN-HW-DIAG\.log[^\]]*\]\(https?:\/\/[^)]+\)/i.test(uploadValue) ||
    /https?:\/\/github\.com\/user-attachments\/[^\s)]+/i.test(uploadValue)
  );
}

function hasUploadedLogInComment(body) {
  const text = String(body || "");
  return (
    /\[[^\]]*PSVITAMAN-HW-DIAG\.log[^\]]*\]\(https?:\/\/[^)]+\)/i.test(text) ||
    /PSVITAMAN-HW-DIAG\.log[\s\S]{0,200}https?:\/\/github\.com\/user-attachments\/[^\s)]+/i.test(text)
  );
}

function classifyType(title) {
  if (/^\[Bug\]/i.test(title) || /^\[不具合\]/u.test(title)) return "type: bug";
  if (/^\[Compatibility\]/i.test(title)) return "type: compatibility";
  if (/^\[Help\]/i.test(title)) return "type: help";
  if (/^\[Idea\]/i.test(title)) return "type: feature";
  return null;
}

function classifyModel(body) {
  const value = extractSection(body, ["PS Vita model", "PS Vita のモデル"]);

  const rules = [
    ["model: PCH-1000", /PCH-1000/i],
    ["model: PCH-2000", /PCH-2000/i],
    ["model: PS TV", /PS TV|Vita TV/i],
    ["model: emulator", /Vita3K|another emulator|その他のエミュレーター/i],
  ];

  const match = rules.find(([, pattern]) => pattern.test(value));
  return match ? match[0] : "model: unknown";
}

function classifyArea(body) {
  const value = extractSection(body, [
    "Where did the problem happen?",
    "どこで問題が発生しましたか？",
  ]);

  const rules = [
    [
      "area: startup",
      /Installation or launching|Startup, library scan, or cache|インストール|起動 \/ ライブラリのスキャン/i,
    ],
    [
      "area: library",
      /Library browsing, sorting, or search|ライブラリの閲覧/i,
    ],
    [
      "area: playback",
      /Starting playback|Playback interruption|Pause, resume, seek|再生開始|再生の中断|一時停止/i,
    ],
    ["area: artwork", /Album artwork|ジャケット画像/i],
    ["area: queue", /Queue, playlists, or favorites|キュー \/ プレイリスト/i],
    [
      "area: interface",
      /Cassette view|Controls or interface|カセット表示|操作 \/ 画面/i,
    ],
    ["area: performance", /Performance, slowdown|動作が遅い/i],
    ["area: shutdown", /Closing PSVITAMAN|PSVITAMAN の終了/i],
  ];

  const match = rules.find(([, pattern]) => pattern.test(value));
  return match ? match[0] : "area: other";
}

function classifyLog(body, issueType) {
  if (hasUploadedLog(body)) return "log: attached";

  const status = extractSection(body, [
    "Diagnostic log status",
    "診断ログの状態",
    "Diagnostic log",
  ]);

  if (/prefer not to publish|公開したくありません/i.test(status)) {
    return "log: private";
  }
  if (
    /could not find|did not create|replaced by another launch|見つけられません|作成しませんでした|上書きされました/i.test(
      status
    )
  ) {
    return "log: unavailable";
  }
  if (/not relevant|not needed because everything worked|関係ありません/i.test(status)) {
    return "log: not applicable";
  }
  if (/attached below|下に .*添付しました/i.test(status)) {
    return "log: missing";
  }

  if (issueType === "type: bug" || issueType === "type: compatibility") {
    return "log: missing";
  }

  return null;
}

function isJapanese(title, body) {
  const text = String(body || "");
  return (
    /^\[不具合\]/u.test(title) ||
    text.includes("### PS Vita のモデル") ||
    text.includes("### 何が起きましたか？")
  );
}

function classifyIssue(issue) {
  const title = issue.title || "";
  const body = issue.body || "";
  const existing = issueLabelNames(issue);
  const issueType =
    classifyType(title) ||
    existing.find((label) => label.startsWith("type:")) ||
    null;

  const desired = new Set();
  if (issueType) desired.add(issueType);

  desired.add(classifyModel(body));

  if (issueType === "type: bug") {
    desired.add(classifyArea(body));
  }

  const logLabel = classifyLog(body, issueType);
  if (logLabel) desired.add(logLabel);

  if (isJapanese(title, body)) {
    desired.add("language: japanese");
  }

  const preserved = existing.filter(
    (label) => !MANAGED_PREFIXES.some((prefix) => label.startsWith(prefix))
  );

  if (!preserved.some((label) => label.startsWith("status:"))) {
    preserved.push("status: needs triage");
  }

  return [...new Set([...preserved, ...desired])];
}

async function acknowledgeIssue({ github, context, issue, labels }) {
  const comments = await github.paginate(github.rest.issues.listComments, {
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: issue.number,
    per_page: 100,
  });

  if (comments.some((comment) => (comment.body || "").includes(ACK_MARKER))) {
    return;
  }

  const japanese = labels.includes("language: japanese");
  const logAttached = labels.includes("log: attached");

  let message;
  if (japanese) {
    message = `${ACK_MARKER}
報告ありがとうございます。確認します。追加情報が必要な場合は、この Issue でお聞きします。`;

    if (!logAttached) {
      message += `

あとで診断ログが見つかった場合は、\`PSVITAMAN-HW-DIAG.log\` をコメントに添付してください。音楽ファイルはアップロードしないでください。`;
    }
  } else {
    message = `${ACK_MARKER}
Thanks. We got the report and will take a look. If we need anything else, we'll ask here.`;

    if (!logAttached) {
      message += `

If you find \`PSVITAMAN-HW-DIAG.log\` later, attach it in a comment. Don't upload the music file.`;
    }
  }

  await github.rest.issues.createComment({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: issue.number,
    body: message,
  });
}

async function triageIssue({ github, context }) {
  const issue = context.payload.issue;
  const labels = classifyIssue(issue);

  await github.rest.issues.setLabels({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: issue.number,
    labels,
  });

  if (context.payload.action === "opened") {
    await acknowledgeIssue({ github, context, issue, labels });
  }
}

async function detectLaterLog({ github, context }) {
  if (!hasUploadedLogInComment(context.payload.comment.body)) return;

  const issue = context.payload.issue;
  const current = issueLabelNames(issue);
  const labels = current.filter((label) => !label.startsWith("log:"));
  labels.push("log: attached");

  await github.rest.issues.setLabels({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: issue.number,
    labels: [...new Set(labels)],
  });
}

module.exports = {
  ACK_MARKER,
  classifyArea,
  classifyIssue,
  classifyLog,
  classifyModel,
  classifyType,
  detectLaterLog,
  extractSection,
  hasUploadedLog,
  hasUploadedLogInComment,
  isJapanese,
  triageIssue,
};
