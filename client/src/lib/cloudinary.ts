import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface UploadResult {
  success: boolean;
  url?: string;
  publicId?: string;
  error?: string;
}

export async function uploadToCloudinary(file: File, folder: string = 'wedding'): Promise<UploadResult> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    return new Promise((resolve) => {
      cloudinary.uploader.upload_stream(
        {
          folder: `wedding/${folder}`,
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) {
            resolve({ success: false, error: error.message });
          } else if (result) {
            resolve({
              success: true,
              url: result.secure_url,
              publicId: result.public_id,
            });
          } else {
            resolve({ success: false, error: 'Upload failed' });
          }
        }
      ).end(buffer);
    });
  } catch {
    return { success: false, error: 'Failed to process file' };
  }
}

export async function deleteFromCloudinary(publicId: string): Promise<boolean> {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === 'ok';
  } catch {
    console.error('Cloudinary delete error');
    return false;
  }
}

export default cloudinary;
