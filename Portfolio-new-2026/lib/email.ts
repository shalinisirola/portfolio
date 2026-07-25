export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
  sentAt: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Plain-text fallback (improves deliverability and accessibility). */
export function contactEmailText({
  name,
  email,
  subject,
  message,
  sentAt,
}: ContactMessage): string {
  return [
    "New message from your portfolio",
    "",
    `Name:    ${name}`,
    `Email:   ${email}`,
    `Subject: ${subject || "(none)"}`,
    "",
    "Message:",
    message,
    "",
    `Sent ${sentAt}`,
  ].join("\n");
}

/** Branded, email-client-safe HTML matching the portfolio palette. */
export function renderContactEmail({
  name,
  email,
  subject,
  message,
  sentAt,
}: ContactMessage): string {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject || "New message");
  const safeMessage = escapeHtml(message).replace(/\r?\n/g, "<br />");

  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:0 0 4px;font-family:Helvetica,Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:#9A6B3C;">${label}</td>
    </tr>
    <tr>
      <td style="padding:0 0 20px;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.5;color:#211C16;">${value}</td>
    </tr>`;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>New portfolio message</title>
</head>
<body style="margin:0;padding:0;background:#F4F1E9;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F4F1E9;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#FCFBF6;border:1px solid #DED7C7;border-radius:10px;overflow:hidden;">
          <tr>
            <td style="background:#3B2A1B;padding:26px 32px;">
              <span style="font-family:Georgia,'Times New Roman',serif;font-size:24px;font-weight:700;letter-spacing:0.1em;color:#F7F3EA;">KR</span>
              <div style="margin-top:6px;font-family:Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#C99B5E;">New Portfolio Message</div>
            </td>
          </tr>
          <tr>
            <td style="padding:30px 32px 8px;">
              <h1 style="margin:0 0 6px;font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:600;color:#211C16;">${safeSubject}</h1>
              <p style="margin:0 0 24px;font-family:Helvetica,Arial,sans-serif;font-size:14px;line-height:1.6;color:#6F685B;">Someone reached out through your portfolio contact form.</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${row("From", safeName)}
                ${row("Email", `<a href="mailto:${safeEmail}" style="color:#9A6B3C;text-decoration:none;">${safeEmail}</a>`)}
              </table>
              <div style="font-family:Helvetica,Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:#9A6B3C;padding-bottom:8px;">Message</div>
              <div style="font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.7;color:#211C16;background:#F4F1E9;border:1px solid #DED7C7;border-radius:8px;padding:18px 20px;">${safeMessage}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:22px 32px 28px;">
              <a href="mailto:${safeEmail}" style="display:inline-block;background:#3B2A1B;color:#F7F3EA;font-family:Helvetica,Arial,sans-serif;font-size:12px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;text-decoration:none;padding:13px 24px;border-radius:6px;">Reply to ${safeName}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 32px;border-top:1px solid #DED7C7;font-family:Helvetica,Arial,sans-serif;font-size:12px;color:#6F685B;">
              Sent ${escapeHtml(sentAt)} · Reply directly to respond.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
