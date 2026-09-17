"use client";

import {
    ResponsiveContainer,
    ComposedChart,
    Bar,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    LabelList,
    ReferenceLine
} from "recharts";

type PpkReport = {
    id: number;
    month: number;
    year: number;
    ppk: number | null;
    qhs: number | null;
    targetPpk: number | null;
    targetQhs: number | null;
};

type PpkTrendChartProps = {
    data: PpkReport[];
};

const monthNames = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
];

function CustomLegend({
  targetPpk,
  targetQhs,
}: {
  targetPpk: number | null;
  targetQhs: number | null;
}) {
  return (
    <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
      <div className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-sm bg-teal-700" />
        <span className="font-medium text-slate-600">PPK</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-sm bg-blue-600" />
        <span className="font-medium text-slate-600">QHS</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="w-7 border-t-2 border-dashed border-teal-700" />
        <span className="font-medium text-slate-600">
          Target PPK {targetPpk !== null ? `${targetPpk}%` : ""}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="w-7 border-t-2 border-dotted border-blue-600" />
        <span className="font-medium text-slate-600">
          Target QHS {targetQhs !== null ? `${targetQhs}%` : ""}
        </span>
      </div>
    </div>
  );
}

export default function PpkTrendChart({
    data,
}: PpkTrendChartProps) {
    const chartData = [...data]
        .sort((a, b) => a.month - b.month)
        .map((item) => ({
            month: monthNames[item.month],

            ppk: item.ppk,
            qhs: item.qhs,

            targetPpk: item.targetPpk,
            targetQhs: item.targetQhs,
        }));

    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="mb-5">
                <h2 className="text-lg font-bold text-slate-900">
                    Perbandingan PPK & QHS
                </h2>

                <p className="text-sm text-slate-500">
                    Perbandingan pencapaian PPK dan QHS setiap bulan terhadap target.
                </p>
            </div>

            {chartData.length > 0 ? (
                <div className="h-[360px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart
                            data={chartData}
                            margin={{
                                top: 10,
                                right: 20,
                                left: 0,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="month" />

                            <YAxis
                                domain={[0, 100]}
                                tickFormatter={(value) => `${value}%`}
                            />

                            <Tooltip
                                formatter={(value, name) => [
                                    value !== null && value !== undefined
                                        ? `${Number(value).toFixed(1)}%`
                                        : "-",
                                    name,
                                ]}
                            />

                            <Legend content={<CustomLegend targetPpk={data[0]?.targetPpk ?? null} targetQhs={data[0]?.targetQhs ?? null} />} />

                            <Bar
                                dataKey="ppk"
                                name="PPK"
                                fill="#0f766e"
                                barSize={24}
                                radius={[5, 5, 0, 0]}
                            >
                                <LabelList
                                    dataKey="ppk"
                                    position="top"
                                    formatter={(value) =>
                                        value !== null && value !== undefined
                                            ? `${Number(value).toFixed(1)}%`
                                            : ""
                                    }
                                    style={{
                                        fontSize: 11,
                                        fontWeight: 700,
                                    }}
                                />
                            </Bar>

                            <Bar
                                dataKey="qhs"
                                name="QHS"
                                fill="#2563eb"
                                barSize={24}
                                radius={[5, 5, 0, 0]}
                            >
                                <LabelList
                                    dataKey="qhs"
                                    position="top"
                                    formatter={(value) =>
                                        value !== null && value !== undefined
                                            ? `${Number(value).toFixed(1)}%`
                                            : ""
                                    }
                                    style={{
                                        fontSize: 11,
                                        fontWeight: 700,
                                    }}
                                />
                            </Bar>

                            <ReferenceLine
                                y={Number(data[0]?.targetPpk ?? null)}
                                stroke="#0f766e"
                                strokeWidth={2}
                                strokeDasharray="6 4"
                                label={{
                                    value: "Target PPK",
                                    position: "insideTopRight",
                                    fontSize: 11,
                                    fontWeight: 700,
                                }}
                            />
                            <ReferenceLine
                                y={Number(data[0]?.targetQhs ?? null)}
                                stroke="#0f766e"
                                strokeWidth={2}
                                strokeDasharray="6 4"
                                label={{
                                    value: "Target QHS",
                                    position: "insideTopLeft",
                                    fontSize: 11,
                                    fontWeight: 700,
                                }}
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <div className="flex h-[360px] items-center justify-center">
                    <p className="text-sm text-slate-400">
                        Belum ada data PPK dan QHS untuk periode ini.
                    </p>
                </div>
            )}
        </section>
    );
}