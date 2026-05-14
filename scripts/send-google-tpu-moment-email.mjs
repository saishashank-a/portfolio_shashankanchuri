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

const POST_URL = 'https://shashankanchuri.space/blog/google-tpu-moment'

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
    subject: 'Anthropic reserved a million TPUs. Meta is testing them. Why it matters.',
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
          <h1 style="margin:0 0 8px;font-size:22px;color:#f5f5f5;font-weight:600;line-height:1.3;">The TPU Moment</h1>
          <p style="margin:0 0 24px;font-size:14px;color:#FF6B00;font-weight:500;">A Supply Chain Story as a Silicon Story</p>

          <p style="margin:0 0 20px;font-size:15px;color:#aaa;line-height:1.7;">
            Anthropic reserved a million TPUs. Meta is quietly testing them. Nvidia&apos;s stock dropped 3% the day The Information broke the story &mdash; not because Google&apos;s chip beats an H100, but because the largest buyer in AI is now seriously qualifying an alternative.
          </p>
          <p style="margin:0 0 20px;font-size:15px;color:#aaa;line-height:1.7;">
            <strong style="color:#f5f5f5;">10 GW of reserved frontier compute. $46B Broadcom partnership through 2031. An Ironwood pod with 1.77 PB of unified HBM.</strong> TPUs aren&apos;t winning on benchmarks. They&apos;re winning because the industry is no longer willing to bet a generation of model development on a single-vendor supply chain.
          </p>
          <p style="margin:0 0 28px;font-size:15px;color:#aaa;line-height:1.7;">
            The deals, the silicon, the JAX stack, and the practical call for engineers not training at frontier scale.
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
                → The Anthropic million-TPU deal, broken into its two tranches<br>
                → Why Meta is testing TPUs even though Llama trains fine on Nvidia<br>
                → What a TPU actually is &mdash; the chef, the line cook, and the assembly line<br>
                → Ironwood vs. Nvidia B200: per-chip specs that closed the gap<br>
                → The pod IS the computer: 9,216 chips, 1.77 PB HBM, one address space<br>
                → JAX, XLA, and the compilation model shift coming from PyTorch<br>
                → When to reach for TPUs &mdash; and when PyTorch on H100 is still right<br>
                → Power as the binding constraint: the conversation that matters more than your chip vendor
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
