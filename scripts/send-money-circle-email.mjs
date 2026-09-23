import { Resend } from 'resend'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const envPath = resolve(__dirname, '../.env.local')
const envLines = readFileSync(envPath, 'utf8').split('\n')
for (const line of envLines) {
  const [key, ...rest] = line.split('=')
  if (key && rest.length) {
    const val = rest.join('=').trim().replace(/^["']|["']$/g, '')
    process.env[key.trim()] = val
  }
}

const DRY_RUN = process.env.DRY_RUN === '1'

const resend = new Resend(process.env.RESEND_API_KEY)
const audienceId = 'cc7ea57f-376d-443e-9b90-36fb16274c87'

const POST_URL = 'https://shashankanchuri.space/blog/the-money-is-going-in-a-circle'

const { data: contactsData, error: contactsError } = await resend.contacts.list({ audienceId })
if (contactsError) {
  console.error('Failed to fetch contacts:', contactsError)
  process.exit(1)
}

const contacts = contactsData.data.filter(c => !c.unsubscribed)
console.log(`${DRY_RUN ? '[DRY RUN] Would send' : 'Sending'} announcement to ${contacts.length} subscriber(s)...`)

if (DRY_RUN) {
  for (const c of contacts) console.log(`  - ${c.email}`)
  console.log('[DRY RUN] No emails sent. Re-run without DRY_RUN=1 to send.')
  process.exit(0)
}

for (const contact of contacts) {
  const { error } = await resend.emails.send({
    from: 'Shashank Anchuri <shashank@shashankanchuri.space>',
    to: contact.email,
    subject: 'A $1T valuation and a $14B loss. Same company, same year.',
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
          <p style="margin:0 0 8px;font-size:12px;color:#666;font-family:monospace;text-transform:uppercase;letter-spacing:2px;">Context Window · Jun 2026</p>
          <h1 style="margin:0 0 8px;font-size:22px;color:#f5f5f5;font-weight:600;line-height:1.3;">The Money Is Going in a Circle</h1>
          <p style="margin:0 0 24px;font-size:14px;color:#FF6B00;font-weight:500;">Follow the dollars through AI's capital frenzy</p>

          <p style="margin:0 0 20px;font-size:15px;color:#aaa;line-height:1.7;">
            A trillion-dollar valuation and a <strong style="color:#f5f5f5;">fourteen-billion-dollar annual loss</strong> are describing the same company in the same year. Both numbers are real. The question isn't how one company survives that gap — it's how an entire industry decided the gap was worth funding at a scale the world has never seen.
          </p>
          <p style="margin:0 0 20px;font-size:15px;color:#aaa;line-height:1.7;">
            Trace the dollars and they don't run in a straight line. <strong style="color:#f5f5f5;">Nvidia takes equity in an AI lab; the lab buys GPUs from Nvidia; the cloud providers complete the circle.</strong> Analysts now put these circular arrangements north of $800 billion. Flywheel, or centrifuge?
          </p>
          <p style="margin:0 0 28px;font-size:15px;color:#aaa;line-height:1.7;">
            I build on this infrastructure for a living, so this isn't an investor's curiosity. It's the floor I stand on — and here's what an engineer should do about it.
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
                → The loop — how the same dollar shows up on multiple balance sheets<br>
                → The bull case vs. the bear case, steelmanned<br>
                → Why your unit economics sit on someone else's balance sheet<br>
                → Treat the model provider as a dependency, not a foundation<br>
                → What breaks in the sharp version (a credit event) vs. the slow one<br>
                → Three habits worth keeping if the circle ever stops spinning
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
