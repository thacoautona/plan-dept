/**
 * Cấu hình Đăng nhập Gmail & Phân quyền truy cập Website THACO AUTO Nghệ An
 */
export const AUTH_CONFIG = {
  /**
   * Đặt REQUIRE_AUTH = true khi bạn muốn bật bắt buộc đăng nhập Gmail mới được vào web.
   * Hiện tại để false theo yêu cầu để mọi người vẫn có thể truy cập bình thường.
   */
  REQUIRE_AUTH: false,

  /**
   * Google OAuth 2.0 Web Client ID (tạo tại Google Cloud Console).
   * Khi điền Client ID vào đây, nút "Đăng nhập bằng Google" thật sẽ tự động kích hoạt.
   */
  GOOGLE_CLIENT_ID: '',

  /**
   * Danh sách các tài khoản Gmail được phép truy cập hệ thống (không phân biệt hoa thường).
   */
  ALLOWED_EMAILS: [
    // Thêm các Gmail được cấp quyền vào đây, ví dụ:
    // 'nguyenvana@gmail.com',
  ] as string[],

  UNAUTHORIZED_MESSAGE: 'Vui lòng liên hệ quản trị viên.'
};

export interface AuthUser {
  email: string;
  name: string;
  picture?: string;
}

export function isEmailAuthorized(email: string): boolean {
  const normalized = email.trim().toLowerCase();
  return AUTH_CONFIG.ALLOWED_EMAILS.some(
    (allowed) => allowed.trim().toLowerCase() === normalized
  );
}
