/**
 * @jest-environment node
 */
import { POST } from '@/app/api/rsvp/form/route'
import type { NextRequest } from 'next/server'

function makeReq(body: unknown): NextRequest {
  return new Request('http://localhost/api/rsvp/form', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }) as unknown as NextRequest
}

describe('RSVP form API', () => {
  it('rejects missing email', async () => {
    const res = await POST(makeReq({ willAttendDhaka: 'yes', familySide: 'bride', guestCountOption: '1', contact: { email: '' } }))
    expect(res.status).toBe(400)
  })

  it('accepts valid payload', async () => {
    // Note: This uses real sendEmail which may be skipped if Gmail env missing; endpoint should still return success
    const res = await POST(
      makeReq({
        guestName: 'Test Guest',
        willAttendDhaka: 'yes',
        familySide: 'bride',
        guestCountOption: '2',
        additionalInfo: 'No allergies',
        contact: {
          preferred: { number: '+1 555 123', whatsapp: true, botim: false },
          secondary: { number: '', whatsapp: false, botim: false },
          emergency: { name: 'Friend', phone: '555-000', email: 'friend@example.com' },
          email: 'guest@example.com',
        },
      })
    )
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data.success).toBe(true)
  })
})
