import React, { useState, useMemo } from 'react';
import {
  X,
  ShieldCheck,
  Activity,
  UserPlus,
  Trash2,
  KeyRound,
  Download,
  Lock,
  Unlock,
  Search
} from 'lucide-react';
import { LocalAccount } from '../config/authConfig';
import {
  ActivityLogEntry,
  getActivityLogs,
  clearActivityLogs,
  getManagedAccounts,
  saveManagedAccounts
} from '../utils/activityLogger';

interface AdminSecretModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminSecretModal: React.FC<AdminSecretModalProps> = ({ isOpen, onClose }) => {
  const [tab, setTab] = useState<'logs' | 'accounts'>('logs');
  const [logs, setLogs] = useState<ActivityLogEntry[]>(() => getActivityLogs());
  const [accounts, setAccounts] = useState<LocalAccount[]>(() => getManagedAccounts());
  const [logSearch, setLogSearch] = useState('');

  // New account form
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newFullName, setNewFullName] = useState('');
  const [newDept, setNewDept] = useState('NVKH');
  const [newRole, setNewRole] = useState<'user' | 'admin'>('user');

  const filteredLogs = useMemo(() => {
    const q = logSearch.trim().toLowerCase();
    if (!q) return logs;
    return logs.filter(
      (l) =>
        l.userEmail.toLowerCase().includes(q) ||
        l.userName.toLowerCase().includes(q) ||
        l.detail.toLowerCase().includes(q) ||
        l.action.toLowerCase().includes(q)
    );
  }, [logs, logSearch]);

  if (!isOpen) return null;

  const handleAddAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername.trim() || !newPassword.trim() || !newFullName.trim()) return;
    const acc: LocalAccount = {
      id: `acc-${Date.now()}`,
      username: newUsername.trim().toLowerCase(),
      password: newPassword,
      fullName: newFullName.trim(),
      department: newDept,
      role: newRole,
      active: true,
      createdAt: new Date().toISOString().slice(0, 10)
    };
    const updated = [...accounts, acc];
    setAccounts(updated);
    saveManagedAccounts(updated);
    setNewUsername('');
    setNewPassword('');
    setNewFullName('');
  };

  const toggleAccountActive = (id: string) => {
    const updated = accounts.map((a) => (a.id === id ? { ...a, active: !a.active } : a));
    setAccounts(updated);
    saveManagedAccounts(updated);
  };

  const handleDeleteAccount = (id: string) => {
    const updated = accounts.filter((a) => a.id !== id);
    setAccounts(updated);
    saveManagedAccounts(updated);
  };

  const handleExportLogs = () => {
    const csvHeader = 'Thời gian,Tài khoản,Họ tên,Phương thức,Hành động,Chi tiết\n';
    const csvRows = logs
      .map(
        (l) =>
          `"${new Date(l.timestamp).toLocaleString('vi-VN')}","${l.userEmail}","${l.userName}","${l.method}","${l.action}","${l.detail.replace(/"/g, '""')}"`
      )
      .join('\n');
    const blob = new Blob(['\uFEFF' + csvHeader + csvRows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Lich_su_truy_cap_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="w-full max-w-4xl max-h-[88vh] bg-white dark:bg-[#202020] rounded-2xl border border-gray-200 dark:border-[#333] shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-[#333] flex items-center justify-between bg-[#F7F6F3] dark:bg-[#1A1A1A]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#004B87] text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#111827] dark:text-white">
                Quản trị Hệ thống Ngầm (Chỉ dành cho Quản trị viên)
              </h2>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">
                Theo dõi lịch sử truy cập, sử dụng & Quản lý tài khoản/mật khẩu cấp cho nhân sự • Phím tắt: <kbd className="font-mono px-1 bg-white dark:bg-gray-800 rounded border">Ctrl+Shift+A</kbd>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Sub-tabs */}
        <div className="flex items-center gap-2 px-6 border-b border-gray-200 dark:border-[#333]">
          <button
            onClick={() => {
              setLogs(getActivityLogs());
              setTab('logs');
            }}
            className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
              tab === 'logs'
                ? 'border-[#004B87] text-[#004B87] dark:border-blue-400 dark:text-blue-400'
                : 'border-transparent text-gray-500'
            }`}
          >
            <Activity className="w-4 h-4" />
            Lịch sử truy cập & sử dụng ({logs.length})
          </button>
          <button
            onClick={() => setTab('accounts')}
            className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
              tab === 'accounts'
                ? 'border-[#004B87] text-[#004B87] dark:border-blue-400 dark:text-blue-400'
                : 'border-transparent text-gray-500'
            }`}
          >
            <KeyRound className="w-4 h-4" />
            Cấp tài khoản & Mật khẩu ({accounts.length})
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {tab === 'logs' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="relative flex-1 min-w-[200px] max-w-sm">
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={logSearch}
                    onChange={(e) => setLogSearch(e.target.value)}
                    placeholder="Lọc theo tên, tài khoản, hành động..."
                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-[#F7F6F3] dark:bg-[#2A2A2A] border border-gray-200 dark:border-gray-700 focus:outline-none"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExportLogs}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#004B87] text-white hover:bg-[#003A69]"
                  >
                    <Download className="w-3.5 h-3.5" /> Xuất Excel/CSV
                  </button>
                  <button
                    onClick={() => {
                      clearActivityLogs();
                      setLogs([]);
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 border border-rose-200 dark:border-rose-900"
                  >
                    Xóa nhật ký
                  </button>
                </div>
              </div>

              <div className="border border-gray-200 dark:border-[#333] rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#F7F6F3] dark:bg-[#262626] text-[11px] font-semibold text-gray-500 uppercase">
                      <th className="py-2.5 px-3">Thời gian</th>
                      <th className="py-2.5 px-3">Người dùng</th>
                      <th className="py-2.5 px-3">Hành động</th>
                      <th className="py-2.5 px-3">Chi tiết</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-[#333]">
                    {filteredLogs.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-gray-400">
                          Chưa có dữ liệu nhật ký truy cập.
                        </td>
                      </tr>
                    ) : (
                      filteredLogs.map((l) => (
                        <tr key={l.id} className="hover:bg-gray-50 dark:hover:bg-[#262626]">
                          <td className="py-2 px-3 font-mono text-[11px] text-gray-500 whitespace-nowrap">
                            {new Date(l.timestamp).toLocaleString('vi-VN')}
                          </td>
                          <td className="py-2 px-3">
                            <div className="font-semibold text-gray-800 dark:text-gray-200">{l.userName}</div>
                            <div className="text-[10px] text-gray-400">{l.userEmail} ({l.method})</div>
                          </td>
                          <td className="py-2 px-3">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 dark:bg-blue-950/40 text-[#004B87] dark:text-blue-300">
                              {l.action}
                            </span>
                          </td>
                          <td className="py-2 px-3 text-gray-600 dark:text-gray-300">{l.detail}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === 'accounts' && (
            <div className="space-y-5">
              {/* Create Account Form */}
              <form
                onSubmit={handleAddAccount}
                className="p-4 rounded-xl bg-[#F7F6F3] dark:bg-[#262626] border border-gray-200 dark:border-gray-700 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 items-end text-xs"
              >
                <div>
                  <label className="block font-semibold mb-1 text-gray-600 dark:text-gray-300">Tài khoản *</label>
                  <input
                    type="text"
                    required
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    placeholder="vd: kddl.vinh"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-gray-700"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-gray-600 dark:text-gray-300">Mật khẩu *</label>
                  <input
                    type="text"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Mật khẩu cấp"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-gray-700"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-gray-600 dark:text-gray-300">Họ tên *</label>
                  <input
                    type="text"
                    required
                    value={newFullName}
                    onChange={(e) => setNewFullName(e.target.value)}
                    placeholder="Nguyễn Văn A"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-gray-700"
                  />
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="block font-semibold mb-1 text-gray-600 dark:text-gray-300">Bộ phận</label>
                    <input
                      type="text"
                      value={newDept}
                      onChange={(e) => setNewDept(e.target.value)}
                      className="w-full px-2 py-1.5 rounded-lg bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1 text-gray-600 dark:text-gray-300">Quyền</label>
                    <select
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value as 'user' | 'admin')}
                      className="px-2 py-1.5 rounded-lg bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-gray-700"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-[#004B87] text-white font-semibold hover:bg-[#003A69]"
                >
                  <UserPlus className="w-3.5 h-3.5" /> Cấp tài khoản
                </button>
              </form>

              {/* Account List */}
              <div className="border border-gray-200 dark:border-[#333] rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#F7F6F3] dark:bg-[#262626] text-[11px] font-semibold text-gray-500 uppercase">
                      <th className="py-2.5 px-3">Tài khoản</th>
                      <th className="py-2.5 px-3">Mật khẩu</th>
                      <th className="py-2.5 px-3">Họ tên & Bộ phận</th>
                      <th className="py-2.5 px-3">Trạng thái</th>
                      <th className="py-2.5 px-3 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-[#333]">
                    {accounts.map((acc) => (
                      <tr key={acc.id}>
                        <td className="py-2.5 px-3 font-mono font-semibold text-[#004B87] dark:text-blue-400">
                          {acc.username}
                        </td>
                        <td className="py-2.5 px-3 font-mono text-gray-600 dark:text-gray-300">
                          {acc.password}
                        </td>
                        <td className="py-2.5 px-3">
                          <span className="font-semibold">{acc.fullName}</span>
                          <span className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800">
                            {acc.department} • {acc.role}
                          </span>
                        </td>
                        <td className="py-2.5 px-3">
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                              acc.active
                                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
                                : 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300'
                            }`}
                          >
                            {acc.active ? 'Đang hoạt động' : 'Đã khóa'}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-right space-x-1">
                          <button
                            onClick={() => toggleAccountActive(acc.id)}
                            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
                            title={acc.active ? 'Khóa tài khoản' : 'Mở khóa'}
                          >
                            {acc.active ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                          </button>
                          <button
                            onClick={() => handleDeleteAccount(acc.id)}
                            className="p-1 rounded hover:bg-rose-50 text-rose-500"
                            title="Xóa tài khoản"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
