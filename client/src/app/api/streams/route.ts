import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { streamSchema } from "@/lib/validations"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const eventId = searchParams.get('eventId')
    const active = searchParams.get('active')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {}
    if (eventId) where.eventId = eventId
    if (active !== null) where.active = active === 'true'

    const streams = await prisma.stream.findMany({
      where,
      include: {
        event: {
          include: {
            venue: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(streams)

  } catch (error) {
    console.error("Error fetching streams:", error)
    return NextResponse.json(
      { error: "Failed to fetch streams" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = streamSchema.parse(body)

    // Deactivate existing streams for the same event if this one is active
    if (validatedData.isLive) {
      await prisma.stream.updateMany({
        where: { eventId: validatedData.eventId },
        data: { isLive: false }
      })
    }

    const stream = await prisma.stream.create({
      data: validatedData,
      include: {
        event: {
          include: {
            venue: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      stream
    })

  } catch (error) {
    console.error("Error creating stream:", error)
    return NextResponse.json(
      { error: "Failed to create stream" },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { id, ...updateData } = body

    // If activating this stream, deactivate others for the same event
    if (updateData.isLive && updateData.eventId) {
      await prisma.stream.updateMany({
        where: { 
          eventId: updateData.eventId,
          id: { not: id }
        },
        data: { isLive: false }
      })
    }

    const updatedStream = await prisma.stream.update({
      where: { id },
      data: updateData,
      include: {
        event: {
          include: {
            venue: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      stream: updatedStream
    })

  } catch (error) {
    console.error("Error updating stream:", error)
    return NextResponse.json(
      { error: "Failed to update stream" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: "Stream ID is required" },
        { status: 400 }
      )
    }

    await prisma.stream.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true,
      message: "Stream deleted successfully"
    })

  } catch (error) {
    console.error("Error deleting stream:", error)
    return NextResponse.json(
      { error: "Failed to delete stream" },
      { status: 500 }
    )
  }
}
