export type DbFileFormat = 'xlsx' | 'pdf' | 'docx' | 'pptx' | 'image' | 'link';

export interface DatabaseFileItem {
  id: string;
  folderId: string;
  subFolderId?: string;
  name: string;
  description: string;
  format: DbFileFormat;
  size?: string;
  updatedAt: string;
  downloadUrl: string;
  isSystemFile?: boolean;
}

export interface DatabaseSubFolder {
  id: string;
  name: string;
  description: string;
}

export interface DatabaseFolder {
  id: string;
  name: string;
  description: string;
  subFolders?: DatabaseSubFolder[];
}

export const DATABASE_FOLDERS: DatabaseFolder[] = [
  {
    id: 'he-thong-bao-cao',
    name: 'Hệ thống báo cáo',
    description: 'Tổng hợp các mẫu biểu, file báo cáo định kỳ và chuyên đề.',
    subFolders: [
      {
        id: 'vpdh-mien',
        name: 'VPĐH & Miền',
        description: 'Báo cáo gửi Văn phòng Điều hành và Khối/Miền.'
      },
      {
        id: 'noi-bo',
        name: 'Nội Bộ',
        description: 'Báo cáo quản trị nội bộ tại THACO AUTO Nghệ An.'
      },
      {
        id: 'chuyen-de',
        name: 'Chuyên Đề',
        description: 'Các báo cáo phân tích, đánh giá chuyên đề.'
      }
    ]
  },
  {
    id: 'tai-lieu-huong-dan',
    name: 'Tài liệu hướng dẫn',
    description: 'Tài liệu đào tạo, hướng dẫn sử dụng phần mềm và nghiệp vụ.'
  },
  {
    id: 'bien-ban-chi-dao',
    name: 'Biên bản, chỉ đạo',
    description: 'Biên bản họp giao ban, thông báo kết luận và văn bản chỉ đạo.'
  },
  {
    id: 'ho-so-phap-ly',
    name: 'Hồ sơ pháp lý',
    description: 'Hồ sơ pháp lý doanh nghiệp, giấy chứng nhận và văn bản ủy quyền của THACO AUTO Nghệ An.',
    subFolders: [
      {
        id: 'dang-ky-kinh-doanh',
        name: 'Đăng ký kinh doanh',
        description: 'Giấy chứng nhận đăng ký doanh nghiệp, đăng ký hoạt động chi nhánh/địa điểm kinh doanh.'
      },
      {
        id: 'giay-uy-quyen',
        name: 'Giấy ủy quyền',
        description: 'Các giấy ủy quyền ký kết hợp đồng, giao dịch và làm việc với cơ quan chức năng.'
      }
    ]
  },
  {
    id: 'layout-csvc',
    name: 'Layout vận hành, cơ sở vật chất',
    description: 'Tài liệu tổ chức vận hành và bản vẽ layout công năng Showroom & Xưởng dịch vụ.',
    subFolders: [
      {
        id: 'to-chuc-van-hanh',
        name: 'Tổ chức vận hành',
        description: 'Tài liệu tổ chức vận hành và bố trí công năng các Showroom (Diễn Châu, Hưng Nguyên, Lê Lợi, Sân Bay).'
      },
      {
        id: 'layout-cong-nang',
        name: 'Layout công năng',
        description: 'Bản vẽ PDF layout công năng, cải tạo Showroom, Xưởng dịch vụ và hạ tầng trạm sạc.'
      }
    ]
  },
  {
    id: 'tai-lieu-khac',
    name: 'Tài liệu khác',
    description: 'Các biểu mẫu, dữ liệu và tài liệu tham khảo bổ sung.'
  }
];

