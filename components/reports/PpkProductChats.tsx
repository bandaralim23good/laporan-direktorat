"use client";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    LabelList,
} from "recharts";

type PpkProductReport = {
    id: number;
    year: number;
    month: number;

    pentolPpk: number | null;
    pentolQhs: number | null;

    lumpiaPpk: number | null;
    lumpiaQhs: number | null;

    apPpk: number | null;
    apQhs: number | null;

    ukPpk: number | null;
    ukQhs: number | null;
};

type PpkProductChartProps = {
    data: PpkProductReport[];
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

type ProductChartProps = {
    title: string;
    ppkKey:
        | "pentolPpk"
        | "lumpiaPpk"
        | "apPpk"
        | "ukPpk";
    qhsKey:
        | "pentolQhs"
        | "lumpiaQhs"
        | "apQhs"
        | "ukQhs";
};

function ProductChart({
    title,
    ppkKey,
    qhsKey,
}: ProductChartProps & { data: PpkProductReport[] }) {
    return null;
}

export default function PpkProductChart({
    data,
}: PpkProductChartProps) {
    const chartData = [...data]
        .sort((a, b) => a.month - b.month)
        .map((item) => ({
            month: monthNames[item.month],

            pentolPpk: item.pentolPpk,
            pentolQhs: item.pentolQhs,

            lumpiaPpk: item.lumpiaPpk,
            lumpiaQhs: item.lumpiaQhs,

            apPpk: item.apPpk,
            apQhs: item.apQhs,

            ukPpk: item.ukPpk,
            ukQhs: item.ukQhs,
        }));

    const products = [
        {
            title: "Pentol",
            ppkKey: "pentolPpk" as const,
            qhsKey: "pentolQhs" as const,
        },
        {
            title: "Lumpia",
            ppkKey: "lumpiaPpk" as const,
            qhsKey: "lumpiaQhs" as const,
        },
        {
            title: "Adonan Pangsit",
            ppkKey: "apPpk" as const,
            qhsKey: "apQhs" as const,
        },
        {
            title: "Udang Keju",
            ppkKey: "ukPpk" as const,
            qhsKey: "ukQhs" as const,
        },
    ];

    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="mb-5">
                <h2 className="text-lg font-bold text-slate-900">
                    PPK & QHS Per Produk
                </h2>

                <p className="text-sm text-slate-500">
                    Perbandingan PPK dan QHS setiap produk berdasarkan bulan.
                </p>
            </div>

            {chartData.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {products.map((product) => (
                        <div
                            key={product.title}
                            className="rounded-xl border border-slate-200 p-4"
                        >
                            <h3 className="mb-3 text-sm font-bold text-slate-800">
                                {product.title}
                            </h3>

                            <div className="h-[300px] w-full">
                                <ResponsiveContainer
                                    width="100%"
                                    height="100%"
                                >
                                    <BarChart
                                        data={chartData}
                                        margin={{
                                            top: 20,
                                            right: 10,
                                            left: 0,
                                            bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />

                                        <XAxis dataKey="month" />

                                        <YAxis
                                            domain={[0, 100]}
                                            tickFormatter={(value) =>
                                                `${value}%`
                                            }
                                        />

                                        <Tooltip
                                            formatter={(value, name) => [
                                                value !== null &&
                                                value !== undefined
                                                    ? `${Number(value).toFixed(
                                                          1
                                                      )}%`
                                                    : "-",
                                                name,
                                            ]}
                                        />

                                        <Legend />

                                        <Bar
                                            dataKey={product.ppkKey}
                                            name="PPK"
                                            fill="#16a34a"
                                            barSize={18}
                                            radius={[5, 5, 0, 0]}
                                        >
                                            <LabelList
                                                dataKey={product.ppkKey}
                                                position="top"
                                                formatter={(value) =>
                                                    value !== null &&
                                                    value !== undefined &&
                                                    Number(value) > 0
                                                        ? `${Number(
                                                              value
                                                          ).toFixed(1)}%`
                                                        : ""
                                                }
                                                style={{
                                                    fontSize: 9,
                                                    fontWeight: 700,
                                                }}
                                            />
                                        </Bar>

                                        <Bar
                                            dataKey={product.qhsKey}
                                            name="QHS"
                                            fill="#86efac"
                                            barSize={18}
                                            radius={[5, 5, 0, 0]}
                                        >
                                            <LabelList
                                                dataKey={product.qhsKey}
                                                position="top"
                                                formatter={(value) =>
                                                    value !== null &&
                                                    value !== undefined &&
                                                    Number(value) > 0
                                                        ? `${Number(
                                                              value
                                                          ).toFixed(1)}%`
                                                        : ""
                                                }
                                                style={{
                                                    fontSize: 9,
                                                    fontWeight: 700,
                                                }}
                                            />
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex h-[400px] items-center justify-center">
                    <p className="text-sm text-slate-400">
                        Belum ada data PPK per produk untuk periode ini.
                    </p>
                </div>
            )}
        </section>
    );
}