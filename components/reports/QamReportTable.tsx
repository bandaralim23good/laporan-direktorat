"use client";

type QamReport = {
  id: number;
  month: number;
  year: number;
  qam: number | null;
  qhs: number | null;
  targetQam: number | null;
  targetQhs: number | null;
};

type QamReportTableProps = {
  data: QamReport[];
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

export default function QamReportTable({
  data,
}: QamReportTableProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-slate-900">
          QAM
        </h2>

        <p className="text-sm text-slate-500">
          Performa QAM berdasarkan periode.
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
                  QAM
                </th>

                <th className="pb-3 text-right font-semibold text-slate-600">
                  QHS
                </th>

                <th className="pb-3 text-right font-semibold text-slate-600">
                  Target QAM
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
                    {item.qam ?? "-"}
                  </td>

                  <td className="py-3 text-right text-slate-700">
                    {item.qhs ?? "-"}
                  </td>

                  <td className="py-3 text-right text-slate-500">
                    {item.targetQam ?? "-"}
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
          Belum ada data QAM untuk periode ini.
        </p>
      )}
    </section>
  );
}