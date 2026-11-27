import React, { useState } from 'react';
import {
  X,
  Target,
  Sparkles,
  CheckSquare,
  Square,
  Calendar,
  User,
  Building,
  Save,
  Plus
} from 'lucide-react';
import { PlanGoal, PlanStatus } from '../types';

interface PlanDetailModalProps {
  plan: PlanGoal | null;
  onClose: () => void;
  onSave: (updatedPlan: PlanGoal) => void;
}

export const PlanDetailModal: React.FC<PlanDetailModalProps> = ({
  plan,
  onClose,
  onSave
}) => {
  if (!plan) return null;

  const [formData, setFormData] = useState<PlanGoal>({ ...plan });
  const [newTaskText, setNewTaskText] = useState('');

  const handleStatusChange = (status: PlanStatus) => {
    setFormData({ ...formData, status });
  };

  const handleToggleAction = (actId: string) => {
    const updated = formData.actionItems.map((act) =>
      act.id === actId ? { ...act, isDone: !act.isDone } : act
    );
    setFormData({ ...formData, actionItems: updated });
  };

  const handleAddAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    const newItem = {
      id: `act-${Date.now()}`,
      task: newTaskText.trim(),
      assignee: 'Đầu mối phụ trách',
      isDone: false,
      dueDate: new Date().toISOString().split('T')[0]
    };
    setFormData({
      ...formData,
      actionItems: [...formData.actionItems, newItem]
    });
    setNewTaskText('');
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#202020] rounded-2xl shadow-2xl border border-gray-200 dark:border-[#333] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-[#333]">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 font-semibold">
              {formData.code}
            </span>
            <span className="text-xs text-gray-500">{formData.period}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#2A2A2A]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Title & Dept */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white leading-snug">
              {formData.title}
            </h2>
            <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-500">
              <span className="flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-gray-400" /> {formData.department}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-gray-400" /> {formData.owner}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-gray-400" /> Hạn chót: {formData.deadline}
              </span>
            </div>
          </div>

          {/* Progress Slider & Values */}
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#272727] border border-gray-200 dark:border-[#383838] space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-gray-700 dark:text-gray-200">
                Thực đạt: {formData.actualValue} / Chỉ tiêu: {formData.targetValue} {formData.unit}
              </span>
              <span className="text-blue-600 dark:text-blue-400">{formData.progressPct}%</span>
            </div>

            <input
              type="range"
              min="0"
              max="150"
              value={formData.progressPct}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  progressPct: Number(e.target.value),
                  actualValue: Math.round(((Number(e.target.value) * formData.targetValue) / 100) * 10) / 10
                })
              }
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />

            <div className="flex gap-2 pt-1">
              {(['in_progress', 'at_risk', 'completed'] as PlanStatus[]).map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => handleStatusChange(status)}
                  className={`text-xs px-3 py-1 rounded-md font-medium transition-all ${
                    formData.status === status
                      ? status === 'completed'
                        ? 'bg-emerald-600 text-white'
                        : status === 'at_risk'
                        ? 'bg-rose-600 text-white'
                        : 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-[#333] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
                  }`}
                >
                  {status === 'completed'
                    ? 'Hoàn thành'
                    : status === 'at_risk'
                    ? 'Có rủi ro / Cần chú ý'
                    : 'Đang thực hiện'}
                </button>
              ))}
            </div>
          </div>

          {/* STRATEGIC ADVISORY SECTION (Tham mưu của Trợ lý kế hoạch) */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Ý kiến Tham mưu & Đề xuất Giải pháp (Dành cho Lãnh đạo)
            </label>
            <textarea
              rows={3}
              value={formData.advisoryNote}
              onChange={(e) => setFormData({ ...formData, advisoryNote: e.target.value })}
              placeholder="Nhập khuyến nghị chiến lược, giải pháp khắc phục điểm nghẽn để tham mưu cho Ban Giám đốc..."
              className="w-full p-3 text-xs bg-amber-50/40 dark:bg-[#28241D] rounded-xl border border-amber-200 dark:border-[#4E4028] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          {/* Action Checklist */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wider flex items-center gap-1.5">
              <CheckSquare className="w-4 h-4 text-blue-500" />
              Checklist Hành động triển khai ({formData.actionItems.filter((a) => a.isDone).length}/
              {formData.actionItems.length})
            </h3>

            <div className="space-y-2">
              {formData.actionItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleToggleAction(item.id)}
                  className="flex items-start gap-2.5 p-2.5 rounded-lg bg-gray-50 dark:bg-[#282828] border border-gray-200 dark:border-[#383838] cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  {item.isDone ? (
                    <CheckSquare className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1 text-xs">
                    <p
                      className={`${
                        item.isDone ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-800 dark:text-gray-200 font-medium'
                      }`}
                    >
                      {item.task}
                    </p>
                    <span className="text-[10px] text-gray-400">
                      Phụ trách: {item.assignee} • Hạn: {item.dueDate}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick add action item */}
            <form onSubmit={handleAddAction} className="flex gap-2">
              <input
                type="text"
                placeholder="Thêm đầu việc hành động mới..."
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs bg-white dark:bg-[#282828] border border-gray-200 dark:border-[#383838] rounded-lg outline-none"
              />
              <button
                type="submit"
                className="px-3 py-1.5 text-xs font-medium bg-gray-200 dark:bg-[#383838] hover:bg-gray-300 rounded-lg flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Thêm việc
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2.5 p-4 border-t border-gray-200 dark:border-[#333] bg-gray-50 dark:bg-[#1C1C1C]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#2C2C2C] rounded-lg transition-colors"
          >
            Đóng
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#004B87] hover:bg-[#003A69] dark:bg-blue-600 dark:hover:bg-blue-500 rounded-lg shadow-xs transition-colors"
          >
            <Save className="w-3.5 h-3.5" /> Lưu cập nhật
          </button>
        </div>
      </div>
    </div>
  );
};
