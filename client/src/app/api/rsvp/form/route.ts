import { NextRequest, NextResponse } from 'next/server'
import { sendEmail, generateRSVPFormEmail } from '@/lib/email'

type Payload = {
  guestName?: string
  willAttendDhaka: 'yes' | 'no' | 'maybe' | ''
  familySide: 'bride' | 'groom' | 'both' | ''
  guestCountOption: '1' | '2' | '3' | '4' | 'other' | ''
  guestCountOther?: string
  additionalInfo?: string
  contact: {
    preferred: { number: string; whatsapp: boolean; botim: boolean }
    secondary: { number: string; whatsapp: boolean; botim: boolean }
    emergency: { name: string; phone: string; email: string }
    email: string
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Payload

    // Basic validation
    if (!body) return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    if (!body.contact?.email) return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    if (!body.willAttendDhaka) return NextResponse.json({ error: 'Attendance selection is required' }, { status: 400 })
    if (!body.familySide) return NextResponse.json({ error: 'Family side is required' }, { status: 400 })
    if (!body.guestCountOption) return NextResponse.json({ error: 'Guest count is required' }, { status: 400 })

    const html = generateRSVPFormEmail(body)

    // Send confirmation to guest and ensure success
    const guestResult = await sendEmail({
      to: [body.contact.email],
      subject: "RSVP Received - Incia & Arvin's Wedding",
      html,
    })
    if (!guestResult?.success) {
      console.error('RSVP guest email failed:', guestResult?.error)
      return NextResponse.json({ error: 'Failed to send confirmation email' }, { status: 500 })
    }

    // Send notification to admin (ADMIN_EMAIL or fallback to GMAIL_USER)
    const adminCandidates = [process.env.ADMIN_EMAIL, process.env.GMAIL_USER].filter(Boolean) as string[]
    const uniqueAdminRecipients = Array.from(new Set(adminCandidates))
    if (uniqueAdminRecipients.length) {
      const adminResult = await sendEmail({
        to: uniqueAdminRecipients,
        subject: 'New RSVP Submission',
        html,
      })
      if (!adminResult?.success) {
        console.warn('RSVP admin email failed:', adminResult?.error)
        // Don't block user on admin notify failure
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('RSVP form POST error:', error)
    return NextResponse.json({ error: 'Failed to submit RSVP' }, { status: 500 })
  }
}
