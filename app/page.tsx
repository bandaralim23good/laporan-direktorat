import Link from "next/link";

const reportMenus = [
  {
    title: "PPK & QAM Report",
    description:
      "Laporan performa dan pencapaian PPK berdasarkan data produk dan periode.",
    href: "/reports",
    code: "PPK",
  },
  // {
  //   title: "QAM Report",
  //   description:
  //     "Laporan Quality Assurance Management dan pencapaian kualitas produk.",
  //   href: "/qam-report",
  //   code: "QAM",
  // },
  {
    title: "Production Report",
    description:
      "Monitoring data produksi, pencapaian, dan performa produksi.",
    href: "/production-report",
    code: "PRD",
  },
  {
    title: "Other Report",
    description:
      "Kumpulan laporan direktorat lainnya yang akan dikembangkan.",
    href: "#",
    code: "OTH",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-600">
              Directorate System
            </p>

            <h1 className="mt-1 text-xl font-bold tracking-tight text-slate-950">
              Report Direktorat
            </h1>
          </div>

          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium text-slate-700">
              Reporting & Monitoring
            </p>
            <p className="text-xs text-slate-400">
              Centralized Directorate Report
            </p>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pb-10 pt-14 lg:px-8 lg:pt-20">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-teal-600">
            Directorate Reporting System
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Monitoring Report
            <br />
            Direktorat
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
            Akses dan monitor berbagai laporan direktorat dalam satu sistem.
            Pilih kategori laporan untuk melihat data, pencapaian, dan
            informasi terkait.
          </p>
        </div>
      </section>

      {/* Menu */}
      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-950">
              Report Categories
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Pilih laporan yang ingin kamu akses.
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reportMenus.map((menu) => {
            const disabled = menu.href === "#";

            if (disabled) {
              return (
                <div
                  key={menu.code}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 opacity-60"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-sm font-bold text-slate-500">
                      {menu.code}
                    </div>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                      Coming Soon
                    </span>
                  </div>

                  <h4 className="mt-6 text-lg font-bold text-slate-900">
                    {menu.title}
                  </h4>

                  <p className="mt-2 min-h-12 text-sm leading-6 text-slate-500">
                    {menu.description}
                  </p>
                </div>
              );
            }

            return (
              <Link
                key={menu.code}
                href={menu.href}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg hover:shadow-slate-200/60"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-sm font-bold text-teal-700">
                    {menu.code}
                  </div>

                  <span className="text-slate-300 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-teal-600">
                    →
                  </span>
                </div>

                <h4 className="mt-6 text-lg font-bold text-slate-900">
                  {menu.title}
                </h4>

                <p className="mt-2 min-h-12 text-sm leading-6 text-slate-500">
                  {menu.description}
                </p>

                <div className="mt-6 text-sm font-semibold text-teal-600">
                  Open Report
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>Report Direktorat</p>
          <p>Internal Reporting System</p>
        </div>
      </footer>
    </main>
  );
}