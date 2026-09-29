# Reporting PSVITAMAN issues

Reports should concern real PS Vita or PS TV hardware. Emulator issues are outside the scope of this tracker.

This repo is for PSVITAMAN bugs, compatibility tests, help, and feature ideas. The application source is kept separately and is private for now.

Use the [report form](https://github.com/obsoletesony/PSVITAMAN-Issues/issues/new?template=01-bug-report.yml). If you do not know a technical detail, write **“I don't know.”**

## A useful bug report

Try to include:

1. PS Vita model
2. System software / CFW
3. PSVITAMAN version
4. What happened
5. What you did right before it happened
6. Whether it happens again
7. `PSVITAMAN-HW-DIAG.log`, if you have it

Copy `ux0:/data/PSVITAMAN/PSVITAMAN-HW-DIAG.log` before launching PSVITAMAN again. A clean START shutdown also exports `ux0:/PSVITAMAN-HW-DIAG.log`; after a crash, that root copy may be stale. The previous session is rotated to `ux0:/data/PSVITAMAN/PSVITAMAN-HW-DIAG.previous.log` on the next launch.

If the bug is tied to a song, keep that file unchanged until we have looked at the report. Converting it or changing its metadata or cover can remove the bug.

## Public repo

Issues, comments, and attachments here are public. Check files before uploading them.

Do not upload copyrighted music, a full Vita storage dump, passwords, account information, or private source code.

## Language

Use the same report form for English or Japanese. Other languages are welcome too.

This project is not accepting code contributions. Reports and testing feedback are welcome. Feature ideas do not change the fixed roadmap or promise implementation.


