import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  ShieldCheck
} from 'lucide-react';
import { AppIcon, AppIconName } from './AppIcon';

export type ActiveTab = 'dashboard' | 'planning' | 'database' | 'governance' | 'org';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  isAdmin: boolean;
  stats: {
    plansCount: number;
    docsCount: number;
  };
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isCollapsed,
  setIsCollapsed,
  darkMode,
  setDarkMode,
  isAdmin,
  stats
}) => {
  const allNavItems = [
    {
      id: 'dashboard' as ActiveTab,
      label: 'Tổng quan Điều hành',
      iconName: 'presentation_chart' as AppIconName,
      badge: undefined,
      desc: 'Báo cáo tóm tắt & Tham mưu',
      adminOnly: false
    },
    {
      id: 'planning' as ActiveTab,
      label: 'Quản trị Kế hoạch',
      iconName: 'target_goal' as AppIconName,
      badge: stats.plansCount,
      desc: 'Mục tiêu, Tiến độ & KPI',
      adminOnly: false
    },
    {
      id: 'database' as ActiveTab,
      label: 'Cơ sở dữ liệu',
      iconName: 'binder_archive' as AppIconName,
      badge: undefined,
      desc: 'Báo cáo, Hướng dẫn, Layout',
      adminOnly: false
    },
    {
      id: 'governance' as ActiveTab,
      label: 'Quy trình Quy định',
      iconName: 'folder_archive' as AppIconName,
      badge: stats.docsCount,
      desc: 'VPĐH & THACO AUTO Nghệ An',
      adminOnly: false
    },
    {
      id: 'org' as ActiveTab,
      label: 'Cấu trúc & Chức năng nhiệm vụ',
      iconName: 'org_chart' as AppIconName,
      badge: undefined,
      desc: 'Sơ đồ cấu trúc & Nhiệm vụ chức danh',
      adminOnly: false
    }
  ];

  const navItems = allNavItems.filter((item) => !item.adminOnly || isAdmin);

  return (
    <aside
      className={`relative flex flex-col h-screen border-r transition-all duration-300 ease-in-out select-none
        ${isCollapsed ? 'w-16' : 'w-72'}
        bg-[#F7F6F3] dark:bg-[#202020] border-[#E9E9E7] dark:border-[#2F2F2F] text-[#37352F] dark:text-[#E3E2E0]`}
    >
      {/* Top Workspace Identity */}
      <div className="flex items-center justify-between p-3 border-b border-[#E9E9E7] dark:border-[#2F2F2F]">
        {!isCollapsed ? (
          <div className="flex items-center space-x-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center bg-white/90 dark:bg-[#2A2A2A] shadow-xs border border-gray-200 dark:border-gray-700 p-0.5">
              <img
                src="./increase.png"
                alt="THACO AUTO Nghệ An"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="truncate">
              <h1 className="font-semibold text-sm leading-tight text-[#111827] dark:text-white truncate">
                THACO AUTO Nghệ An
              </h1>
              <span className="text-[11px] text-[#787774] dark:text-[#9B9A97] flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" /> Nghiệp vụ Kế hoạch
              </span>
            </div>
          </div>
        ) : (
          <div className="mx-auto w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center bg-white/90 dark:bg-[#2A2A2A] shadow-xs border border-gray-200 dark:border-gray-700 p-0.5">
            <img
              src="./increase.png"
              alt="THACO AUTO Nghệ An"
              className="w-full h-full object-contain"
            />
          </div>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded hover:bg-[#EAEAEA] dark:hover:bg-[#2C2C2C] text-[#787774] dark:text-[#9B9A97] transition-colors"
          title={isCollapsed ? 'Mở rộng thanh bên' : 'Thu gọn thanh bên'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-6">
        <div>
          {!isCollapsed && (
            <p className="px-2 pb-1.5 text-[10px] font-semibold tracking-wider text-[#9B9A97] uppercase">
              Không gian làm việc
            </p>
          )}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-md text-sm font-medium transition-all group relative
                    ${isActive
                      ? 'bg-[#EAE8E3] dark:bg-[#2F2F2F] text-[#111827] dark:text-white shadow-xs'
                      : 'text-[#5A5852] dark:text-[#A5A5A5] hover:bg-[#EFEFEF] dark:hover:bg-[#262626] hover:text-[#111827] dark:hover:text-white'
                    }`}
                >
                  <AppIcon
                    name={item.iconName}
                    className="w-4 h-4 flex-shrink-0"
                    alt={item.label}
                  />
                  {!isCollapsed && (
                    <div className="flex-1 text-left truncate flex items-center justify-between">
                      <span className="truncate">{item.label}</span>
                      {item.badge !== undefined && (
                        <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-mono ${
                          isActive
                            ? 'bg-[#004B87]/10 text-[#004B87] dark:bg-blue-400/20 dark:text-blue-300'
                            : 'bg-[#E3E2E0] dark:bg-[#333333] text-[#787774] dark:text-[#9B9A97]'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Tooltip on collapsed */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none z-50 transition-opacity">
                      {item.label}
                    </div>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Quick Reference Notes */}
        {!isCollapsed && (
          <div className="px-2 pt-2 border-t border-[#E9E9E7] dark:border-[#2F2F2F]">
            <p className="pb-2 text-[10px] font-semibold tracking-wider text-[#9B9A97] uppercase flex items-center gap-1.5">
              <AppIcon name="pdca_cycle" className="w-3.5 h-3.5" /> Tiêu chuẩn Vận hành
            </p>
            <div className="bg-[#EFEFEF]/70 dark:bg-[#272727] p-2.5 rounded-lg border border-[#E5E5E3] dark:border-[#353535] text-[12px] space-y-1.5 text-[#5A5852] dark:text-[#A5A5A5]">
              <div className="flex items-center gap-2 font-medium text-[#2E2D29] dark:text-[#DDD]">
                <AppIcon name="pdca_cycle" className="w-4 h-4" /> Chu trình PDCA
              </div>
              <p className="text-[11px] leading-relaxed">
                Lập KH &rarr; Thực thi &rarr; Kiểm soát tuân thủ &rarr; Tham mưu cải tiến liên tục.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Profile & Theme Toggle */}
      <div className="p-3 border-t border-[#E9E9E7] dark:border-[#2F2F2F] flex items-center justify-between">
        {!isCollapsed ? (
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-7 h-7 rounded-full bg-slate-300 dark:bg-slate-700 flex items-center justify-center text-xs font-semibold text-slate-700 dark:text-slate-200">
              TL
            </div>
            <div className="truncate">
              <p className="text-xs font-medium leading-none text-[#2E2D29] dark:text-white truncate">
                Trợ lý Kế hoạch
              </p>
              <span className="text-[10px] text-[#787774] dark:text-[#9B9A97]">
                THACO AUTO Nghệ An
              </span>
            </div>
          </div>
        ) : (
          <div className="mx-auto w-6 h-6 rounded-full bg-slate-300 dark:bg-slate-700 flex items-center justify-center text-[10px] font-semibold">
            TL
          </div>
        )}

        {!isCollapsed && (
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-1.5 rounded-md hover:bg-[#EAEAEA] dark:hover:bg-[#2C2C2C] text-[#787774] dark:text-[#9B9A97] transition-colors"
            title={darkMode ? 'Chuyển sang chế độ Sáng' : 'Chuyển sang chế độ Tối'}
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>
        )}
      </div>
    </aside>
  );
};
