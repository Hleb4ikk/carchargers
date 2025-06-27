import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const adId = searchParams.get("adId");
  const filename = searchParams.get("filename");

  if (!adId || !filename) {
    return NextResponse.json(
      { error: "Not specified parameters" },
      { status: 400 }
    );
  }

  const filePath = path.join(process.cwd(), "uploads", adId, filename);

  try {
    await fs.promises.access(filePath);
    const fileBuffer = await fs.promises.readFile(filePath);

    return new NextResponse(fileBuffer, {
      headers: { "Content-Type": "image/jpeg" },
    });
  } catch (error) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
