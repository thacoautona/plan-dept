import React, { useState, useMemo, useEffect } from 'react';
import {
  Folder,
  FolderOpen,
  Download,
  ExternalLink,
  Search,
  Plus,
  FileSpreadsheet,
  FileText,
  Presentation,
  Image as ImageIcon,
  Link2,
  Trash2,
  X
} from 'lucide-react';
import {
  DATABASE_FOLDERS,
  DatabaseFileItem,
  DbFileFormat
} from '../../data/databaseData';
import { AppIcon } from '../AppIcon';

const STORAGE_KEY = 'thaco_na_database_files_v1';

const FORMAT_META: Record<DbFileFormat, { label: string; color: string; icon: React.ReactNode }> = {
  xlsx: {
    label: 'Excel',
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800',
    icon: <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
  },
  pdf: {
    label: 'PDF',
    color: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800',
    icon: <FileText className="w-4 h-4 text-rose-600" />
  },
  docx: {
    label: 'Word',
    color: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800',
    icon: <FileText className="w-4 h-4 text-blue-600" />
  },
  pptx: {
    label: 'PowerPoint',
    color: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800',
    icon: <Presentation className="w-4 h-4 text-amber-600" />
  },
  image: {
    label: 'Ảnh / Bản vẽ',
    color: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800',
    icon: <ImageIcon className="w-4 h-4 text-purple-600" />
  },
  link: {
    label: 'Liên kết',
    color: 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700',
    icon: <Link2 className="w-4 h-4 text-gray-600" />
  }
};

