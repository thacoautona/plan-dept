import React from 'react';
import {
  Calendar,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { PlanGoal, GovernanceDoc, DigitalInitiative } from '../../types';
import { ActiveTab } from '../Sidebar';
import { AppIcon } from '../AppIcon';

// Department color map
const DEPT_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  KDDL: { bg: '#FFC5C5', text: '#801A1A', border: '#FCA5A5' },
  KDTB: { bg: '#FFC5C5', text: '#801A1A', border: '#FCA5A5' },
  DVD: { bg: '#BFBFBF', text: '#2D3748', border: '#A0AEC0' },
  DVTB: { bg: '#BFBFBF', text: '#2D3748', border: '#A0AEC0' },
  QSD: { bg: '#BFBFBF', text: '#2D3748', border: '#A0AEC0' },
  TCKT: { bg: '#FFFCD5', text: '#744210', border: '#F6E05E' },
  HCNS: { bg: '#FFFCD5', text: '#744210', border: '#F6E05E' },
  NVKH: { bg: '#FFFCD5', text: '#744210', border: '#F6E05E' },
  MKT: { bg: '#FFFCD5', text: '#744210', border: '#F6E05E' },
  NVCN: { bg: '#E1FFFF', text: '#234E52', border: '#81E6D9' },
  VPDH: { bg: '#DBEAFE', text: '#1E40AF', border: '#93C5FD' },
};

