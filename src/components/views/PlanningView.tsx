import React, { useState } from 'react';
import {
  LayoutGrid,
  Table2,
  Edit3,
  Check,
  RotateCcw,
  Car,
  Truck,
  Wrench,
  Calendar
} from 'lucide-react';
import {
  WeeklyReportData,
  SHOWROOMS,
  ShowroomId,
  sumVehicleBrand,
  sumVehicleSegment,
  sumServicePlan,
  calcPct,
  VehicleRowMetrics,
  ServiceRowMetrics
} from '../../data/weeklyPlanData';
import { AppIcon } from '../AppIcon';

interface PlanningViewProps {
  report: WeeklyReportData;
  onUpdateReport: (updated: WeeklyReportData) => void;
  onResetReport: () => void;
  isAdmin: boolean;
}

type SegmentFilter = 'ALL' | 'PC' | 'CV' | 'DVPT';
type PlanViewMode = 'visual' | 'table';

export const PlanningView: React.FC<PlanningViewProps> = ({
  report,
  onUpdateReport,
  onResetReport,
  isAdmin
}) => {
  const [viewMode, setViewMode] = useState<PlanViewMode>('visual');
  const [segmentFilter, setSegmentFilter] = useState<SegmentFilter>('ALL');
  const [showroomFilter, setShowroomFilter] = useState<'ALL' | ShowroomId>('ALL');
  const [isEditing, setIsEditing] = useState(false);

  const pcTotal = sumVehicleSegment(
    report.vehicles,
    'PC',
    showroomFilter === 'ALL' ? undefined : showroomFilter
  );
  const cvTotal = sumVehicleSegment(
    report.vehicles,
    'CV',
    showroomFilter === 'ALL' ? undefined : showroomFilter
  );

  const dvptDl = report.services[0];
  const dvptTb = report.services[1];

  const dvptDlMetrics =
    showroomFilter === 'ALL' ? sumServicePlan(dvptDl) : dvptDl.byShowroom[showroomFilter];
  const dvptTbMetrics =
    showroomFilter === 'ALL' ? sumServicePlan(dvptTb) : dvptTb.byShowroom[showroomFilter];

  const handleVehicleCellChange = (
    brandId: string,
    srId: ShowroomId,
    field: keyof VehicleRowMetrics,
    val: string
  ) => {
    const num = Number(val) || 0;
    const updated: WeeklyReportData = {
      ...report,
      updatedAt: new Date().toLocaleDateString('vi-VN'),
      vehicles: report.vehicles.map((v) =>
        v.id === brandId
          ? {
              ...v,
              byShowroom: {
                ...v.byShowroom,
                [srId]: {
                  ...v.byShowroom[srId],
                  [field]: num
                }
              }
            }
          : v
      )
    };
    onUpdateReport(updated);
  };

  const handleServiceCellChange = (
    srvId: string,
    srId: ShowroomId,
    field: keyof ServiceRowMetrics,
    val: string
  ) => {
    const num = Number(val) || 0;
    const updated: WeeklyReportData = {
      ...report,
      updatedAt: new Date().toLocaleDateString('vi-VN'),
      services: report.services.map((s) =>
        s.id === srvId
          ? {
              ...s,
              byShowroom: {
                ...s.byShowroom,
                [srId]: {
                  ...s.byShowroom[srId],
                  [field]: num
                }
              }
            }
          : s
      )
    };
    onUpdateReport(updated);
  };

  const pcVehicles = report.vehicles.filter((v) => v.segment === 'PC');
  const cvVehicles = report.vehicles.filter((v) => v.segment === 'CV');

  return (
    <div className="space-y-6 animate-in fade-in duration-200 pb-10">
      {/* Page Header */}
      <div className="pt-6 pb-4 border-b border-[#E9E9E7] dark:border-[#2F2F2F] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50">
            <AppIcon name="target_goal" className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#111827] dark:text-white">
              Quản trị Kế hoạch — Lũy kế Thực hiện Tuần
            </h1>
            <p className="text-xs text-[#787774] dark:text-[#9B9A97] mt-0.5 flex items-center gap-2 flex-wrap">
              <Calendar className="w-3.5 h-3.5" />
              {isEditing ? (
                <input
                  type="text"
                  value={report.reportTitle}
                  onChange={(e) => onUpdateReport({ ...report, reportTitle: e.target.value })}
                  className="px-2 py-0.5 rounded bg-white dark:bg-[#2A2A2A] border border-blue-300 text-gray-800 dark:text-white text-xs font-semibold"
                />
              ) : (
                <strong className="text-gray-700 dark:text-gray-200">{report.reportTitle}</strong>
              )}
              <span>• Cập nhật: {report.updatedAt} • Đồng bộ trực tiếp với Tổng quan Điều hành</span>
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-xl bg-[#F7F6F3] dark:bg-[#2A2A2A] p-0.5 border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setViewMode('visual')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'visual'
                  ? 'bg-white dark:bg-[#191919] text-[#004B87] dark:text-blue-400 shadow-2xs'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              Trực quan
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-[#191919] text-[#004B87] dark:text-blue-400 shadow-2xs'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              <Table2 className="w-3.5 h-3.5" />
              Bảng Tổng hợp
            </button>
          </div>

          {isAdmin && (
            <>
              <button
                onClick={() => {
                  setIsEditing(!isEditing);
                  if (!isEditing) setViewMode('table');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                  isEditing
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-[#004B87] hover:bg-[#003A69] text-white'
                }`}
              >
                {isEditing ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Hoàn tất nhập liệu
                  </>
                ) : (
                  <>
                    <Edit3 className="w-3.5 h-3.5" /> Nhập số liệu tuần
                  </>
                )}
              </button>

              {isEditing && (
                <button
                  onClick={onResetReport}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  title="Khôi phục số liệu mẫu ban đầu"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Khôi phục
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* 4 Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* PC Summary */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#202020] border border-[#E9E9E7] dark:border-[#2F2F2F] shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Xe Du lịch</span>
            <Car className="w-4 h-4 text-[#004B87] dark:text-blue-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-2xl font-bold text-[#111827] dark:text-white">
              {pcTotal.xhdTh} <span className="text-xs font-normal text-gray-400">/ {pcTotal.xhdCt} XHĐ</span>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-[#004B87] dark:text-blue-300">
              {calcPct(pcTotal.xhdTh, pcTotal.xhdCt)}%
            </span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-[#004B87] dark:bg-blue-500 h-1.5 rounded-full"
              style={{ width: `${Math.min(calcPct(pcTotal.xhdTh, pcTotal.xhdCt), 100)}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400">
            <span>KHĐ: <strong>{pcTotal.khd}</strong> • T10: {pcTotal.thPrevMonth}</span>
            <span className="text-amber-600 dark:text-amber-400 font-semibold">Tồn: {pcTotal.hdTon} HĐ</span>
          </div>
        </div>

        {/* CV Summary */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#202020] border border-[#E9E9E7] dark:border-[#2F2F2F] shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Xe Tải Bus</span>
            <Truck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-2xl font-bold text-[#111827] dark:text-white">
              {cvTotal.xhdTh} <span className="text-xs font-normal text-gray-400">/ {cvTotal.xhdCt} XHĐ</span>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300">
              {calcPct(cvTotal.xhdTh, cvTotal.xhdCt)}%
            </span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-emerald-600 h-1.5 rounded-full"
              style={{ width: `${Math.min(calcPct(cvTotal.xhdTh, cvTotal.xhdCt), 100)}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400">
            <span>KHĐ: <strong>{cvTotal.khd}</strong> • T10: {cvTotal.thPrevMonth}</span>
            <span className="text-amber-600 dark:text-amber-400 font-semibold">Tồn: {cvTotal.hdTon} HĐ</span>
          </div>
        </div>

        {/* DVPT DL Summary */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#202020] border border-[#E9E9E7] dark:border-[#2F2F2F] shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span className="font-semibold">DT DVPT Xe Du lịch</span>
            <Wrench className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-2xl font-bold text-[#111827] dark:text-white">
              {dvptDlMetrics.th.toFixed(2)} <span className="text-xs font-normal text-gray-400">/ {dvptDlMetrics.ct.toFixed(1)} tỷ</span>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300">
              {calcPct(dvptDlMetrics.th, dvptDlMetrics.ct)}%
            </span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-purple-600 h-1.5 rounded-full"
              style={{ width: `${Math.min(calcPct(dvptDlMetrics.th, dvptDlMetrics.ct), 100)}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400">
            <span>TH T10: {dvptDlMetrics.thPrevMonth.toFixed(1)} tỷ</span>
            <span className="text-amber-600 dark:text-amber-400 font-semibold">Tồn: {dvptDlMetrics.dtTon.toFixed(2)} tỷ</span>
          </div>
        </div>

        {/* DVPT TB Summary */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#202020] border border-[#E9E9E7] dark:border-[#2F2F2F] shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span className="font-semibold">DT DVPT Xe Tải, Bus</span>
            <Wrench className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-2xl font-bold text-[#111827] dark:text-white">
              {dvptTbMetrics.th.toFixed(2)} <span className="text-xs font-normal text-gray-400">/ {dvptTbMetrics.ct.toFixed(1)} tỷ</span>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300">
              {dvptTbMetrics.ct > 0 ? ((dvptTbMetrics.th / dvptTbMetrics.ct) * 100).toFixed(1) : 0}%
            </span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-amber-500 h-1.5 rounded-full"
              style={{ width: `${Math.min(calcPct(dvptTbMetrics.th, dvptTbMetrics.ct), 100)}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400">
            <span>TH T10: {dvptTbMetrics.thPrevMonth.toFixed(1)} tỷ</span>
            <span className="text-amber-600 dark:text-amber-400 font-semibold">Tồn: {dvptTbMetrics.dtTon.toFixed(2)} tỷ</span>
          </div>
        </div>
      </div>

      {/* Filters Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Segment Filter */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {[
            { id: 'ALL' as SegmentFilter, label: 'Tất cả mảng' },
            { id: 'PC' as SegmentFilter, label: 'Xe Du lịch (7)' },
            { id: 'CV' as SegmentFilter, label: 'Xe Tải Bus (4)' },
            { id: 'DVPT' as SegmentFilter, label: 'Dịch vụ Phụ tùng (2)' }
          ].map((seg) => (
            <button
              key={seg.id}
              onClick={() => setSegmentFilter(seg.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                segmentFilter === seg.id
                  ? 'bg-[#004B87] text-white border-[#004B87]'
                  : 'bg-white dark:bg-[#202020] text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-gray-300'
              }`}
            >
              {seg.label}
            </button>
          ))}
        </div>

        {/* Showroom Filter */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setShowroomFilter('ALL')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${
              showroomFilter === 'ALL'
                ? 'bg-gray-800 text-white border-gray-800 dark:bg-blue-600 dark:border-blue-600'
                : 'bg-white dark:bg-[#202020] text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700'
            }`}
          >
            Toàn Công ty
          </button>
          {SHOWROOMS.map((sr) => (
            <button
              key={sr.id}
              onClick={() => setShowroomFilter(sr.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${
                showroomFilter === sr.id
                  ? 'bg-gray-800 text-white border-gray-800 dark:bg-blue-600 dark:border-blue-600'
                  : 'bg-white dark:bg-[#202020] text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700'
              }`}
            >
              {sr.shortName}
            </button>
          ))}
        </div>
      </div>

      {/* VIEW MODE 1: VISUAL CARDS */}
      {viewMode === 'visual' && (
        <div className="space-y-6">
          {(segmentFilter === 'ALL' || segmentFilter === 'PC') && (
            <div className="space-y-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#004B87] dark:text-blue-400">
                1. Kinh doanh Xe Du lịch
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {pcVehicles.map((brand) => {
                  const m =
                    showroomFilter === 'ALL'
                      ? sumVehicleBrand(brand)
                      : brand.byShowroom[showroomFilter];
                  const pct = calcPct(m.xhdTh, m.xhdCt);
                  return (
                    <div
                      key={brand.id}
                      className="p-4 rounded-2xl bg-white dark:bg-[#202020] border border-[#E9E9E7] dark:border-[#2F2F2F] shadow-2xs space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-[#111827] dark:text-white">
                          {brand.name}
                        </span>
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                            pct >= 50
                              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
                              : pct > 0
                              ? 'bg-blue-50 text-[#004B87] dark:bg-blue-950/40 dark:text-blue-300'
                              : 'bg-gray-100 text-gray-500 dark:bg-gray-800'
                          }`}
                        >
                          {pct}% CT
                        </span>
                      </div>

                      <div className="grid grid-cols-4 gap-2 text-center py-2 rounded-xl bg-[#F7F6F3] dark:bg-[#262626] text-xs">
                        <div>
                          <div className="text-[10px] text-gray-400">TH T10</div>
                          <div className="font-bold text-gray-700 dark:text-gray-200">{m.thPrevMonth}</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-gray-400">KHĐ</div>
                          <div className="font-bold text-gray-700 dark:text-gray-200">{m.khd}</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-gray-400">XHĐ (TH/CT)</div>
                          <div className="font-bold text-[#004B87] dark:text-blue-400">
                            {m.xhdTh}/{m.xhdCt}
                          </div>
                        </div>
                        <div>
                          <div className="text-[10px] text-gray-400">HĐ Tồn</div>
                          <div className="font-bold text-amber-600 dark:text-amber-400">{m.hdTon}</div>
                        </div>
                      </div>

                      {showroomFilter === 'ALL' && (
                        <div className="space-y-1 text-[11px]">
                          {SHOWROOMS.map((sr) => {
                            const sm = brand.byShowroom[sr.id];
                            if (sm.xhdCt === 0 && sm.khd === 0 && sm.thPrevMonth === 0) return null;
                            return (
                              <div key={sr.id} className="flex items-center justify-between text-gray-600 dark:text-gray-300">
                                <span>{sr.shortName}</span>
                                <span className="font-mono">
                                  XHĐ: <strong>{sm.xhdTh}/{sm.xhdCt}</strong> ({calcPct(sm.xhdTh, sm.xhdCt)}%) • Tồn: {sm.hdTon}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {(segmentFilter === 'ALL' || segmentFilter === 'CV') && (
            <div className="space-y-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                2. Kinh doanh Xe Tải Bus
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cvVehicles.map((brand) => {
                  const m =
                    showroomFilter === 'ALL'
                      ? sumVehicleBrand(brand)
                      : brand.byShowroom[showroomFilter];
                  const pct = calcPct(m.xhdTh, m.xhdCt);
                  return (
                    <div
                      key={brand.id}
                      className="p-4 rounded-2xl bg-white dark:bg-[#202020] border border-[#E9E9E7] dark:border-[#2F2F2F] shadow-2xs space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-[#111827] dark:text-white">
                          {brand.name}
                        </span>
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                          {pct}% CT
                        </span>
                      </div>

                      <div className="grid grid-cols-4 gap-2 text-center py-2 rounded-xl bg-[#F7F6F3] dark:bg-[#262626] text-xs">
                        <div>
                          <div className="text-[10px] text-gray-400">TH T10</div>
                          <div className="font-bold text-gray-700 dark:text-gray-200">{m.thPrevMonth}</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-gray-400">KHĐ</div>
                          <div className="font-bold text-gray-700 dark:text-gray-200">{m.khd}</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-gray-400">XHĐ (TH/CT)</div>
                          <div className="font-bold text-emerald-700 dark:text-emerald-400">
                            {m.xhdTh}/{m.xhdCt}
                          </div>
                        </div>
                        <div>
                          <div className="text-[10px] text-gray-400">HĐ Tồn</div>
                          <div className="font-bold text-amber-600 dark:text-amber-400">{m.hdTon}</div>
                        </div>
                      </div>

                      {showroomFilter === 'ALL' && (
                        <div className="space-y-1 text-[11px]">
                          {SHOWROOMS.map((sr) => {
                            const sm = brand.byShowroom[sr.id];
                            if (sm.xhdCt === 0 && sm.khd === 0 && sm.thPrevMonth === 0) return null;
                            return (
                              <div key={sr.id} className="flex items-center justify-between text-gray-600 dark:text-gray-300">
                                <span>{sr.shortName}</span>
                                <span className="font-mono">
                                  XHĐ: <strong>{sm.xhdTh}/{sm.xhdCt}</strong> ({calcPct(sm.xhdTh, sm.xhdCt)}%) • Tồn: {sm.hdTon}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {(segmentFilter === 'ALL' || segmentFilter === 'DVPT') && (
            <div className="space-y-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400">
                3. Doanh thu Dịch vụ Phụ tùng (tỷ đồng)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {report.services.map((srv) => {
                  const m =
                    showroomFilter === 'ALL'
                      ? sumServicePlan(srv)
                      : srv.byShowroom[showroomFilter];
                  const pct = m.ct > 0 ? ((m.th / m.ct) * 100).toFixed(1) : '0';
                  return (
                    <div
                      key={srv.id}
                      className="p-4 rounded-2xl bg-white dark:bg-[#202020] border border-[#E9E9E7] dark:border-[#2F2F2F] shadow-2xs space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-[#111827] dark:text-white">
                          {srv.name}
                        </span>
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300">
                          {pct}% CT
                        </span>
                      </div>
                      <div className="space-y-1.5 text-xs">
                        {SHOWROOMS.filter((sr) => showroomFilter === 'ALL' || showroomFilter === sr.id).map((sr) => {
                          const sm = srv.byShowroom[sr.id];
                          if (sm.ct === 0 && sm.th === 0 && sm.thPrevMonth === 0) return null;
                          const srPct = sm.ct > 0 ? ((sm.th / sm.ct) * 100).toFixed(1) : '0';
                          return (
                            <div
                              key={sr.id}
                              className="p-2 rounded-lg bg-[#F7F6F3] dark:bg-[#262626] flex items-center justify-between"
                            >
                              <span className="font-medium text-gray-700 dark:text-gray-200">
                                {sr.workshopName}
                              </span>
                              <span className="font-mono text-[11px] text-gray-600 dark:text-gray-300">
                                TH: <strong>{sm.th}</strong>/{sm.ct} tỷ ({srPct}%) • Tồn: {sm.dtTon} tỷ
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW MODE 2: EXCEL-STYLE SUMMARY TABLES (AND INLINE EDIT FOR ADMIN) */}
      {viewMode === 'table' && (
        <div className="space-y-6">
          {/* Vehicle Tables (PC + CV) */}
          {(segmentFilter === 'ALL' || segmentFilter === 'PC' || segmentFilter === 'CV') && (
            <div className="space-y-6">
              {(segmentFilter === 'ALL' || segmentFilter === 'PC' ? pcVehicles : [])
                .concat(segmentFilter === 'ALL' || segmentFilter === 'CV' ? cvVehicles : [])
                .map((brand) => {
                  const total = sumVehicleBrand(brand);
                  return (
                    <div
                      key={brand.id}
                      className="bg-white dark:bg-[#202020] rounded-xl border border-[#E9E9E7] dark:border-[#2F2F2F] overflow-hidden shadow-2xs"
                    >
                      <div className="px-4 py-2.5 bg-[#FFFCD5]/70 dark:bg-[#2A2818] border-b border-[#E9E9E7] dark:border-[#333] flex items-center justify-between">
                        <span className="text-xs font-bold text-[#111827] dark:text-white">
                          {brand.name} ({brand.segment === 'PC' ? 'Xe Du lịch' : 'Xe Tải & Bus'})
                        </span>
                        <span className="text-[11px] font-semibold text-[#004B87] dark:text-blue-400">
                          Tổng XHĐ: {total.xhdTh}/{total.xhdCt} ({calcPct(total.xhdTh, total.xhdCt)}%)
                        </span>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs text-center border-collapse">
                          <thead>
                            <tr className="bg-[#F7F6F3] dark:bg-[#252525] border-b border-gray-200 dark:border-gray-700 text-[11px] font-semibold text-gray-600 dark:text-gray-300">
                              <th className="py-2 px-3 text-left">ĐƠN VỊ</th>
                              <th className="py-2 px-2">TH tháng 10</th>
                              <th className="py-2 px-2">KHĐ</th>
                              <th className="py-2 px-2">XHĐ - CT</th>
                              <th className="py-2 px-2 text-[#004B87] dark:text-blue-400">XHĐ - TH</th>
                              <th className="py-2 px-2">% TH</th>
                              <th className="py-2 px-2">HĐ tồn chưa XHĐ</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {SHOWROOMS.map((sr) => {
                              const m = brand.byShowroom[sr.id];
                              return (
                                <tr key={sr.id} className="hover:bg-gray-50/60 dark:hover:bg-[#262626]">
                                  <td className="py-2 px-3 text-left font-medium text-gray-700 dark:text-gray-200">
                                    {sr.name}
                                  </td>
                                  {(['thPrevMonth', 'khd', 'xhdCt', 'xhdTh'] as const).map((field) => (
                                    <td key={field} className="py-1.5 px-2">
                                      {isEditing ? (
                                        <input
                                          type="number"
                                          value={m[field]}
                                          onChange={(e) =>
                                            handleVehicleCellChange(brand.id, sr.id, field, e.target.value)
                                          }
                                          className="w-14 text-center px-1 py-0.5 rounded bg-blue-50/50 dark:bg-[#2A2A2A] border border-blue-200 dark:border-gray-600"
                                        />
                                      ) : (
                                        <span className={field === 'xhdTh' ? 'font-bold text-[#004B87] dark:text-blue-400' : ''}>
                                          {m[field] || ''}
                                        </span>
                                      )}
                                    </td>
                                  ))}
                                  <td className="py-2 px-2 font-semibold">{calcPct(m.xhdTh, m.xhdCt)}%</td>
                                  <td className="py-1.5 px-2">
                                    {isEditing ? (
                                      <input
                                        type="number"
                                        value={m.hdTon}
                                        onChange={(e) =>
                                          handleVehicleCellChange(brand.id, sr.id, 'hdTon', e.target.value)
                                        }
                                        className="w-14 text-center px-1 py-0.5 rounded bg-blue-50/50 dark:bg-[#2A2A2A] border border-blue-200 dark:border-gray-600"
                                      />
                                    ) : (
                                      <span>{m.hdTon || ''}</span>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                            <tr className="bg-[#E1FFFF]/50 dark:bg-blue-950/30 font-bold text-gray-900 dark:text-white">
                              <td className="py-2 px-3 text-left">Công ty THACO AUTO NGHỆ AN</td>
                              <td className="py-2 px-2">{total.thPrevMonth}</td>
                              <td className="py-2 px-2">{total.khd}</td>
                              <td className="py-2 px-2">{total.xhdCt}</td>
                              <td className="py-2 px-2 text-[#004B87] dark:text-blue-400">{total.xhdTh}</td>
                              <td className="py-2 px-2">{calcPct(total.xhdTh, total.xhdCt)}%</td>
                              <td className="py-2 px-2">{total.hdTon}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}

          {/* Service Tables */}
          {(segmentFilter === 'ALL' || segmentFilter === 'DVPT') && (
            <div className="space-y-4">
              {report.services.map((srv) => {
                const total = sumServicePlan(srv);
                const totalPct = total.ct > 0 ? ((total.th / total.ct) * 100).toFixed(1) : '0';
                return (
                  <div
                    key={srv.id}
                    className="bg-white dark:bg-[#202020] rounded-xl border border-[#E9E9E7] dark:border-[#2F2F2F] overflow-hidden shadow-2xs"
                  >
                    <div className="px-4 py-2.5 bg-[#FFFCD5]/70 dark:bg-[#2A2818] border-b border-[#E9E9E7] dark:border-[#333] flex items-center justify-between">
                      <span className="text-xs font-bold text-[#111827] dark:text-white">{srv.name}</span>
                      <span className="text-[11px] font-semibold text-purple-700 dark:text-purple-400">
                        Tổng TH: {total.th}/{total.ct} tỷ ({totalPct}%)
                      </span>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-center border-collapse">
                        <thead>
                          <tr className="bg-[#F7F6F3] dark:bg-[#252525] border-b border-gray-200 dark:border-gray-700 text-[11px] font-semibold text-gray-600 dark:text-gray-300">
                            <th className="py-2 px-3 text-left">Showroom / Điểm xưởng</th>
                            <th className="py-2 px-2">TH tháng 10</th>
                            <th className="py-2 px-2">CT</th>
                            <th className="py-2 px-2 text-[#004B87] dark:text-blue-400">TH</th>
                            <th className="py-2 px-2">% TH</th>
                            <th className="py-2 px-2">DT tồn chưa XHĐ</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                          {SHOWROOMS.map((sr) => {
                            const m = srv.byShowroom[sr.id];
                            const pct = m.ct > 0 ? ((m.th / m.ct) * 100).toFixed(1) : '0';
                            return (
                              <tr key={sr.id} className="hover:bg-gray-50/60 dark:hover:bg-[#262626]">
                                <td className="py-2 px-3 text-left font-medium text-gray-700 dark:text-gray-200">
                                  {sr.shortName} • {sr.workshopName}
                                </td>
                                {(['thPrevMonth', 'ct', 'th'] as const).map((field) => (
                                  <td key={field} className="py-1.5 px-2">
                                    {isEditing ? (
                                      <input
                                        type="number"
                                        step="0.01"
                                        value={m[field]}
                                        onChange={(e) =>
                                          handleServiceCellChange(srv.id, sr.id, field, e.target.value)
                                        }
                                        className="w-16 text-center px-1 py-0.5 rounded bg-blue-50/50 dark:bg-[#2A2A2A] border border-blue-200 dark:border-gray-600"
                                      />
                                    ) : (
                                      <span className={field === 'th' ? 'font-bold text-[#004B87] dark:text-blue-400' : ''}>
                                        {m[field] || ''}
                                      </span>
                                    )}
                                  </td>
                                ))}
                                <td className="py-2 px-2 font-semibold">{m.ct > 0 ? `${pct}%` : ''}</td>
                                <td className="py-1.5 px-2">
                                  {isEditing ? (
                                    <input
                                      type="number"
                                      step="0.01"
                                      value={m.dtTon}
                                      onChange={(e) =>
                                        handleServiceCellChange(srv.id, sr.id, 'dtTon', e.target.value)
                                      }
                                      className="w-16 text-center px-1 py-0.5 rounded bg-blue-50/50 dark:bg-[#2A2A2A] border border-blue-200 dark:border-gray-600"
                                    />
                                  ) : (
                                    <span>{m.dtTon || ''}</span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                          <tr className="bg-[#E1FFFF]/50 dark:bg-blue-950/30 font-bold text-gray-900 dark:text-white">
                            <td className="py-2 px-3 text-left">Công ty THACO AUTO NGHỆ AN</td>
                            <td className="py-2 px-2">{total.thPrevMonth}</td>
                            <td className="py-2 px-2">{total.ct}</td>
                            <td className="py-2 px-2 text-[#004B87] dark:text-blue-400">{total.th.toFixed(2)}</td>
                            <td className="py-2 px-2">{totalPct}%</td>
                            <td className="py-2 px-2">{total.dtTon.toFixed(2)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
