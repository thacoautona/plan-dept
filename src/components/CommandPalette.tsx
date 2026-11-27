import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { PlanGoal, GovernanceDoc } from '../types';
import { OrgPositionItem } from '../data/orgData';
import { ActiveTab } from './Sidebar';
import { AppIcon } from './AppIcon';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  plans: PlanGoal[];
  docs: GovernanceDoc[];
  positions: OrgPositionItem[];
  onSelectTab: (tab: ActiveTab) => void;
  onSelectItem: (type: 'plan' | 'doc' | 'dept', item: any) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  plans,
  docs,
  positions,
  onSelectTab,
  onSelectItem
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredPlans = plans.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.code.toLowerCase().includes(query.toLowerCase()) ||
      p.department.toLowerCase().includes(query.toLowerCase())
  );

  const filteredDocs = docs.filter(
    (d) =>
      d.title.toLowerCase().includes(query.toLowerCase()) ||
      d.code.toLowerCase().includes(query.toLowerCase()) ||
      d.department.toLowerCase().includes(query.toLowerCase()) ||
      d.summary.toLowerCase().includes(query.toLowerCase())
  );

  const filteredPositions = positions.filter(
    (pos) =>
      pos.title.toLowerCase().includes(query.toLowerCase()) ||
      pos.deptName.toLowerCase().includes(query.toLowerCase()) ||
      pos.deptCode.toLowerCase().includes(query.toLowerCase())
  );

  const totalResults =
    filteredPlans.length + filteredDocs.length + filteredPositions.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-[#202020] rounded-xl shadow-2xl border border-gray-200 dark:border-[#333] overflow-hidden flex flex-col max-h-[75vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-gray-200 dark:border-[#333]">
          <Search className="w-5 h-5 text-gray-400 dark:text-gray-500 mr-3 flex-shrink-0" />
          <input
            type="text"
            placeholder="Tìm kiếm mục tiêu, quy trình, phòng ban, sáng kiến..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#2C2C2C]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-4">
          {totalResults === 0 ? (
            <div className="py-12 text-center text-sm text-gray-400 dark:text-gray-500">
              Không tìm thấy kết quả phù hợp cho "{query}"
            </div>
          ) : (
            <>
              {/* Plans Section */}
              {filteredPlans.length > 0 && (
                <div>
                  <p className="px-3 py-1 text-[11px] font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                    <AppIcon name="target_goal" className="w-3.5 h-3.5" /> Kế hoạch & Mục tiêu ({filteredPlans.length})
                  </p>
                  <div className="mt-1 space-y-0.5">
                    {filteredPlans.map((plan) => (
                      <button
                        key={plan.id}
                        onClick={() => {
                          onSelectTab('planning');
                          onSelectItem('plan', plan);
                          onClose();
                        }}
                        className="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-gray-100 dark:hover:bg-[#2A2A2A] flex items-center justify-between group transition-colors"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="font-mono text-[10px] px-1.5 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">
                            {plan.code}
                          </span>
                          <span className="text-gray-700 dark:text-gray-200 truncate font-medium">
                            {plan.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-[11px] text-gray-400">{plan.progressPct}%</span>
                          <ArrowRight className="w-3.5 h-3.5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Docs Section */}
              {filteredDocs.length > 0 && (
                <div>
                  <p className="px-3 py-1 text-[11px] font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                    <AppIcon name="edit_document" className="w-3.5 h-3.5" /> Tài liệu & Quy trình ({filteredDocs.length})
                  </p>
                  <div className="mt-1 space-y-0.5">
                    {filteredDocs.map((doc) => (
                      <button
                        key={doc.id}
                        onClick={() => {
                          onSelectTab('governance');
                          onSelectItem('doc', doc);
                          onClose();
                        }}
                        className="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-gray-100 dark:hover:bg-[#2A2A2A] flex items-center justify-between group transition-colors"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="font-mono text-[10px] px-1.5 py-0.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded">
                            {doc.code}
                          </span>
                          <span className="text-gray-700 dark:text-gray-200 truncate font-medium">
                            {doc.title}
                          </span>
                        </div>
                        <span className="text-[10px] text-gray-400 uppercase">{doc.category}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Positions Section */}
              {filteredPositions.length > 0 && (
                <div>
                  <p className="px-3 py-1 text-[11px] font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                    <AppIcon name="team_people" className="w-3.5 h-3.5" /> Chức danh & Nhiệm vụ ({filteredPositions.length})
                  </p>
                  <div className="mt-1 space-y-0.5">
                    {filteredPositions.slice(0, 12).map((pos) => (
                      <button
                        key={pos.id}
                        onClick={() => {
                          onSelectTab('org');
                          onSelectItem('dept', pos);
                          onClose();
                        }}
                        className="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-gray-100 dark:hover:bg-[#2A2A2A] flex items-center justify-between group transition-colors"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="font-semibold text-gray-800 dark:text-gray-100 truncate">
                            {pos.title}
                          </span>
                          <span className="text-gray-400 text-[11px] truncate">({pos.deptName})</span>
                        </div>
                        <span className="text-[11px] text-gray-400 flex-shrink-0">{pos.duties.length} nhiệm vụ</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </>
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="px-4 py-2 border-t border-gray-100 dark:border-[#303030] bg-gray-50 dark:bg-[#1A1A1A] flex items-center justify-between text-[11px] text-gray-400">
          <span>Nhấn <kbd className="font-mono bg-white dark:bg-[#282828] px-1 py-0.5 rounded border border-gray-200 dark:border-gray-700">ESC</kbd> để đóng</span>
          <span>Dùng phím <kbd className="font-mono bg-white dark:bg-[#282828] px-1 py-0.5 rounded border border-gray-200 dark:border-gray-700">Ctrl K</kbd> để mở nhanh</span>
        </div>
      </div>
    </div>
  );
};
