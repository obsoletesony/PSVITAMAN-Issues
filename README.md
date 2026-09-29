# PSVITAMAN Issue Tracker

Bug reports, compatibility tests, help, and feature ideas for **PSVITAMAN**.

PSVITAMAN's source is private for now. Use this repo for public reports and testing feedback.

## Report something

| What do you need? | Form |
| --- | --- |
| PSVITAMAN crashed, froze, misbehaved, or would not play something | [Report a PSVITAMAN bug](https://github.com/obsoletesony/PSVITAMAN-Issues/issues/new?template=01-bug-report.yml) |
| 日本語で不具合を報告したい | [日本語の不具合報告フォーム](https://github.com/obsoletesony/PSVITAMAN-Issues/issues/new?template=02-bug-report-ja.yml) |
| You tested a PS Vita model or firmware and want to share the result | [Share a compatibility result](https://github.com/obsoletesony/PSVITAMAN-Issues/issues/new?template=03-compatibility-report.yml) |
| You are stuck or not sure whether something is a bug | [Ask for help](https://github.com/obsoletesony/PSVITAMAN-Issues/issues/new?template=04-help-request.yml) |
| You have an idea for PSVITAMAN | [Suggest an improvement](https://github.com/obsoletesony/PSVITAMAN-Issues/issues/new?template=05-feature-request.yml) |
| You need to report a security or privacy concern privately | [Read the security policy](https://github.com/obsoletesony/PSVITAMAN-Issues/security/policy) |

Don't know your exact PS Vita model, firmware, or PSVITAMAN version? Use **Not sure** or write **“I don't know.”**

A free GitHub account is required to submit an issue.

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

