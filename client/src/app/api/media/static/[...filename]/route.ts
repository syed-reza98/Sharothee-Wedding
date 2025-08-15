import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export const dynamic = "force-dynamic";
export const runtime = 'nodejs';

const IMAGES_DIR = path.join(process.cwd(), "image");

function listLocalImages(): string[] {
  try {
    const files = fs.readdirSync(IMAGES_DIR, { withFileTypes: true });
    return files
      .filter((f) => f.isFile())
      .map((f) => f.name);
  } catch (error) {
    console.error('Error reading images directory:', error)
    return [];
  }
}

function getContentType(fileName: string): string {
  const ext = path.extname(fileName).toLowerCase();
  switch (ext) {
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".gif":
      return "image/gif";
    case ".webp":
      return "image/webp";
    default:
      return "application/octet-stream";
  }
}

export async function GET(
  _req: Request,
  context: { params: Promise<{ filename: string[] }> }
) {
  const params = await context.params;
  const requested = Array.isArray(params?.filename)
    ? params.filename.join("/")
    : String(params?.filename ?? "");
  const allowed = listLocalImages();
  const decoded = decodeURIComponent(requested);
  const base = path.basename(decoded);
  if (!allowed.includes(base)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const absPath = path.join(IMAGES_DIR, base);
  try {
    const fileBuffer = await fs.promises.readFile(absPath);
    const contentType = getContentType(base);
    // Convert Node Buffer to ArrayBuffer slice to satisfy TS BodyInit types
    const arrayBuffer = fileBuffer.buffer.slice(
      fileBuffer.byteOffset,
      fileBuffer.byteOffset + fileBuffer.byteLength
    );
    return new NextResponse(arrayBuffer as ArrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error('File read error:', error)
    return NextResponse.json({ error: "Failed to read file" }, { status: 500 });
  }
}
