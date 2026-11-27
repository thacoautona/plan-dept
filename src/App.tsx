import React, { useState, useEffect } from 'react';
import { Sidebar, ActiveTab } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/views/DashboardView';
import { PlanningView } from './components/views/PlanningView';
import { DatabaseView } from './components/views/DatabaseView';
import { GovernanceView } from './components/views/GovernanceView';
import { OrgStructureView } from './components/views/OrgStructureView';
import { DigitalTransformationView } from './components/views/DigitalTransformationView';
import { AuthGate } from './components/AuthGate';
import { AUTH_CONFIG, AuthUser, isEmailAuthorized } from './config/authConfig';
import { CommandPalette } from './components/CommandPalette';
import { PlanDetailModal } from './components/PlanDetailModal';
import { CreateItemModal } from './components/CreateItemModal';

import {
  mockPlanGoals,
  mockGovernanceDocs,
  mockDigitalInitiatives
} from './data/mockData';
import { orgPositionsData } from './data/orgData';
import { PlanGoal, GovernanceDoc, PlanStatus } from './types';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Core Data State
  const [plans, setPlans] = useState<PlanGoal[]>(mockPlanGoals);
  const [docs, setDocs] = useState<GovernanceDoc[]>(mockGovernanceDocs);
  const [digitalList] = useState(mockDigitalInitiatives);

  // Auth State
  const [authUser, setAuthUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem('thaco_na_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isAuthPreview, setIsAuthPreview] = useState(false);

  const handleLogin = (user: AuthUser) => {
    setAuthUser(user);
    try {
      localStorage.setItem('thaco_na_auth_user', JSON.stringify(user));
    } catch {
      // ignore
    }
  };

  const handleLogout = () => {
    setAuthUser(null);
    try {
      localStorage.removeItem('thaco_na_auth_user');
    } catch {
      // ignore
    }
  };

  // Modals & Drawers
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedPlanForDetail, setSelectedPlanForDetail] = useState<PlanGoal | null>(null);

  // Dark Mode Sync
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Keyboard shortcut Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handlers
  const handleSavePlan = (updatedPlan: PlanGoal) => {
    setPlans((prev) => prev.map((p) => (p.id === updatedPlan.id ? updatedPlan : p)));
  };

  const handleUpdatePlanStatus = (planId: string, status: PlanStatus) => {
    setPlans((prev) => prev.map((p) => (p.id === planId ? { ...p, status } : p)));
  };

  const handleAddPlan = (newPlan: PlanGoal) => {
    setPlans((prev) => [newPlan, ...prev]);
  };

  const handleAddDoc = (newDoc: GovernanceDoc) => {
    setDocs((prev) => [newDoc, ...prev]);
  };

  // Export Executive Report as Markdown
  const handleExportReport = () => {
    const totalWeight = plans.reduce((acc, p) => acc + p.weight, 0);
    const weightedProgress =
      plans.reduce((acc, p) => acc + p.progressPct * p.weight, 0) / (totalWeight || 1);

    const reportContent = `# BÁO CÁO TỔNG HỢP KẾ HOẠCH & QUẢN TRỊ ĐIỀU HÀNH
Đơn vị: THACO AUTO Nghệ An | Kỳ báo cáo: Tháng 11/2026
Người lập: Trợ lý Kế hoạch | Ngày xuất: ${new Date().toLocaleDateString('vi-VN')}

---

## I. ĐÁNH GIÁ TIẾN ĐỘ THỰC HIỆN MỤC TIÊU CHUNG
* **Tỷ lệ hoàn thành mục tiêu trọng số**: ${weightedProgress.toFixed(1)}%
* **Tổng số mục tiêu đang theo dõi**: ${plans.length} mục tiêu
  - Hoàn thành: ${plans.filter((p) => p.status === 'completed').length}
  - Đang thực hiện: ${plans.filter((p) => p.status === 'in_progress').length}
  - Có rủi ro / Cần chú ý: ${plans.filter((p) => p.status === 'at_risk').length}

### Chi tiết các chỉ tiêu:
${plans
  .map(
    (p) =>
      `* **[${p.code}] ${p.title}** (${p.department}): Đạt ${p.actualValue}/${p.targetValue} ${p.unit} (${p.progressPct}%). Trạng thái: ${p.status}.\n  - *Ý kiến tham mưu:* ${p.advisoryNote}`
  )
  .join('\n\n')}

---

## II. HỆ THỐNG QUY TRÌNH QUY ĐỊNH
* Tổng số văn bản quy trình, quy định áp dụng: ${docs.length} văn bản
  - Văn bản Quản trị Khung từ VPĐH: ${docs.filter((d) => d.sourceLevel === 'VPDH').length} văn bản
  - Văn bản Ban hành nội bộ THACO AUTO Nghệ An: ${docs.filter((d) => d.sourceLevel === 'NOI_BO').length} văn bản (từ 10 bộ phận nghiệp vụ)

---

## III. DỰ ÁN CHUYỂN ĐỔI SỐ & CẢI TIẾN
${digitalList
  .map(
    (d) =>
      `* **${d.name}** [${d.code}]: Tiến độ ${d.progressPct}%. Hiệu quả: ${d.benefits}`
  )
  .join('\n')}
`;

    const blob = new Blob([reportContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Bao_Cao_Quan_Tri_Ke_Hoach_Thang_11_2026.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const isLockedOut = AUTH_CONFIG.REQUIRE_AUTH && (!authUser || !isEmailAuthorized(authUser.email));

  if (isLockedOut || isAuthPreview) {
    return (
      <AuthGate
        user={authUser}
        onLogin={handleLogin}
        onLogout={handleLogout}
        isPreviewMode={!isLockedOut && isAuthPreview}
        onExitPreview={() => setIsAuthPreview(false)}
      />
    );
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#FBFBFA] dark:bg-[#191919] text-[#37352F] dark:text-[#E3E2E0]">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        stats={{
          plansCount: plans.length,
          docsCount: docs.length,
          digitalCount: digitalList.length
        }}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header Bar */}
        <Header
          activeTab={activeTab}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenCreateModal={() => setIsCreateModalOpen(true)}
          onExportReport={handleExportReport}
          authUser={authUser}
          onOpenAuthPreview={() => setIsAuthPreview(true)}
        />

        {/* Dynamic Content Views with Notion-style inner padding & max-width */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-8 lg:px-12 py-4 max-w-7xl mx-auto w-full">
          {activeTab === 'dashboard' && (
            <DashboardView
              plans={plans}
              docs={docs}
              digitalList={digitalList}
              onNavigateTab={setActiveTab}
              onSelectPlan={setSelectedPlanForDetail}
            />
          )}

          {activeTab === 'planning' && (
            <PlanningView
              plans={plans}
              onSelectPlan={setSelectedPlanForDetail}
              onOpenCreatePlan={() => setIsCreateModalOpen(true)}
              onUpdatePlanStatus={handleUpdatePlanStatus}
            />
          )}

          {activeTab === 'database' && <DatabaseView />}

          {activeTab === 'governance' && (
            <GovernanceView
              docs={docs}
              onOpenCreateDoc={() => setIsCreateModalOpen(true)}
            />
          )}

          {activeTab === 'org' && (
            <OrgStructureView />
          )}

          {activeTab === 'digital' && (
            <DigitalTransformationView
              initiatives={digitalList}
              onOpenCreateModal={() => setIsCreateModalOpen(true)}
            />
          )}
        </main>
      </div>

      {/* Command Palette (Ctrl+K) */}
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        plans={plans}
        docs={docs}
        positions={orgPositionsData}
        digitalProjects={digitalList}
        onSelectTab={setActiveTab}
        onSelectItem={(type, item) => {
          if (type === 'plan') setSelectedPlanForDetail(item);
        }}
      />

      {/* Plan Detail & Advisory Modal */}
      <PlanDetailModal
        plan={selectedPlanForDetail}
        onClose={() => setSelectedPlanForDetail(null)}
        onSave={handleSavePlan}
      />

      {/* Create Item Modal */}
      <CreateItemModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onAddPlan={handleAddPlan}
        onAddDoc={handleAddDoc}
      />
    </div>
  );
}

export default App;