interface DashboardViewProps {
  plans: PlanGoal[];
  docs: GovernanceDoc[];
  digitalList: DigitalInitiative[];
  onNavigateTab: (tab: ActiveTab) => void;
  onSelectPlan: (plan: PlanGoal) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  plans,
  docs,
  digitalList,
  onNavigateTab,
  onSelectPlan
}) => {
  // Aggregate KPIs
  const totalWeight = plans.reduce((acc, p) => acc + p.weight, 0);
  const weightedProgress = plans.reduce((acc, p) => acc + (p.progressPct * p.weight), 0) / (totalWeight || 1);
  const atRiskPlans = plans.filter((p) => p.status === 'at_risk');
  const completedPlans = plans.filter((p) => p.status === 'completed');

  const vpdhDocs = docs.filter((d) => d.sourceLevel === 'VPDH');
  const noiBoDocs = docs.filter((d) => d.sourceLevel === 'NOI_BO');

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
            <p className="text-xs text-[#787774] dark:text-[#9B9A97] mt-0.5 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" /> Kỳ đánh giá: <strong className="text-gray-700 dark:text-gray-300">Tháng 11/2026</strong> • Đơn vị: <strong className="text-[#004B87] dark:text-blue-400">THACO AUTO Nghệ An</strong>
            </p>
          </div>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-4 rounded-xl bg-white dark:bg-[#202020] border border-[#E9E9E7] dark:border-[#2F2F2F] shadow-2xs hover:border-gray-300 dark:hover:border-gray-700 transition-all">
          <div className="flex items-center justify-between text-xs text-[#787774] dark:text-[#9B9A97]">
            <span>Tỷ lệ hoàn thành mục tiêu</span>
            <div className="p-1 rounded-md bg-blue-50 dark:bg-blue-900/30">
              <AppIcon name="growth_chart" className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#111827] dark:text-white">
              {weightedProgress.toFixed(1)}%
            </span>
            <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center">
              +4.2% so với tuần trước
            </span>
          </div>
          <div className="mt-2.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-[#004B87] dark:bg-blue-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(weightedProgress, 100)}%` }}
            />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-4 rounded-xl bg-white dark:bg-[#202020] border border-[#E9E9E7] dark:border-[#2F2F2F] shadow-2xs hover:border-gray-300 dark:hover:border-gray-700 transition-all">
          <div className="flex items-center justify-between text-xs text-[#787774] dark:text-[#9B9A97]">
            <span>Mục tiêu đang giám sát</span>
            <div className="p-1 rounded-md bg-amber-50 dark:bg-amber-900/30">
              <AppIcon name="target_goal" className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#111827] dark:text-white">
              {plans.length}
            </span>
            <span className="text-[11px] font-medium text-amber-600 dark:text-amber-400">
              {atRiskPlans.length} mục tiêu cần chú ý
            </span>
          </div>
          <p className="mt-2.5 text-[11px] text-[#787774] dark:text-[#9B9A97]">
            Đã hoàn thành: <strong className="text-emerald-600">{completedPlans.length}</strong> / {plans.length}
          </p>
        </div>

        {/* Metric 3: VPĐH */}
        <div
          onClick={() => onNavigateTab('governance')}
          className="p-4 rounded-xl bg-white dark:bg-[#202020] border border-[#E9E9E7] dark:border-[#2F2F2F] shadow-2xs hover:border-blue-300 dark:hover:border-blue-700 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-[#787774] dark:text-[#9B9A97]">
            <span>VBQT Văn phòng Điều hành</span>
            <div className="p-1 rounded-md bg-blue-50 dark:bg-blue-900/30">
              <AppIcon name="binder_archive" className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#004B87] dark:text-blue-400">
              {vpdhDocs.length}
            </span>
            <span className="text-[11px] text-[#787774] dark:text-[#9B9A97]">
              văn bản khung ban hành
            </span>
          </div>
          <p className="mt-2.5 text-[11px] text-blue-600 dark:text-blue-400 font-medium group-hover:underline flex items-center gap-1">
            Quy định, Quy chế & Hướng dẫn Khung <ChevronRight className="w-3 h-3" />
          </p>
        </div>

        {/* Metric 4: THACO AUTO Nghệ An */}
        <div
          onClick={() => onNavigateTab('governance')}
          className="p-4 rounded-xl bg-white dark:bg-[#202020] border border-[#E9E9E7] dark:border-[#2F2F2F] shadow-2xs hover:border-emerald-300 dark:hover:border-emerald-700 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-[#787774] dark:text-[#9B9A97]">
            <span>VBQT THACO AUTO Nghệ An</span>
            <div className="p-1 rounded-md bg-emerald-50 dark:bg-emerald-900/30">
              <AppIcon name="compliance_shield" className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
              {noiBoDocs.length}
            </span>
            <span className="text-[11px] text-[#787774] dark:text-[#9B9A97]">
              văn bản nội bộ áp dụng
            </span>
          </div>
          <p className="mt-2.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium group-hover:underline flex items-center gap-1">
            10 bộ phận nghiệp vụ địa phương <ChevronRight className="w-3 h-3" />
          </p>
        </div>
      </div>

      {/* STRATEGIC ADVISORY SECTION (Tham mưu chủ động của Trợ lý Kế hoạch) */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50/70 via-white to-amber-50/50 dark:from-[#1E2633] dark:via-[#1E1E1E] dark:to-[#2B2317] border border-blue-100 dark:border-blue-900/40 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <AppIcon name="strategy_knight" className="w-5 h-5" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#004B87] dark:text-blue-300">
              Trọng tâm Tham mưu Ban Giám Đốc THACO AUTO Nghệ An
            </h2>
          </div>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-[#004B87] dark:text-blue-300 font-medium">
            3 Đề xuất hành động
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          <div className="p-3.5 rounded-xl bg-white/90 dark:bg-[#252525]/90 border border-gray-200/80 dark:border-[#383838] shadow-2xs">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-rose-600 dark:text-rose-400">1. Cứu cánh chỉ tiêu Xe Du lịch</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 rounded font-mono">
                Cấp thiết
              </span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
              Doanh số xe PC hiện đạt 102/120 xe (85%). Tham mưu chỉ đạo đội kinh doanh dồn lực chốt cọc 25 khách hàng hot tại TP. Vinh, Diễn Châu trước 28/11 và làm việc với ngân hàng để giải ngân đúng hạn.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white/90 dark:bg-[#252525]/90 border border-gray-200/80 dark:border-[#383838] shadow-2xs">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-amber-600 dark:text-amber-400">2. Rà soát & Chuẩn hóa Quy trình</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 rounded font-mono">
                Tuân thủ
              </span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
              Hệ thống đã cập nhật đầy đủ {docs.length} văn bản (72 VBQT Khung từ VPĐH và 151 văn bản nội bộ từ 10 bộ phận). Đề xuất Ban Giám Đốc chỉ đạo các Trưởng phòng kiểm tra áp dụng đúng biểu mẫu và báo cáo đúng thời hạn.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white/90 dark:bg-[#252525]/90 border border-gray-200/80 dark:border-[#383838] shadow-2xs">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">3. Đẩy mạnh Số hóa Zalo ZNS</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded font-mono">
                Chuyển đổi số
              </span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
              Tỷ lệ khách hàng quay lại bảo dưỡng đạt 78% (chưa đạt mốc 82%). Đề xuất nghiệm thu giai đoạn 1 giải pháp gửi tin Zalo thông báo kỳ bảo dưỡng tự động cho 1.200 chủ xe tại Nghệ An.
            </p>
          </div>
        </div>
      </div>

      {/* DETAILED PLANNING OVERVIEW LIST */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-[#111827] dark:text-white flex items-center gap-2">
            <AppIcon name="data_analytics" className="w-5 h-5" />
            Tiến độ Mục tiêu Trọng điểm (Tháng 11/2026)
          </h2>
          <button
            onClick={() => onNavigateTab('planning')}
            className="text-xs font-medium text-[#004B87] dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            Xem tất cả mục tiêu <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="bg-white dark:bg-[#202020] rounded-xl border border-[#E9E9E7] dark:border-[#2F2F2F] overflow-hidden shadow-2xs">
          <div className="divide-y divide-[#E9E9E7] dark:divide-[#2F2F2F]">
            {plans.slice(0, 4).map((plan) => (
              <div
                key={plan.id}
                onClick={() => onSelectPlan(plan)}
                className="p-3.5 sm:px-4 hover:bg-gray-50/80 dark:hover:bg-[#262626] cursor-pointer transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <span className="font-mono text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded flex-shrink-0 mt-0.5">
                    {plan.code}
                  </span>
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">
                      {plan.title}
                    </h3>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                      Đơn vị: <strong>{plan.department}</strong> • Phụ trách: {plan.owner}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-center flex-shrink-0">
                  <div className="text-right">
                    <span className="text-xs font-semibold text-gray-900 dark:text-white">
                      {plan.actualValue} / {plan.targetValue} {plan.unit}
                    </span>
                    <div className="w-24 bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 mt-1 overflow-hidden">
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
                  </div>

                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                      plan.status === 'completed'
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        : plan.status === 'at_risk'
                        ? 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                        : 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                    }`}
                  >
                    {plan.progressPct}%
                  </span>
                </div>
              </div>
            ))}
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
            {docs.slice(0, 4).map((item) => {
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

        {/* Digital Initiatives */}
        <div className="p-4 rounded-xl bg-white dark:bg-[#202020] border border-[#E9E9E7] dark:border-[#2F2F2F] shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <AppIcon name="idea_bulb" className="w-4 h-4" />
              Chuyển đổi số & Tự động hóa tại THACO AUTO Nghệ An
            </h3>
            <button
              onClick={() => onNavigateTab('digital')}
              className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline"
            >
              Chi tiết
            </button>
          </div>
          <div className="space-y-2.5">
            {digitalList.map((project) => (
              <div
                key={project.id}
                className="p-2.5 rounded-lg bg-gray-50 dark:bg-[#282828] border border-gray-200 dark:border-[#383838] text-xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    {project.name}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-medium">
                    {project.progressPct}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 overflow-hidden">
                  <div
                    className="bg-blue-600 h-1 rounded-full"
                    style={{ width: `${project.progressPct}%` }}
                  />
                </div>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  {project.benefits}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
