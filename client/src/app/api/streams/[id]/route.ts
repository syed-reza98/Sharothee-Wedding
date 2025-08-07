import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Check if stream exists
    const existingStream = await prisma.stream.findUnique({
      where: { id },
    })

    if (!existingStream) {
      return NextResponse.json(
        { error: 'Stream not found' },
        { status: 404 }
      );
    }

    // Update stream
    const updatedStream = await prisma.stream.update({
      where: { id },
      data: {
        ...body,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json(updatedStream);
  } catch (error) {
    console.error('Stream update error:', error);
    return NextResponse.json(
      { error: 'Failed to update stream' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if stream exists
    const existingStream = await prisma.stream.findUnique({
      where: { id },
    })

    if (!existingStream) {
      return NextResponse.json(
        { error: 'Stream not found' },
        { status: 404 }
      );
    }

    // Delete stream
    await prisma.stream.delete({
      where: { id },
    })

    return NextResponse.json({
      message: 'Stream deleted successfully',
    });
  } catch (error) {
    console.error('Stream deletion error:', error);
    return NextResponse.json(
      { error: 'Failed to delete stream' },
      { status: 500 }
    );
  }
}
