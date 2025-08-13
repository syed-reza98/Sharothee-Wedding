import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if media item exists
    const mediaItem = await prisma.mediaItem.findUnique({
      where: { id },
    });

    if (!mediaItem) {
      return NextResponse.json(
        { error: 'Media item not found' },
        { status: 404 }
      );
    }

    // Delete from database
    await prisma.mediaItem.delete({
      where: { id },
    });

    // TODO: Also delete from Cloudinary if needed
    // This would require storing the public_id from Cloudinary

    return NextResponse.json({
      message: 'Media item deleted successfully',
    });
  } catch (error) {
    console.error('Media deletion error:', error);
    return NextResponse.json(
      { error: 'Failed to delete media item' },
      { status: 500 }
    );
  }
}
