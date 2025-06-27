import { NextRequest, NextResponse } from "next/server";
import { getPhotosById } from "@/utils/data";

export async function POST(req: NextRequest) {
  const query = await req.json();

  const photos = getPhotosById(query.id);

  return NextResponse.json({ photos });
}
