import React from 'react';
import { BarChart3, Download, FileSpreadsheet, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AttendanceReportsPage: React.FC = () => {
  const { attendanceSessions, users } = useApp();

  const handleExportCSV = () => {
    alert('Exporting verified attendance report as CSV file...');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-indigo-600" />
            <span>Attendance Audit & Reports</span>
          </h1>
          <p className="text-xs text-slate-500">
            Export attendance percentage statistics for Dean/Faculty advisors and Dean of Students Office.
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-2xs"
        >
          <Download className="w-4 h-4" />
          <span>Export Official CSV</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 space-y-4">
        <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
          Member Cumulative Attendance Percentage
        </h2>

        <div className="space-y-3">
          {users.map(u => {
            // Mock attendance percentage
            const percentage = u.role === 'Club Head' ? 100 : u.role === 'Coordinator' ? 92 : 88;
            return (
              <div key={u.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <img src={u.profilePicture} alt={u.fullName} className="w-8 h-8 rounded-full object-cover shrink-0" />
                  <div>
                    <p className="font-bold text-slate-900">{u.fullName}</p>
                    <p className="text-[10px] text-slate-500">{u.department} • {u.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="font-extrabold text-slate-900">{percentage}%</span>
                    <p className="text-[10px] text-emerald-600 font-semibold">Eligible for Certificate</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
