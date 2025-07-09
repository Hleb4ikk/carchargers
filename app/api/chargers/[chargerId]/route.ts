import { getChargerById } from "@/utils/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { chargerId: string } }
) {
  const { chargerId } = await params;

  const charger = getChargerById(Number(chargerId));
  if (charger) {
    return new NextResponse(JSON.stringify({ message: "Ok", charger }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    return new NextResponse(
      JSON.stringify({ message: "Зарядка не найдена", charger: null }),
      {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
