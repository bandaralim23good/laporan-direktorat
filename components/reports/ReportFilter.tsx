"use client";

type ReportFilterProps = {
  year: number;
  month: number | "all";
  years: number[];
  onYearChange: (year: number) => void;
  onMonthChange: (month: number | "all") => void;
};

const months = [
  { value: 1, label: "Januari" },
  { value: 2, label: "Februari" },
  { value: 3, label: "Maret" },
  { value: 4, label: "April" },
  { value: 5, label: "Mei" },
  { value: 6, label: "Juni" },
  { value: 7, label: "Juli" },
  { value: 8, label: "Agustus" },
  { value: 9, label: "September" },
  { value: 10, label: "Oktober" },
  { value: 11, label: "November" },
  { value: 12, label: "Desember" },
];

export default function ReportFilter({
  year,
  month,
  years,
  onYearChange,
  onMonthChange,
}: ReportFilterProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        {/* YEAR */}
        <div className="w-full sm:w-48">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Tahun
          </label>

          <select
            value={year}
            onChange={(e) => onYearChange(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
          >
            {years.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* MONTH */}
        <div className="w-full sm:w-48">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Bulan
          </label>

          <select
            value={month}
            onChange={(e) => {
              const value = e.target.value;

              onMonthChange(
                value === "all" ? "all" : Number(value)
              );
            }}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
          >
            <option value="all">Semua Bulan</option>

            {months.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}