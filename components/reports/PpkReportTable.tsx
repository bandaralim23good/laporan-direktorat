"use client";

type PpkReport = {
  id: number;
  month: number;
  year: number;
  ppk: number | null;
  qhs: number | null;
  targetPpk: number | null;
  targetQhs: number | null;
};

type PpkReportTableProps = {
  data: PpkReport[];
};

const monthNames = [
  "",
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export default function PpkReportTable({
  data,
}: PpkReportTableProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-slate-900">
          PPK
        </h2>

        <p className="text-sm text-slate-500">
          Performa PPK berdasarkan periode.
        </p>
      </div>

      {data.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left">
                <th className="pb-3 font-semibold text-slate-600">
                  Periode
                </th>

                <th className="pb-3 text-right font-semibold text-slate-600">
                  PPK
                </th>

                <th className="pb-3 text-right font-semibold text-slate-600">
                  QHS
                </th>

                <th className="pb-3 text-right font-semibold text-slate-600">
                  Target PPK
                </th>

                <th className="pb-3 text-right font-semibold text-slate-600">
                  Target QHS
                </th>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-slate-100 last:border-0"
                >
                  <td className="py-3 text-slate-700">
                    {monthNames[item.month]} {item.year}
                  </td>

                  <td className="py-3 text-right font-semibold text-slate-900">
                    {item.ppk ?? "-"}
                  </td>

                  <td className="py-3 text-right text-slate-700">
                    {item.qhs ?? "-"}
                  </td>

                  <td className="py-3 text-right text-slate-500">
                    {item.targetPpk ?? "-"}
                  </td>

                  <td className="py-3 text-right text-slate-500">
                    {item.targetQhs ?? "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-sm text-slate-400">
          Belum ada data PPK untuk periode ini.
        </p>
      )}
    </section>
  );
}