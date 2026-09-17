"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import ReportFilter from "./ReportFilter";
import PpkReportTable from "./PpkReportTable";
import QamReportTable from "./QamReportTable";
import PpkProductTable from "./PpkProductTable";
import QamProductTable from "./QamProductTable";
import PpkTrendChart from "./PpkTrendChart";
import QamTrendChart from "./QamTrendChart";
import PpkProductChart from "./PpkProductChats";
import QamProductChart from "./QamProductChart";

type PpkReport = {
  id: number;
  month: number;
  year: number;
  ppk: number | null;
  qhs: number | null;
  targetPpk: number | null;
  targetQhs: number | null;
};

type PpkProductReport = {
  id: number;
  month: number;
  year: number;
  pentolPpk: number | null;
  pentolQhs: number | null;
  lumpiaPpk: number | null;
  lumpiaQhs: number | null;
  apPpk: number | null;
  apQhs: number | null;
  ukPpk: number | null;
  ukQhs: number | null;
};

type QamReport = {
  id: number;
  month: number;
  year: number;
  qam: number | null;
  qhs: number | null;
  targetQam: number | null;
  targetQhs: number | null;
};

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

export default function ReportDashboard() {
  const [ppk, setPpk] = useState<PpkReport[]>([]);
  const [ppkProducts, setPpkProducts] = useState<PpkProductReport[]>([]);
  const [qam, setQam] = useState<QamReport[]>([]);
  const [qamProducts, setQamProducts] = useState<QamProductReport[]>([]);
  const currentYear = new Date().getFullYear();
  const [showReportCharts, setShowReportCharts] = useState(true);

  const [showPpkProductChart, setShowPpkProductChart] =
    useState(true);

  const [showQamProductChart, setShowQamProductChart] =
    useState(true);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState<number | "all">("all");
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  async function fetchReports() {
    try {
      const responses = await Promise.all([
        fetch("/api/reports/ppk"),
        fetch("/api/reports/ppk-products"),
        fetch("/api/reports/qam"),
        fetch("/api/reports/qam-products"),
      ]);

      const [
        ppkResponse,
        ppkProductResponse,
        qamResponse,
        qamProductResponse,
      ] = responses;

      console.log("PPK:", ppkResponse.status, ppkResponse.url);
      console.log(
        "PPK Product:",
        ppkProductResponse.status,
        ppkProductResponse.url
      );
      console.log("QAM:", qamResponse.status, qamResponse.url);
      console.log(
        "QAM Product:",
        qamProductResponse.status,
        qamProductResponse.url
      );

      if (!ppkResponse.ok) {
        throw new Error(
          `API PPK gagal: ${ppkResponse.status} ${ppkResponse.statusText}`
        );
      }

      if (!ppkProductResponse.ok) {
        throw new Error(
          `API PPK Product gagal: ${ppkProductResponse.status} ${ppkProductResponse.statusText}`
        );
      }

      if (!qamResponse.ok) {
        throw new Error(
          `API QAM gagal: ${qamResponse.status} ${qamResponse.statusText}`
        );
      }

      if (!qamProductResponse.ok) {
        throw new Error(
          `API QAM Product gagal: ${qamProductResponse.status} ${qamProductResponse.statusText}`
        );
      }

      const [
        ppkData,
        ppkProductData,
        qamData,
        qamProductData,
      ] = await Promise.all([
        ppkResponse.json(),
        ppkProductResponse.json(),
        qamResponse.json(),
        qamProductResponse.json(),
      ]);

      if (!Array.isArray(ppkData)) {
        throw new Error("Response API PPK bukan array");
      }

      if (!Array.isArray(ppkProductData)) {
        throw new Error("Response API PPK Product bukan array");
      }

      if (!Array.isArray(qamData)) {
        throw new Error("Response API QAM bukan array");
      }

      if (!Array.isArray(qamProductData)) {
        throw new Error("Response API QAM Product bukan array");
      }

      setPpk(ppkData);
      setPpkProducts(ppkProductData);
      setQam(qamData);
      setQamProducts(qamProductData);
    } catch (error) {
      console.error("Gagal mengambil data laporan:", error);
      throw error;
    }
  }

  useEffect(() => {
    async function loadInitialData() {
      try {

        await fetchReports();
        toast.success("Data berhasil diperbarui", {
          description: "Data Spreadsheet sudah berhasil disinkronkan ke sistem.",
        });
      } catch {
        // Error sudah ditampilkan di console
      } finally {
        setLoading(false);
      }
    }

    loadInitialData();
  }, []);

  async function handleSyncData() {
    if (syncing) return;

    try {
      setSyncing(true);

      const [
        ppkSyncResponse,
        ppkProductSyncResponse,
        qamSyncResponse,
        qamProductSyncResponse,
      ] = await Promise.all([
        fetch("/api/spreadsheet/ppk/sync"),
        fetch("/api/spreadsheet/ppk-product/sync"),
        fetch("/api/spreadsheet/qam/sync"),
        fetch("/api/spreadsheet/qam-product/sync"),
      ]);

      const [
        ppkSyncData,
        ppkProductSyncData,
        qamSyncData,
        qamProductSyncData,
      ] = await Promise.all([
        ppkSyncResponse.json(),
        ppkProductSyncResponse.json(),
        qamSyncResponse.json(),
        qamProductSyncResponse.json(),
      ]);

      if (!ppkSyncResponse.ok) {
        throw new Error(ppkSyncData.error || "Sync PPK gagal");
      }

      if (!ppkProductSyncResponse.ok) {
        throw new Error(
          ppkProductSyncData.error || "Sync PPK per produk gagal"
        );
      }

      if (!qamSyncResponse.ok) {
        throw new Error(qamSyncData.error || "Sync QAM gagal");
      }

      if (!qamProductSyncResponse.ok) {
        throw new Error(
          qamProductSyncData.error || "Sync QAM per produk gagal"
        );
      }

      // Sync berhasil.
      // TIDAK PEDULI ada data baru atau tidak.
      toast.success("Update data berhasil", {
        description: "Data Spreadsheet berhasil disinkronkan ke Neon.",
      });

      // Refresh data laporan
      await fetchReports();

    } catch (error) {
      console.error("Gagal update data:", error);

      toast.error("Update data gagal", {
        description:
          error instanceof Error
            ? error.message
            : "Gagal memperbarui data.",
      });
    } finally {
      setSyncing(false);
    }
  }
  const years = Array.from(
    new Set([
      ...ppk.map((item) => item.year),
      ...ppkProducts.map((item) => item.year),
      ...qam.map((item) => item.year),
      ...qamProducts.map((item) => item.year),
    ])
  ).sort((a, b) => b - a);

  const filteredPpk = ppk.filter((item) => {
    if (item.year !== selectedYear) return false;

    if (
      selectedMonth !== "all" &&
      item.month !== selectedMonth
    ) {
      return false;
    }

    return true;
  });

  const filteredPpkProducts = ppkProducts.filter((item) => {
    if (item.year !== selectedYear) return false;

    if (
      selectedMonth !== "all" &&
      item.month !== selectedMonth
    ) {
      return false;
    }

    return true;
  });

  const filteredQam = qam.filter((item) => {
    if (item.year !== selectedYear) return false;

    if (
      selectedMonth !== "all" &&
      item.month !== selectedMonth
    ) {
      return false;
    }

    return true;
  });

  const filteredQamProducts = qamProducts.filter((item) => {
    if (item.year !== selectedYear) return false;

    if (
      selectedMonth !== "all" &&
      item.month !== selectedMonth
    ) {
      return false;
    }

    return true;
  });



  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-8">
            <p className="text-sm text-slate-500">
              Memuat data laporan...
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-8">

        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-teal-600">
              Direktorat Report
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Laporan QAM & PPK
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Monitoring performa PPK dan QAM berdasarkan periode bulan dan produk.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSyncData}
            disabled={syncing}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {syncing ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Memperbarui...
              </>
            ) : (
              <>
                ↻
                Update Data
              </>
            )}
          </button>
        </div>
        <ReportFilter
          year={selectedYear}
          month={selectedMonth}
          years={years}
          onYearChange={setSelectedYear}
          onMonthChange={setSelectedMonth}
        />
        {/* SUMMARY */}
        {/* <div className="grid gap-4 md:grid-cols-4">

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">
              Data PPK
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {filteredPpk.length}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Periode tersedia
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">
              Data QAM
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {filteredQam.length}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Periode tersedia
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">
              PPK Produk
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {filteredPpkProducts.length}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Data per periode
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">
              QAM Produk
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {filteredQamProducts.length}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Data per periode
            </p>
          </div>

        </div> */}

        {/* DATA TERBARU */}
        <div className="mt-8">

          {/* BUTTON CHART REPORT */}
          <div className="mb-4 flex justify-end">
            <button
              type="button"
              onClick={() => setShowReportCharts((prev) => !prev)}
              className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
            >
              {showReportCharts
                ? "Sembunyikan Chart"
                : "Tampilkan Chart"}
            </button>
          </div>

          {/* PPK & QAM */}
          <div className="grid gap-6 lg:grid-cols-2">

            {/* PPK */}
            <div>
              <PpkReportTable data={filteredPpk} />

              {showReportCharts && (
                <div className="mt-3">
                  <PpkTrendChart data={filteredPpk} />
                </div>
              )}
            </div>

            {/* QAM */}
            <div>
              <QamReportTable data={filteredQam} />

              {showReportCharts && (
                <div className="mt-3">
                  <QamTrendChart data={filteredQam} />
                </div>
              )}
            </div>

          </div>
        </div>
        <div className="mt-8">

          {/* HEADER PPK PRODUCT */}
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                PPK Per Product
              </h2>

              <p className="text-sm text-slate-500">
                Data PPK dan QHS berdasarkan produk.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setShowPpkProductChart((prev) => !prev)
              }
              className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
            >
              {showPpkProductChart
                ? "Sembunyikan Chart"
                : "Tampilkan Chart"}
            </button>
          </div>

          {/* TABLE */}
          <PpkProductTable data={filteredPpkProducts} />

          {/* CHART */}
          {showPpkProductChart && (
            <div className="mt-3">
              <PpkProductChart data={filteredPpkProducts} />
            </div>
          )}

        </div>
        <div className="mt-6">

          {/* HEADER QAM PRODUCT */}
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                QAM Per Product
              </h2>

              <p className="text-sm text-slate-500">
                Data QAM dan QHS berdasarkan produk.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setShowQamProductChart((prev) => !prev)
              }
              className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
            >
              {showQamProductChart
                ? "Sembunyikan Chart"
                : "Tampilkan Chart"}
            </button>
          </div>

          {/* TABLE */}
          <QamProductTable data={filteredQamProducts} />

          {/* CHART */}
          {showQamProductChart && (
            <div className="mt-3">
              <QamProductChart data={filteredQamProducts} />
            </div>
          )}

        </div>
      </div>
    </main>
  );
}
