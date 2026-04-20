import { Resend } from 'resend'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const envPath = resolve(__dirname, '../.env.local')
const envLines = readFileSync(envPath, 'utf8').split('\n')
for (const line of envLines) {
  const [key, ...rest] = line.split('=')
  if (key && rest.length) process.env[key.trim()] = rest.join('=').trim()
}

const resend = new Resend(process.env.RESEND_API_KEY)
const audienceId = 'cc7ea57f-376d-443e-9b90-36fb16274c87'

const POST_URL = 'https://shashankanchuri.space/blog/anthropic-mythos-glasswing-double-play'

const { data: contactsData, error: contactsError } = await resend.contacts.list({ audienceId })
if (contactsError) {
  console.error('Failed to fetch contacts:', contactsError)
  process.exit(1)
}

const contacts = contactsData.data.filter(c => !c.unsubscribed)
console.log(`Sending announcement to ${contacts.length} subscriber(s)...`)

for (const contact of contacts) {
  const { error } = await resend.emails.send({
    from: 'Shashank Anchuri <shashank@shashankanchuri.space>',
    to: contact.email,
    subject: 'Anthropic built the best AI model ever — then said you can\'t have it',
    headers: { 'List-Unsubscribe': '<mailto:unsubscribe@shashankanchuri.space>' },
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#111;border-radius:8px;padding:40px;max-width:560px;width:100%;">
        <tr><td>
          <p style="margin:0 0 8px;font-size:12px;color:#666;font-family:monospace;text-transform:uppercase;letter-spacing:2px;">Context Window · Apr 2026</p>
          <h1 style="margin:0 0 8px;font-size:22px;color:#f5f5f5;font-weight:600;line-height:1.3;">Capability × Capacity</h1>
          <p style="margin:0 0 24px;font-size:14px;color:#FF6B00;font-weight:500;">Anthropic's Double Play That Defines the Next Phase of AI</p>

          <p style="margin:0 0 20px;font-size:15px;color:#aaa;line-height:1.7;">
            An AI found a <strong style="color:#f5f5f5;">27-year-old security bug</strong> in one of the most hardened operating systems on the planet — a bug that <strong style="color:#f5f5f5;">five million automated tests had missed</strong>. The company that built it decided it was too dangerous to release.
          </p>
          <p style="margin:0 0 20px;font-size:15px;color:#aaa;line-height:1.7;">
            On the same day, they announced a deal for <strong style="color:#f5f5f5;">5 gigawatts of compute</strong> — backed by revenue that went from $1B to $30B in 15 months, overtaking OpenAI.
          </p>
          <p style="margin:0 0 28px;font-size:15px;color:#aaa;line-height:1.7;">
            Most coverage treated these as two separate stories. They're not. They're one equation: <strong style="color:#f5f5f5;">Capability × Capacity</strong>.
          </p>

          <table cellpadding="0" cellspacing="0" style="margin:0 0 32px;">
            <tr><td style="background:#FF6B00;border-radius:6px;">
              <a href="${POST_URL}" style="display:inline-block;padding:13px 28px;color:#fff;text-decoration:none;font-size:14px;font-weight:600;">
                Read the full post →
              </a>
            </td></tr>
          </table>

          <table cellpadding="0" cellspacing="0" style="border-top:1px solid #222;padding-top:24px;width:100%;">
            <tr><td style="padding:0 0 12px;">
              <p style="margin:0 0 4px;font-size:11px;color:#555;font-family:monospace;text-transform:uppercase;letter-spacing:1px;">In this issue</p>
            </td></tr>
            <tr><td>
              <p style="margin:0 0 8px;font-size:13px;color:#888;line-height:1.6;">
                → Claude Mythos: 93.9% SWE-bench, 90x better at exploit development than any public model<br>
                → The bugs it found: OpenBSD (27 years old), FFmpeg (missed by 5M automated tests), Linux kernel privilege escalation<br>
                → Why Anthropic restricted it — the model that hid its own git commits<br>
                → Project Glasswing: the 12-company coalition + $100M in security credits<br>
                → The $30B revenue rocket and 5-gigawatt compute deal<br>
                → What this means if you write code for a living
              </p>
            </td></tr>
          </table>

          <p style="margin:28px 0 0;font-size:14px;color:#555;line-height:1.6;">
            — Shashank
          </p>
        </td></tr>
      </table>
      <p style="margin:20px 0 0;font-size:11px;color:#444;text-align:center;">
        <a href="https://shashankanchuri.space/unsubscribe?email=${encodeURIComponent(contact.email)}" style="color:#555;text-decoration:underline;">Unsubscribe</a>
      </p>
    </td></tr>
  </table>
</body>
</html>`,
  })

  if (error) {
    console.error(`Failed to send to ${contact.email}:`, error)
  } else {
    console.log(`✓ Sent to ${contact.email}`)
  }

  await new Promise(r => setTimeout(r, 600))
}

console.log('Done.')
