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

export type DocCategory = 'quy_che' | 'quy_dinh' | 'quy_trinh' | 'huong_dan' | 'bieu_mau';
export type DocStatus = 'active' | 'under_review' | 'draft' | 'archived';

export interface GovernanceDoc {
  id: string;
  code: string;
  title: string;
  category: DocCategory;
  department: string;
  version: string;
  effectiveDate: string;
  status: DocStatus;
  scope: string;
  summary: string;
  fileFormat: 'pdf' | 'docx' | 'xlsx' | 'link';
  fileSize?: string;
  tags: string[];
}

export interface ComplianceChecklistItem {
  id: string;
  processCode: string;
  processName: string;
  department: string;
  checkContent: string;
  standard: string;
  result: 'compliant' | 'non_compliant' | 'minor_issue';
  findingNote: string;
  capaAction?: string; // Corrective & Preventive Action
  deadline?: string;
  responsiblePerson?: string;
  status: 'open' | 'in_progress' | 'verified';
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