export const SYSTEM_DATABASE_FILES: DatabaseFileItem[] = [
  // Tổ chức vận hành (4 PPTX)
  {
    id: 'sys-tcvh-dc',
    folderId: 'layout-csvc',
    subFolderId: 'to-chuc-van-hanh',
    name: 'Tổ chức vận hành & Layout công năng — Showroom Diễn Châu',
    description: 'Sơ đồ tổ chức vận hành nhân sự và bố trí layout công năng tại Showroom Diễn Châu.',
    format: 'pptx',
    size: '2.09 MB',
    updatedAt: '02/04/2026',
    downloadUrl: './files/layout-csvc/to-chuc-van-hanh-sr-dien-chau.pptx',
    isSystemFile: true
  },
  {
    id: 'sys-tcvh-hn',
    folderId: 'layout-csvc',
    subFolderId: 'to-chuc-van-hanh',
    name: 'Tổ chức vận hành & Layout công năng — Showroom Hưng Nguyên',
    description: 'Sơ đồ tổ chức vận hành nhân sự và bố trí layout công năng tại Showroom Hưng Nguyên.',
    format: 'pptx',
    size: '9.99 MB',
    updatedAt: '04/04/2026',
    downloadUrl: './files/layout-csvc/to-chuc-van-hanh-sr-hung-nguyen.pptx',
    isSystemFile: true
  },
  {
    id: 'sys-tcvh-ll',
    folderId: 'layout-csvc',
    subFolderId: 'to-chuc-van-hanh',
    name: 'Tổ chức vận hành & Layout công năng — Showroom Lê Lợi',
    description: 'Sơ đồ tổ chức vận hành nhân sự và bố trí layout công năng tại Showroom Lê Lợi.',
    format: 'pptx',
    size: '20.44 MB',
    updatedAt: '07/04/2026',
    downloadUrl: './files/layout-csvc/to-chuc-van-hanh-sr-le-loi.pptx',
    isSystemFile: true
  },
  {
    id: 'sys-tcvh-sb',
    folderId: 'layout-csvc',
    subFolderId: 'to-chuc-van-hanh',
    name: 'Tổ chức vận hành & Layout công năng — Showroom Sân Bay',
    description: 'Sơ đồ tổ chức vận hành nhân sự và bố trí layout công năng tại Showroom Sân Bay.',
    format: 'pptx',
    size: '19.78 MB',
    updatedAt: '15/10/2026',
    downloadUrl: './files/layout-csvc/to-chuc-van-hanh-sr-san-bay.pptx',
    isSystemFile: true
  },

  // Layout công năng (4 PDF)
  {
    id: 'sys-lcn-ll',
    folderId: 'layout-csvc',
    subFolderId: 'layout-cong-nang',
    name: 'Layout cải tạo Showroom & Xưởng dịch vụ — Lê Lợi',
    description: 'Bản vẽ thiết kế cơ bản (TKCB) cải tạo Showroom và Xưởng dịch vụ Lê Lợi.',
    format: 'pdf',
    size: '2.29 MB',
    updatedAt: '15/12/2025',
    downloadUrl: './files/layout-csvc/layout-cai-tao-sr-xdv-le-loi.pdf',
    isSystemFile: true
  },
  {
    id: 'sys-lcn-dc',
    folderId: 'layout-csvc',
    subFolderId: 'layout-cong-nang',
    name: 'Layout cải tạo Xưởng dịch vụ — Showroom Diễn Châu',
    description: 'Bản vẽ thiết kế sơ bộ (TKSB) cải tạo Xưởng dịch vụ Showroom KMP Tải Bus Diễn Châu.',
    format: 'pdf',
    size: '1.89 MB',
    updatedAt: '15/12/2025',
    downloadUrl: './files/layout-csvc/layout-cai-tao-xdv-dien-chau.pdf',
    isSystemFile: true
  },
  {
    id: 'sys-lcn-vinh',
    folderId: 'layout-csvc',
    subFolderId: 'layout-cong-nang',
    name: 'Layout thi công móng trạm sạc — Cụm Showroom Du lịch Vinh',
    description: 'Bản vẽ thi công móng trạm sạc và cấp nguồn điện tại Cụm Showroom Du lịch Vinh.',
    format: 'pdf',
    size: '5.31 MB',
    updatedAt: '15/12/2025',
    downloadUrl: './files/layout-csvc/layout-tram-sac-cum-sr-dl-vinh.pdf',
    isSystemFile: true
  },
  {
    id: 'sys-lcn-hn',
    folderId: 'layout-csvc',
    subFolderId: 'layout-cong-nang',
    name: 'Layout cải tạo Showroom Tải Bus & Xưởng dịch vụ — Hưng Nguyên',
    description: 'Bản vẽ thiết kế sơ bộ (TKSB) cải tạo Showroom Tải Bus và Xưởng dịch vụ Hưng Nguyên.',
    format: 'pdf',
    size: '6.66 MB',
    updatedAt: '15/12/2025',
    downloadUrl: './files/layout-csvc/layout-cai-tao-srtb-xdv-hung-nguyen.pdf',
    isSystemFile: true
  }
];
