import { NextResponse } from "next/server";
import { getPpkReport } from "@/services/reports/ppk.service";

export async function GET() {
  try {
    const data = await getPpkReport();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching PPK report:", error);

    return NextResponse.json(
      {
        message: "Gagal mengambil data PPK",
      },
      {
        status: 500,
      }
    );
  }
}