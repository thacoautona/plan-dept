import React from 'react';
import {
  Calendar,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { GovernanceDoc } from '../../types';
import {
  WeeklyReportData,
  SHOWROOMS,
  sumVehicleSegment,
  sumServicePlan,
  calcPct
} from '../../data/weeklyPlanData';
import { SYSTEM_DATABASE_FILES } from '../../data/databaseData';
import { ActiveTab } from '../Sidebar';
import { AppIcon } from '../AppIcon';

// Department color map
const DEPT_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  KDDL: { bg: '#FFC5C5', text: '#801A1A', border: '#FCA5A5' },
  KDTB: { bg: '#FFC5C5', text: '#801A1A', border: '#FCA5A5' },
  DVDL: { bg: '#BFBFBF', text: '#2D3748', border: '#A0AEC0' },
  DVTB: { bg: '#BFBFBF', text: '#2D3748', border: '#A0AEC0' },
  QSD: { bg: '#BFBFBF', text: '#2D3748', border: '#A0AEC0' },
  TCKT: { bg: '#FFFCD5', text: '#744210', border: '#F6E05E' },
  HCNS: { bg: '#FFFCD5', text: '#744210', border: '#F6E05E' },
  NVKH: { bg: '#FFFCD5', text: '#744210', border: '#F6E05E' },
  MKT: { bg: '#FFFCD5', text: '#744210', border: '#F6E05E' },
  NVCN: { bg: '#E1FFFF', text: '#234E52', border: '#81E6D9' },
  VPDH: { bg: '#DBEAFE', text: '#1E40AF', border: '#93C5FD' }
};

interface DashboardViewProps {
  weeklyReport: WeeklyReportData;
  docs: GovernanceDoc[];
  onNavigateTab: (tab: ActiveTab) => void;
}

