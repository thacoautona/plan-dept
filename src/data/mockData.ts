import {
  PlanGoal,
  OrgDepartment,
  RACIMatrixItem,
  DigitalInitiative
} from '../types';

export { mockGovernanceDocs } from './governanceData';

export const mockPlanGoals: PlanGoal[] = [
  {
    id: 'goal-1',
    code: 'KH-KD-01',
    title: 'Hoàn thành chỉ tiêu doanh số bán xe Du lịch (Kia, Mazda, Peugeot) Tháng 11/2026',
    department: 'PKD-PC',
    owner: 'Nguyễn Văn Minh (Trưởng phòng KD PC)',
    period: 'Tháng 11/2026',
    targetValue: 120,
    actualValue: 102,
    unit: 'xe',
    weight: 30,
    progressPct: 85,
    status: 'at_risk',
    priority: 'urgent',
    deadline: '2026-11-30',
    advisoryNote: 'Đề xuất tăng cường chương trình lái thử cuối tuần tại các huyện vệ tinh Nghệ An (Diễn Châu, Đô Lương, Hoàng Mai), phối hợp phòng Marketing đẩy mạnh ưu đãi lãi suất vay qua ngân hàng đối tác; rà soát lại 25 khách hàng hot trong phễu chốt cọc trước ngày 28/11.',
    lastUpdated: '2026-11-26',
    actionItems: [
      { id: 'act-1', task: 'Tổ chức sự kiện lái thử tại Showroom Trung tâm TP. Vinh', assignee: 'Đội bán hàng PC', isDone: true, dueDate: '2026-11-22' },
      { id: 'act-2', task: 'Đôn đốc giải ngân hồ sơ vay của 15 khách hàng đã ký hợp đồng', assignee: 'Admin Bán hàng', isDone: false, dueDate: '2026-11-28' },
      { id: 'act-3', task: 'Báo cáo hàng ngày lượng hợp đồng ký mới lên Ban Giám đốc', assignee: 'Trợ lý Kế hoạch', isDone: false, dueDate: '2026-11-30' }
    ]
  },
  {
    id: 'goal-2',
    code: 'KH-KD-02',
    title: 'Doanh số bàn giao xe Thương mại (Foton, Thaco Bus, Towner) Tháng 11/2026',
    department: 'PKD-CV',
    owner: 'Trần Đình Trọng (Trưởng phòng KD CV)',
    period: 'Tháng 11/2026',
    targetValue: 45,
    actualValue: 43,
    unit: 'xe',
    weight: 25,
    progressPct: 95.5,
    status: 'in_progress',
    priority: 'high',
    deadline: '2026-11-30',
    advisoryNote: 'Tiến độ rất khả quan tại thị trường Nghệ An. Đề xuất chuẩn bị sẵn hồ sơ đăng ký biển số và kiểm tra PDI trước giao xe để tránh ùn ứ ngày 29-30/11.',
    lastUpdated: '2026-11-27',
    actionItems: [
      { id: 'act-4', task: 'Nghiệm thu lô 10 xe Towner cho khách hàng dự án logistic KCN VSIP Nghệ An', assignee: 'Tổ dự án CV', isDone: true, dueDate: '2026-11-25' },
      { id: 'act-5', task: 'Kiểm tra tiến độ đóng thùng xe chuyên dụng tại nhà máy Chu Lai', assignee: 'Phòng Kế hoạch', isDone: true, dueDate: '2026-11-26' }
    ]
  },
  {
    id: 'goal-3',
    code: 'KH-DV-01',
    title: 'Doanh thu dịch vụ sửa chữa và phụ tùng chính hãng Q4/2026',
    department: 'PDV',
    owner: 'Lê Hoàng Nam (Trưởng phòng Dịch vụ)',
    period: 'Quý 4/2026',
    targetValue: 4.5,
    actualValue: 3.8,
    unit: 'Tỷ VNĐ',
    weight: 20,
    progressPct: 84.4,
    status: 'in_progress',
    priority: 'high',
    deadline: '2026-12-31',
    advisoryNote: 'Tỷ lệ khách hàng quay lại bảo dưỡng định kỳ đạt 78% (mục tiêu 82%). Tham mưu triển khai tin nhắn Zalo ZNS nhắc bảo dưỡng tự động đối với các xe đến kỳ hạn 5.000km và 10.000km.',
    lastUpdated: '2026-11-25',
    actionItems: [
      { id: 'act-6', task: 'Gọi điện chăm sóc khách hàng sau bảo dưỡng đạt 100% trong 48h', assignee: 'Tổ CSKH Dịch vụ', isDone: true, dueDate: '2026-11-20' },
      { id: 'act-7', task: 'Bổ sung danh mục phụ tùng tiêu hao nhanh tránh đứt hàng mùa cao điểm', assignee: 'Quản lý Kho Phụ tùng', isDone: false, dueDate: '2026-12-05' }
    ]
  },
  {
    id: 'goal-4',
    code: 'KH-TC-01',
    title: 'Kiểm soát tỷ lệ Chi phí vận hành trên Doanh thu (OPEX/REV) dưới mức trần 4.2%',
    department: 'PTC',
    owner: 'Phạm Thị Thảo (Kế toán trưởng)',
    period: 'Tháng 11/2026',
    targetValue: 4.2,
    actualValue: 3.9,
    unit: '%',
    weight: 15,
    progressPct: 100,
    status: 'completed',
    priority: 'medium',
    deadline: '2026-11-30',
    advisoryNote: 'Đã tối ưu hóa chi phí điện chiếu sáng Showroom và nhiên liệu xe demo theo quy chế mới ban hành; kiểm soát chặt chẽ các khoản tạm ứng công tác.',
    lastUpdated: '2026-11-26',
    actionItems: [
      { id: 'act-8', task: 'Kiểm toán chi phí văn phòng phẩm và điện thoại các phòng ban', assignee: 'Kế toán quản trị', isDone: true, dueDate: '2026-11-20' }
    ]
  },
  {
    id: 'goal-5',
    code: 'KH-QT-01',
    title: 'Hoàn thành rà soát & chuẩn hóa 100% quy trình tác nghiệp nội bộ đơn vị',
    department: 'PKH',
    owner: 'Trợ lý Kế hoạch (Chủ trì)',
    period: 'Tháng 11/2026',
    targetValue: 18,
    actualValue: 15,
    unit: 'quy trình',
    weight: 10,
    progressPct: 83.3,
    status: 'in_progress',
    priority: 'high',
    deadline: '2026-11-30',
    advisoryNote: 'Còn 3 quy trình phối hợp giữa Kho phụ tùng và Xưởng dịch vụ đang trong vòng lấy ý kiến đóng góp, dự kiến trình Giám đốc ký ban hành ngày 29/11.',
    lastUpdated: '2026-11-27',
    actionItems: [
      { id: 'act-9', task: 'Họp thống nhất luồng điều chuyển phụ tùng liên showroom', assignee: 'Trợ lý Kế hoạch & Trưởng phòng DV', isDone: true, dueDate: '2026-11-24' },
      { id: 'act-10', task: 'Trình ký ban hành QĐ sửa đổi SOP Quản lý vật tư tiêu hao', assignee: 'Trợ lý Kế hoạch', isDone: false, dueDate: '2026-11-29' }
    ]
  }
];

