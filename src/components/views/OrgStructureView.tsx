import React, { useState, useMemo } from 'react';
import {
  Search,
  Copy,
  Check,
  ArrowUp,
  ArrowDown,
  Table2,
  LayoutGrid,
  FileText,
  Layers,
  ChevronRight,
  Info,
  X,
  Users
} from 'lucide-react';
import {
  deptFunctionAreas,
  orgPositionsData,
  OrgPositionItem
} from '../../data/orgData';
import { AppIcon } from '../AppIcon';

type OrgSubTab = 'positions' | 'functions' | 'structure';
type PositionViewMode = 'cards' | 'table';
type SortMode = 'default' | 'tier' | 'dept' | 'title';

const DEPT_TAG_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  // Kinh doanh xe, Xe QSD, Showroom & Hỗ trợ KD (#FFC5C5)
  KDX: { bg: '#FFC5C5', text: '#7F1D1D', border: '#FCA5A5' },
  SR_KD: { bg: '#FFC5C5', text: '#7F1D1D', border: '#FCA5A5' },
  KDDL: { bg: '#FFC5C5', text: '#7F1D1D', border: '#FCA5A5' },
  KDTB: { bg: '#FFC5C5', text: '#7F1D1D', border: '#FCA5A5' },
  QSD: { bg: '#FFC5C5', text: '#7F1D1D', border: '#FCA5A5' },
  HTKD: { bg: '#FFC5C5', text: '#7F1D1D', border: '#FCA5A5' },
  BGD: { bg: '#FFC5C5', text: '#7F1D1D', border: '#FCA5A5' },
  // Dịch vụ phụ tùng DL & Tải Bus (#BFBFBF)
  DVPT: { bg: '#BFBFBF', text: '#1F2937', border: '#9CA3AF' },
  SR_DV: { bg: '#BFBFBF', text: '#1F2937', border: '#9CA3AF' },
  DVDL: { bg: '#BFBFBF', text: '#1F2937', border: '#9CA3AF' },
  DVTB: { bg: '#BFBFBF', text: '#1F2937', border: '#9CA3AF' },
  'DVDL / DVTB': { bg: '#BFBFBF', text: '#1F2937', border: '#9CA3AF' },
  // Tài chính, HCNS, Kế hoạch, Marketing (#FFFCD5)
  TCKT: { bg: '#FFFCD5', text: '#713F12', border: '#FDE047' },
  HCNS: { bg: '#FFFCD5', text: '#713F12', border: '#FDE047' },
  QTVP: { bg: '#FFFCD5', text: '#713F12', border: '#FDE047' },
  NVKH: { bg: '#FFFCD5', text: '#713F12', border: '#FDE047' },
  MKT: { bg: '#FFFCD5', text: '#713F12', border: '#FDE047' },
  // NVCN: TCHĐ & CSVC, QLCL & Kho xe, Quản trị Chi phí Giá thành, Tín dụng Bảo hiểm (#E1FFFF)
  TCHĐ: { bg: '#E1FFFF', text: '#134E4A', border: '#5EEAD4' },
  QLCL: { bg: '#E1FFFF', text: '#134E4A', border: '#5EEAD4' },
  QTCP: { bg: '#E1FFFF', text: '#134E4A', border: '#5EEAD4' },
  TDBH: { bg: '#E1FFFF', text: '#134E4A', border: '#5EEAD4' },
  NVCN: { bg: '#E1FFFF', text: '#134E4A', border: '#5EEAD4' }
};

const getTagStyle = (deptCode: string, title?: string) => {
  if (title && title.trim() === 'TGĐ Công ty') {
    return { bg: '#BFBFBF', text: '#1F2937', border: '#9CA3AF' };
  }
  return DEPT_TAG_STYLES[deptCode] || { bg: '#F3F4F6', text: '#374151', border: '#D1D5DB' };
};

