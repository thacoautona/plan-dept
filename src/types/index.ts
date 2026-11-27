export type PlanStatus = 'not_started' | 'in_progress' | 'at_risk' | 'completed';
export type PriorityLevel = 'urgent' | 'high' | 'medium' | 'low';

export interface PlanGoal {
  id: string;
  code: string;
  title: string;
  department: string;
  owner: string;
  period: string; // e.g., 'Tháng 11/2026', 'Quý 4/2026', 'Năm 2026'
  targetValue: number;
  actualValue: number;
  unit: string;
  weight: number; // Tỷ trọng %
  progressPct: number;
  status: PlanStatus;
  priority: PriorityLevel;
  deadline: string;
  advisoryNote: string; // Ý kiến tham mưu / Giải pháp nâng cao tỷ lệ hoàn thành
  lastUpdated: string;
  actionItems: {
    id: string;
    task: string;
    assignee: string;
    isDone: boolean;
    dueDate: string;
  }[];
}

export type DocCategory = 'quy_che' | 'quy_dinh' | 'quy_trinh' | 'huong_dan' | 'thong_bao' | 'bieu_mau';
export type DocSourceLevel = 'VPDH' | 'NOI_BO';

export interface GovernanceDoc {
  id: string;
  stt: number;
  code: string; // Số hiệu (VD: 02/2023)
  title: string; // Tên quy trình / quy định
  sourceLevel: DocSourceLevel; // VPDH hoặc NOI_BO
  sourceLabel: string; // Văn phòng Điều hành (VPĐH) hoặc THACO AUTO Nghệ An
  department: string; // KDDL, KDTB, DVD, DVTB, QSD, TCKT, HCNS, NVKH, MKT, NVCN, VPDH
  departmentName: string; // Tên đầy đủ
  approvedBy: string; // Người phê duyệt (TGĐ Cty, PCT TT...)
  effectiveDate: string; // Ngày ban hành
  category: DocCategory;
  categoryLabel: string; // Thông báo, Quy định, Hướng dẫn...
  coordination?: string; // Phối hợp thực hiện
  issueType?: string; // Ban hành mới theo thực tế...
  notes?: string;
  driveLink: string; // Link xem nội dung trên Google Drive (Cột M)
  summary: string; // Tóm tắt 1-2 câu nội dung văn bản
}

export interface OrgDepartment {
  id: string;
  code: string;
  name: string;
  parentDeptId?: string;
  headName: string;
  headTitle: string;
  headEmail: string;
  personnelCount: number;
  mainFunction: string;
  keyDuties: string[];
}

export interface RACIMatrixItem {
  processName: string;
  category: string;
  roles: {
    [deptCode: string]: 'R' | 'A' | 'C' | 'I' | '-';
  };
}

export interface DigitalInitiative {
  id: string;
  name: string;
  code: string;
  category: 'automation' | 'dashboard_bi' | 'paperless' | 'erp_integration';
  champion: string;
  status: 'khao_sat' | 'trien_khai' | 'pilot' | 'hoan_thanh';
  progressPct: number;
  startDate: string;
  targetDate: string;
  benefits: string;
  metrics: {
    label: string;
    val: string;
  }[];
}
