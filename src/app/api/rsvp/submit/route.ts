import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { rsvpSchema } from "@/lib/validations"
import { sendEmail, generateRSVPConfirmationEmail } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = rsvpSchema.parse(body)

    // Check if guest exists
    const guest = await prisma.guest.findUnique({
      where: { id: validatedData.guestId }
    })

    if (!guest) {
      return NextResponse.json(
        { error: "Guest not found" },
        { status: 404 }
      )
    }

    // Check if event exists
    const event = await prisma.event.findUnique({
      where: { id: validatedData.eventId },
      include: { venue: true }
    })

    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      )
    }

    // Create or update RSVP
    const rsvp = await prisma.rSVP.upsert({
      where: {
        guestId_eventId: {
          guestId: validatedData.guestId,
          eventId: validatedData.eventId
        }
      },
      create: validatedData,
      update: {
        response: validatedData.response,
        attendees: validatedData.attendees,
        dietaryPreferences: validatedData.dietaryPreferences,
        comments: validatedData.comments,
      },
      include: {
        event: {
          include: { venue: true }
        }
      }
    })

    // Send confirmation email
    if (validatedData.response === "ATTENDING") {
      const emailHtml = generateRSVPConfirmationEmail(
        guest.name,
        [event.title]
      )

      await sendEmail({
        to: [guest.email],
        subject: "RSVP Confirmation - Incia & Arvin's Wedding",
        html: emailHtml
      })
    }

    return NextResponse.json({
      success: true,
      rsvp
    })

  } catch (error) {
    console.error("RSVP submission error:", error)
    return NextResponse.json(
      { error: "Failed to submit RSVP" },
      { status: 500 }
    )
  }
}
