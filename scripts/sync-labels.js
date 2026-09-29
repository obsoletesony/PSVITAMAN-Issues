const fs = require("node:fs");
const path = require("node:path");

module.exports = async function syncLabels({ github, context }) {
  const labelsPath = path.join(process.cwd(), ".github", "labels.json");
  const labels = JSON.parse(fs.readFileSync(labelsPath, "utf8"));

  // Retire the emulator label now that reports are limited to real hardware.
  try {
    await github.rest.issues.deleteLabel({
      owner: context.repo.owner,
      repo: context.repo.repo,
      name: "model: emulator",
    });
  } catch (error) {
    if (error.status !== 404) throw error;
  }

  for (const label of labels) {
    try {
      await github.rest.issues.getLabel({
        owner: context.repo.owner,
        repo: context.repo.repo,
        name: label.name,
      });

      await github.rest.issues.updateLabel({
        owner: context.repo.owner,
        repo: context.repo.repo,
        name: label.name,
        new_name: label.name,
        color: label.color,
        description: label.description,
      });
    } catch (error) {
      if (error.status !== 404) throw error;

      await github.rest.issues.createLabel({
        owner: context.repo.owner,
        repo: context.repo.repo,
        name: label.name,
        color: label.color,
        description: label.description,
      });
    }
  }
};

