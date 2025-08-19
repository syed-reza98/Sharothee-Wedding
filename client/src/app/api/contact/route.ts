import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { contactSchema } from "@/lib/validations"
import { sendEmail, generateContactNotificationEmail } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = contactSchema.parse(body)

    // Save contact request to database
    await prisma.contactRequest.create({
      data: validatedData
    })

    // Send notification email to admin
    const adminEmailHtml = generateContactNotificationEmail(
      validatedData.name,
      validatedData.email,
      validatedData.subject,
      validatedData.message
    )
    
    await sendEmail({
      to: ["codestromhub@gmail.com"],
      subject: `New Contact Request: ${validatedData.subject}`,
      html: adminEmailHtml
    })

    // Send confirmation email to user
    const userConfirmationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #8B5A3C;">Thank you for contacting us!</h2>
        <p>Dear ${validatedData.name},</p>
        <p>We have received your message and will get back to you within 24 hours.</p>
        <div style="background: #FDF6F0; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #8B5A3C; margin-top: 0;">Your Message:</h3>
          <p><strong>Subject:</strong> ${validatedData.subject}</p>
          <p><strong>Message:</strong> ${validatedData.message}</p>
        </div>
        <p>With love,<br>Incia & Arvin</p>
      </div>
    `

    await sendEmail({
      to: [validatedData.email],
      subject: "Message Received - Incia & Arvin's Wedding",
      html: userConfirmationHtml
    })

    return NextResponse.json({
      success: true,
      message: "Contact request submitted successfully"
    })

  } catch (error) {
    console.error("Contact submission error:", error)
    return NextResponse.json(
      { error: "Failed to submit contact request" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const contacts = await prisma.contactRequest.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(contacts)
  } catch (error) {
    console.error("Error fetching contacts:", error)
    return NextResponse.json(
      { error: "Failed to fetch contacts" },
      { status: 500 }
    )
  }
}