export const DatabaseView: React.FC = () => {
  const [selectedFolderId, setSelectedFolderId] = useState<string>('he-thong-bao-cao');
  const [selectedSubFolderId, setSelectedSubFolderId] = useState<string>('vpdh-mien');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [files, setFiles] = useState<DatabaseFileItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newFormat, setNewFormat] = useState<DbFileFormat>('xlsx');
  const [newUrl, setNewUrl] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(files));
    } catch {
      // ignore storage quota errors
    }
  }, [files]);

  const currentFolder = useMemo(
    () => DATABASE_FOLDERS.find((f) => f.id === selectedFolderId) || DATABASE_FOLDERS[0],
    [selectedFolderId]
  );

  const currentSubFolder = useMemo(() => {
    if (!currentFolder.subFolders) return undefined;
    return (
      currentFolder.subFolders.find((sf) => sf.id === selectedSubFolderId) ||
      currentFolder.subFolders[0]
    );
  }, [currentFolder, selectedSubFolderId]);

  const filteredFiles = useMemo(() => {
    return files.filter((item) => {
      const matchFolder = item.folderId === currentFolder.id;
      const matchSub = currentFolder.subFolders
        ? item.subFolderId === currentSubFolder?.id
        : true;
      const q = searchQuery.trim().toLowerCase();
      const matchSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);
      return matchFolder && matchSub && matchSearch;
    });
  }, [files, currentFolder, currentSubFolder, searchQuery]);

  const getFolderCount = (folderId: string, subFolderId?: string) =>
    files.filter((f) =>
      subFolderId
        ? f.folderId === folderId && f.subFolderId === subFolderId
        : f.folderId === folderId
    ).length;

  const handleAddFile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newUrl.trim()) return;

    const item: DatabaseFileItem = {
      id: `db-${Date.now()}`,
      folderId: currentFolder.id,
      subFolderId: currentFolder.subFolders ? currentSubFolder?.id : undefined,
      name: newName.trim(),
      description: newDesc.trim() || 'Tài liệu lưu trữ trên hệ thống Cơ sở dữ liệu.',
      format: newFormat,
      updatedAt: new Date().toLocaleDateString('vi-VN'),
      downloadUrl: newUrl.trim()
    };

    setFiles((prev) => [item, ...prev]);
    setNewName('');
    setNewDesc('');
    setNewUrl('');
    setIsAddModalOpen(false);
  };

  const handleDeleteFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 pb-10">
      {/* Page Header */}
      <div className="pt-6 pb-4 border-b border-[#E9E9E7] dark:border-[#2F2F2F] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50">
            <AppIcon name="binder_archive" className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#111827] dark:text-white">
              Cơ sở dữ liệu
            </h1>
            <p className="text-xs text-[#787774] dark:text-[#9B9A97] mt-0.5">
              Kho lưu trữ tập trung các báo cáo, tài liệu hướng dẫn, biên bản chỉ đạo và layout vận hành để tra cứu & tải xuống.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#004B87] hover:bg-[#003A69] text-white transition-colors shadow-2xs self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          Thêm tài liệu / Link tải
        </button>
      </div>

      {/* Main Split Layout: Folder Tree (Left) + File List (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Folder Tree */}
        <div className="lg:col-span-4 space-y-2 bg-white dark:bg-[#202020] p-3.5 rounded-2xl border border-[#E9E9E7] dark:border-[#2F2F2F] shadow-2xs">
          <p className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-gray-400">
            Danh mục Thư mục
          </p>

          <div className="space-y-1">
            {DATABASE_FOLDERS.map((folder) => {
              const isSelected = selectedFolderId === folder.id;
              const count = getFolderCount(folder.id);

              return (
                <div key={folder.id} className="space-y-1">
                  <button
                    onClick={() => {
                      setSelectedFolderId(folder.id);
                      if (folder.subFolders && folder.subFolders.length > 0) {
                        setSelectedSubFolderId(folder.subFolders[0].id);
                      }
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-blue-50 dark:bg-blue-950/40 text-[#004B87] dark:text-blue-300 border border-blue-200 dark:border-blue-800/60'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#282828] border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      {isSelected ? (
                        <FolderOpen className="w-4 h-4 text-[#004B87] dark:text-blue-400 flex-shrink-0" />
                      ) : (
                        <Folder className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      )}
                      <span className="truncate">{folder.name}</span>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500">
                      {count}
                    </span>
                  </button>

                  {/* Sub-folders for Hệ thống báo cáo */}
                  {isSelected && folder.subFolders && (
                    <div className="ml-5 pl-3 border-l-2 border-blue-100 dark:border-blue-900/50 space-y-1 py-1">
                      {folder.subFolders.map((sub) => {
                        const isSubSelected = currentSubFolder?.id === sub.id;
                        const subCount = getFolderCount(folder.id, sub.id);
                        return (
                          <button
                            key={sub.id}
                            onClick={() => setSelectedSubFolderId(sub.id)}
                            className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-colors ${
                              isSubSelected
                                ? 'bg-[#004B87] text-white font-semibold'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2A2A2A]'
                            }`}
                          >
                            <span className="truncate">{sub.name}</span>
                            <span
                              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                                isSubSelected
                                  ? 'bg-white/20 text-white'
                                  : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
                              }`}
                            >
                              {subCount}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right File Explorer */}
        <div className="lg:col-span-8 space-y-4">
          {/* Active Folder Header & Search */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#202020] border border-[#E9E9E7] dark:border-[#2F2F2F] shadow-2xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-[#004B87] dark:text-blue-400 font-semibold">
                  <span>{currentFolder.name}</span>
                  {currentSubFolder && (
                    <>
                      <span>/</span>
                      <span>{currentSubFolder.name}</span>
                    </>
                  )}
                </div>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                  {currentSubFolder ? currentSubFolder.description : currentFolder.description}
                </p>
              </div>

              <div className="relative min-w-[210px]">
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm trong thư mục..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-[#F7F6F3] dark:bg-[#2A2A2A] border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-[#004B87] text-gray-800 dark:text-gray-100"
                />
              </div>
            </div>
          </div>

          {/* File List */}
          <div className="bg-white dark:bg-[#202020] rounded-2xl border border-[#E9E9E7] dark:border-[#2F2F2F] shadow-2xs overflow-hidden">
            {filteredFiles.length === 0 ? (
              <div className="py-14 px-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-[#2A2A2A] flex items-center justify-center mx-auto">
                  <FolderOpen className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    Chưa có tệp dữ liệu trong thư mục này
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-md mx-auto">
                    Bạn có thể bấm <strong>“Thêm tài liệu / Link tải”</strong> để gắn link Google Drive / OneDrive hoặc gửi file cho tôi để nạp sẵn lên hệ thống cho mọi người tải xuống.
                  </p>
                </div>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-blue-50 dark:bg-blue-950/40 text-[#004B87] dark:text-blue-300 hover:bg-blue-100 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" /> Thêm tài liệu vào đây
                </button>
              </div>
            ) : (
              <div className="divide-y divide-[#E9E9E7] dark:divide-[#2F2F2F]">
                {filteredFiles.map((file) => {
                  const fmt = FORMAT_META[file.format] || FORMAT_META.link;
                  return (
                    <div
                      key={file.id}
                      className="p-4 hover:bg-gray-50/80 dark:hover:bg-[#262626] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-xl bg-gray-50 dark:bg-[#2A2A2A] border border-gray-200 dark:border-gray-700 flex-shrink-0">
                          {fmt.icon}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                              {file.name}
                            </h4>
                            <span className={`text-[10px] font-semibold px-1.5 py-0.2 rounded border ${fmt.color}`}>
                              {fmt.label}
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-500 dark:text-gray-400">
                            {file.description} • Cập nhật: {file.updatedAt}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center flex-shrink-0">
                        <a
                          href={file.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          download
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#004B87] hover:bg-[#003A69] text-white transition-colors"
                        >
                          <Download className="w-3.5 h-3.5" />
                          Tải xuống
                          <ExternalLink className="w-3 h-3 opacity-75" />
                        </a>
                        <button
                          onClick={() => handleDeleteFile(file.id)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                          title="Xóa khỏi danh sách"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add File Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white dark:bg-[#202020] rounded-2xl border border-gray-200 dark:border-[#333] shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#111827] dark:text-white">
                Thêm tài liệu vào: {currentSubFolder ? `${currentFolder.name} / ${currentSubFolder.name}` : currentFolder.name}
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddFile} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Tên tài liệu / Báo cáo *
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="VD: Mẫu báo cáo doanh số tuần..."
                  className="w-full px-3 py-2 rounded-lg bg-[#F7F6F3] dark:bg-[#2A2A2A] border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white focus:outline-none focus:border-[#004B87]"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Định dạng tệp
                </label>
                <select
                  value={newFormat}
                  onChange={(e) => setNewFormat(e.target.value as DbFileFormat)}
                  className="w-full px-3 py-2 rounded-lg bg-[#F7F6F3] dark:bg-[#2A2A2A] border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white focus:outline-none"
                >
                  <option value="xlsx">Excel (.xlsx)</option>
                  <option value="pdf">PDF (.pdf)</option>
                  <option value="docx">Word (.docx)</option>
                  <option value="pptx">PowerPoint (.pptx)</option>
                  <option value="image">Ảnh / Layout (.png/.jpg/.svg)</option>
                  <option value="link">Liên kết Drive / OneDrive</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Đường dẫn tải xuống (Google Drive / OneDrive / URL) *
                </label>
                <input
                  type="url"
                  required
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="https://drive.google.com/..."
                  className="w-full px-3 py-2 rounded-lg bg-[#F7F6F3] dark:bg-[#2A2A2A] border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white focus:outline-none focus:border-[#004B87]"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Mô tả ngắn
                </label>
                <input
                  type="text"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Mô tả mục đích sử dụng..."
                  className="w-full px-3 py-2 rounded-lg bg-[#F7F6F3] dark:bg-[#2A2A2A] border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white focus:outline-none focus:border-[#004B87]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3.5 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#004B87] hover:bg-[#003A69] text-white font-semibold"
                >
                  Lưu tài liệu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
