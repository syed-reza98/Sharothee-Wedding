import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const order = parseInt(formData.get('order') as string) || 0;

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files provided' },
        { status: 400 }
      );
    }

    if (!title || !category) {
      return NextResponse.json(
        { error: 'Title and category are required' },
        { status: 400 }
      );
    }

    const uploadPromises = files.map(async (file, index) => {
      try {
        // Determine media type
        const mediaType = file.type.startsWith('image/') ? 'IMAGE' : 'VIDEO';
        
        // Upload to Cloudinary
        const cloudinaryResult = await uploadToCloudinary(file, category || 'wedding');
        
        if (!cloudinaryResult.success || !cloudinaryResult.url) {
          throw new Error(`Failed to upload to Cloudinary: ${cloudinaryResult.error || 'Unknown error'}`);
        }
        
        const cloudinaryUrl = cloudinaryResult.url;

        // Create database record
        const mediaItem = await prisma.mediaItem.create({
          data: {
            title: files.length > 1 ? `${title} ${index + 1}` : title,
            description,
            url: cloudinaryUrl,
            publicId: cloudinaryResult.publicId,
            type: mediaType,
            category: category.toLowerCase(),
            order: order + index,
            public: true,
          },
        });

        return mediaItem;
      } catch (error) {
        console.error(`Failed to upload file ${file.name}:`, error);
        throw error;
      }
    });

    const uploadedItems = await Promise.all(uploadPromises);

    return NextResponse.json({
      message: `Successfully uploaded ${uploadedItems.length} media items`,
      items: uploadedItems,
    });
  } catch (error) {
    console.error('Media upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload media' },
      { status: 500 }
    );
  }
}
