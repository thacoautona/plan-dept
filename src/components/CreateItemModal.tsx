import React, { useState } from 'react';
import { X, Target, FileText, Plus, Check } from 'lucide-react';
import { PlanGoal, GovernanceDoc } from '../types';

interface CreateItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPlan: (plan: PlanGoal) => void;
  onAddDoc: (doc: GovernanceDoc) => void;
}

export const CreateItemModal: React.FC<CreateItemModalProps> = ({
  isOpen,
  onClose,
  onAddPlan,
  onAddDoc
}) => {
  if (!isOpen) return null;

  const [activeType, setActiveType] = useState<'plan' | 'doc'>('plan');

  // Plan State
  const [planCode, setPlanCode] = useState(`KH-${Math.floor(100 + Math.random() * 900)}`);
  const [planTitle, setPlanTitle] = useState('');
  const [planDept, setPlanDept] = useState('PKD-PC');
  const [planOwner, setPlanOwner] = useState('Trưởng bộ phận');
  const [planTarget, setPlanTarget] = useState(100);
  const [planUnit, setPlanUnit] = useState('chỉ tiêu');
  const [planDeadline, setPlanDeadline] = useState('2026-12-31');
  const [planAdvisory, setPlanAdvisory] = useState('');

  // Doc State
  const [docCode, setDocCode] = useState(`QT-${Math.floor(10 + Math.random() * 90)}/2026`);
  const [docTitle, setDocTitle] = useState('');
  const [docCategory, setDocCategory] = useState<'quy_che' | 'quy_dinh' | 'quy_trinh' | 'huong_dan' | 'bieu_mau'>('quy_trinh');
  const [docDept, setDocDept] = useState('PKH');
  const [docScope, setDocScope] = useState('Toàn đơn vị');
  const [docSummary, setDocSummary] = useState('');

  const handleSubmitPlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!planTitle.trim()) return;

    const newPlan: PlanGoal = {
      id: `goal-${Date.now()}`,
      code: planCode,
      title: planTitle.trim(),
      department: planDept,
      owner: planOwner,
      period: 'Tháng 12/2026',
      targetValue: Number(planTarget),
      actualValue: 0,
      unit: planUnit,
      weight: 15,
      progressPct: 0,
      status: 'in_progress',
      priority: 'high',
      deadline: planDeadline,
      advisoryNote: planAdvisory || 'Chưa có ý kiến tham mưu bổ sung.',
      lastUpdated: new Date().toISOString().split('T')[0],
      actionItems: []
    };

    onAddPlan(newPlan);
    onClose();
  };

  const handleSubmitDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docTitle.trim()) return;

    const newDoc: GovernanceDoc = {
      id: `doc-${Date.now()}`,
      stt: Date.now(),
      code: docCode,
      title: docTitle.trim(),
      category: docCategory,
      categoryLabel: docCategory === 'quy_dinh' ? 'Quy định' : docCategory === 'quy_trinh' ? 'Quy trình' : 'Thông báo',
      sourceLevel: 'NOI_BO',
      sourceLabel: 'THACO AUTO Nghệ An',
      department: docDept,
      departmentName: docDept,
      approvedBy: 'TGĐ Cty',
      effectiveDate: new Date().toISOString().split('T')[0],
      summary: docSummary || 'Văn bản quy định tác nghiệp nội bộ.',
      driveLink: ''
    };

    onAddDoc(newDoc);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#202020] rounded-2xl shadow-2xl border border-gray-200 dark:border-[#333] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-[#333]">
          <h2 className="text-sm font-bold text-gray-900 dark:text-white">
            Thêm mới Dữ liệu Quản trị
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Type Switcher */}
        <div className="flex p-2 bg-gray-50 dark:bg-[#252525] border-b border-gray-200 dark:border-[#333] text-xs">
          <button
            type="button"
            onClick={() => setActiveType('plan')}
            className={`flex-1 py-1.5 rounded-lg font-medium flex items-center justify-center gap-1.5 transition-all ${
              activeType === 'plan'
                ? 'bg-white dark:bg-[#333] text-blue-700 dark:text-blue-300 shadow-2xs font-bold'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <Target className="w-3.5 h-3.5" /> Chỉ tiêu Kế hoạch mới
          </button>
          <button
            type="button"
            onClick={() => setActiveType('doc')}
            className={`flex-1 py-1.5 rounded-lg font-medium flex items-center justify-center gap-1.5 transition-all ${
              activeType === 'doc'
                ? 'bg-white dark:bg-[#333] text-emerald-700 dark:text-emerald-300 shadow-2xs font-bold'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5" /> Văn bản / Quy trình mới
          </button>
        </div>

        {/* Content Form */}
        {activeType === 'plan' ? (
          <form onSubmit={handleSubmitPlan} className="p-5 space-y-3.5 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-medium text-gray-700 dark:text-gray-300">Mã chỉ tiêu</label>
                <input
                  type="text"
                  value={planCode}
                  onChange={(e) => setPlanCode(e.target.value)}
                  className="w-full mt-1 px-3 py-1.5 bg-gray-50 dark:bg-[#282828] border border-gray-200 dark:border-[#383838] rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="font-medium text-gray-700 dark:text-gray-300">Phòng ban</label>
                <select
                  value={planDept}
                  onChange={(e) => setPlanDept(e.target.value)}
                  className="w-full mt-1 px-3 py-1.5 bg-gray-50 dark:bg-[#282828] border border-gray-200 dark:border-[#383838] rounded-lg"
                >
                  <option value="PKD-PC">PKD-PC (Xe Du lịch)</option>
                  <option value="PKD-CV">PKD-CV (Xe Thương mại)</option>
                  <option value="PDV">PDV (Dịch vụ Phụ tùng)</option>
                  <option value="PTC">PTC (Tài chính Kế toán)</option>
                  <option value="PKH">PKH (Kế hoạch Quản trị)</option>
                  <option value="PNV">PNV (Nhân sự Hành chính)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-medium text-gray-700 dark:text-gray-300">Tên mục tiêu / Chỉ tiêu kế hoạch</label>
              <input
                type="text"
                placeholder="VD: Doanh thu bán phụ tùng chính hãng Tháng 12/2026"
                value={planTitle}
                onChange={(e) => setPlanTitle(e.target.value)}
                className="w-full mt-1 px-3 py-1.5 bg-gray-50 dark:bg-[#282828] border border-gray-200 dark:border-[#383838] rounded-lg"
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="font-medium text-gray-700 dark:text-gray-300">Mục tiêu (Số)</label>
                <input
                  type="number"
                  value={planTarget}
                  onChange={(e) => setPlanTarget(Number(e.target.value))}
                  className="w-full mt-1 px-3 py-1.5 bg-gray-50 dark:bg-[#282828] border border-gray-200 dark:border-[#383838] rounded-lg"
                />
              </div>
              <div>
                <label className="font-medium text-gray-700 dark:text-gray-300">Đơn vị tính</label>
                <input
                  type="text"
                  value={planUnit}
                  onChange={(e) => setPlanUnit(e.target.value)}
                  className="w-full mt-1 px-3 py-1.5 bg-gray-50 dark:bg-[#282828] border border-gray-200 dark:border-[#383838] rounded-lg"
                />
              </div>
              <div>
                <label className="font-medium text-gray-700 dark:text-gray-300">Hạn chót</label>
                <input
                  type="date"
                  value={planDeadline}
                  onChange={(e) => setPlanDeadline(e.target.value)}
                  className="w-full mt-1 px-3 py-1.5 bg-gray-50 dark:bg-[#282828] border border-gray-200 dark:border-[#383838] rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="font-medium text-gray-700 dark:text-gray-300">Ý kiến Tham mưu khởi tạo của Trợ lý Kế hoạch</label>
              <textarea
                rows={2}
                placeholder="Gợi ý biện pháp nâng cao tỷ lệ hoàn thành..."
                value={planAdvisory}
                onChange={(e) => setPlanAdvisory(e.target.value)}
                className="w-full mt-1 p-2 bg-gray-50 dark:bg-[#282828] border border-gray-200 dark:border-[#383838] rounded-lg"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 text-gray-500 hover:bg-gray-100 rounded-lg"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-[#004B87] hover:bg-[#003A69] text-white font-semibold rounded-lg shadow-xs"
              >
                Tạo mục tiêu
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmitDoc} className="p-5 space-y-3.5 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-medium text-gray-700 dark:text-gray-300">Mã hiệu văn bản</label>
                <input
                  type="text"
                  value={docCode}
                  onChange={(e) => setDocCode(e.target.value)}
                  className="w-full mt-1 px-3 py-1.5 bg-gray-50 dark:bg-[#282828] border border-gray-200 dark:border-[#383838] rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="font-medium text-gray-700 dark:text-gray-300">Loại tài liệu</label>
                <select
                  value={docCategory}
                  onChange={(e) => setDocCategory(e.target.value as any)}
                  className="w-full mt-1 px-3 py-1.5 bg-gray-50 dark:bg-[#282828] border border-gray-200 dark:border-[#383838] rounded-lg"
                >
                  <option value="quy_trinh">Quy trình tác nghiệp (SOP)</option>
                  <option value="quy_dinh">Quy định</option>
                  <option value="quy_che">Quy chế</option>
                  <option value="huong_dan">Hướng dẫn</option>
                  <option value="bieu_mau">Biểu mẫu</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-medium text-gray-700 dark:text-gray-300">Tên văn bản quản trị</label>
              <input
                type="text"
                placeholder="VD: Quy trình tiếp nhận yêu cầu sơn sấy nhanh tại xưởng Dịch vụ"
                value={docTitle}
                onChange={(e) => setDocTitle(e.target.value)}
                className="w-full mt-1 px-3 py-1.5 bg-gray-50 dark:bg-[#282828] border border-gray-200 dark:border-[#383838] rounded-lg"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-medium text-gray-700 dark:text-gray-300">Đơn vị chủ trì</label>
                <input
                  type="text"
                  value={docDept}
                  onChange={(e) => setDocDept(e.target.value)}
                  className="w-full mt-1 px-3 py-1.5 bg-gray-50 dark:bg-[#282828] border border-gray-200 dark:border-[#383838] rounded-lg"
                />
              </div>
              <div>
                <label className="font-medium text-gray-700 dark:text-gray-300">Phạm vi áp dụng</label>
                <input
                  type="text"
                  value={docScope}
                  onChange={(e) => setDocScope(e.target.value)}
                  className="w-full mt-1 px-3 py-1.5 bg-gray-50 dark:bg-[#282828] border border-gray-200 dark:border-[#383838] rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="font-medium text-gray-700 dark:text-gray-300">Tóm tắt nội dung quy chuẩn</label>
              <textarea
                rows={2}
                placeholder="Mô tả tóm tắt mục đích và nội dung cốt lõi của quy trình..."
                value={docSummary}
                onChange={(e) => setDocSummary(e.target.value)}
                className="w-full mt-1 p-2 bg-gray-50 dark:bg-[#282828] border border-gray-200 dark:border-[#383838] rounded-lg"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 text-gray-500 hover:bg-gray-100 rounded-lg"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-xs"
              >
                Lưu văn bản
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
