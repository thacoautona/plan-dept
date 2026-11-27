import React from 'react';
import {
  Search,
  Plus,
  Download,
  Share2,
  ChevronRight,
  SlidersHorizontal,
  Home
} from 'lucide-react';
import { ActiveTab } from './Sidebar';

interface HeaderProps {
  activeTab: ActiveTab;
  onOpenSearch: () => void;
  onOpenCreateModal: () => void;
  onExportReport: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onOpenSearch,
  onOpenCreateModal,
  onExportReport
}) => {
  const getTabTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Tổng quan Điều hành & Báo cáo Tham mưu';
      case 'planning':
        return 'Quản trị Kế hoạch & Tiến độ Mục tiêu';
      case 'governance':
        return 'Hệ thống Quy trình, Quy định & Kiểm soát Tuân thủ';
      case 'org':
        return 'Cơ cấu Tổ chức & Ma trận Phân quyền RACI';
      case 'digital':
        return 'Chuyển đổi số & Sáng kiến Cải tiến Vận hành';
      default:
        return 'Không gian làm việc';
    }
  };

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between px-6 py-3 bg-[#FBFBFA]/90 dark:bg-[#191919]/90 backdrop-blur-md border-b border-[#E9E9E7] dark:border-[#2F2F2F]">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center space-x-2 text-xs text-[#787774] dark:text-[#9B9A97]">
        <span className="flex items-center gap-1 font-medium hover:text-[#37352F] dark:hover:text-white cursor-pointer transition-colors">
          <Home className="w-3.5 h-3.5" /> THACO Tỉnh Thành
        </span>
        <ChevronRight className="w-3.5 h-3.5 text-[#B0B0AE] dark:text-[#555]" />
        <span className="font-semibold text-[#37352F] dark:text-[#E3E2E0] truncate max-w-[280px] md:max-w-md">
          {getTabTitle()}
        </span>
      </div>

      {/* Action Bar */}
      <div className="flex items-center space-x-2.5">
        {/* Search Bar / Quick Command Trigger */}
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs bg-[#EFEFEF] dark:bg-[#252525] text-[#787774] dark:text-[#9B9A97] hover:bg-[#E5E5E5] dark:hover:bg-[#2D2D2D] hover:text-[#37352F] dark:hover:text-white transition-all border border-[#E0E0DE] dark:border-[#333]"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Tìm kiếm nhanh...</span>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-[#1C1C1C] rounded border border-gray-300 dark:border-gray-700 shadow-2xs">
            Ctrl K
          </kbd>
        </button>

        {/* Export Data */}
        <button
          onClick={onExportReport}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-[#444] dark:text-[#DDD] hover:bg-[#EAEAEA] dark:hover:bg-[#2A2A2A] transition-colors border border-transparent hover:border-[#DDD] dark:hover:border-[#383838]"
          title="Xuất báo cáo tổng hợp dạng Markdown/JSON"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Xuất báo cáo</span>
        </button>

        {/* Primary Action Button */}
        <button
          onClick={onOpenCreateModal}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-white bg-[#004B87] hover:bg-[#003A69] dark:bg-blue-600 dark:hover:bg-blue-500 shadow-xs transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Thêm mục mới</span>
        </button>
      </div>
    </header>
  );
};
