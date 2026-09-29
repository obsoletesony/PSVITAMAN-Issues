# PSVITAMAN Issue Tracker

Reports should concern real PS Vita or PS TV hardware. Emulator issues are outside the scope of this tracker.

Bug reports, compatibility tests, help, and feature ideas for **PSVITAMAN**.

PSVITAMAN's source is private for now. Use this repo for public reports and testing feedback.

## Report an issue

[Open the report form / 報告フォームを開く](https://github.com/obsoletesony/PSVITAMAN-Issues/issues/new?template=01-bug-report.yml)

One form for all reports. English and Japanese are welcome. Tell us your setup, what happened, and how to reproduce it. Attach the diagnostic log or a screenshot if available. Missing details? Send what you have.

報告はこのフォームにまとめています。日本語で記入できます。使用環境、問題の内容、再現手順を教えてください。ログや画像は任意です。

A free GitHub account is required. [View existing reports](https://github.com/obsoletesony/PSVITAMAN-Issues/issues).

## Diagnostic log

The Public Alpha writes a local diagnostic log to your Vita storage. Nothing is uploaded automatically.

Copy `ux0:/data/PSVITAMAN/PSVITAMAN-HW-DIAG.log` before launching PSVITAMAN again. A clean START shutdown also exports `ux0:/PSVITAMAN-HW-DIAG.log`; after a crash, that root copy may be stale. The previous session is rotated to `ux0:/data/PSVITAMAN/PSVITAMAN-HW-DIAG.previous.log` on the next launch.

Attach it when you can. It is especially useful for crashes, playback problems, and hardware-specific bugs. No log? Submit the report anyway.

## Before uploading anything

GitHub issues and attachments in this repo are public. Check the log before uploading it; it can contain song names, file names, and paths.

Do not upload music files, a full Vita storage dump, passwords, account details, or anything else you do not want public.

For a file-specific bug, keep the affected file unchanged. Converting it or replacing its metadata or cover can make the problem disappear.

Public reports remain in this tracker. Confirmed engineering work may also be tracked internally, but the public issue will be updated with its status and any available workaround.

## Links

- [PSVITAMAN](https://www.obsoletesony.com/psvitaman)
- [Bug-report guide](https://www.obsoletesony.com/psvitaman/report-a-bug)
- [User's Guide](https://www.obsoletesony.com/downloads/PSVITAMAN-User-Guide.pdf)
- [Open reports](https://github.com/obsoletesony/PSVITAMAN-Issues/issues)

PSVITAMAN is an independent ObsoleteSony project and is not affiliated with or endorsed by Sony.


