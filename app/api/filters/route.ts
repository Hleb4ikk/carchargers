import { NextRequest, NextResponse } from "next/server";

import { getDataFrom } from "@/utils/data";

export async function GET() {
  return NextResponse.json(getDataFrom("filters.json"));
}
