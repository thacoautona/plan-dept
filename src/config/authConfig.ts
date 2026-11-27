/**
 * Cấu hình Đăng nhập (Tài khoản/Mật khẩu nội bộ + Google OAuth) & Phân quyền THACO AUTO Nghệ An
 */

export interface LocalAccount {
  id: string;
  username: string;
  password: string;
  fullName: string;
  department: string;
  role: 'admin' | 'user';
  active: boolean;
  createdAt: string;
}

export const AUTH_CONFIG = {
  /**
   * Đặt REQUIRE_AUTH = true khi bạn muốn bật bắt buộc đăng nhập mới được vào web.
   * Hiện tại để false theo yêu cầu để mọi người vẫn có thể truy cập bình thường.
   */
  REQUIRE_AUTH: false,

  /**
   * Google OAuth 2.0 Web Client ID
   */
  GOOGLE_CLIENT_ID: '120189691712-m2tvn40njmc9lp3ttbg3ft4ch1qhvaqq.apps.googleusercontent.com',

  /**
   * Danh sách Gmail Quản trị viên (toàn quyền upload & mở trang quản trị ngầm).
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

  /**
   * Danh sách tài khoản & mật khẩu nội bộ mặc định do Quản trị viên cấp.
   * Admin có thể tạo/sửa thêm trong giao diện Quản trị ngầm (Ctrl + Shift + A).
   */
  LOCAL_ACCOUNTS: [
    {
      id: 'acc-admin-1',
      username: 'admin.thacona',
      password: 'Thaco@2026',
      fullName: 'Quản trị viên (Trợ lý Kế hoạch)',
      department: 'NVKH',
      role: 'admin',
      active: true,
      createdAt: '2026-11-27'
    }
  ] as LocalAccount[],

  UNAUTHORIZED_MESSAGE: 'Vui lòng liên hệ quản trị viên.'
};

export interface AuthUser {
  email: string;
  name: string;
  picture?: string;
  method?: 'google' | 'local';
  role?: 'admin' | 'user';
  department?: string;
}

export function isAdminUser(userOrEmail?: AuthUser | string | null): boolean {
  if (!userOrEmail) return false;
  if (typeof userOrEmail === 'string') {
    const normalized = userOrEmail.trim().toLowerCase();
    return (
      AUTH_CONFIG.ADMIN_EMAILS.some((a) => a.trim().toLowerCase() === normalized) ||
      AUTH_CONFIG.LOCAL_ACCOUNTS.some(
        (acc) => acc.role === 'admin' && acc.username.toLowerCase() === normalized
      )
    );
  }
  if (userOrEmail.role === 'admin') return true;
  return isAdminUser(userOrEmail.email);
}

export function isEmailAuthorized(emailOrUser: string | AuthUser): boolean {
  if (typeof emailOrUser !== 'string') {
    if (emailOrUser.method === 'local') return true;
    return isEmailAuthorized(emailOrUser.email);
  }
  const normalized = emailOrUser.trim().toLowerCase();
  return (
    isAdminUser(normalized) ||
    AUTH_CONFIG.ALLOWED_EMAILS.some(
      (allowed) => allowed.trim().toLowerCase() === normalized
    )
  );
}
