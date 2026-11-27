import {
  PlanGoal,
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
