# PSVITAMAN Issue Tracker

Reports should concern real PS Vita or PS TV hardware. Emulator issues are outside the scope of this tracker.

Bug reports, compatibility tests, help, and feature ideas for **PSVITAMAN**.

PSVITAMAN's source is private for now. Use this repo for public reports and testing feedback.

## Report an issue

[Open the report form / 報告フォームを開く](https://github.com/obsoletesony/PSVITAMAN-Issues/issues/new?template=01-bug-report.yml)

One form for all reports. English and Japanese are welcome. Tell us your setup, what happened, and how to reproduce it. Attach the diagnostic log or a screenshot if available. Missing details? Send what you have.

報告はこのフォームにまとめています。日本語で記入できます。使用環境、問題の内容、再現手順を教えてください。ログや画像は任意です。

A free GitHub account is required. [View existing reports](https://github.com/obsoletesony/PSVITAMAN-Issues/issues).

## Jellyfin / Network reports

Before reporting a Jellyfin problem, please check the same server and affected track from another Jellyfin client when possible. This helps separate a server/library problem from a PSVITAMAN problem.

For a Jellyfin report, tell us:

- whether the problem is connection / Quick Connect, library browsing, playback start, playback interruptions, seeking, artwork, or track advance;
- whether the same track plays from another Jellyfin client;
- whether the problem affects one track or every track you tried;
- FLAC or MP3, plus the sample rate and bit depth shown by PSVITAMAN;
- whether `JELLYFIN` appears on the Now Playing format line;
- your Jellyfin server version if you know it;
- a short description of the local network setup. Do not include passwords, access tokens, Quick Connect secrets, or credential-bearing URLs.

PSVITAMAN streams supported FLAC and MP3 through its normal playback path. A track appearing in Jellyfin does not automatically mean its codec is supported by PSVITAMAN.

## Diagnostic log

The Public Alpha writes a local diagnostic log to your Vita storage. Nothing is uploaded automatically.

Copy `ux0:/data/PSVITAMAN/PSVITAMAN-HW-DIAG.log` before launching PSVITAMAN again. A clean START shutdown also exports `ux0:/PSVITAMAN-HW-DIAG.log`; after a crash, that root copy may be stale. The previous session is rotated to `ux0:/data/PSVITAMAN/PSVITAMAN-HW-DIAG.previous.log` on the next launch.

Attach it when you can. It is especially useful for crashes, playback problems, network streaming problems, and hardware-specific bugs. No log? Submit the report anyway.

## Before uploading anything

GitHub issues and attachments in this repo are public. Check the log before uploading it; it can contain song names, file names, paths, and network/server details.

Do not upload music files, a full Vita storage dump, passwords, Jellyfin access tokens, Quick Connect secrets, account details, private URLs containing credentials, or anything else you do not want public.

For a file-specific bug, keep the affected file unchanged. Converting it or replacing its metadata or cover can make the problem disappear.

Public reports remain in this tracker. Confirmed engineering work may also be tracked internally, but the public issue will be updated with its status and any available workaround.

## Distribution

PSVITAMAN is officially distributed exclusively by ObsoleteSony. Please do not redistribute, mirror, repackage, or submit PSVITAMAN binaries to third-party app stores, homebrew repositories, download services, or other software catalogs. Linking to the official download page is welcome.

[Distribution notice](DISTRIBUTION-NOTICE.txt). This policy applies to PSVITAMAN-owned material. Third-party components retain their respective license terms and rights.

## Links

- [PSVITAMAN](https://www.obsoletesony.com/psvitaman)
- [Bug-report guide](https://www.obsoletesony.com/psvitaman/report-a-bug)
- [User's Guide](https://www.obsoletesony.com/downloads/PSVITAMAN-User-Guide.pdf)
- [Open reports](https://github.com/obsoletesony/PSVITAMAN-Issues/issues)

PSVITAMAN is an independent ObsoleteSony project and is not affiliated with or endorsed by Sony.
