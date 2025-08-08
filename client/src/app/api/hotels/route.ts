import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { hotelSchema } from "@/lib/validations"

export async function GET() {
  try {
    const hotels = await prisma.hotel.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(hotels)

  } catch (error) {
    console.error("Error fetching hotels:", error)
    return NextResponse.json(
      { error: "Failed to fetch hotels" },
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
    const validatedData = hotelSchema.parse(body)

    const hotel = await prisma.hotel.create({
      data: {
        ...validatedData,
        amenities: serializeAmenities(validatedData.amenities),
        deadline: validatedData.deadline ? new Date(validatedData.deadline) : null
      }
    })

    return NextResponse.json({
      success: true,
      hotel
    })

  } catch (error) {
    console.error("Error creating hotel:", error)
    return NextResponse.json(
      { error: "Failed to create hotel" },
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

    const hotel = await prisma.hotel.update({
      where: { id },
      data: {
        ...updateData,
        amenities: updateData.amenities ? JSON.stringify(updateData.amenities) : null,
        deadline: updateData.deadline ? new Date(updateData.deadline) : null
      }
    })

    return NextResponse.json({
      success: true,
      hotel
    })

  } catch (error) {
    console.error("Error updating hotel:", error)
    return NextResponse.json(
      { error: "Failed to update hotel" },
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
        { error: "Hotel ID is required" },
        { status: 400 }
      )
    }

    await prisma.hotel.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true,
      message: "Hotel deleted successfully"
    })

  } catch (error) {
    console.error("Error deleting hotel:", error)
    return NextResponse.json(
      { error: "Failed to delete hotel" },
      { status: 500 }
    )
  }
}
