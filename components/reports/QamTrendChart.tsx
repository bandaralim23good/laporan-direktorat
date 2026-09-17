"use client";

import {
    ResponsiveContainer,
    ComposedChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    LabelList,
    ReferenceLine,
} from "recharts";

type QamReport = {
    id: number;
    month: number;
    year: number;
    qam: number | null;
    qhs: number | null;
    targetQam: number | null;
    targetQhs: number | null;
};

type QamTrendChartProps = {
    data: QamReport[];
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
    targetQam,
    targetQhs,
}: {
    targetQam: number | null;
    targetQhs: number | null;
}) {
    return (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
            <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-sm bg-teal-700" />
                <span className="font-medium text-slate-600">QAM</span>
            </div>

            <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-sm bg-blue-600" />
                <span className="font-medium text-slate-600">QHS</span>
            </div>

            <div className="flex items-center gap-2">
                <span className="w-7 border-t-2 border-dashed border-teal-700" />
                <span className="font-medium text-slate-600">
                    Target QAM{" "}
                    {targetQam !== null ? `${targetQam}%` : ""}
                </span>
            </div>

            <div className="flex items-center gap-2">
                <span className="w-7 border-t-2 border-dotted border-blue-600" />
                <span className="font-medium text-slate-600">
                    Target QHS{" "}
                    {targetQhs !== null ? `${targetQhs}%` : ""}
                </span>
            </div>
        </div>
    );
}

export default function QamTrendChart({
    data,
}: QamTrendChartProps) {
    const chartData = [...data]
        .sort((a, b) => a.month - b.month)
        .map((item) => ({
            month: monthNames[item.month],

            qam: item.qam,
            qhs: item.qhs,

            targetQam: item.targetQam,
            targetQhs: item.targetQhs,
        }));

    const targetQam =
        data.find((item) => item.targetQam !== null)?.targetQam ?? null;

    const targetQhs =
        data.find((item) => item.targetQhs !== null)?.targetQhs ?? null;

    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="mb-5">
                <h2 className="text-lg font-bold text-slate-900">
                    Perbandingan QAM & QHS
                </h2>

                <p className="text-sm text-slate-500">
                    Perbandingan pencapaian QAM dan QHS setiap bulan terhadap target.
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

                            <Legend
                                content={
                                    <CustomLegend
                                        targetQam={targetQam}
                                        targetQhs={targetQhs}
                                    />
                                }
                            />

                            <Bar
                                dataKey="qam"
                                name="QAM"
                                fill="#0f766e"
                                barSize={24}
                                radius={[5, 5, 0, 0]}
                            >
                                <LabelList
                                    dataKey="qam"
                                    position="top"
                                    formatter={(value) =>
                                        value !== null &&
                                        value !== undefined
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
                                        value !== null &&
                                        value !== undefined
                                            ? `${Number(value).toFixed(1)}%`
                                            : ""
                                    }
                                    style={{
                                        fontSize: 11,
                                        fontWeight: 700,
                                    }}
                                />
                            </Bar>

                            {targetQam !== null && (
                                <ReferenceLine
                                    y={Number(targetQam)}
                                    stroke="#0f766e"
                                    strokeWidth={2}
                                    strokeDasharray="6 4"
                                    label={{
                                        value: `Target QAM ${targetQam}%`,
                                        position: "insideTopRight",
                                        fontSize: 11,
                                        fontWeight: 700,
                                    }}
                                />
                            )}

                            {targetQhs !== null && (
                                <ReferenceLine
                                    y={Number(targetQhs)}
                                    stroke="#2563eb"
                                    strokeWidth={2}
                                    strokeDasharray="2 4"
                                    label={{
                                        value: `Target QHS ${targetQhs}%`,
                                        position: "insideTopLeft",
                                        fontSize: 11,
                                        fontWeight: 700,
                                    }}
                                />
                            )}
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <div className="flex h-[360px] items-center justify-center">
                    <p className="text-sm text-slate-400">
                        Belum ada data QAM dan QHS untuk periode ini.
                    </p>
                </div>
            )}
        </section>
    );
}