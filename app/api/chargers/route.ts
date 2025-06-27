import { NextRequest, NextResponse } from "next/server";

import { getDataFrom } from "@/utils/data";
import { ChargerCard } from "@/entities/chargerCard";
export async function GET() {
  const chargers: ChargerCard[] = getDataFrom("chargers.json");
  return NextResponse.json(chargers);
}