export const mockOrgDepartments: OrgDepartment[] = [
  {
    id: 'bgd',
    code: 'BGD',
    name: 'Ban Giám Đốc Công Ty',
    headName: 'Đặng Thế Hoàng',
    headTitle: 'Giám đốc THACO AUTO Nghệ An',
    headEmail: 'hoang.dangthe@thaco.com.vn',
    personnelCount: 3,
    mainFunction: 'Lãnh đạo, điều hành toàn diện hoạt động sản xuất kinh doanh, dịch vụ và quản trị tuân thủ tại địa bàn Nghệ An theo ủy quyền của Tập đoàn.',
    keyDuties: [
      'Phê duyệt kế hoạch SXKD tháng, quý, năm và chiến lược phân bổ nguồn lực',
      'Chỉ đạo công tác đối ngoại, chính quyền địa phương và quan hệ đối tác',
      'Đánh giá hiệu quả công việc các Trưởng phòng và chuẩn y các quyết định quản trị'
    ]
  },
  {
    id: 'pkh',
    code: 'NVKH',
    name: 'Phòng Kế Hoạch & Quản Trị',
    parentDeptId: 'bgd',
    headName: 'Vũ Quốc Khánh',
    headTitle: 'Trưởng phòng Kế hoạch (Trợ lý điều hành)',
    headEmail: 'khanh.vuquoc@thaco.com.vn',
    personnelCount: 5,
    mainFunction: 'Đầu mối tham mưu chiến lược, lập kế hoạch, tổng hợp số liệu điều hành, chuẩn hóa hệ thống quy trình quy định, kiểm soát tuân thủ và chuyển đổi số tại THACO AUTO Nghệ An.',
    keyDuties: [
      'Tổng hợp, theo dõi và đánh giá tỷ lệ hoàn thành mục tiêu SXKD của đơn vị',
      'Chủ động đề xuất các giải pháp tháo gỡ khó khăn, nâng cao năng suất vận hành',
      'Biên soạn, cập nhật tài liệu quản trị và kiểm tra việc chấp hành quy trình nội bộ',
      'Đầu mối thúc đẩy triển khai các dự án chuyển đổi số và tự động hóa tại đơn vị'
    ]
  },
  {
    id: 'pkd-pc',
    code: 'KDDL',
    name: 'Kinh Doanh Xe Du Lịch',
    parentDeptId: 'bgd',
    headName: 'Nguyễn Văn Minh',
    headTitle: 'Trưởng phòng Kinh doanh PC',
    headEmail: 'minh.nguyenvan@thaco.com.vn',
    personnelCount: 28,
    mainFunction: 'Tổ chức bán hàng, phát triển thị phần xe du lịch các thương hiệu Kia, Mazda, Peugeot, BMW tại Nghệ An.',
    keyDuties: [
      'Thực hiện chỉ tiêu doanh số bán lẻ xe du lịch hàng tháng',
      'Quản lý đội ngũ Tư vấn bán hàng và hoạt động tiếp thị tại showroom TP. Vinh',
      'Theo dõi tiến độ ký hợp đồng, thu tiền và chăm sóc khách hàng mới'
    ]
  },
  {
    id: 'pkd-cv',
    code: 'KDTB',
    name: 'Kinh Doanh Xe Tải & Bus',
    parentDeptId: 'bgd',
    headName: 'Trần Đình Trọng',
    headTitle: 'Trưởng phòng Kinh doanh CV',
    headEmail: 'trong.trandinh@thaco.com.vn',
    personnelCount: 16,
    mainFunction: 'Phát triển thị trường xe thương mại, xe tải nhẹ, xe tải nặng và xe buýt, phục vụ khách hàng cá nhân và doanh nghiệp vận tải.',
    keyDuties: [
      'Khai thác khách hàng doanh nghiệp vận tải, logistics, dự án đầu tư công tại Nghệ An & Hà Tĩnh',
      'Tư vấn quy cách thùng xe chuyên dụng phù hợp yêu cầu đăng kiểm',
      'Đạt chỉ tiêu doanh số và thu hồi công nợ xe thương mại'
    ]
  },
  {
    id: 'pdv',
    code: 'DVD',
    name: 'Kinh Doanh Dịch Vụ Phụ Tùng Du Lịch',
    parentDeptId: 'bgd',
    headName: 'Lê Hoàng Nam',
    headTitle: 'Trưởng phòng Dịch vụ DL',
    headEmail: 'nam.lehoang@thaco.com.vn',
    personnelCount: 35,
    mainFunction: 'Vận hành xưởng dịch vụ sửa chữa, bảo dưỡng định kỳ và cung ứng phụ tùng chính phẩm xe du lịch.',
    keyDuties: [
      'Đạt doanh thu dịch vụ và tỷ lệ hài lòng khách hàng sau dịch vụ (CSI > 95%)',
      'Đảm bảo an toàn lao động, tiêu chuẩn kỹ thuật tay nghề thợ sửa chữa',
      'Quản lý tồn kho phụ tùng hợp lý, tránh thất thoát và tồn đọng vốn'
    ]
  },
  {
    id: 'ptc',
    code: 'TCKT',
    name: 'Phòng Tài Chính - Kế Toán',
    parentDeptId: 'bgd',
    headName: 'Phạm Thị Thảo',
    headTitle: 'Kế toán trưởng',
    headEmail: 'thao.phamthi@thaco.com.vn',
    personnelCount: 8,
    mainFunction: 'Quản lý dòng tiền, kiểm soát chi phí vận hành, hạch toán kế toán và tuân thủ nghĩa vụ thuế.',
    keyDuties: [
      'Lập báo cáo tài chính, báo cáo quản trị chi phí định kỳ',
      'Kiểm soát giải ngân hợp đồng vay mua xe và thủ tục thanh toán nhà cung cấp',
      'Giám sát định mức chi phí và cảnh báo vượt ngân sách'
    ]
  },
  {
    id: 'pnv',
    code: 'HCNS',
    name: 'Nhân Sự & Quản Trị Văn Phòng',
    parentDeptId: 'bgd',
    headName: 'Đỗ Thị Mai',
    headTitle: 'Trưởng phòng NS-HC',
    headEmail: 'mai.dothi@thaco.com.vn',
    personnelCount: 9,
    mainFunction: 'Quản trị nhân sự, tiền lương, đào tạo nội bộ, an sinh và môi trường làm việc.',
    keyDuties: [
      'Tuyển dụng và điều phối nhân sự đáp ứng kế hoạch kinh doanh',
      'Tổ chức đào tạo nghiệp vụ và kiểm tra đánh giá tay nghề định kỳ',
      'Quản lý tài sản công ty, xe đưa đón và giám sát vệ sinh 5S'
    ]
  }
];

