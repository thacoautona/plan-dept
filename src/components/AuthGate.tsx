import React, { useEffect, useRef, useState } from 'react';
import { LogOut, ShieldAlert, ArrowLeft, AlertCircle } from 'lucide-react';
import { AUTH_CONFIG, AuthUser, isEmailAuthorized } from '../config/authConfig';

interface AuthGateProps {
  user: AuthUser | null;
  onLogin: (user: AuthUser) => void;
  onLogout: () => void;
  isPreviewMode?: boolean;
  onExitPreview?: () => void;
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
          }) => void;
          renderButton: (
            parent: HTMLElement,
            options: { theme?: string; size?: string; width?: number; text?: string }
          ) => void;
        };
      };
    };
  }
}

function decodeJwtPayload(token: string): { email?: string; name?: string; picture?: string } {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return {};
  }
}

export const AuthGate: React.FC<AuthGateProps> = ({
  user,
  onLogin,
  onLogout,
  isPreviewMode,
  onExitPreview
}) => {
  const googleBtnRef = useRef<HTMLDivElement | null>(null);
  const [showSetupHint, setShowSetupHint] = useState(false);

  useEffect(() => {
    if (!user && AUTH_CONFIG.GOOGLE_CLIENT_ID && window.google?.accounts?.id && googleBtnRef.current) {
      window.google.accounts.id.initialize({
        client_id: AUTH_CONFIG.GOOGLE_CLIENT_ID,
        callback: (res) => {
          const payload = decodeJwtPayload(res.credential);
          if (payload.email) {
            onLogin({
              email: payload.email,
              name: payload.name || payload.email,
              picture: payload.picture
            });
          }
        }
      });
      window.google.accounts.id.renderButton(googleBtnRef.current, {
        theme: 'outline',
        size: 'large',
        width: 310,
        text: 'signin_with'
      });
    }
  }, [user, onLogin]);

  // Case 1: Logged in with Google, but NOT in ALLOWED_EMAILS / ADMIN_EMAILS
  if (user && !isEmailAuthorized(user.email)) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#FBFBFA] dark:bg-[#191919] px-4">
        <div className="max-w-md w-full p-8 rounded-2xl bg-white dark:bg-[#202020] border border-[#E9E9E7] dark:border-[#2F2F2F] shadow-xl text-center space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-7 h-7 text-amber-600 dark:text-amber-400" />
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-[#111827] dark:text-white">
              Xin chào, {user.name}!
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
              ({user.email})
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed pt-1">
              Tài khoản Gmail của bạn hiện chưa được cấp quyền truy cập vào Hệ thống Quản trị THACO AUTO Nghệ An.
            </p>
            <p className="text-sm font-semibold text-[#004B87] dark:text-blue-400 pt-1">
              {AUTH_CONFIG.UNAUTHORIZED_MESSAGE}
            </p>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <button
              onClick={onLogout}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold bg-gray-100 hover:bg-gray-200 dark:bg-[#2A2A2A] dark:hover:bg-[#333] text-gray-700 dark:text-gray-200 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Đăng xuất / Đổi tài khoản Google khác
            </button>

            {isPreviewMode && onExitPreview && (
              <button
                onClick={onExitPreview}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl text-xs font-medium text-[#004B87] dark:text-blue-400 hover:underline"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Quay lại chế độ xem mở (chưa khóa)
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Case 2: Not logged in yet -> Official Google Sign-In
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#FBFBFA] dark:bg-[#191919] px-4">
      <div className="max-w-md w-full p-8 rounded-2xl bg-white dark:bg-[#202020] border border-[#E9E9E7] dark:border-[#2F2F2F] shadow-xl text-center space-y-6">
        <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-[#2A2A2A] border border-blue-100 dark:border-gray-700 flex items-center justify-center mx-auto p-2">
          <img src="./increase.png" alt="THACO AUTO Nghệ An" className="w-full h-full object-contain" />
        </div>

        <div className="space-y-1.5">
          <h1 className="text-xl font-bold text-[#111827] dark:text-white">
            THACO AUTO Nghệ An
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            Hệ thống Quản trị Kế hoạch & Điều hành — Đăng nhập bằng tài khoản Google (Gmail) của bạn để xác thực quyền truy cập.
          </p>
        </div>

        {AUTH_CONFIG.GOOGLE_CLIENT_ID ? (
          <div className="flex justify-center" ref={googleBtnRef} />
        ) : (
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => setShowSetupHint(true)}
              className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl bg-white dark:bg-[#2A2A2A] border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-[#333] text-xs font-semibold text-gray-700 dark:text-gray-100 shadow-2xs transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Đăng nhập bằng Google (Gmail)
            </button>

            {showSetupHint && (
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 text-left text-[11px] text-amber-800 dark:text-amber-200 space-y-1">
                <div className="flex items-center gap-1.5 font-semibold">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  Chưa gắn Google OAuth Client ID
                </div>
                <p className="leading-relaxed">
                  Để bật cửa sổ đăng nhập Google thật (nhập Gmail & mật khẩu Google), cần tạo <strong>OAuth Client ID</strong> trên Google Cloud Console cho domain <code>https://thacoautona.github.io</code> và điền vào <code>GOOGLE_CLIENT_ID</code> trong <code>src/config/authConfig.ts</code>.
                </p>
              </div>
            )}
          </div>
        )}

        {isPreviewMode && onExitPreview && (
          <button
            onClick={onExitPreview}
            className="w-full flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl text-xs font-medium text-gray-500 hover:text-[#004B87] dark:text-gray-400"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Thoát xem thử (truy cập mở hiện tại)
          </button>
        )}
      </div>
    </div>
  );
};
