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
    id: 'layout-csvc',
    name: 'Layout vận hành, cơ sở vật chất',
    description: 'Bản vẽ layout showroom, xưởng dịch vụ và tiêu chuẩn CSVC.'
  },
  {
    id: 'tai-lieu-khac',
    name: 'Tài liệu khác',
    description: 'Các biểu mẫu, dữ liệu và tài liệu tham khảo bổ sung.'
  }
];
