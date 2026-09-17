import { NextResponse } from "next/server";
import { getPpkProductReport } from "@/services/reports/ppk-product.service";

export async function GET() {
  try {
    const data = await getPpkProductReport();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching PPK product report:", error);

    return NextResponse.json(
      {
        message: "Gagal mengambil data PPK per produk",
      },
      {
        status: 500,
      }
    );
  }
}