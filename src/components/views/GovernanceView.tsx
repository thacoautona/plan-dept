import React, { useState, useMemo } from 'react';
import {
  Search,
  ExternalLink,
  Filter,
  FileText,
  Calendar,
  Building,
  UserCheck,
  Tag,
  Eye,
  CheckCircle2,
  X,
  FileSpreadsheet
} from 'lucide-react';
import { GovernanceDoc } from '../../types';
import { AppIcon } from '../AppIcon';

interface GovernanceViewProps {
  docs: GovernanceDoc[];
  onOpenCreateDoc: () => void;
}

// Department metadata & exact colors specified by user
export const DEPT_COLOR_MAP: Record<string, { bg: string; text: string; label: string; group: string }> = {
  KDDL: { bg: '#FFC5C5', text: '#881337', label: 'Kinh doanh xe du lịch', group: 'Xe mới' },
  KDTB: { bg: '#FFC5C5', text: '#881337', label: 'Kinh doanh xe Tải bus', group: 'Xe mới' },
  DVD: { bg: '#BFBFBF', text: '#1F2937', label: 'Dịch vụ phụ tùng du lịch', group: 'DV & Xe cũ' },
  DVTB: { bg: '#BFBFBF', text: '#1F2937', label: 'Dịch vụ phụ tùng tải bus', group: 'DV & Xe cũ' },
  QSD: { bg: '#BFBFBF', text: '#1F2937', label: 'Xe du lịch đã qua sử dụng', group: 'DV & Xe cũ' },
  TCKT: { bg: '#FFFCD5', text: '#78350F', label: 'Tài chính kế toán', group: 'Nghiệp vụ quản trị' },
  HCNS: { bg: '#FFFCD5', text: '#78350F', label: 'Nhân sự & Quản trị VP', group: 'Nghiệp vụ quản trị' },
  NVKH: { bg: '#FFFCD5', text: '#78350F', label: 'Kế hoạch', group: 'Nghiệp vụ quản trị' },
  MKT: { bg: '#FFFCD5', text: '#78350F', label: 'Marketing', group: 'Nghiệp vụ quản trị' },
  NVCN: { bg: '#E1FFFF', text: '#155E75', label: 'Tiêu chuẩn & Kho xe', group: 'Chất lượng & CSVC' },
  VPDH: { bg: '#DBEAFE', text: '#1E3A8A', label: 'Văn phòng Điều hành (VPĐH)', group: 'Tập đoàn' }
};

