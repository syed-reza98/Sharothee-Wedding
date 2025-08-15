import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import JSZip from "jszip";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  console.log('Download request from:', req.url)
  try {
    const imagesDir = path.join(process.cwd(), 'image');
    const zip = new JSZip();

    let count = 0;
    try {
      const entries = fs.readdirSync(imagesDir, { withFileTypes: true });
      for (const ent of entries) {
        if (!ent.isFile()) continue;
        const filePath = path.join(imagesDir, ent.name);
        const data = await fs.promises.readFile(filePath);
        zip.file(ent.name, data);
        count++;
      }
    } catch (error) {
      console.error('Directory read error:', error)
      // If directory missing or read fails, proceed with empty zip
    }

    const zipBuffer = await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE', compressionOptions: { level: 6 } });
    const arrayBuffer = zipBuffer.buffer.slice(zipBuffer.byteOffset, zipBuffer.byteOffset + zipBuffer.byteLength);

    const now = new Date();
    const filename = `incia-arvin-photos-${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}.zip`;

    return new NextResponse(arrayBuffer as ArrayBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-store',
        'X-Photo-Count': String(count),
      },
    });
  } catch (error) {
    console.error('Archive creation failed:', error)
    return NextResponse.json({ error: 'Failed to create archive' }, { status: 500 });
  }
}