function parseVnDate(dateStr?: string): number {
  if (!dateStr) return 0;
  const m = dateStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (m) {
    return new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1])).getTime();
  }
  const y = dateStr.match(/(\d{4})/);
  return y ? new Date(Number(y[1]), 0, 1).getTime() : 0;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  weeklyReport,
  docs,
  onNavigateTab
}) => {
  const latestDocs = React.useMemo(
    () =>
      [...docs]
        .sort((a, b) => parseVnDate(b.effectiveDate) - parseVnDate(a.effectiveDate))
        .slice(0, 4),
    [docs]
  );

  const latestDatabaseFiles = React.useMemo(() => {
    let userFiles: typeof SYSTEM_DATABASE_FILES = [];
    try {
      const saved = localStorage.getItem('thaco_na_database_files_v1');
      if (saved) userFiles = JSON.parse(saved);
    } catch {
      // ignore
    }
    return [...userFiles, ...SYSTEM_DATABASE_FILES]
      .sort((a, b) => parseVnDate(b.updatedAt) - parseVnDate(a.updatedAt))
      .slice(0, 4);
  }, []);
  const pcTotal = sumVehicleSegment(weeklyReport.vehicles, 'PC');
  const cvTotal = sumVehicleSegment(weeklyReport.vehicles, 'CV');
  const dvptDl = sumServicePlan(weeklyReport.services[0]);
  const dvptTb = sumServicePlan(weeklyReport.services[1]);

  const pcPct = calcPct(pcTotal.xhdTh, pcTotal.xhdCt);
  const cvPct = calcPct(cvTotal.xhdTh, cvTotal.xhdCt);
  const dlPct = dvptDl.ct > 0 ? ((dvptDl.th / dvptDl.ct) * 100).toFixed(1) : '0';
  const tbPct = dvptTb.ct > 0 ? ((dvptTb.th / dvptTb.ct) * 100).toFixed(1) : '0';

  const totalPendingOrders = pcTotal.hdTon + cvTotal.hdTon;
  const totalPendingService = (dvptDl.dtTon + dvptTb.dtTon).toFixed(2);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Notion-style Page Cover Header */}
      <div className="relative pt-6 pb-4 border-b border-[#E9E9E7] dark:border-[#2F2F2F]">
        <div className="flex items-center gap-3.5 mb-2">
          <div className="p-2.5 rounded-2xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 shadow-2xs">
            <AppIcon name="presentation_chart" className="w-8 h-8" alt="Dashboard" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#111827] dark:text-white">
              Tổng quan Quản trị & Điều hành Kế hoạch
            </h1>
            <p className="text-xs text-[#787774] dark:text-[#9B9A97] mt-0.5 flex items-center gap-2 flex-wrap">
              <Calendar className="w-3.5 h-3.5" /> Kỳ tổng kết: <strong className="text-gray-700 dark:text-gray-300">{weeklyReport.reportTitle}</strong> • Cập nhật: <strong>{weeklyReport.updatedAt}</strong> • Đơn vị: <strong className="text-[#004B87] dark:text-blue-400">THACO AUTO Nghệ An</strong>
            </p>
          </div>
        </div>
      </div>

      {/* 4 SYNCED KPI METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Xe Du lịch */}
        <div
          onClick={() => onNavigateTab('planning')}
          className="p-4 rounded-xl bg-white dark:bg-[#202020] border border-[#E9E9E7] dark:border-[#2F2F2F] shadow-2xs hover:border-blue-300 dark:hover:border-blue-700 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-xs text-[#787774] dark:text-[#9B9A97]">
            <span>XHĐ Xe Du lịch</span>
            <div className="p-1 rounded-md bg-blue-50 dark:bg-blue-900/30">
              <AppIcon name="growth_chart" className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline justify-between gap-2">
            <span className="text-2xl font-bold text-[#111827] dark:text-white">
              {pcTotal.xhdTh} <span className="text-xs font-normal text-gray-400">/ {pcTotal.xhdCt} xe</span>
            </span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-[#004B87] dark:text-blue-300">
              {pcPct}% CT
            </span>
          </div>
          <div className="mt-2.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-[#004B87] dark:bg-blue-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(pcPct, 100)}%` }}
            />
          </div>
          <p className="mt-2 text-[11px] text-[#787774] dark:text-[#9B9A97] flex justify-between">
            <span>KHĐ: <strong>{pcTotal.khd}</strong></span>
            <span className="text-amber-600 dark:text-amber-400 font-semibold">Tồn chưa XHĐ: {pcTotal.hdTon}</span>
          </p>
        </div>

        {/* Metric 2: Xe Tải & Bus */}
        <div
          onClick={() => onNavigateTab('planning')}
          className="p-4 rounded-xl bg-white dark:bg-[#202020] border border-[#E9E9E7] dark:border-[#2F2F2F] shadow-2xs hover:border-emerald-300 dark:hover:border-emerald-700 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-xs text-[#787774] dark:text-[#9B9A97]">
            <span>XHĐ Xe Tải Bus</span>
            <div className="p-1 rounded-md bg-emerald-50 dark:bg-emerald-900/30">
              <AppIcon name="target_goal" className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline justify-between gap-2">
            <span className="text-2xl font-bold text-[#111827] dark:text-white">
              {cvTotal.xhdTh} <span className="text-xs font-normal text-gray-400">/ {cvTotal.xhdCt} xe</span>
            </span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300">
              {cvPct}% CT
            </span>
          </div>
          <div className="mt-2.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-emerald-600 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(cvPct, 100)}%` }}
            />
          </div>
          <p className="mt-2 text-[11px] text-[#787774] dark:text-[#9B9A97] flex justify-between">
            <span>KHĐ: <strong>{cvTotal.khd}</strong></span>
            <span className="text-amber-600 dark:text-amber-400 font-semibold">Tồn chưa XHĐ: {cvTotal.hdTon}</span>
          </p>
        </div>

        {/* Metric 3: DT DVPT DL */}
        <div
          onClick={() => onNavigateTab('planning')}
          className="p-4 rounded-xl bg-white dark:bg-[#202020] border border-[#E9E9E7] dark:border-[#2F2F2F] shadow-2xs hover:border-purple-300 dark:hover:border-purple-700 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-xs text-[#787774] dark:text-[#9B9A97]">
            <span>DT DVPT Xe Du lịch</span>
            <div className="p-1 rounded-md bg-purple-50 dark:bg-purple-900/30">
              <AppIcon name="binder_archive" className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline justify-between gap-2">
            <span className="text-2xl font-bold text-[#111827] dark:text-white">
              {dvptDl.th.toFixed(2)} <span className="text-xs font-normal text-gray-400">/ {dvptDl.ct.toFixed(1)} tỷ</span>
            </span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300">
              {dlPct}% CT
            </span>
          </div>
          <div className="mt-2.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-purple-600 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(Number(dlPct), 100)}%` }}
            />
          </div>
          <p className="mt-2 text-[11px] text-[#787774] dark:text-[#9B9A97] flex justify-between">
            <span>TH T10: {dvptDl.thPrevMonth.toFixed(1)} tỷ</span>
            <span className="text-amber-600 dark:text-amber-400 font-semibold">Tồn: {dvptDl.dtTon.toFixed(2)} tỷ</span>
          </p>
        </div>

        {/* Metric 4: DT DVPT TB */}
        <div
          onClick={() => onNavigateTab('planning')}
          className="p-4 rounded-xl bg-white dark:bg-[#202020] border border-[#E9E9E7] dark:border-[#2F2F2F] shadow-2xs hover:border-amber-300 dark:hover:border-amber-700 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-xs text-[#787774] dark:text-[#9B9A97]">
            <span>DT DVPT Xe Tải, Bus</span>
            <div className="p-1 rounded-md bg-amber-50 dark:bg-amber-900/30">
              <AppIcon name="compliance_shield" className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline justify-between gap-2">
            <span className="text-2xl font-bold text-[#111827] dark:text-white">
              {dvptTb.th.toFixed(2)} <span className="text-xs font-normal text-gray-400">/ {dvptTb.ct.toFixed(1)} tỷ</span>
            </span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300">
              {tbPct}% CT
            </span>
          </div>
          <div className="mt-2.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-amber-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(Number(tbPct), 100)}%` }}
            />
          </div>
          <p className="mt-2 text-[11px] text-[#787774] dark:text-[#9B9A97] flex justify-between">
            <span>TH T10: {dvptTb.thPrevMonth.toFixed(1)} tỷ</span>
            <span className="text-amber-600 dark:text-amber-400 font-semibold">Tồn: {dvptTb.dtTon.toFixed(2)} tỷ</span>
          </p>
        </div>
      </div>

      {/* STRATEGIC ADVISORY SECTION */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50/70 via-white to-amber-50/50 dark:from-[#1E2633] dark:via-[#1E1E1E] dark:to-[#2B2317] border border-blue-100 dark:border-blue-900/40 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <AppIcon name="strategy_knight" className="w-5 h-5" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#004B87] dark:text-blue-300">
              Trọng tâm Tham mưu Ban Giám Đốc THACO AUTO Nghệ An
            </h2>
          </div>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-[#004B87] dark:text-blue-300 font-medium">
            Tổng hợp theo số liệu tuần
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          <div className="p-3.5 rounded-xl bg-white/90 dark:bg-[#252525]/90 border border-gray-200/80 dark:border-[#383838] shadow-2xs">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-rose-600 dark:text-rose-400">1. Giải phóng Hợp đồng tồn chưa XHĐ</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 rounded font-mono">
                {totalPendingOrders} HĐ tồn
              </span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
              Toàn Công ty đang có <strong>{pcTotal.hdTon} HĐ tồn Xe Du lịch</strong> và <strong>{cvTotal.hdTon} HĐ tồn Xe Tải Bus</strong>. Cần đôn đốc giải ngân ngân hàng, hoàn thiện hồ sơ giao xe để đẩy nhanh tỷ lệ XHĐ (hiện đạt {pcPct}% Xe Du lịch và {cvPct}% Xe Tải Bus).
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white/90 dark:bg-[#252525]/90 border border-gray-200/80 dark:border-[#383838] shadow-2xs">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-amber-600 dark:text-amber-400">2. Quyết toán DT DVPT tồn chưa XHĐ</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 rounded font-mono">
                {totalPendingService} tỷ tồn
              </span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
              DT DVPT Du lịch đạt {dvptDl.th.toFixed(2)}/{dvptDl.ct} tỷ ({dlPct}%), Tải Bus đạt {dvptTb.th.toFixed(2)}/{dvptTb.ct} tỷ ({tbPct}%). Tập trung nghiệm thu, xuất hóa đơn phần doanh thu tồn {totalPendingService} tỷ đồng.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white/90 dark:bg-[#252525]/90 border border-gray-200/80 dark:border-[#383838] shadow-2xs">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">3. Chuẩn hóa Hệ thống & Quy trình</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded font-mono">
                {docs.length} văn bản
              </span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
              Hệ thống đã đồng bộ {docs.length} văn bản Quy trình Quy định (72 VPĐH, 151 nội bộ), 85 vị trí chức danh và kho Cơ sở dữ liệu phục vụ điều hành xuyên suốt các Showroom.
            </p>
          </div>
        </div>
      </div>

      {/* SHOWROOM PERFORMANCE MATRIX (SYNCED WITH PLANNING VIEW) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-[#111827] dark:text-white flex items-center gap-2">
            <AppIcon name="data_analytics" className="w-5 h-5" />
            Tổng hợp Thực hiện Lũy kế theo Showroom
          </h2>
          <button
            onClick={() => onNavigateTab('planning')}
            className="text-xs font-medium text-[#004B87] dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            Xem chi tiết theo Thương hiệu & Nhập số liệu <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="bg-white dark:bg-[#202020] rounded-xl border border-[#E9E9E7] dark:border-[#2F2F2F] overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-center border-collapse">
              <thead>
                <tr className="bg-[#F7F6F3] dark:bg-[#252525] border-b border-[#E9E9E7] dark:border-[#333] text-[11px] font-semibold text-gray-600 dark:text-gray-300">
                  <th className="py-3 px-4 text-left">Đơn vị Showroom</th>
                  <th className="py-3 px-3">Xe Du lịch (XHĐ / CT)</th>
                  <th className="py-3 px-3">Xe Tải Bus (XHĐ / CT)</th>
                  <th className="py-3 px-3">Tổng HĐ tồn</th>
                  <th className="py-3 px-3">DVPT DL (tỷ)</th>
                  <th className="py-3 px-3">DVPT T,B (tỷ)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E9E9E7] dark:divide-[#2F2F2F]">
                {SHOWROOMS.map((sr) => {
                  const pc = sumVehicleSegment(weeklyReport.vehicles, 'PC', sr.id);
                  const cv = sumVehicleSegment(weeklyReport.vehicles, 'CV', sr.id);
                  const dl = weeklyReport.services[0].byShowroom[sr.id];
                  const tb = weeklyReport.services[1].byShowroom[sr.id];
                  return (
                    <tr key={sr.id} className="hover:bg-gray-50/70 dark:hover:bg-[#262626]">
                      <td className="py-3 px-4 text-left font-semibold text-gray-900 dark:text-white">
                        {sr.name}
                      </td>
                      <td className="py-3 px-3 font-mono">
                        <strong className="text-[#004B87] dark:text-blue-400">{pc.xhdTh}</strong>/{pc.xhdCt} ({calcPct(pc.xhdTh, pc.xhdCt)}%)
                      </td>
                      <td className="py-3 px-3 font-mono">
                        <strong className="text-emerald-700 dark:text-emerald-400">{cv.xhdTh}</strong>/{cv.xhdCt} ({calcPct(cv.xhdTh, cv.xhdCt)}%)
                      </td>
                      <td className="py-3 px-3 font-mono font-semibold text-amber-600 dark:text-amber-400">
                        {pc.hdTon + cv.hdTon}
                      </td>
                      <td className="py-3 px-3 font-mono">
                        {dl.ct > 0 ? `${dl.th}/${dl.ct} (${calcPct(dl.th, dl.ct)}%)` : '—'}
                      </td>
                      <td className="py-3 px-3 font-mono">
                        {tb.ct > 0 ? `${tb.th}/${tb.ct} (${((tb.th / tb.ct) * 100).toFixed(1)}%)` : '—'}
                      </td>
                    </tr>
                  );
                })}
                <tr className="bg-[#E1FFFF]/50 dark:bg-blue-950/30 font-bold text-gray-900 dark:text-white">
                  <td className="py-3 px-4 text-left">Công ty THACO AUTO NGHỆ AN</td>
                  <td className="py-3 px-3 font-mono text-[#004B87] dark:text-blue-400">
                    {pcTotal.xhdTh}/{pcTotal.xhdCt} ({pcPct}%)
                  </td>
                  <td className="py-3 px-3 font-mono text-emerald-700 dark:text-emerald-400">
                    {cvTotal.xhdTh}/{cvTotal.xhdCt} ({cvPct}%)
                  </td>
                  <td className="py-3 px-3 font-mono text-amber-600 dark:text-amber-400">
                    {totalPendingOrders}
                  </td>
                  <td className="py-3 px-3 font-mono">
                    {dvptDl.th.toFixed(2)}/{dvptDl.ct} ({dlPct}%)
                  </td>
                  <td className="py-3 px-3 font-mono">
                    {dvptTb.th.toFixed(2)}/{dvptTb.ct} ({tbPct}%)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* TWO COLUMN SUMMARY: GOVERNANCE DOCS & DIGITAL ROADMAP */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Governance Docs Recent */}
        <div className="p-4 rounded-xl bg-white dark:bg-[#202020] border border-[#E9E9E7] dark:border-[#2F2F2F] shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <AppIcon name="folder_archive" className="w-4 h-4" />
              Quy trình Quy định mới nhất ({docs.length} văn bản)
            </h3>
            <button
              onClick={() => onNavigateTab('governance')}
              className="text-[11px] text-[#004B87] dark:text-blue-400 hover:underline flex items-center gap-1 font-medium"
            >
              Xem tất cả <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-2.5">
            {latestDocs.map((item) => {
              const deptStyle = DEPT_COLORS[item.department] || { bg: '#E2E8F0', text: '#2D3748', border: '#CBD5E0' };
              return (
                <div
                  key={item.id}
                  className="p-2.5 rounded-lg bg-gray-50 dark:bg-[#282828] border border-gray-200 dark:border-[#383838] text-xs space-y-1 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span
                        className="text-[10px] font-bold px-1.5 py-0.5 rounded border"
                        style={{ backgroundColor: deptStyle.bg, color: deptStyle.text, borderColor: deptStyle.border }}
                      >
                        {item.department}
                      </span>
                      <span className="font-mono text-[11px] text-gray-500 dark:text-gray-400">
                        {item.code}
                      </span>
                      {item.effectiveDate && (
                        <span className="text-[10px] text-gray-400">• {item.effectiveDate}</span>
                      )}
                    </div>
                    {item.driveLink && (
                      <a
                        href={item.driveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5 flex-shrink-0"
                      >
                        Mở file <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-100 line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="text-gray-500 dark:text-gray-400 text-[11px] line-clamp-1">
                    {item.summary}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Database Files Summary */}
        <div className="p-4 rounded-xl bg-white dark:bg-[#202020] border border-[#E9E9E7] dark:border-[#2F2F2F] shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <AppIcon name="binder_archive" className="w-4 h-4" />
              Kho Cơ sở dữ liệu ({SYSTEM_DATABASE_FILES.length} tệp hệ thống)
            </h3>
            <button
              onClick={() => onNavigateTab('database')}
              className="text-[11px] text-[#004B87] dark:text-blue-400 hover:underline flex items-center gap-1 font-medium"
            >
              Mở kho dữ liệu <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-2.5">
            {latestDatabaseFiles.map((file) => (
              <div
                key={file.id}
                className="p-2.5 rounded-lg bg-gray-50 dark:bg-[#282828] border border-gray-200 dark:border-[#383838] text-xs space-y-1"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-gray-800 dark:text-gray-100 line-clamp-1">
                    {file.name}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950/40 text-[#004B87] dark:text-blue-300 font-semibold uppercase flex-shrink-0">
                    {file.format}
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-1">
                  {file.description} • Cập nhật: {file.updatedAt}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
