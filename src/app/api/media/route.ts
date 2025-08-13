import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { uploadToCloudinary, deleteFromCloudinary } from "@/lib/cloudinary"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const album = searchParams.get('album')
    const approved = searchParams.get('approved')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    const skip = (page - 1) * limit

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {}
    if (category) where.category = category
    if (album) where.album = album
    if (approved !== null) where.approved = approved === 'true'

    const [media] = await Promise.all([
      prisma.mediaItem.findMany({
        where,
        skip,
        take: limit,
        orderBy: [
          { featured: 'desc' },
          { updatedAt: 'desc' }
        ]
      }),
      prisma.mediaItem.count({ where })
    ])

    // Return just the media array for frontend compatibility
    return NextResponse.json(media)

  } catch (error) {
    console.error("Error fetching media:", error)
    return NextResponse.json(
      { error: "Failed to fetch media" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const category = formData.get('category') as string
    const album = formData.get('album') as string || undefined
    const caption = formData.get('caption') as string || undefined

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      )
    }

    // Check if user is admin for auto-approval
    const session = await getServerSession(authOptions)
    const approved = !!session?.user

    // Upload to Cloudinary
    const uploadResult = await uploadToCloudinary(file, category)

    if (!uploadResult.success) {
      return NextResponse.json(
        { error: uploadResult.error || "Upload failed" },
        { status: 500 }
      )
    }

    // Save to database
    const mediaItem = await prisma.mediaItem.create({
      data: {
        type: file.type.startsWith('video/') ? 'VIDEO' : 'IMAGE',
        url: uploadResult.url!,
        publicId: uploadResult.publicId!,
        category,
        album,
        caption,
        approved,
        uploadedBy: session?.user?.email || 'guest'
      }
    })

    return NextResponse.json({
      success: true,
      media: mediaItem
    })

  } catch (error) {
    console.error("Error uploading media:", error)
    return NextResponse.json(
      { error: "Failed to upload media" },
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

    const media = await prisma.mediaItem.update({
      where: { id },
      data: updateData
    })

    return NextResponse.json({
      success: true,
      media
    })

  } catch (error) {
    console.error("Error updating media:", error)
    return NextResponse.json(
      { error: "Failed to update media" },
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
        { error: "Media ID is required" },
        { status: 400 }
      )
    }

    // Get media item to delete from Cloudinary
    const mediaItem = await prisma.mediaItem.findUnique({
      where: { id }
    })

    if (!mediaItem) {
      return NextResponse.json(
        { error: "Media not found" },
        { status: 404 }
      )
    }

    // Delete from Cloudinary if publicId exists
    if (mediaItem.publicId) {
      await deleteFromCloudinary(mediaItem.publicId)
    }

    // Delete from database
    await prisma.mediaItem.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true,
      message: "Media deleted successfully"
    })

  } catch (error) {
    console.error("Error deleting media:", error)
    return NextResponse.json(
      { error: "Failed to delete media" },
      { status: 500 }
    )
  }
}
