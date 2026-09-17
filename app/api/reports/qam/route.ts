import { NextResponse } from "next/server";
import { getQamReport } from "@/services/reports/qam.service";

export async function GET() {
  try {
    const data = await getQamReport();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching QAM report:", error);

    return NextResponse.json(
      {
        message: "Gagal mengambil data QAM",
      },
      {
        status: 500,
      }
    );
  }
}