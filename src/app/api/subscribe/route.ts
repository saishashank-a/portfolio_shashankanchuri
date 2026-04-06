import { Resend } from 'resend'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { email } = await req.json()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    const audienceId = process.env.RESEND_AUDIENCE_ID!

    const { error } = await resend.contacts.create({
      email,
      audienceId,
      unsubscribed: false,
    })

    if (error) return NextResponse.json({ error: (error as { message?: string }).message ?? 'Resend error' }, { status: 500 })
    return NextResponse.json({ ok: true })
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    console.error('[subscribe]', msg)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