export const mockRACIMatrix: RACIMatrixItem[] = [
  {
    processName: 'Xây dựng kế hoạch SXKD tháng / quý',
    category: 'Quản trị kế hoạch',
    roles: { BGD: 'A', NVKH: 'R', KDDL: 'C', KDTB: 'C', DVD: 'C', TCKT: 'C', HCNS: 'I' }
  },
  {
    processName: 'Theo dõi, đánh giá & báo cáo tiến độ KPI tuần',
    category: 'Quản trị kế hoạch',
    roles: { BGD: 'I', NVKH: 'R', KDDL: 'C', KDTB: 'C', DVD: 'C', TCKT: 'C', HCNS: 'I' }
  },
  {
    processName: 'Tham mưu giải pháp nâng cao tỷ lệ hoàn thành',
    category: 'Quản trị kế hoạch',
    roles: { BGD: 'A', NVKH: 'R', KDDL: 'C', KDTB: 'C', DVD: 'C', TCKT: 'I', HCNS: 'I' }
  },
  {
    processName: 'Biên soạn, sửa đổi Quy trình tác nghiệp (SOP)',
    category: 'Tài liệu quản trị',
    roles: { BGD: 'A', NVKH: 'R', KDDL: 'C', KDTB: 'C', DVD: 'C', TCKT: 'C', HCNS: 'C' }
  },
  {
    processName: 'Tổ chức đào tạo & phổ biến quy trình mới',
    category: 'Tài liệu quản trị',
    roles: { BGD: 'I', NVKH: 'A', KDDL: 'I', KDTB: 'I', DVD: 'I', TCKT: 'I', HCNS: 'R' }
  },
  {
    processName: 'Kiểm tra tuân thủ quy trình & lập báo cáo CAPA',
    category: 'Kiểm soát tuân thủ',
    roles: { BGD: 'A', NVKH: 'R', KDDL: 'I', KDTB: 'I', DVD: 'I', TCKT: 'I', HCNS: 'I' }
  },
  {
    processName: 'Triển khai dự án Số hóa & Công cụ phần mềm mới',
    category: 'Chuyển đổi số',
    roles: { BGD: 'A', NVKH: 'R', KDDL: 'C', KDTB: 'C', DVD: 'C', TCKT: 'C', HCNS: 'C' }
  }
];

