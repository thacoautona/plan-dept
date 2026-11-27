import React, { useState } from 'react';
import {
  Users,
  Mail,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { OrgDepartment, RACIMatrixItem } from '../../types';
import { AppIcon } from '../AppIcon';

interface OrgStructureViewProps {
  departments: OrgDepartment[];
  raciMatrix: RACIMatrixItem[];
}

export const OrgStructureView: React.FC<OrgStructureViewProps> = ({
  departments,
  raciMatrix
}) => {
  const [subTab, setSubTab] = useState<'chart' | 'raci'>('chart');
  const [selectedDept, setSelectedDept] = useState<OrgDepartment>(departments[0]);

  const totalHeadcount = departments.reduce((acc, d) => acc + d.personnelCount, 0);

  const getRaciColor = (role: string) => {
    switch (role) {
      case 'R':
        return 'bg-blue-600 text-white font-bold';
      case 'A':
        return 'bg-purple-600 text-white font-bold';
      case 'C':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200 font-semibold';
      case 'I':
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
      default:
        return 'text-gray-300 dark:text-gray-700';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Notion-style */}
      <div className="pt-6 pb-2 border-b border-[#E9E9E7] dark:border-[#2F2F2F]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-2xl bg-purple-50/80 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/50 shadow-2xs">
              <AppIcon name="org_chart" className="w-8 h-8" alt="Cơ cấu" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-[#111827] dark:text-white">
                Cơ cấu Tổ chức & Ma trận Phân quyền RACI
              </h1>
              <p className="text-xs text-[#787774] dark:text-[#9B9A97] mt-0.5">
                Cấu trúc - chức năng nhiệm vụ các bộ phận tại THACO AUTO Nghệ An và chuẩn hóa ma trận phân nhiệm RACI liên phòng ban.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-[#252525] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-[#383838]">
            <Users className="w-4 h-4 text-purple-500" /> Tổng nhân sự THACO AUTO Nghệ An: <strong>{totalHeadcount} nhân sự</strong>
          </div>
        </div>

        {/* Sub-Tabs */}
        <div className="mt-6 flex items-center gap-4 text-xs font-medium">
          <button
            onClick={() => setSubTab('chart')}
            className={`pb-2.5 flex items-center gap-2 border-b-2 transition-all ${
              subTab === 'chart'
                ? 'border-purple-600 text-purple-600 dark:border-purple-400 dark:text-purple-400 font-semibold'
                : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <AppIcon name="team_people" className="w-4 h-4" /> Sơ đồ Cây Tổ chức ({departments.length} bộ phận)
          </button>
          <button
            onClick={() => setSubTab('raci')}
            className={`pb-2.5 flex items-center gap-2 border-b-2 transition-all ${
              subTab === 'raci'
                ? 'border-purple-600 text-purple-600 dark:border-purple-400 dark:text-purple-400 font-semibold'
                : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <AppIcon name="raci_network" className="w-4 h-4" /> Ma trận Phân quyền RACI
          </button>
        </div>
      </div>

      {subTab === 'chart' ? (
        /* INTERACTIVE ORG CHART */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Department List / Tree view */}
          <div className="lg:col-span-5 space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 px-1">
              Danh sách Phòng ban & Bộ phận
            </h3>
            {departments.map((dept) => {
              const isSelected = selectedDept.id === dept.id;
              const isBGD = dept.code === 'BGD';
              const isPKH = dept.code === 'PKH';
              return (
                <div
                  key={dept.id}
                  onClick={() => setSelectedDept(dept)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-purple-50/70 dark:bg-purple-950/40 border-purple-300 dark:border-purple-800 shadow-2xs'
                      : 'bg-white dark:bg-[#202020] border-[#E9E9E7] dark:border-[#2F2F2F] hover:border-gray-300 dark:hover:border-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs ${
                        isBGD
                          ? 'bg-[#004B87] text-white'
                          : isPKH
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {dept.code}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100">
                        {dept.name}
                      </h4>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400">
                        {dept.headTitle}: <strong>{dept.headName}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                      {dept.personnelCount} NS
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Department Detail Card */}
          <div className="lg:col-span-7">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#202020] border border-[#E9E9E7] dark:border-[#2F2F2F] shadow-2xs space-y-5 sticky top-20">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-[#2E2E2E] pb-4">
                <div>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300 font-bold">
                    {selectedDept.code}
                  </span>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                    {selectedDept.name}
                  </h2>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {selectedDept.personnelCount}
                  </span>
                  <p className="text-[11px] text-gray-400">Định biên nhân sự</p>
                </div>
              </div>

              {/* Leadership info */}
              <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-[#262626] border border-gray-200 dark:border-[#383838] flex items-center justify-between text-xs">
                <div>
                  <span className="text-gray-500 text-[11px]">{selectedDept.headTitle}</span>
                  <p className="font-bold text-gray-900 dark:text-gray-100 text-sm">
                    {selectedDept.headName}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 text-xs">
                  <Mail className="w-3.5 h-3.5" /> {selectedDept.headEmail}
                </div>
              </div>

              {/* Main Function */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Chức năng chính
                </h4>
                <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed bg-blue-50/30 dark:bg-[#1E2530] p-3 rounded-lg border border-blue-100/60 dark:border-[#2A374A]">
                  {selectedDept.mainFunction}
                </p>
              </div>

              {/* Key Duties */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Nhiệm vụ trọng tâm
                </h4>
                <div className="space-y-1.5">
                  {selectedDept.keyDuties.map((duty, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>{duty}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* RACI MATRIX GRID */
        <div className="space-y-4">
          {/* RACI Legend Explanation */}
          <div className="p-4 rounded-xl bg-purple-50/50 dark:bg-[#251A2C] border border-purple-200 dark:border-[#4E2B59] text-xs">
            <h4 className="font-bold text-purple-900 dark:text-purple-200 mb-2">
              Chú giải Nguyên tắc Phân định Trách nhiệm (RACI Matrix):
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px]">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded flex items-center justify-center font-bold bg-blue-600 text-white">
                  R
                </span>
                <span><strong>Responsible:</strong> Trực tiếp thực hiện</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded flex items-center justify-center font-bold bg-purple-600 text-white">
                  A
                </span>
                <span><strong>Accountable:</strong> Phê duyệt / Chịu trách nhiệm</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded flex items-center justify-center font-bold bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200">
                  C
                </span>
                <span><strong>Consulted:</strong> Tham vấn ý kiến</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded flex items-center justify-center font-bold bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                  I
                </span>
                <span><strong>Informed:</strong> Nhận thông báo</span>
              </div>
            </div>
          </div>

          {/* RACI Table */}
          <div className="bg-white dark:bg-[#202020] rounded-xl border border-[#E9E9E7] dark:border-[#2F2F2F] shadow-2xs overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50/80 dark:bg-[#252525] border-b border-[#E9E9E7] dark:border-[#2F2F2F] text-[#787774] dark:text-[#9B9A97] font-semibold">
                  <th className="py-3 px-4 min-w-[240px]">Quy trình / Luồng phối hợp nghiệp vụ</th>
                  <th className="py-3 px-3 text-center w-16">BGD</th>
                  <th className="py-3 px-3 text-center w-16 bg-purple-50/50 dark:bg-purple-950/20">PKH</th>
                  <th className="py-3 px-3 text-center w-16">PKD-PC</th>
                  <th className="py-3 px-3 text-center w-16">PKD-CV</th>
                  <th className="py-3 px-3 text-center w-16">PDV</th>
                  <th className="py-3 px-3 text-center w-16">PTC</th>
                  <th className="py-3 px-3 text-center w-16">PNV</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E9E9E7] dark:divide-[#2F2F2F]">
                {raciMatrix.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/60 dark:hover:bg-[#282828] transition-colors">
                    <td className="py-3 px-4 font-medium text-gray-900 dark:text-gray-100">
                      <div>{row.processName}</div>
                      <span className="text-[10px] text-gray-400">{row.category}</span>
                    </td>
                    {['BGD', 'PKH', 'PKD-PC', 'PKD-CV', 'PDV', 'PTC', 'PNV'].map((col) => {
                      const role = row.roles[col] || '-';
                      return (
                        <td
                          key={col}
                          className={`py-3 px-3 text-center ${
                            col === 'PKH' ? 'bg-purple-50/30 dark:bg-purple-950/10' : ''
                          }`}
                        >
                          <span
                            className={`inline-flex items-center justify-center w-7 h-7 rounded-md text-xs transition-transform ${getRaciColor(
                              role
                            )}`}
                          >
                            {role}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
