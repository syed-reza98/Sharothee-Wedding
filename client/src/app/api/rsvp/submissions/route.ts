import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Get all RSVP form submissions ordered by creation date (newest first)
    const submissions = await prisma.rSVPFormSubmission.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({
      success: true,
      submissions,
      count: submissions.length
    })
  } catch (error) {
    console.error('Error fetching RSVP submissions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch RSVP submissions' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, status, adminNote } = await request.json()

    if (!id) {
      return NextResponse.json(
        { error: 'Submission ID is required' },
        { status: 400 }
      )
    }

    const updatedSubmission = await prisma.rSVPFormSubmission.update({
      where: { id },
      data: {
        status: status || undefined,
        adminNote: adminNote || undefined,
        updatedAt: new Date()
      }
    })

    return NextResponse.json({
      success: true,
      submission: updatedSubmission
    })
  } catch (error) {
    console.error('Error updating RSVP submission:', error)
    return NextResponse.json(
      { error: 'Failed to update RSVP submission' },
      { status: 500 }
    )
  }
}