export const mockDigitalInitiatives: DigitalInitiative[] = [
  {
    id: 'dig-1',
    code: 'DX-BI-01',
    name: 'Dashboard Giám sát Kế hoạch & Doanh số Realtime',
    category: 'dashboard_bi',
    champion: 'Trợ lý Kế hoạch (Chủ nhiệm dự án)',
    status: 'pilot',
    progressPct: 80,
    startDate: '2026-10-01',
    targetDate: '2026-12-15',
    benefits: 'Cập nhật trực quan tiến độ kinh doanh và các chỉ tiêu trọng yếu tại Nghệ An, tự động hóa cảnh báo chỉ tiêu trễ hạn.',
    metrics: [
      { label: 'Thời gian tổng hợp báo cáo', val: 'Giảm từ 4h xuống 15 phút' },
      { label: 'Độ trễ số liệu', val: 'Từ 1 ngày thành Cập nhật mỗi 2 giờ' }
    ]
  },
  {
    id: 'dig-2',
    code: 'DX-APP-02',
    name: 'Số hóa Thư viện Tài liệu & Tra cứu Quy trình qua Web',
    category: 'paperless',
    champion: 'Phòng Kế hoạch & Đội IT',
    status: 'trien_khai',
    progressPct: 65,
    startDate: '2026-11-01',
    targetDate: '2026-12-30',
    benefits: 'Xóa bỏ việc in ấn văn bản giấy, nhân viên tra cứu quy chế, biểu mẫu chuẩn xác chỉ trong vài giây qua thanh tìm kiếm.',
    metrics: [
      { label: 'Chi phí giấy in & lưu trữ', val: 'Tiết kiệm ~45 triệu VNĐ/năm' },
      { label: 'Tỷ lệ áp dụng biểu mẫu chuẩn', val: 'Tăng lên 99%' }
    ]
  },
  {
    id: 'dig-3',
    code: 'DX-AUTO-03',
    name: 'Tự động hóa Checklist Kiểm soát Tuân thủ 5S & Vận hành',
    category: 'automation',
    champion: 'Trợ lý Kế hoạch & Chuyên viên An toàn',
    status: 'khao_sat',
    progressPct: 35,
    startDate: '2026-11-15',
    targetDate: '2027-01-20',
    benefits: 'Đánh giá chấm điểm trực tiếp trên máy tính bảng/điện thoại, tự động xuất biên bản CAPA khi phát hiện điểm lỗi.',
    metrics: [
      { label: 'Thời gian lập biên bản kiểm tra', val: 'Rút ngắn 70%' },
      { label: 'Theo dõi tiến độ khắc phục', val: 'Theo vết 100% không sót lỗi' }
    ]
  }
];
