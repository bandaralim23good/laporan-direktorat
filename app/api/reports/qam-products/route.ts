import { NextResponse } from "next/server";
import { getQamProductReport } from "@/services/reports/qam-product.service";

export async function GET() {
  try {
    const data = await getQamProductReport();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching QAM product report:", error);

    return NextResponse.json(
      {
        message: "Gagal mengambil data QAM per produk",
      },
      {
        status: 500,
      }
    );
  }
}