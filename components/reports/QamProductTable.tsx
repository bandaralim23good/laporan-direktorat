"use client";

type QamProductReport = {
  id: number;
  month: number;
  year: number;

  pentolQam: number | null;
  pentolQhs: number | null;

  lumpiaQam: number | null;
  lumpiaQhs: number | null;

  apQam: number | null;
  apQhs: number | null;

  ukQam: number | null;
  ukQhs: number | null;
};

type QamProductTableProps = {
  data: QamProductReport[];
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

export default function QamProductTable({
  data,
}: QamProductTableProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-slate-900">
          QAM per Produk
        </h2>

        <p className="text-sm text-slate-500">
          Performa QAM dan QHS berdasarkan produk.
        </p>
      </div>

      {data.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th
                  rowSpan={2}
                  className="pb-3 text-left font-semibold text-slate-600"
                >
                  Periode
                </th>

                <th
                  colSpan={2}
                  className="pb-3 text-center font-semibold text-slate-600"
                >
                  Pentol
                </th>

                <th
                  colSpan={2}
                  className="pb-3 text-center font-semibold text-slate-600"
                >
                  Lumpia
                </th>

                <th
                  colSpan={2}
                  className="pb-3 text-center font-semibold text-slate-600"
                >
                  Adonan Pangsit
                </th>

                <th
                  colSpan={2}
                  className="pb-3 text-center font-semibold text-slate-600"
                >
                  Udang Keju
                </th>
              </tr>

              <tr className="border-b border-slate-200">
                <th className="pb-3 text-right text-xs font-medium text-slate-400">
                  QAM
                </th>

                <th className="pb-3 text-right text-xs font-medium text-slate-400">
                  QHS
                </th>

                <th className="pb-3 text-right text-xs font-medium text-slate-400">
                  QAM
                </th>

                <th className="pb-3 text-right text-xs font-medium text-slate-400">
                  QHS
                </th>

                <th className="pb-3 text-right text-xs font-medium text-slate-400">
                  QAM
                </th>

                <th className="pb-3 text-right text-xs font-medium text-slate-400">
                  QHS
                </th>

                <th className="pb-3 text-right text-xs font-medium text-slate-400">
                  QAM
                </th>

                <th className="pb-3 text-right text-xs font-medium text-slate-400">
                  QHS
                </th>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-slate-100 last:border-0"
                >
                  <td className="py-3 text-left font-medium text-slate-700">
                    {monthNames[item.month]} {item.year}
                  </td>

                  <td className="py-3 text-right text-slate-700">
                    {item.pentolQam ?? "-"}
                  </td>

                  <td className="py-3 text-right text-slate-500">
                    {item.pentolQhs ?? "-"}
                  </td>

                  <td className="py-3 text-right text-slate-700">
                    {item.lumpiaQam ?? "-"}
                  </td>

                  <td className="py-3 text-right text-slate-500">
                    {item.lumpiaQhs ?? "-"}
                  </td>

                  <td className="py-3 text-right text-slate-700">
                    {item.apQam ?? "-"}
                  </td>

                  <td className="py-3 text-right text-slate-500">
                    {item.apQhs ?? "-"}
                  </td>

                  <td className="py-3 text-right text-slate-700">
                    {item.ukQam ?? "-"}
                  </td>

                  <td className="py-3 text-right text-slate-500">
                    {item.ukQhs ?? "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-sm text-slate-400">
          Belum ada data QAM per produk untuk periode ini.
        </p>
      )}
    </section>
  );
}