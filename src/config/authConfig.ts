/**
 * Cấu hình Đăng nhập Google (Gmail) & Phân quyền truy cập Website THACO AUTO Nghệ An
 */
export const AUTH_CONFIG = {
  /**
   * Đặt REQUIRE_AUTH = true khi bạn muốn bật bắt buộc đăng nhập Google mới được vào web.
   * Hiện tại để false theo yêu cầu để mọi người vẫn có thể truy cập bình thường.
   */
  REQUIRE_AUTH: false,

  /**
   * Google OAuth 2.0 Web Client ID (tạo tại Google Cloud Console -> APIs & Services -> Credentials).
   */
  GOOGLE_CLIENT_ID: '120189691712-m2tvn40njmc9lp3ttbg3ft4ch1qhvaqq.apps.googleusercontent.com',

  /**
   * Danh sách Gmail Quản trị viên (được phép upload/xóa tài liệu trong Cơ sở dữ liệu và truy cập toàn hệ thống).
   */
  ADMIN_EMAILS: [
    'manhhung.navn@gmail.com',
    'backup.thaco@gmail.com',
    'manhhung.mggm@gmail.com'
  ] as string[],

  /**
   * Danh sách các tài khoản Gmail nhân sự được phép truy cập hệ thống khi bật REQUIRE_AUTH = true.
   */
  ALLOWED_EMAILS: [
    'nmh.workspace@gmail.com',
    'sheepa.reader@gmail.com'
  ] as string[],

  UNAUTHORIZED_MESSAGE: 'Vui lòng liên hệ quản trị viên.'
};

export interface AuthUser {
  email: string;
  name: string;
  picture?: string;
}

export function isAdminUser(email?: string | null): boolean {
  if (!email) return false;
  const normalized = email.trim().toLowerCase();
  return AUTH_CONFIG.ADMIN_EMAILS.some(
    (admin) => admin.trim().toLowerCase() === normalized
  );
}

export function isEmailAuthorized(email: string): boolean {
  const normalized = email.trim().toLowerCase();
  return (
    isAdminUser(normalized) ||
    AUTH_CONFIG.ALLOWED_EMAILS.some(
      (allowed) => allowed.trim().toLowerCase() === normalized
    )
  );
}