const TIER_LABELS: Record<number, { label: string; badgeBg: string; badgeText: string }> = {
  1: {
    label: 'Cấp 1 • Ban Lãnh đạo / Giám đốc mảng',
    badgeBg: 'bg-blue-100 dark:bg-blue-900/40',
    badgeText: 'text-[#004B87] dark:text-blue-300'
  },
  2: {
    label: 'Cấp 2 • Trưởng phòng / Quản đốc',
    badgeBg: 'bg-emerald-100 dark:bg-emerald-900/40',
    badgeText: 'text-emerald-800 dark:text-emerald-300'
  },
  3: {
    label: 'Cấp 3 • Trưởng nhóm / Tổ trưởng',
    badgeBg: 'bg-amber-100 dark:bg-amber-900/40',
    badgeText: 'text-amber-800 dark:text-amber-300'
  },
  4: {
    label: 'Cấp 4 • Chuyên viên / Tư vấn / KTV / NV',
    badgeBg: 'bg-gray-100 dark:bg-gray-800',
    badgeText: 'text-gray-700 dark:text-gray-300'
  }
};

export const OrgStructureView: React.FC = () => {
  const [subTab, setSubTab] = useState<OrgSubTab>('positions');
  const [viewMode, setViewMode] = useState<PositionViewMode>('cards');
  const [selectedDept, setSelectedDept] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortMode, setSortMode] = useState<SortMode>('default');
  const [customOrderIds, setCustomOrderIds] = useState<string[]>(() =>
    orgPositionsData.map((p) => p.id)
  );
  const [selectedIdsForCopy, setSelectedIdsForCopy] = useState<Set<string>>(new Set());
  const [activePos, setActivePos] = useState<OrgPositionItem | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [funcGroupFilter, setFuncGroupFilter] = useState<string>('ALL');

  // Unique departments in order
  const deptList = useMemo(() => {
    const seen = new Map<string, { code: string; name: string; count: number }>();
    orgPositionsData.forEach((p) => {
      const existing = seen.get(p.deptCode);
      if (existing) {
        existing.count += 1;
      } else {
        seen.set(p.deptCode, { code: p.deptCode, name: p.deptName, count: 1 });
      }
    });
    return Array.from(seen.values());
  }, []);

  // Filtered & sorted positions
  const filteredPositions = useMemo(() => {
    let list = orgPositionsData.filter((p) => {
      const matchDept = selectedDept === 'ALL' || p.deptCode === selectedDept;
      const q = searchQuery.trim().toLowerCase();
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.deptName.toLowerCase().includes(q) ||
        p.duties.some((d) => d.toLowerCase().includes(q));
      return matchDept && matchSearch;
    });

    if (sortMode === 'default') {
      const orderIndex = new Map(customOrderIds.map((id, idx) => [id, idx]));
      list = [...list].sort((a, b) => (orderIndex.get(a.id) ?? 0) - (orderIndex.get(b.id) ?? 0));
    } else if (sortMode === 'tier') {
      list = [...list].sort((a, b) => a.tier - b.tier || a.order - b.order);
    } else if (sortMode === 'dept') {
      list = [...list].sort((a, b) => a.deptName.localeCompare(b.deptName, 'vi') || a.tier - b.tier);
    } else if (sortMode === 'title') {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title, 'vi'));
    }

    return list;
  }, [selectedDept, searchQuery, sortMode, customOrderIds]);

  // Group filtered positions by Tier for Card view
  const tierGroups = useMemo(() => {
    const tiers: Record<number, OrgPositionItem[]> = { 1: [], 2: [], 3: [], 4: [] };
    filteredPositions.forEach((p) => {
      tiers[p.tier]?.push(p);
    });
    return [1, 2, 3, 4].filter((t) => tiers[t].length > 0).map((t) => ({ tier: t, items: tiers[t] }));
  }, [filteredPositions]);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleCopySinglePosition = (pos: OrgPositionItem) => {
    const formatted = `${pos.title.toUpperCase()} (${pos.deptName})\n${pos.duties
      .map((d, idx) => `${idx + 1}. ${d}`)
      .join('\n')}`;
    copyToClipboard(formatted, pos.id);
  };

  const handleCopyReport = () => {
    const targetList =
      selectedIdsForCopy.size > 0
        ? filteredPositions.filter((p) => selectedIdsForCopy.has(p.id))
        : filteredPositions;

    const text = targetList
      .map(
        (pos, i) =>
          `${i + 1}. ${pos.title} — [${pos.deptName}]\n` +
          pos.duties.map((d) => `   - ${d}`).join('\n')
      )
      .join('\n\n');

    copyToClipboard(text, 'bulk-report');
  };

  const movePositionOrder = (id: string, direction: 'up' | 'down') => {
    setSortMode('default');
    setCustomOrderIds((prev) => {
      const visibleIds = filteredPositions.map((p) => p.id);
      const visIdx = visibleIds.indexOf(id);
      if (visIdx === -1) return prev;
      const swapVisIdx = direction === 'up' ? visIdx - 1 : visIdx + 1;
      if (swapVisIdx < 0 || swapVisIdx >= visibleIds.length) return prev;

      const swapId = visibleIds[swapVisIdx];
      const next = [...prev];
      const idxA = next.indexOf(id);
      const idxB = next.indexOf(swapId);
      if (idxA !== -1 && idxB !== -1) {
        [next[idxA], next[idxB]] = [next[idxB], next[idxA]];
      }
      return next;
    });
  };

  const toggleSelectForCopy = (id: string) => {
    setSelectedIdsForCopy((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAllVisible = () => {
    const allVisibleSelected =
      filteredPositions.length > 0 && filteredPositions.every((p) => selectedIdsForCopy.has(p.id));
    if (allVisibleSelected) {
      setSelectedIdsForCopy(new Set());
    } else {
      setSelectedIdsForCopy(new Set(filteredPositions.map((p) => p.id)));
    }
  };

  const filteredFunctions = useMemo(() => {
    if (funcGroupFilter === 'ALL') return deptFunctionAreas;
    return deptFunctionAreas.filter((f) => f.group === funcGroupFilter);
  }, [funcGroupFilter]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200 pb-10">
      {/* Page Header */}
      <div className="pt-6 pb-4 border-b border-[#E9E9E7] dark:border-[#2F2F2F] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50">
            <AppIcon name="org_chart" className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#111827] dark:text-white">
              Cấu trúc & Chức năng nhiệm vụ
            </h1>
            <p className="text-xs text-[#787774] dark:text-[#9B9A97] mt-0.5">
              Hệ thống vị trí chức danh ({orgPositionsData.length} vị trí) & chức năng {deptFunctionAreas.length} mảng nghiệp vụ tại THACO AUTO Nghệ An.
            </p>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <div className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#202020] border border-[#E9E9E7] dark:border-[#2F2F2F] text-xs shadow-2xs">
            <span className="text-gray-500 dark:text-gray-400">Chức danh: </span>
            <strong className="text-[#004B87] dark:text-blue-400">{orgPositionsData.length}</strong>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#202020] border border-[#E9E9E7] dark:border-[#2F2F2F] text-xs shadow-2xs">
            <span className="text-gray-500 dark:text-gray-400">Mảng chức năng: </span>
            <strong className="text-emerald-700 dark:text-emerald-400">{deptFunctionAreas.length}</strong>
          </div>
        </div>
      </div>

      {/* Main Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E9E9E7] dark:border-[#2F2F2F] overflow-x-auto">
        <button
          onClick={() => setSubTab('positions')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
            subTab === 'positions'
              ? 'border-[#004B87] text-[#004B87] dark:border-blue-400 dark:text-blue-400'
              : 'border-transparent text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'
          }`}
        >
          <Users className="w-4 h-4" />
          Nhiệm vụ Chức danh ({orgPositionsData.length})
        </button>

        <button
          onClick={() => setSubTab('functions')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
            subTab === 'functions'
              ? 'border-[#004B87] text-[#004B87] dark:border-blue-400 dark:text-blue-400'
              : 'border-transparent text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          Chức năng Các mảng Kinh doanh & Nghiệp vụ ({deptFunctionAreas.length})
        </button>

        <button
          onClick={() => setSubTab('structure')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
            subTab === 'structure'
              ? 'border-[#004B87] text-[#004B87] dark:border-blue-400 dark:text-blue-400'
              : 'border-transparent text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          Sơ đồ Cấu trúc & Mô hình Quản trị
        </button>
      </div>

      {/* TAB 1: POSITIONS (CARD VIEW + SORTABLE REPORT TABLE) */}
      {subTab === 'positions' && (
        <div className="space-y-4">
          {/* Toolbar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-white dark:bg-[#202020] p-3.5 rounded-xl border border-[#E9E9E7] dark:border-[#2F2F2F] shadow-2xs">
            {/* Search & View Mode */}
            <div className="flex flex-wrap items-center gap-2.5 flex-1">
              <div className="relative flex-1 min-w-[220px] max-w-sm">
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm chức danh, nhiệm vụ..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-[#F7F6F3] dark:bg-[#2A2A2A] border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-[#004B87] text-gray-800 dark:text-gray-100"
                />
              </div>

              {/* View Mode Switcher */}
              <div className="inline-flex rounded-lg bg-[#F7F6F3] dark:bg-[#2A2A2A] p-0.5 border border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setViewMode('cards')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                    viewMode === 'cards'
                      ? 'bg-white dark:bg-[#191919] text-[#004B87] dark:text-blue-400 shadow-2xs'
                      : 'text-gray-500 hover:text-gray-800 dark:text-gray-400'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  Xem dạng Card
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                    viewMode === 'table'
                      ? 'bg-white dark:bg-[#191919] text-[#004B87] dark:text-blue-400 shadow-2xs'
                      : 'text-gray-500 hover:text-gray-800 dark:text-gray-400'
                  }`}
                >
                  <Table2 className="w-3.5 h-3.5" />
                  Bảng & Copy Báo cáo
                </button>
              </div>
            </div>

            {/* Sort & Copy Actions */}
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={sortMode}
                onChange={(e) => setSortMode(e.target.value as SortMode)}
                className="text-xs px-2.5 py-1.5 rounded-lg bg-[#F7F6F3] dark:bg-[#2A2A2A] border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none"
                title="Chọn cách sắp xếp"
              >
                <option value="default">Sắp xếp: Tùy chỉnh / PowerPoint</option>
                <option value="tier">Sắp xếp: Theo Cấp bậc (1 → 4)</option>
                <option value="dept">Sắp xếp: Theo Bộ phận</option>
                <option value="title">Sắp xếp: Theo Tên (A → Z)</option>
              </select>

              <button
                onClick={handleCopyReport}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#004B87] hover:bg-[#003A69] text-white transition-colors shadow-2xs"
              >
                {copiedKey === 'bulk-report' ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Đã copy vào Clipboard!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    {selectedIdsForCopy.size > 0
                      ? `Copy ${selectedIdsForCopy.size} mục đã chọn`
                      : `Copy ${filteredPositions.length} mục vào Báo cáo`}
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Department Filter Pills with exact Tag Colors */}
          <div className="flex items-center gap-1.5 flex-wrap pb-1">
            <button
              onClick={() => {
                setSelectedDept('ALL');
                setActivePos(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all border ${
                selectedDept === 'ALL'
                  ? 'bg-[#004B87] text-white border-[#004B87]'
                  : 'bg-white dark:bg-[#202020] text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-gray-300'
              }`}
            >
              Tất cả ({orgPositionsData.length})
            </button>
            {deptList.map((d) => {
              const style = getTagStyle(d.code);
              const isActive = selectedDept === d.code;
              return (
                <button
                  key={d.code}
                  onClick={() => {
                    setSelectedDept(d.code);
                    setActivePos(null);
                  }}
                  style={
                    isActive
                      ? { backgroundColor: '#004B87', color: '#FFFFFF', borderColor: '#004B87' }
                      : { backgroundColor: style.bg, color: style.text, borderColor: style.border }
                  }
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border shadow-2xs hover:opacity-90"
                >
                  {d.name} ({d.count})
                </button>
              );
            })}
          </div>

          {/* VIEW MODE 1: CARDS BY TIER (NO CONNECTOR LINES) */}
          {viewMode === 'cards' && (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
              {/* Main Cards Area */}
              <div className={`${activePos ? 'xl:col-span-8' : 'xl:col-span-12'} space-y-6 p-4 rounded-2xl bg-[#F7F6F3]/70 dark:bg-[#1A1A1A] border border-[#E9E9E7] dark:border-[#2F2F2F]`}>
                {tierGroups.length === 0 ? (
                  <div className="py-12 text-center text-xs text-gray-500">
                    Không tìm thấy vị trí chức danh phù hợp.
                  </div>
                ) : (
                  tierGroups.map((group) => {
                    const tierMeta = TIER_LABELS[group.tier] || TIER_LABELS[4];
                    return (
                      <div key={group.tier} className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${tierMeta.badgeBg} ${tierMeta.badgeText}`}
                          >
                            {tierMeta.label}
                          </span>
                          <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                          {group.items.map((pos) => {
                            const isSelected = activePos?.id === pos.id;
                            const tagStyle = getTagStyle(pos.deptCode, pos.title);

                            return (
                              <div
                                key={pos.id}
                                onClick={() => setActivePos(isSelected ? null : pos)}
                                style={{ borderTopWidth: '3px', borderTopColor: tagStyle.border }}
                                className={`group relative p-3.5 rounded-xl bg-white dark:bg-[#222222] border transition-all cursor-pointer shadow-2xs hover:shadow-md ${
                                  isSelected
                                    ? 'border-[#004B87] dark:border-blue-400 ring-2 ring-[#004B87]/20'
                                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                }`}
                              >
                                <div className="flex items-start justify-between gap-2 mb-2">
                                  <span
                                    className="text-[10px] font-bold px-2 py-0.5 rounded border"
                                    style={{
                                      backgroundColor: tagStyle.bg,
                                      color: tagStyle.text,
                                      borderColor: tagStyle.border
                                    }}
                                  >
                                    {pos.deptName}
                                  </span>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleCopySinglePosition(pos);
                                    }}
                                    className="p-1 rounded text-gray-400 hover:text-[#004B87] dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 flex-shrink-0"
                                    title="Copy nhiệm vụ vị trí này"
                                  >
                                    {copiedKey === pos.id ? (
                                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                                    ) : (
                                      <Copy className="w-3.5 h-3.5" />
                                    )}
                                  </button>
                                </div>

                                <h4 className="text-xs font-bold text-[#111827] dark:text-white leading-snug mb-1.5">
                                  {pos.title}
                                </h4>

                                <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                                  {pos.duties[0]}
                                </p>

                                <div className="mt-2.5 pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[10px] text-gray-400">
                                  <span>{pos.duties.length} đầu mục nhiệm vụ</span>
                                  <span className="text-[#004B87] dark:text-blue-400 font-medium flex items-center gap-0.5 group-hover:underline">
                                    Chi tiết <ChevronRight className="w-3 h-3" />
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Right Detail Drawer when a Card is selected */}
              {activePos && (
                <div className="xl:col-span-4 bg-white dark:bg-[#202020] rounded-2xl border border-[#E9E9E7] dark:border-[#2F2F2F] p-5 shadow-sm sticky top-20 space-y-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border"
                        style={{
                          backgroundColor: getTagStyle(activePos.deptCode, activePos.title).bg,
                          color: getTagStyle(activePos.deptCode, activePos.title).text,
                          borderColor: getTagStyle(activePos.deptCode, activePos.title).border
                        }}
                      >
                        {activePos.deptName}
                      </span>
                      <h3 className="text-base font-bold text-[#111827] dark:text-white mt-2">
                        {activePos.title}
                      </h3>
                    </div>
                    <button
                      onClick={() => setActivePos(null)}
                      className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopySinglePosition(activePos)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold bg-[#004B87] hover:bg-[#003A69] text-white transition-colors"
                    >
                      {copiedKey === activePos.id ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> Đã copy nhiệm vụ!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" /> Copy nhiệm vụ vào Báo cáo
                        </>
                      )}
                    </button>
                  </div>

                  <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                      Chi tiết Chức năng & Nhiệm vụ ({activePos.duties.length})
                    </p>
                    <ul className="space-y-2">
                      {activePos.duties.map((duty, idx) => (
                        <li
                          key={idx}
                          className="p-2.5 rounded-lg bg-[#F7F6F3] dark:bg-[#282828] text-xs text-gray-700 dark:text-gray-200 leading-relaxed flex items-start gap-2"
                        >
                          <span className="font-mono text-[10px] font-bold text-[#004B87] dark:text-blue-400 mt-0.5">
                            {idx + 1}.
                          </span>
                          <span>{duty}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* VIEW MODE 2: SORTABLE TABLE FOR REPORT COPY */}
          {viewMode === 'table' && (
            <div className="bg-white dark:bg-[#202020] rounded-xl border border-[#E9E9E7] dark:border-[#2F2F2F] overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#E9E9E7] dark:border-[#2F2F2F] bg-[#F7F6F3] dark:bg-[#252525] text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      <th className="py-3 px-3 w-10 text-center">
                        <input
                          type="checkbox"
                          checked={
                            filteredPositions.length > 0 &&
                            filteredPositions.every((p) => selectedIdsForCopy.has(p.id))
                          }
                          onChange={toggleSelectAllVisible}
                          className="rounded border-gray-300"
                          title="Chọn tất cả"
                        />
                      </th>
                      <th className="py-3 px-3 w-20 text-center">Sắp xếp</th>
                      <th className="py-3 px-4 w-64">Chức danh & Bộ phận</th>
                      <th className="py-3 px-4">Nhiệm vụ vị trí chức danh</th>
                      <th className="py-3 px-3 w-20 text-center">Copy</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E9E9E7] dark:divide-[#2F2F2F] text-xs">
                    {filteredPositions.map((pos, idx) => {
                      const tagStyle = getTagStyle(pos.deptCode, pos.title);
                      return (
                        <tr
                          key={pos.id}
                          className={`hover:bg-gray-50/80 dark:hover:bg-[#262626] transition-colors ${
                            selectedIdsForCopy.has(pos.id) ? 'bg-blue-50/40 dark:bg-blue-950/20' : ''
                          }`}
                        >
                          <td className="py-3 px-3 text-center align-top">
                            <input
                              type="checkbox"
                              checked={selectedIdsForCopy.has(pos.id)}
                              onChange={() => toggleSelectForCopy(pos.id)}
                              className="rounded border-gray-300 mt-1"
                            />
                          </td>
                          <td className="py-3 px-2 align-top">
                            <div className="flex items-center justify-center gap-1">
                              <button
                                onClick={() => movePositionOrder(pos.id, 'up')}
                                disabled={idx === 0}
                                className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-30"
                                title="Đưa lên"
                              >
                                <ArrowUp className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => movePositionOrder(pos.id, 'down')}
                                disabled={idx === filteredPositions.length - 1}
                                className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-30"
                                title="Đưa xuống"
                              >
                                <ArrowDown className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                          <td className="py-3 px-4 align-top">
                            <div className="font-bold text-gray-900 dark:text-white">{pos.title}</div>
                            <span
                              className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded border"
                              style={{
                                backgroundColor: tagStyle.bg,
                                color: tagStyle.text,
                                borderColor: tagStyle.border
                              }}
                            >
                              {pos.deptName}
                            </span>
                            <div className="mt-1 text-[10px] text-gray-400">
                              Cấp {pos.tier} • Slide {pos.slide}
                            </div>
                          </td>
                          <td className="py-3 px-4 align-top">
                            <ul className="space-y-1 text-gray-700 dark:text-gray-300 leading-relaxed">
                              {pos.duties.map((d, i) => (
                                <li key={i} className="flex items-start gap-1.5">
                                  <span className="text-gray-400">•</span>
                                  <span>{d}</span>
                                </li>
                              ))}
                            </ul>
                          </td>
                          <td className="py-3 px-3 text-center align-top">
                            <button
                              onClick={() => handleCopySinglePosition(pos)}
                              className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-[#004B87] text-gray-500 hover:text-[#004B87] dark:hover:text-blue-400 transition-colors"
                              title="Copy vị trí này"
                            >
                              {copiedKey === pos.id ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: FUNCTIONAL AREAS (SLIDES 7-20) */}
      {subTab === 'functions' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            {['ALL', 'Kinh doanh', 'Nghiệp vụ Quản trị Chuyên ngành', 'Nghiệp vụ Quản trị Cơ bản'].map((grp) => (
              <button
                key={grp}
                onClick={() => setFuncGroupFilter(grp)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  funcGroupFilter === grp
                    ? 'bg-[#004B87] text-white border-[#004B87]'
                    : 'bg-white dark:bg-[#202020] text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-gray-300'
                }`}
              >
                {grp === 'ALL' ? `Tất cả (${deptFunctionAreas.length})` : grp}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredFunctions.map((area) => {
              const tagStyle = getTagStyle(area.deptCode);
              return (
                <div
                  key={area.id}
                  style={{ borderTopWidth: '3px', borderTopColor: tagStyle.border }}
                  className="p-5 rounded-2xl bg-white dark:bg-[#202020] border border-[#E9E9E7] dark:border-[#2F2F2F] shadow-2xs flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span
                          className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border"
                          style={{
                            backgroundColor: tagStyle.bg,
                            color: tagStyle.text,
                            borderColor: tagStyle.border
                          }}
                        >
                          {area.group} • {area.deptCode}
                        </span>
                        <h3 className="text-base font-bold text-[#111827] dark:text-white mt-1.5">
                          {area.title}
                        </h3>
                      </div>
                      <button
                        onClick={() => {
                          const text =
                            `${area.title.toUpperCase()} (${area.group})\n` +
                            area.sections
                              .map(
                                (s) =>
                                  `[${s.level} - ${s.scope}]\n` +
                                  s.items.map((it) => `  - ${it}`).join('\n')
                              )
                              .join('\n\n');
                          copyToClipboard(text, area.id);
                        }}
                        className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-[#004B87] text-gray-500 hover:text-[#004B87] transition-colors flex-shrink-0"
                        title="Copy chức năng mảng này"
                      >
                        {copiedKey === area.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                      {area.sections.map((sec, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-[#F7F6F3] dark:bg-[#262626] border border-gray-200/70 dark:border-gray-800 text-xs space-y-1.5"
                        >
                          <div className="font-semibold text-[#004B87] dark:text-blue-400">
                            {sec.level} {sec.scope && sec.scope !== 'Phạm vi 1' ? `• ${sec.scope}` : ''}
                          </div>
                          <ul className="space-y-1 text-gray-700 dark:text-gray-300 leading-relaxed">
                            {sec.items.map((it, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-gray-400">•</span>
                                <span>{it}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: GOVERNANCE MODEL & VISIO/PDF STRUCTURE */}
      {subTab === 'structure' && (
        <div className="space-y-6">
          {/* Operating Governance Model (from Slide 4) */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#202020] border border-[#E9E9E7] dark:border-[#2F2F2F] shadow-2xs space-y-5">
            <div>
              <h2 className="text-base font-bold text-[#111827] dark:text-white">
                Mô hình Quản trị Hoạt động — Công ty THACO AUTO Nghệ An
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Phân cấp sở hữu pháp nhân, quản trị điều hành và tổ chức kinh doanh theo Bộ Tài liệu HTQT.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#004B87] text-white">
                  Cấp Tập đoàn
                </span>
                <h3 className="text-sm font-bold text-[#111827] dark:text-white">Khối Bán lẻ THACO AUTO</h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  Quản trị và điều hành hoạt động bán lẻ tại các Công ty THACO AUTO tỉnh thành với vai trò chủ sở hữu.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-700 text-white">
                  Đơn vị Tỉnh thành
                </span>
                <h3 className="text-sm font-bold text-[#111827] dark:text-white">Công ty THACO AUTO Nghệ An</h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  Pháp nhân độc lập thuộc hệ thống THACO AUTO, đóng vai trò chủ sở hữu các Showroom trực thuộc, quản trị toàn diện KD xe & DVPT tại địa bàn và thực hiện nghĩa vụ thuế.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">
                  Điểm bán trực thuộc
                </span>
                <h3 className="text-sm font-bold text-[#111827] dark:text-white">Hệ thống Showroom</h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  Là điểm bán hàng xe và kinh doanh DVPT do Công ty THACO AUTO Nghệ An quản lý trực tiếp.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#262626] border border-gray-200 dark:border-gray-700 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gray-700 text-white">
                  Hợp đồng Đại lý
                </span>
                <h3 className="text-sm font-bold text-[#111827] dark:text-white">Hệ thống Đại lý</h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  Pháp nhân độc lập, điểm bán hàng xe và DVPT được TGĐ THACO AUTO phân công TGĐ Công ty THACO AUTO Nghệ An quản lý theo Hợp đồng Đại lý.
                </p>
              </div>
            </div>
          </div>

          {/* Visio / PDF Structure Upload Notice */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50/70 to-white dark:from-[#1E2633] dark:to-[#1E1E1E] border border-dashed border-blue-300 dark:border-blue-800 space-y-3">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-[#004B87] dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="space-y-1.5">
                <h3 className="text-sm font-bold text-[#111827] dark:text-white">
                  Khu vực hiển thị Sơ đồ Cấu trúc Tổ chức (Visio / PDF / SVG / PNG)
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  Trình duyệt web không hiển thị trực tiếp file gốc Visio (<code>.vsdx</code>). Để sơ đồ cấu trúc hiển thị sắc nét nhất và có thể phóng to/thu nhỏ mượt mà trên website, bạn vui lòng xuất từ Visio sang định dạng <strong>PDF</strong> hoặc <strong>SVG / PNG độ phân giải cao</strong> và gửi lại cho tôi để tích hợp trực tiếp vào mục này theo từng phòng ban.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
