import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { guestSchema } from "@/lib/validations"
import { generateSecureToken } from "@/lib/utils"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''

    const skip = (page - 1) * limit

    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' as const } },
            { email: { contains: search, mode: 'insensitive' as const } },
            { country: { contains: search, mode: 'insensitive' as const } }
          ]
        }
      : {}

    const [guests, total] = await Promise.all([
      prisma.guest.findMany({
        where,
        skip,
        take: limit,
        include: {
          rsvps: {
            include: {
              event: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.guest.count({ where })
    ])

    return NextResponse.json({
      guests,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error("Error fetching guests:", error)
    return NextResponse.json(
      { error: "Failed to fetch guests" },
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
    const validatedData = guestSchema.parse(body)

    // Generate unique token for guest
    const token = generateSecureToken()

    const guest = await prisma.guest.create({
      data: {
        ...validatedData,
        token
      }
    })

    return NextResponse.json({
      success: true,
      guest
    })

  } catch (error) {
    console.error("Error creating guest:", error)
    return NextResponse.json(
      { error: "Failed to create guest" },
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

    const guest = await prisma.guest.update({
      where: { id },
      data: updateData,
      include: {
        rsvps: {
          include: {
            event: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      guest
    })

  } catch (error) {
    console.error("Error updating guest:", error)
    return NextResponse.json(
      { error: "Failed to update guest" },
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
        { error: "Guest ID is required" },
        { status: 400 }
      )
    }

    await prisma.guest.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true,
      message: "Guest deleted successfully"
    })

  } catch (error) {
    console.error("Error deleting guest:", error)
    return NextResponse.json(
      { error: "Failed to delete guest" },
      { status: 500 }
    )
  }
}
