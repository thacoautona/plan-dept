import React, { useEffect, useRef, useState } from 'react';
import { LogOut, ShieldAlert, ArrowLeft, User, Lock, Eye, EyeOff } from 'lucide-react';
import { AUTH_CONFIG, AuthUser, isEmailAuthorized } from '../config/authConfig';
import { authenticateLocal } from '../utils/activityLogger';

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
  const [gsiReady, setGsiReady] = useState(false);

  // Local account login form
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    if (user || !AUTH_CONFIG.GOOGLE_CLIENT_ID) return;

    const initGoogle = () => {
      if (window.google?.accounts?.id && googleBtnRef.current) {
        window.google.accounts.id.initialize({
          client_id: AUTH_CONFIG.GOOGLE_CLIENT_ID,
          callback: (res) => {
            const payload = decodeJwtPayload(res.credential);
            if (payload.email) {
              onLogin({
                email: payload.email,
                name: payload.name || payload.email,
                picture: payload.picture,
                method: 'google'
              });
            }
          }
        });
        googleBtnRef.current.innerHTML = '';
        window.google.accounts.id.renderButton(googleBtnRef.current, {
          theme: 'outline',
          size: 'large',
          width: 310,
          text: 'signin_with'
        });
        setGsiReady(true);
        return true;
      }
      return false;
    };

    if (initGoogle()) return;

    const interval = setInterval(() => {
      if (initGoogle()) {
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [user, onLogin]);

  const handleLocalLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const matched = authenticateLocal(username, password);
    if (!matched) {
      setLoginError('Tài khoản hoặc mật khẩu không chính xác.');
      return;
    }
    onLogin({
      email: matched.username,
      name: matched.fullName,
      method: 'local',
      role: matched.role,
      department: matched.department
    });
  };

  // Case 1: Logged in with Google, but NOT in ALLOWED_EMAILS / ADMIN_EMAILS
  if (user && !isEmailAuthorized(user)) {
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
              Tài khoản của bạn hiện chưa được cấp quyền truy cập vào Hệ thống Quản trị THACO AUTO Nghệ An.
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
              Đăng xuất / Đổi tài khoản khác
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

  // Case 2: Login Screen (Username/Password first, then Google Sign-In)
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#FBFBFA] dark:bg-[#191919] px-4">
      <div className="max-w-md w-full p-8 rounded-2xl bg-white dark:bg-[#202020] border border-[#E9E9E7] dark:border-[#2F2F2F] shadow-xl space-y-5">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-[#2A2A2A] border border-blue-100 dark:border-gray-700 flex items-center justify-center mx-auto p-2">
            <img src="./increase.png" alt="THACO AUTO Nghệ An" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-xl font-bold text-[#111827] dark:text-white">
            THACO AUTO Nghệ An
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Hệ thống Quản trị Kế hoạch & Điều hành
          </p>
        </div>

        {/* Method 1: Username & Password */}
        <form onSubmit={handleLocalLogin} className="space-y-3 text-xs">
          <div>
            <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Tài khoản
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nhập tên tài khoản được cấp..."
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#F7F6F3] dark:bg-[#2A2A2A] border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white focus:outline-none focus:border-[#004B87]"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Mật khẩu
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu..."
                className="w-full pl-9 pr-9 py-2.5 rounded-xl bg-[#F7F6F3] dark:bg-[#2A2A2A] border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white focus:outline-none focus:border-[#004B87]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {loginError && (
            <p className="text-rose-600 dark:text-rose-400 text-[11px] font-medium">
              {loginError}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-[#004B87] hover:bg-[#003A69] text-white transition-colors shadow-2xs"
          >
            Đăng nhập
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center py-1">
          <div className="flex-grow border-t border-gray-200 dark:border-gray-700" />
          <span className="flex-shrink mx-3 text-[11px] text-gray-400 uppercase">Hoặc</span>
          <div className="flex-grow border-t border-gray-200 dark:border-gray-700" />
        </div>

        {/* Method 2: Official Google Sign-In */}
        {AUTH_CONFIG.GOOGLE_CLIENT_ID && (
          <div className="space-y-2 text-center">
            <div className="flex justify-center min-h-[44px]" ref={googleBtnRef} />
            {!gsiReady && (
              <p className="text-[11px] text-gray-400">Đang tải nút đăng nhập Google...</p>
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
