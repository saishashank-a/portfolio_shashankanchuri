import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const TO = 'shashankanchuri@gmail.com'
// Same verified sender domain the debrief emails use
const FROM = 'Portfolio Contact <shashank@shashankanchuri.space>'

const clean = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }
  try {
    // Honeypot: real visitors never see or fill this field; bots do. Pretend success.
    if (clean(body.website, 200)) return NextResponse.json({ ok: true })

    // Newlines stripped so a visitor-supplied name can't break the subject line
    const name = clean(body.name, 100).replace(/[\r\n]+/g, ' ')
    const email = clean(body.email, 200)
    const message = clean(body.message, 5000)

    if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please fill in your name, a valid email, and a message.' }, { status: 400 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    // Plain text only: visitor input is never rendered as HTML in the inbox
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `New message from ${name} via shashankanchuri.space`,
      text: `${message}\n\n—\nFrom: ${name} <${email}>\nSent from the contact form on shashankanchuri.space`,
    })

    if (error) {
      console.error('[contact]', error)
      return NextResponse.json({ error: 'Could not send right now.' }, { status: 502 })
    }
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('[contact]', e instanceof Error ? e.message : e)
    return NextResponse.json({ error: 'Could not send right now.' }, { status: 500 })
  }
}
