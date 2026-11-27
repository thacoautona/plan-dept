import { AUTH_CONFIG, LocalAccount } from '../config/authConfig';

export interface ActivityLogEntry {
  id: string;
  timestamp: string;
  userEmail: string;
  userName: string;
  method: 'google' | 'local' | 'guest';
  action: 'login' | 'logout' | 'view_tab' | 'download' | 'upload' | 'export';
  detail: string;
}

const LOGS_STORAGE_KEY = 'thaco_na_activity_logs_v1';
const ACCOUNTS_STORAGE_KEY = 'thaco_na_local_accounts_v1';

export function getActivityLogs(): ActivityLogEntry[] {
  try {
    const raw = localStorage.getItem(LOGS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function logActivity(entry: Omit<ActivityLogEntry, 'id' | 'timestamp'>): void {
  try {
    const logs = getActivityLogs();
    const newEntry: ActivityLogEntry = {
      ...entry,
      id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      timestamp: new Date().toISOString()
    };
    const updated = [newEntry, ...logs].slice(0, 500);
    localStorage.setItem(LOGS_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // ignore storage errors
  }
}

export function clearActivityLogs(): void {
  try {
    localStorage.removeItem(LOGS_STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function getManagedAccounts(): LocalAccount[] {
  try {
    const raw = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
    if (raw) {
      const parsed: LocalAccount[] = JSON.parse(raw);
      // Luôn đảm bảo các tài khoản Admin mặc định trong AUTH_CONFIG tồn tại
      const existingUsernames = new Set(parsed.map((a) => a.username.toLowerCase()));
      const merged = [...parsed];
      for (const defAcc of AUTH_CONFIG.LOCAL_ACCOUNTS) {
        if (!existingUsernames.has(defAcc.username.toLowerCase())) {
          merged.unshift(defAcc);
        }
      }
      return merged;
    }
  } catch {
    // fallback
  }
  return AUTH_CONFIG.LOCAL_ACCOUNTS;
}

export function saveManagedAccounts(accounts: LocalAccount[]): void {
  try {
    localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
  } catch {
    // ignore
  }
}

export function authenticateLocal(username: string, password: string): LocalAccount | null {
  const accounts = getManagedAccounts();
  const u = username.trim().toLowerCase();
  return (
    accounts.find(
      (acc) => acc.active && acc.username.trim().toLowerCase() === u && acc.password === password
    ) || null
  );
}
