import React, { useState } from 'react';
import {
  Search,
  Plus,
  Download,
  AlertTriangle,
  Eye
} from 'lucide-react';
import { GovernanceDoc, ComplianceChecklistItem } from '../../types';
import { AppIcon } from '../AppIcon';

interface GovernanceViewProps {
  docs: GovernanceDoc[];
  complianceList: ComplianceChecklistItem[];
  onOpenCreateDoc: () => void;
  onOpenCreateCompliance: () => void;
}

export const GovernanceView: React.FC<GovernanceViewProps> = ({
  docs,
  complianceList,
  onOpenCreateDoc,
  onOpenCreateCompliance
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'docs' | 'compliance'>('docs');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDocPreview, setSelectedDocPreview] = useState<GovernanceDoc | null>(null);

  const categories = [
    { id: 'all', label: 'Tất cả tài liệu' },
    { id: 'quy_che', label: 'Quy chế (QC)' },
    { id: 'quy_dinh', label: 'Quy định (QĐ)' },
    { id: 'quy_trinh', label: 'Quy trình (SOP)' },
    { id: 'huong_dan', label: 'Hướng dẫn (HD)' },
    { id: 'bieu_mau', label: 'Biểu mẫu (BM)' }
  ];

  const filteredDocs = docs.filter((doc) => {
    const matchesCat = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Notion-style */}
      <div className="pt-6 pb-2 border-b border-[#E9E9E7] dark:border-[#2F2F2F]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50 shadow-2xs">
              <AppIcon name="workflow_process" className="w-8 h-8" alt="Quy trình" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-[#111827] dark:text-white">
                Hệ thống Quy trình, Quy định & Tuân thủ
              </h1>
              <p className="text-xs text-[#787774] dark:text-[#9B9A97] mt-0.5">
                Biên soạn, cập nhật chi tiết hệ thống tài liệu quản trị tại THACO AUTO Nghệ An; thực thi và kiểm soát việc tuân thủ.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {activeSubTab === 'docs' ? (
              <button
                onClick={onOpenCreateDoc}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#004B87] hover:bg-[#003A69] dark:bg-blue-600 dark:hover:bg-blue-500 shadow-xs transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Thêm văn bản quản trị
              </button>
            ) : (
              <button
                onClick={onOpenCreateCompliance}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 shadow-xs transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Thêm đợt kiểm tra tuân thủ
              </button>
            )}
          </div>
        </div>

        {/* Sub-Tabs: Tài liệu vs Kiểm soát tuân thủ */}
        <div className="mt-6 flex items-center gap-4 text-xs font-medium border-b border-transparent">
          <button
            onClick={() => setActiveSubTab('docs')}
            className={`pb-2.5 flex items-center gap-2 border-b-2 transition-all ${
              activeSubTab === 'docs'
                ? 'border-[#004B87] text-[#004B87] dark:border-blue-400 dark:text-blue-400 font-semibold'
                : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <AppIcon name="folder_archive" className="w-4 h-4" /> Thư viện Tài liệu Quản trị ({docs.length})
          </button>
          <button
            onClick={() => setActiveSubTab('compliance')}
            className={`pb-2.5 flex items-center gap-2 border-b-2 transition-all ${
              activeSubTab === 'compliance'
                ? 'border-rose-600 text-rose-600 dark:border-rose-400 dark:text-rose-400 font-semibold'
                : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <AppIcon name="compliance_shield" className="w-4 h-4" /> Giám sát Tuân thủ & Kế hoạch CAPA (
            {complianceList.length})
          </button>
        </div>
      </div>

      {activeSubTab === 'docs' ? (
        /* DOCUMENT REPOSITORY TAB */
        <div className="space-y-4">
          {/* Category Filter Pills & Search */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1 rounded-full transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-emerald-600 text-white font-medium shadow-2xs'
                      : 'bg-gray-100 dark:bg-[#252525] text-gray-600 dark:text-gray-300 hover:bg-gray-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm tài liệu, mã hiệu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-lg text-xs bg-white dark:bg-[#252525] border border-gray-200 dark:border-[#383838] focus:outline-none focus:ring-1 focus:ring-emerald-500 w-56"
              />
            </div>
          </div>

          {/* Documents Grid / Table */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDocs.map((doc) => (
              <div
                key={doc.id}
                onClick={() => setSelectedDocPreview(doc)}
                className="p-4 rounded-xl bg-white dark:bg-[#202020] border border-[#E9E9E7] dark:border-[#2F2F2F] shadow-2xs hover:border-emerald-400 dark:hover:border-emerald-600 cursor-pointer transition-all flex flex-col justify-between space-y-3 group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold">
                      {doc.code}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                        doc.status === 'active'
                          ? 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                          : 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                      }`}
                    >
                      {doc.status === 'active' ? 'Đang hiệu lực' : 'Đang lấy ý kiến'}
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-snug group-hover:text-emerald-600 transition-colors">
                    {doc.title}
                  </h3>

                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 line-clamp-2">
                    {doc.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 dark:border-[#2C2C2C] flex items-center justify-between text-[11px] text-gray-400">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-medium text-gray-600 dark:text-gray-300">
                      Phiên bản: {doc.version}
                    </span>
                    <span>• Áp dụng: {doc.department}</span>
                  </div>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1 group-hover:underline">
                    <Eye className="w-3.5 h-3.5" /> Xem nội dung
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* COMPLIANCE CHECKLIST & CAPA TAB */
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-rose-50/50 dark:bg-[#251A1C] border border-rose-200 dark:border-[#4B2529] text-xs text-rose-900 dark:text-rose-200 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold">Quy trình Kiểm soát Tuân thủ & Kế hoạch Khắc phục (CAPA)</h4>
              <p className="mt-0.5 text-rose-700 dark:text-rose-300 leading-relaxed">
                Đầu mối Kế hoạch thực hiện kiểm tra ngẫu nhiên việc tuân thủ các quy định, quy trình tại các bộ phận THACO AUTO Nghệ An. Mọi điểm không phù hợp phải lập kế hoạch CAPA có người chịu trách nhiệm và hạn hoàn thành cụ thể.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-[#202020] rounded-xl border border-[#E9E9E7] dark:border-[#2F2F2F] shadow-2xs overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50/80 dark:bg-[#252525] border-b border-[#E9E9E7] dark:border-[#2F2F2F] text-[#787774] dark:text-[#9B9A97] font-semibold">
                  <th className="py-3 px-4 w-24">Bộ phận</th>
                  <th className="py-3 px-4 w-32">Quy trình / Tiêu chuẩn</th>
                  <th className="py-3 px-4 min-w-[200px]">Nội dung kiểm tra & Đánh giá</th>
                  <th className="py-3 px-4 w-28">Kết quả</th>
                  <th className="py-3 px-4 min-w-[220px]">Hành động khắc phục (CAPA)</th>
                  <th className="py-3 px-4 w-28">Hạn xử lý</th>
                  <th className="py-3 px-4 w-24">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E9E9E7] dark:divide-[#2F2F2F]">
                {complianceList.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/60 dark:hover:bg-[#282828] transition-colors">
                    <td className="py-3 px-4 font-semibold text-gray-800 dark:text-gray-200">
                      {item.department}
                    </td>
                    <td className="py-3 px-4 font-mono text-gray-600 dark:text-gray-400">
                      <div>{item.processCode}</div>
                      <div className="text-[10px] text-gray-400">{item.processName}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-gray-900 dark:text-gray-100 font-medium">
                        {item.checkContent}
                      </div>
                      <div className="text-gray-500 dark:text-gray-400 text-[11px] mt-0.5">
                        {item.findingNote}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          item.result === 'compliant'
                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                            : item.result === 'minor_issue'
                            ? 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                            : 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                        }`}
                      >
                        {item.result === 'compliant'
                          ? 'Đạt chuẩn'
                          : item.result === 'minor_issue'
                          ? 'Nhắc nhở nhẹ'
                          : 'Không phù hợp'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                      {item.capaAction ? (
                        <div>
                          <div className="font-medium text-emerald-700 dark:text-emerald-400">
                            {item.capaAction}
                          </div>
                          <div className="text-[10px] text-gray-400 mt-0.5">
                            Phụ trách: {item.responsiblePerson}
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-400 italic">Không có yêu cầu CAPA</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400 font-mono text-[11px]">
                      {item.deadline || '-'}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                          item.status === 'verified'
                            ? 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300'
                            : 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300 font-semibold'
                        }`}
                      >
                        {item.status === 'verified' ? 'Đã đóng' : 'Đang xử lý'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* DOCUMENT PREVIEW MODAL */}
      {selectedDocPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl bg-white dark:bg-[#202020] rounded-2xl shadow-2xl border border-gray-200 dark:border-[#333] p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-[#333]">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 rounded font-semibold">
                  {selectedDocPreview.code}
                </span>
                <span className="text-xs text-gray-500">Phiên bản {selectedDocPreview.version}</span>
              </div>
              <button
                onClick={() => setSelectedDocPreview(null)}
                className="text-xs text-gray-500 hover:text-gray-800 dark:hover:text-white"
              >
                Đóng [ESC]
              </button>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                {selectedDocPreview.title}
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Phạm vi: {selectedDocPreview.scope} • Ngày hiệu lực: {selectedDocPreview.effectiveDate}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#272727] border border-gray-200 dark:border-[#383838] text-xs space-y-2">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 uppercase tracking-wide">
                Tóm tắt nội dung quy chuẩn:
              </h4>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {selectedDocPreview.summary}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-2">
              {selectedDocPreview.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded text-[10px] bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-[#333] flex items-center justify-between">
              <span className="text-xs text-gray-400">Định dạng file: {selectedDocPreview.fileFormat.toUpperCase()} ({selectedDocPreview.fileSize})</span>
              <button
                onClick={() => alert(`Đang tải văn bản ${selectedDocPreview.code}...`)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#004B87] hover:bg-[#003A69]"
              >
                <Download className="w-3.5 h-3.5" /> Tải tài liệu đính kèm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
