# ArcHoops Connect Page — Tally + Google Sheets Setup

This version uses **Tally** for contact capture instead of Mailchimp, PHP, Apps Script, or a custom Google API.

## What this gives you

- No backend to maintain
- No public Google Sheet access
- Built-in spam protection from Tally
- Private form submissions stored in Tally
- Optional automatic sync to Google Sheets
- A simple embed inside `connect.html`

## Step 1 — Create the Tally form

Create a new form in Tally with these fields:

| Field | Type | Required |
|---|---|---|
| Email address | Email | Yes |
| First name | Short answer | No |
| Last name | Short answer | No |
| I am a... | Dropdown | No |
| Organization | Short answer | No |
| Anything you'd like us to know? | Long answer | No |
| Consent | Checkbox | Yes |

Recommended dropdown options:

- Parent / Guardian
- Educator / Teacher
- School or District Leader
- Investor
- Partner / Sponsor
- Media / Press
- Student
- Other

Consent copy:

> Yes, send me ArcHoops monthly updates. I can unsubscribe anytime.

## Step 2 — Connect Tally to Google Sheets

In Tally:

1. Open the form.
2. Go to **Integrations**.
3. Choose **Google Sheets**.
4. Connect your Google account.
5. Select or create the destination Sheet.
6. Map the form fields to columns.

The Google Sheet can stay private. Visitors never get access to the Sheet.

## Step 3 — Get your Tally form ID

Your public Tally form URL will look like this:

```text
https://tally.so/r/abc123
```

The form ID is the last part:

```text
abc123
```

## Step 4 — Update `connect.html`

In `connect.html`, find both instances of:

```text
REPLACE_WITH_YOUR_TALLY_FORM_ID
```

Replace them with your Tally form ID.

Example:

```html
data-tally-src="https://tally.so/embed/abc123?alignLeft=1&hideTitle=1&transparentBackground=1"
```

And:

```html
href="https://tally.so/r/abc123"
```

## Step 5 — Publish

Upload the updated `connect.html` to your site at:

```text
https://archoops.net/connect
```

Submit one test entry and confirm it appears in Tally and the connected Google Sheet.

## Notes

- You do not need Mailchimp.
- You do not need PHP.
- You do not need Google Apps Script.
- You do not need a Cloudflare Worker.
- You do not need to set the Google Sheet to “anyone with the link.”
