import React, { useState } from 'react';
import {
  Table,
  Kanban,
  Filter,
  Plus,
  ArrowUpDown,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileSpreadsheet,
  ChevronRight,
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { PlanGoal, PlanStatus } from '../../types';

interface PlanningViewProps {
  plans: PlanGoal[];
  onSelectPlan: (plan: PlanGoal) => void;
  onOpenCreatePlan: () => void;
  onUpdatePlanStatus: (planId: string, status: PlanStatus) => void;
}

export const PlanningView: React.FC<PlanningViewProps> = ({
  plans,
  onSelectPlan,
  onOpenCreatePlan,
  onUpdatePlanStatus
}) => {
  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredPlans = plans.filter((plan) => {
    const matchesSearch =
      plan.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plan.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plan.owner.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept === 'all' || plan.department === selectedDept;
    const matchesStatus = selectedStatus === 'all' || plan.status === selectedStatus;
    return matchesSearch && matchesDept && matchesStatus;
  });

  const departments = ['PKD-PC', 'PKD-CV', 'PDV', 'PTC', 'PKH'];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Notion-style */}
      <div className="pt-6 pb-2 border-b border-[#E9E9E7] dark:border-[#2F2F2F]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-2xl">
              🎯
            </span>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-[#111827] dark:text-white">
                Quản trị Kế hoạch & Tiến độ Mục tiêu
              </h1>
              <p className="text-xs text-[#787774] dark:text-[#9B9A97] mt-0.5">
                Triển khai, tổng hợp, theo dõi, đánh giá kết quả thực hiện và tham mưu giải pháp nâng cao tỷ lệ hoàn thành.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenCreatePlan}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#004B87] hover:bg-[#003A69] dark:bg-blue-600 dark:hover:bg-blue-500 shadow-xs transition-colors self-start sm:self-auto"
          >
            <Plus className="w-3.5 h-3.5" /> Thêm chỉ tiêu kế hoạch
          </button>
        </div>

        {/* View Switcher Tabs & Filters */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center bg-[#EFEFEF] dark:bg-[#252525] p-1 rounded-lg border border-[#E0E0DE] dark:border-[#333]">
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-all ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-[#303030] text-gray-900 dark:text-white shadow-2xs'
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <Table className="w-3.5 h-3.5" /> Bảng chi tiết
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-all ${
                viewMode === 'kanban'
                  ? 'bg-white dark:bg-[#303030] text-gray-900 dark:text-white shadow-2xs'
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <Kanban className="w-3.5 h-3.5" /> Bảng Kanban
            </button>
          </div>

          {/* Search & Filter pills */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Lọc mã hoặc tên chỉ tiêu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-lg text-xs bg-white dark:bg-[#252525] border border-gray-200 dark:border-[#383838] focus:outline-none focus:ring-1 focus:ring-blue-500 w-48 sm:w-56"
              />
            </div>

            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg text-xs bg-white dark:bg-[#252525] border border-gray-200 dark:border-[#383838] text-gray-700 dark:text-gray-300 outline-none"
            >
              <option value="all">Tất cả phòng ban</option>
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg text-xs bg-white dark:bg-[#252525] border border-gray-200 dark:border-[#383838] text-gray-700 dark:text-gray-300 outline-none"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="in_progress">Đang thực hiện</option>
              <option value="at_risk">Cần chú ý / Có rủi ro</option>
              <option value="completed">Đã hoàn thành</option>
            </select>
          </div>
        </div>
      </div>

      {/* VIEW RENDER: TABLE OR KANBAN */}
      {viewMode === 'table' ? (
        <div className="bg-white dark:bg-[#202020] rounded-xl border border-[#E9E9E7] dark:border-[#2F2F2F] shadow-2xs overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50/80 dark:bg-[#252525] border-b border-[#E9E9E7] dark:border-[#2F2F2F] text-[#787774] dark:text-[#9B9A97] font-semibold">
                <th className="py-3 px-4 w-28">Mã số</th>
                <th className="py-3 px-4 min-w-[240px]">Tên chỉ tiêu / Mục tiêu</th>
                <th className="py-3 px-4 w-24">Phòng ban</th>
                <th className="py-3 px-4 w-28">Kỳ báo cáo</th>
                <th className="py-3 px-4 w-32 text-right">Kế hoạch / Thực đạt</th>
                <th className="py-3 px-4 w-36">Tiến độ (%)</th>
                <th className="py-3 px-4 w-28">Trạng thái</th>
                <th className="py-3 px-4 min-w-[200px]">Tham mưu giải pháp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E9E9E7] dark:divide-[#2F2F2F]">
              {filteredPlans.map((plan) => (
                <tr
                  key={plan.id}
                  onClick={() => onSelectPlan(plan)}
                  className="hover:bg-blue-50/40 dark:hover:bg-[#282828] cursor-pointer transition-colors group"
                >
                  <td className="py-3 px-4 font-mono font-medium text-gray-700 dark:text-gray-300">
                    {plan.code}
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-900 dark:text-gray-100">
                    <div className="line-clamp-2">{plan.title}</div>
                    <div className="text-[11px] text-gray-400 mt-0.5">Phụ trách: {plan.owner}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                      {plan.department}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{plan.period}</td>
                  <td className="py-3 px-4 text-right font-mono text-gray-900 dark:text-gray-100">
                    <strong>{plan.actualValue}</strong> / {plan.targetValue} {plan.unit}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-1.5 rounded-full ${
                            plan.status === 'completed'
                              ? 'bg-emerald-500'
                              : plan.status === 'at_risk'
                              ? 'bg-rose-500'
                              : 'bg-blue-600'
                          }`}
                          style={{ width: `${Math.min(plan.progressPct, 100)}%` }}
                        />
                      </div>
                      <span className="font-semibold text-[11px] text-gray-700 dark:text-gray-300 w-10 text-right">
                        {plan.progressPct}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        plan.status === 'completed'
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                          : plan.status === 'at_risk'
                          ? 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                          : 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                      }`}
                    >
                      {plan.status === 'completed'
                        ? 'Hoàn thành'
                        : plan.status === 'at_risk'
                        ? 'Có rủi ro'
                        : 'Đang làm'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                    <div className="line-clamp-2 text-[11px] italic">
                      "{plan.advisoryNote}"
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* KANBAN BOARD VIEW */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Column 1: Đang thực hiện */}
          <div className="p-3 bg-gray-50 dark:bg-[#232323] rounded-xl border border-gray-200 dark:border-[#333] space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-gray-200 dark:border-[#333]">
              <span className="text-xs font-bold text-blue-700 dark:text-blue-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> ĐANG THỰC HIỆN (
                {filteredPlans.filter((p) => p.status === 'in_progress').length})
              </span>
            </div>
            <div className="space-y-2.5">
              {filteredPlans
                .filter((p) => p.status === 'in_progress')
                .map((plan) => (
                  <div
                    key={plan.id}
                    onClick={() => onSelectPlan(plan)}
                    className="p-3 bg-white dark:bg-[#2C2C2C] rounded-lg border border-gray-200 dark:border-[#3E3E3E] shadow-2xs hover:border-blue-400 cursor-pointer space-y-2 transition-all"
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-mono text-gray-500">{plan.code}</span>
                      <span className="font-semibold text-blue-600">{plan.progressPct}%</span>
                    </div>
                    <h4 className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                      {plan.title}
                    </h4>
                    <p className="text-[11px] text-gray-500">Bộ phận: {plan.department}</p>
                    <div className="pt-2 border-t border-gray-100 dark:border-[#383838] flex items-center justify-between text-[10px] text-gray-400">
                      <span>Hạn: {plan.deadline}</span>
                      <span className="text-blue-500 font-medium">Chi tiết &rarr;</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Column 2: Có rủi ro / Cần chú ý */}
          <div className="p-3 bg-rose-50/50 dark:bg-[#2D1F21] rounded-xl border border-rose-200 dark:border-[#4E2729] space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-rose-200 dark:border-[#4E2729]">
              <span className="text-xs font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" /> CẦN CHÚ Ý / CÓ RỦI RO (
                {filteredPlans.filter((p) => p.status === 'at_risk').length})
              </span>
            </div>
            <div className="space-y-2.5">
              {filteredPlans
                .filter((p) => p.status === 'at_risk')
                .map((plan) => (
                  <div
                    key={plan.id}
                    onClick={() => onSelectPlan(plan)}
                    className="p-3 bg-white dark:bg-[#2C2C2C] rounded-lg border border-rose-200 dark:border-[#4E2729] shadow-2xs hover:border-rose-400 cursor-pointer space-y-2 transition-all"
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-mono text-gray-500">{plan.code}</span>
                      <span className="font-semibold text-rose-600">{plan.progressPct}%</span>
                    </div>
                    <h4 className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                      {plan.title}
                    </h4>
                    <div className="p-2 rounded bg-rose-50 dark:bg-rose-950 text-[11px] text-rose-800 dark:text-rose-300 italic">
                      Tham mưu: {plan.advisoryNote}
                    </div>
                    <div className="pt-2 border-t border-gray-100 dark:border-[#383838] flex items-center justify-between text-[10px] text-gray-400">
                      <span>Hạn: {plan.deadline}</span>
                      <span className="text-rose-500 font-medium">Đề xuất &rarr;</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Column 3: Đã hoàn thành */}
          <div className="p-3 bg-emerald-50/40 dark:bg-[#1E2B23] rounded-xl border border-emerald-200 dark:border-[#274833] space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-emerald-200 dark:border-[#274833]">
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> ĐÃ HOÀN THÀNH (
                {filteredPlans.filter((p) => p.status === 'completed').length})
              </span>
            </div>
            <div className="space-y-2.5">
              {filteredPlans
                .filter((p) => p.status === 'completed')
                .map((plan) => (
                  <div
                    key={plan.id}
                    onClick={() => onSelectPlan(plan)}
                    className="p-3 bg-white dark:bg-[#2C2C2C] rounded-lg border border-emerald-200 dark:border-[#274833] shadow-2xs hover:border-emerald-400 cursor-pointer space-y-2 transition-all"
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-mono text-gray-500">{plan.code}</span>
                      <span className="font-semibold text-emerald-600">100%</span>
                    </div>
                    <h4 className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                      {plan.title}
                    </h4>
                    <p className="text-[11px] text-gray-500">Bộ phận: {plan.department}</p>
                    <div className="pt-2 border-t border-gray-100 dark:border-[#383838] flex items-center justify-between text-[10px] text-gray-400">
                      <span>Đạt: {plan.actualValue} {plan.unit}</span>
                      <span className="text-emerald-500 font-medium">Chi tiết &rarr;</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
