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

const resend = new Resend(process.env.RESEND_API_KEY)
const audienceId = 'cc7ea57f-376d-443e-9b90-36fb16274c87'

const POST_URL = 'https://shashankanchuri.space/blog/anthropic-spacex-colossus'

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
    subject: "Anthropic just rented every GPU in Elon Musk's data center.",
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
          <p style="margin:0 0 8px;font-size:12px;color:#666;font-family:monospace;text-transform:uppercase;letter-spacing:2px;">Context Window · May 2026</p>
          <h1 style="margin:0 0 8px;font-size:22px;color:#f5f5f5;font-weight:600;line-height:1.3;">Anthropic and SpaceX</h1>
          <p style="margin:0 0 24px;font-size:14px;color:#FF6B00;font-weight:500;">The Deal Nobody Saw Coming</p>

          <p style="margin:0 0 20px;font-size:15px;color:#aaa;line-height:1.7;">
            Three months ago, Elon Musk called Anthropic <strong style="color:#f5f5f5;">"misanthropic and evil."</strong> Yesterday, Anthropic signed an agreement to use the entire compute capacity of his Memphis data center.
          </p>
          <p style="margin:0 0 20px;font-size:15px;color:#aaa;line-height:1.7;">
            <strong style="color:#f5f5f5;">220,000+ NVIDIA GPUs. 300+ megawatts. Online within the month.</strong> Not a merger. Not an acquisition. A vendor relationship of historic scale, signed because SpaceX is the only partner that could move fast enough.
          </p>
          <p style="margin:0 0 28px;font-size:15px;color:#aaa;line-height:1.7;">
            The capacity gap nobody could publicly admit, the IPO timing that made it irresistible, and the uncomfortable parts that don't resolve cleanly.
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
                → Why the "merger" framing needs to die before it takes root<br>
                → Claude Code rate limits doubled, peak-hour throttling removed, Opus API limits raised<br>
                → The compute stack: SpaceX vs. Amazon, Google + Broadcom, Microsoft + NVIDIA, Fluidstack<br>
                → The forced marriage — what Anthropic got, what SpaceX got, and the IPO timing that made it work<br>
                → Memphis environmental record, political volatility, concentration risk — the parts that don't resolve cleanly<br>
                → Orbital AI compute: the sideshow worth flagging but not believing yet<br>
                → What to watch: the SpaceX S-1, the Musk-Amodei détente, the electricity commitment
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
