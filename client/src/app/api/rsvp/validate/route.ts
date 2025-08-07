import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { rsvpTokenSchema } from "@/lib/validations"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token } = rsvpTokenSchema.parse(body)

    const guest = await prisma.guest.findUnique({
      where: { token: token.toUpperCase() },
      include: {
        rsvps: {
          include: {
            event: {
              include: {
                venue: true
              }
            }
          }
        }
      }
    })

    if (!guest) {
      return NextResponse.json(
        { error: "Invalid RSVP token" },
        { status: 404 }
      )
    }

    // Get all available events
    const events = await prisma.event.findMany({
      where: { active: true },
      include: {
        venue: true
      },
      orderBy: { order: 'asc' }
    })

    return NextResponse.json({
      guest: {
        id: guest.id,
        name: guest.name,
        email: guest.email,
        country: guest.country
      },
      events,
      existingRsvps: guest.rsvps
    })

  } catch (error) {
    console.error("RSVP token validation error:", error)
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    )
  }
}
