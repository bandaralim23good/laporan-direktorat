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

        // Ambil data PPK dari spreadsheet
        const values = await getSheetRange(
            spreadsheetId,
            "QHS!A31:I33"
        );

        if (values.length < 2) {
            return NextResponse.json({
                success: true,
                message: "Tidak ada data PPK",
                synced: [],
            });
        }

        // Baris pertama adalah header
        const rows = values.slice(1);

        // Tahun sementara menggunakan tahun sekarang
        const year = new Date().getFullYear();

        const synced = [];

        for (const row of rows) {
            const month = parseMonth(row[0]);

            // Lewati baris kosong / bukan data bulan
            if (!month) {
                continue;
            }

            const data = {
                year,
                month,
                ppk: parsePercentage(row[1]),
                qhs: parsePercentage(row[2]),
                targetPpk: parsePercentage(row[3]),
                targetQhs: parsePercentage(row[4]),
            };

            const result = await prisma.ppkReport.upsert({
                where: {
                    year_month: {
                        year: data.year,
                        month: data.month,
                    },
                },

                // Kalau bulan sudah ada → UPDATE
                update: {
                    ppk: data.ppk,
                    qhs: data.qhs,
                    targetPpk: data.targetPpk,
                    targetQhs: data.targetQhs,
                },

                // Kalau bulan belum ada → INSERT
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
        console.error("PPK Sync Error:", error);

        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}