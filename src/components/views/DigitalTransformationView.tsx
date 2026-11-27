import React from 'react';
import {
  Plus
} from 'lucide-react';
import { DigitalInitiative } from '../../types';
import { AppIcon } from '../AppIcon';

interface DigitalTransformationViewProps {
  initiatives: DigitalInitiative[];
  onOpenCreateModal: () => void;
}

export const DigitalTransformationView: React.FC<DigitalTransformationViewProps> = ({
  initiatives,
  onOpenCreateModal
}) => {
  const getStageBadge = (status: DigitalInitiative['status']) => {
    switch (status) {
      case 'khao_sat':
        return { text: 'Khảo sát & Thiết kế', color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200' };
      case 'trien_khai':
        return { text: 'Đang triển khai', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200' };
      case 'pilot':
        return { text: 'Thử nghiệm (Pilot)', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200' };
      case 'hoan_thanh':
        return { text: 'Đã hoàn thành & Nhân rộng', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200' };
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Notion-style */}
      <div className="pt-6 pb-2 border-b border-[#E9E9E7] dark:border-[#2F2F2F]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-2xl bg-cyan-50/80 dark:bg-cyan-950/40 border border-cyan-100 dark:border-cyan-900/50 shadow-2xs">
              <AppIcon name="cloud_upload" className="w-8 h-8" alt="Chuyển đổi số" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-[#111827] dark:text-white">
                Chuyển đổi số & Sáng kiến Cải tiến Vận hành
              </h1>
              <p className="text-xs text-[#787774] dark:text-[#9B9A97] mt-0.5">
                Đầu mối tham gia triển khai công tác chuyển đổi số tại THACO AUTO Nghệ An, tối ưu năng suất làm việc và hiện đại hóa quản trị.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenCreateModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#004B87] hover:bg-[#003A69] dark:bg-blue-600 dark:hover:bg-blue-500 shadow-xs transition-colors self-start sm:self-auto"
          >
            <Plus className="w-3.5 h-3.5" /> Đề xuất sáng kiến mới
          </button>
        </div>
      </div>

      {/* Strategic Vision Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-900/10 via-blue-900/10 to-indigo-900/10 dark:from-cyan-950/40 dark:via-blue-950/40 dark:to-indigo-950/40 border border-cyan-200 dark:border-cyan-900/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <AppIcon name="idea_bulb" className="w-5 h-5" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-900 dark:text-cyan-300">
              Chiến lược Số hóa THACO AUTO Nghệ An (DX 2026)
            </h3>
          </div>
          <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl">
            Tập trung vào 3 trọng tâm: (1) Số hóa bảng điều hành KPI Realtime thay thế báo cáo excel truyền thống; (2) Hệ thống hóa thư viện quy trình tác nghiệp trực tuyến; (3) Tự động hóa công tác chấm điểm tuân thủ 5S & An toàn lao động trên thiết bị di động.
          </p>
        </div>

        <div className="flex items-center gap-6 text-center self-start md:self-center">
          <div>
            <span className="text-2xl font-bold text-cyan-700 dark:text-cyan-400">3/3</span>
            <p className="text-[10px] text-gray-500">Đề án đang chạy</p>
          </div>
          <div className="h-8 w-px bg-gray-300 dark:bg-gray-700" />
          <div>
            <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">~60%</span>
            <p className="text-[10px] text-gray-500">Tiến độ tổng thể</p>
          </div>
        </div>
      </div>

      {/* INITIATIVES LIST */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {initiatives.map((item) => {
          const stage = getStageBadge(item.status);
          return (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-white dark:bg-[#202020] border border-[#E9E9E7] dark:border-[#2F2F2F] shadow-2xs hover:border-cyan-400 dark:hover:border-cyan-600 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-cyan-100 dark:bg-cyan-900/40 text-cyan-800 dark:text-cyan-300 font-semibold">
                    {item.code}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${stage.color}`}>
                    {stage.text}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-snug">
                  {item.name}
                </h3>

                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  {item.benefits}
                </p>

                {/* Progress bar */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500 text-[11px]">Tiến độ thực hiện</span>
                    <span className="font-bold text-cyan-600 dark:text-cyan-400">{item.progressPct}%</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-cyan-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${item.progressPct}%` }}
                    />
                  </div>
                </div>

                {/* Impact Metrics */}
                <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#282828] border border-gray-200 dark:border-[#383838] space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    Hiệu quả định lượng (ROI / Tiết kiệm):
                  </p>
                  <div className="space-y-1">
                    {item.metrics.map((m, idx) => (
                      <div key={idx} className="flex justify-between text-xs">
                        <span className="text-gray-600 dark:text-gray-400">{m.label}:</span>
                        <strong className="text-emerald-600 dark:text-emerald-400">{m.val}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-gray-100 dark:border-[#2C2C2C] flex items-center justify-between text-[11px] text-gray-400">
                <span>Phụ trách: {item.champion}</span>
                <span className="text-cyan-600 dark:text-cyan-400 font-medium flex items-center gap-0.5">
                  Mục tiêu: {item.targetDate}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
