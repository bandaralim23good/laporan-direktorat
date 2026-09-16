import { NextResponse } from "next/server";
import { getSheetRange } from "../../../../../lib/google-sheets";
import { prisma } from "../../../../../lib/prisma";

function parsePercentage(value: string | undefined): number | null {
  if (!value) return null;

  const cleaned = value
    .replace("%", "")
    .replace(",", ".")
    .trim();

  const number = Number(cleaned);

  return Number.isNaN(number) ? null : number;
}

function parseMonth(value: string | undefined): number | null {
  if (!value) return null;

  const months: Record<string, number> = {
    januari: 1,
    februari: 2,
    maret: 3,
    april: 4,
    mei: 5,
    juni: 6,
    juli: 7,
    agustus: 8,
    september: 9,
    oktober: 10,
    november: 11,
    desember: 12,
  };

  return months[value.toLowerCase().trim()] ?? null;
}

export async function GET() {
  try {
    const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;

    if (!spreadsheetId) {
      return NextResponse.json(
        {
          success: false,
          error: "GOOGLE_SPREADSHEET_ID belum diset",
        },
        { status: 500 }
      );
    }

    const values = await getSheetRange(
      spreadsheetId,
      "QHS!A17:E19"
    );

    const year = new Date().getFullYear();

    const synced = [];

    for (const row of values) {
      const month = parseMonth(row[0]);

      if (!month) continue;

      const data = {
        year,
        month,

        qam: parsePercentage(row[1]),
        qhs: parsePercentage(row[2]),

        targetQam: parsePercentage(row[3]),
        targetQhs: parsePercentage(row[4]),
      };

      const result = await prisma.qamReport.upsert({
        where: {
          year_month: {
            year,
            month,
          },
        },
        update: data,
        create: data,
      });

      synced.push(result);
    }

    return NextResponse.json({
      success: true,
      rawData: values,
      synced,
    });
  } catch (error) {
    console.error("QAM Report Sync Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}