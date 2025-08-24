import { NextRequest, NextResponse } from 'next/server'
import { sendEmail, generateRSVPFormEmail, generateContactNotificationEmail } from '@/lib/email'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    // Check admin authentication
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { type } = body

    if (type === 'rsvp') {
      // Test RSVP email
      const testRsvpData = {
        guestName: 'Test Guest',
        willAttendDhaka: 'yes' as const,
        familySide: 'bride' as const,
        guestCountOption: '2' as const,
        guestCountOther: '',
        additionalInfo: 'This is a test RSVP submission for email testing purposes.',
        contact: {
          preferred: { number: '+880-1234567890', whatsapp: true, botim: false },
          secondary: { number: '', whatsapp: false, botim: false },
          emergency: { name: 'John Smith', phone: '+880-9876543210', email: 'john.smith@example.com' },
          email: 'test@example.com'
        }
      }

      const html = generateRSVPFormEmail(testRsvpData)
      
      const result = await sendEmail({
        to: ['arvincia@sparrow-group.com'],
        subject: '[TEST] RSVP Email Test - Incia & Arvin Wedding',
        html,
      })

      return NextResponse.json({ 
        success: result?.success, 
        message: result?.success ? 'Test RSVP email sent successfully' : 'Failed to send test email',
        error: result?.error?.toString()
      })

    } else if (type === 'contact') {
      // Test Contact email
      const html = generateContactNotificationEmail(
        'Test User',
        'test@example.com',
        'Test Contact Form Submission',
        'This is a test contact form submission for email testing purposes. Please ignore this message.'
      )

      const result = await sendEmail({
        to: ['arvincia@sparrow-group.com'],
        subject: '[TEST] Contact Form Test - Incia & Arvin Wedding',
        html,
      })

      return NextResponse.json({ 
        success: result?.success, 
        message: result?.success ? 'Test contact email sent successfully' : 'Failed to send test email',
        error: result?.error?.toString()
      })

    } else {
      return NextResponse.json({ error: 'Invalid test type. Use "rsvp" or "contact"' }, { status: 400 })
    }

  } catch (error) {
    console.error('Test email error:', error)
    return NextResponse.json(
      { error: 'Failed to send test email', details: error?.toString() }, 
      { status: 500 }
    )
  }
}