export const GovernanceView: React.FC<GovernanceViewProps> = ({
  docs
}) => {
  const [levelFilter, setLevelFilter] = useState<'ALL' | 'VPDH' | 'NOI_BO'>('ALL');
  const [selectedDept, setSelectedDept] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDocPreview, setSelectedDocPreview] = useState<GovernanceDoc | null>(null);

  // Departments list for filter
  const departmentsList = [
    { code: 'KDDL', name: 'KD xe du lịch' },
    { code: 'KDTB', name: 'KD xe Tải bus' },
    { code: 'DVD', name: 'Dịch vụ PT du lịch' },
    { code: 'DVTB', name: 'Dịch vụ PT tải bus' },
    { code: 'QSD', name: 'Xe đã qua sử dụng' },
    { code: 'TCKT', name: 'Tài chính kế toán' },
    { code: 'HCNS', name: 'Nhân sự & QTVP' },
    { code: 'NVKH', name: 'Kế hoạch' },
    { code: 'MKT', name: 'Marketing' },
    { code: 'NVCN', name: 'Tiêu chuẩn & Kho xe' }
  ];

  // Document types list
  const categoryList = [
    { id: 'ALL', label: 'Tất cả loại VB' },
    { id: 'quy_dinh', label: 'Quy định' },
    { id: 'quy_trinh', label: 'Quy trình / SOP' },
    { id: 'thong_bao', label: 'Thông báo' },
    { id: 'huong_dan', label: 'Hướng dẫn' },
    { id: 'quy_che', label: 'Quy chế' }
  ];

  // Filtered documents
  const filteredDocs = useMemo(() => {
    return docs.filter((doc) => {
      // Level filter
      if (levelFilter === 'VPDH' && doc.sourceLevel !== 'VPDH') return false;
      if (levelFilter === 'NOI_BO' && doc.sourceLevel !== 'NOI_BO') return false;

      // Department filter
      if (selectedDept !== 'ALL') {
        if (!doc.department.includes(selectedDept)) return false;
      }

      // Category filter
      if (selectedCategory !== 'ALL' && doc.category !== selectedCategory) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = doc.title.toLowerCase().includes(q);
        const matchesCode = doc.code.toLowerCase().includes(q);
        const matchesDept = doc.department.toLowerCase().includes(q);
        const matchesApprover = doc.approvedBy.toLowerCase().includes(q);
        const matchesSummary = doc.summary.toLowerCase().includes(q);
        if (!matchesTitle && !matchesCode && !matchesDept && !matchesApprover && !matchesSummary) {
          return false;
        }
      }

      return true;
    });
  }, [docs, levelFilter, selectedDept, selectedCategory, searchQuery]);

  // Statistics
  const vpdhCount = docs.filter((d) => d.sourceLevel === 'VPDH').length;
  const noiboCount = docs.filter((d) => d.sourceLevel === 'NOI_BO').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Notion-style Page Header */}
      <div className="pt-6 pb-2 border-b border-[#E9E9E7] dark:border-[#2F2F2F]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 shadow-2xs">
              <AppIcon name="folder_archive" className="w-8 h-8" alt="Quy trình Quy định" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-[#111827] dark:text-white">
                Hệ thống Quy trình Quy định
              </h1>
              <p className="text-xs text-[#787774] dark:text-[#9B9A97] mt-0.5">
                Tổng hợp các quy trình, quy định ban hành từ <strong>Văn phòng Điều hành (VPĐH)</strong> và <strong>THACO AUTO Nghệ An</strong>.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <a
              href="https://docs.google.com/spreadsheets/d/1cZS7XjR-FHrUcu_PBdlQtzh3BmKyRSqW01UuAhYN3Lw/edit?gid=1561956432#gid=1561956432"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-emerald-800 bg-emerald-50 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition-colors"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" /> Mở Google Sheets gốc
            </a>
          </div>
        </div>

        {/* Level Filter Tabs (Văn phòng Điều hành vs THACO AUTO Nghệ An) */}
        <div className="mt-6 flex flex-wrap items-center gap-2 border-b border-transparent">
          <button
            onClick={() => {
              setLevelFilter('ALL');
              setSelectedDept('ALL');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              levelFilter === 'ALL'
                ? 'bg-[#004B87] text-white shadow-2xs'
                : 'bg-gray-100 dark:bg-[#252525] text-gray-600 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            Tất cả văn bản ({docs.length})
          </button>

          <button
            onClick={() => {
              setLevelFilter('VPDH');
              setSelectedDept('ALL');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              levelFilter === 'VPDH'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 border border-blue-200 dark:border-blue-800'
            }`}
          >
            <Building className="w-3.5 h-3.5" /> Văn phòng Điều hành - VPĐH ({vpdhCount})
          </button>

          <button
            onClick={() => setLevelFilter('NOI_BO')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              levelFilter === 'NOI_BO'
                ? 'bg-rose-700 text-white shadow-2xs'
                : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 hover:bg-rose-100 border border-rose-200 dark:border-rose-800'
            }`}
          >
            <AppIcon name="operations_gear" className="w-3.5 h-3.5" /> THACO AUTO Nghệ An ({noiboCount})
          </button>
        </div>
      </div>

      {/* DEPARTMENT FILTERS (When in NOI_BO or ALL) with exact user tag colors */}
      {levelFilter !== 'VPDH' && (
        <div className="space-y-2 p-3.5 rounded-xl bg-gray-50/70 dark:bg-[#222] border border-gray-200/80 dark:border-[#333]">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-gray-500" /> Lọc theo Bộ phận ban hành nội bộ:
            </span>
            {selectedDept !== 'ALL' && (
              <button
                onClick={() => setSelectedDept('ALL')}
                className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline"
              >
                Xóa bộ lọc phòng ban
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setSelectedDept('ALL')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                selectedDept === 'ALL'
                  ? 'bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-900 shadow-2xs'
                  : 'bg-white dark:bg-[#2C2C2C] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-[#383838] hover:bg-gray-100'
              }`}
            >
              Tất cả bộ phận ({noiboCount})
            </button>

            {departmentsList.map((dept) => {
              const count = docs.filter(
                (d) => d.sourceLevel === 'NOI_BO' && d.department.includes(dept.code)
              ).length;
              const isSelected = selectedDept === dept.code;
              const meta = DEPT_COLOR_MAP[dept.code];

              return (
                <button
                  key={dept.code}
                  onClick={() => setSelectedDept(dept.code)}
                  style={{
                    backgroundColor: isSelected ? meta.bg : undefined,
                    color: isSelected ? meta.text : undefined,
                    borderColor: meta.bg
                  }}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all border flex items-center gap-1.5 ${
                    isSelected
                      ? 'shadow-xs ring-2 ring-gray-400 dark:ring-gray-500'
                      : 'bg-white dark:bg-[#272727] text-gray-700 dark:text-gray-300 hover:opacity-90'
                  }`}
                  title={`${meta.label} (${count} văn bản)`}
                >
                  <span
                    className="w-2 h-2 rounded-full inline-block"
                    style={{ backgroundColor: meta.bg === '#FFFCD5' ? '#D97706' : meta.text }}
                  />
                  <span>
                    {dept.code} - {dept.name}
                  </span>
                  <span className="text-[10px] opacity-75">({count})</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* SEARCH BAR & CATEGORY FILTER PILLS */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap gap-1.5">
          {categoryList.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 rounded-lg transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#004B87] text-white font-medium shadow-2xs'
                  : 'bg-gray-100 dark:bg-[#252525] text-gray-600 dark:text-gray-300 hover:bg-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm theo tên, số hiệu, nội dung..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg text-xs bg-white dark:bg-[#252525] border border-gray-200 dark:border-[#383838] focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-800 dark:text-gray-100"
          />
        </div>
      </div>

      {/* DOCUMENT LIST TABLE (NOTION STYLE) */}
      <div className="bg-white dark:bg-[#202020] rounded-xl border border-[#E9E9E7] dark:border-[#2F2F2F] shadow-2xs overflow-hidden">
        <div className="p-3 bg-gray-50/70 dark:bg-[#252525] border-b border-[#E9E9E7] dark:border-[#2F2F2F] flex items-center justify-between text-xs text-gray-500">
          <span>
            Hiển thị <strong>{filteredDocs.length}</strong> / {docs.length} văn bản quy chuẩn
          </span>
          <span className="text-[11px] italic text-gray-400">
            Click vào dòng để xem chi tiết &bull; Bấm "Mở văn bản" để đọc file trên Google Drive
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50/80 dark:bg-[#252525] border-b border-[#E9E9E7] dark:border-[#2F2F2F] text-[#787774] dark:text-[#9B9A97] font-semibold">
                <th className="py-3 px-3.5 w-12 text-center">STT</th>
                <th className="py-3 px-3.5 w-28">Số hiệu</th>
                <th className="py-3 px-4 min-w-[320px]">Tên văn bản & Tóm tắt nội dung</th>
                <th className="py-3 px-3.5 w-32">Bộ phận ban hành</th>
                <th className="py-3 px-3.5 w-28">Cấp ban hành</th>
                <th className="py-3 px-3.5 w-24">Ngày BH</th>
                <th className="py-3 px-3.5 w-28 text-center">Tài liệu gốc</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E9E9E7] dark:divide-[#2F2F2F]">
              {filteredDocs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400">
                    Không tìm thấy văn bản phù hợp với tiêu chí lọc.
                  </td>
                </tr>
              ) : (
                filteredDocs.map((doc, idx) => {
                  // Determine department badge colors
                  const primaryDept = doc.department.split(',')[0].trim();
                  const deptMeta = DEPT_COLOR_MAP[primaryDept] || {
                    bg: '#E5E7EB',
                    text: '#374151',
                    label: doc.departmentName
                  };

                  return (
                    <tr
                      key={doc.id}
                      onClick={() => setSelectedDocPreview(doc)}
                      className="hover:bg-blue-50/30 dark:hover:bg-[#282828] cursor-pointer transition-colors group"
                    >
                      {/* STT */}
                      <td className="py-3 px-3.5 text-center font-mono text-gray-400 text-[11px]">
                        {idx + 1}
                      </td>

                      {/* Code */}
                      <td className="py-3 px-3.5 font-mono font-medium text-gray-700 dark:text-gray-300">
                        {doc.code || '-'}
                      </td>

                      {/* Title & 1-2 sentence Summary */}
                      <td className="py-3 px-4">
                        <div className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-[#004B87] dark:group-hover:text-blue-400 transition-colors leading-snug">
                          {doc.title}
                        </div>
                        {/* 1-2 sentence summary */}
                        <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                          {doc.summary}
                        </div>
                      </td>

                      {/* Department Badge */}
                      <td className="py-3 px-3.5">
                        <span
                          style={{
                            backgroundColor: deptMeta.bg,
                            color: deptMeta.text
                          }}
                          className="inline-block px-2 py-0.5 rounded text-[10px] font-bold shadow-2xs whitespace-nowrap"
                          title={deptMeta.label}
                        >
                          {doc.department}
                        </span>
                      </td>

                      {/* Source Level */}
                      <td className="py-3 px-3.5 text-[11px]">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full font-medium ${
                            doc.sourceLevel === 'VPDH'
                              ? 'bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                              : 'bg-rose-50 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                          }`}
                        >
                          {doc.sourceLevel === 'VPDH' ? 'VPĐH' : 'Nghệ An'}
                        </span>
                      </td>

                      {/* Effective Date */}
                      <td className="py-3 px-3.5 text-[11px] text-gray-500 dark:text-gray-400 font-mono whitespace-nowrap">
                        {doc.effectiveDate || '-'}
                      </td>

                      {/* Drive Link Action */}
                      <td
                        className="py-3 px-3.5 text-center"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {doc.driveLink ? (
                          <a
                            href={doc.driveLink}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 hover:text-emerald-800 transition-colors shadow-2xs border border-emerald-200/80 dark:border-emerald-800"
                            title="Mở tài liệu gốc trên Google Drive"
                          >
                            <ExternalLink className="w-3 h-3" /> Mở file
                          </a>
                        ) : (
                          <span className="text-[10px] text-gray-400 italic">Chưa có link</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAIL MODAL DRAWER */}
      {selectedDocPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-white dark:bg-[#202020] rounded-2xl shadow-2xl border border-gray-200 dark:border-[#333] p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-[#333]">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 rounded font-semibold">
                  Số: {selectedDocPreview.code || 'Chưa đánh số'}
                </span>
                <span
                  style={{
                    backgroundColor:
                      DEPT_COLOR_MAP[selectedDocPreview.department.split(',')[0].trim()]?.bg || '#E5E7EB',
                    color:
                      DEPT_COLOR_MAP[selectedDocPreview.department.split(',')[0].trim()]?.text || '#374151'
                  }}
                  className="text-[10px] px-2 py-0.5 rounded font-bold"
                >
                  {selectedDocPreview.department} ({selectedDocPreview.departmentName})
                </span>
              </div>
              <button
                onClick={() => setSelectedDocPreview(null)}
                className="p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Title */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                {selectedDocPreview.categoryLabel}
              </span>
              <h2 className="text-base font-bold text-gray-900 dark:text-white mt-0.5 leading-snug">
                {selectedDocPreview.title}
              </h2>
            </div>

            {/* 1-2 sentence Summary Section */}
            <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-[#1E2530] border border-blue-100 dark:border-[#2C384B] space-y-1.5">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-blue-800 dark:text-blue-300 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" /> Tóm tắt nội dung cốt lõi:
              </h4>
              <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed font-normal">
                {selectedDocPreview.summary}
              </p>
            </div>

            {/* Meta details grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-gray-50 dark:bg-[#262626] border border-gray-100 dark:border-[#333] space-y-1">
                <span className="text-[10px] text-gray-400 uppercase font-semibold">Cấp ban hành:</span>
                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  {selectedDocPreview.sourceLabel}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-gray-50 dark:bg-[#262626] border border-gray-100 dark:border-[#333] space-y-1">
                <span className="text-[10px] text-gray-400 uppercase font-semibold">Người phê duyệt:</span>
                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  {selectedDocPreview.approvedBy || '-'}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-gray-50 dark:bg-[#262626] border border-gray-100 dark:border-[#333] space-y-1">
                <span className="text-[10px] text-gray-400 uppercase font-semibold">Ngày ban hành:</span>
                <p className="font-mono text-gray-800 dark:text-gray-200">
                  {selectedDocPreview.effectiveDate || '-'}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-gray-50 dark:bg-[#262626] border border-gray-100 dark:border-[#333] space-y-1">
                <span className="text-[10px] text-gray-400 uppercase font-semibold">Phối hợp thực hiện:</span>
                <p className="text-gray-800 dark:text-gray-200 truncate">
                  {selectedDocPreview.coordination || 'Toàn hệ thống'}
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-gray-200 dark:border-[#333] flex items-center justify-between">
              <span className="text-[11px] text-gray-400">
                {selectedDocPreview.issueType || 'Văn bản quy chuẩn ban hành'}
              </span>

              {selectedDocPreview.driveLink ? (
                <a
                  href={selectedDocPreview.driveLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-[#004B87] hover:bg-[#003A69] dark:bg-blue-600 dark:hover:bg-blue-500 shadow-xs transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Mở văn bản trên Google Drive
                </a>
              ) : (
                <span className="text-xs text-gray-400">Chưa có liên kết đính kèm</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
