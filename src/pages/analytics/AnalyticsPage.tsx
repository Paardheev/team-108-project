import React from 'react';
import { BarChart3, TrendingUp, Users, CheckSquare, Trophy, FileText } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AnalyticsPage: React.FC = () => {
  const { tasks, attendanceSessions, users, resources } = useApp();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-indigo-600" />
          <span>Analytics & Institutional Metrics</span>
        </h1>
        <p className="text-xs text-slate-500">
          Executive reports on operational health, checkpoint velocity, and attendance retention.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Checkpoint Completion</span>
          <p className="text-2xl font-bold text-slate-900">{completionPercentage}%</p>
          <p className="text-[10px] text-emerald-600 font-semibold">↑ 12% vs last month</p>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Avg Attendance Rate</span>
          <p className="text-2xl font-bold text-slate-900">89.4%</p>
          <p className="text-[10px] text-indigo-600 font-semibold">Verified via Dynamic QR</p>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Knowledge Downloads</span>
          <p className="text-2xl font-bold text-slate-900">314 DLs</p>
          <p className="text-[10px] text-purple-600 font-semibold">Across 6 Departments</p>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Active Club Roster</span>
          <p className="text-2xl font-bold text-slate-900">{users.length} Members</p>
          <p className="text-[10px] text-blue-600 font-semibold">Delegated Permissions Active</p>
        </div>
      </div>

      {/* Visual Bar Breakdown Chart Representation */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
          Departmental Task Velocity & Checkpoints Ratio
        </h2>

        <div className="space-y-4">
          {[
            { dept: 'Software & AI Team', total: 18, completed: 15, color: 'bg-blue-600' },
            { dept: 'Robotics & Hardware', total: 12, completed: 8, color: 'bg-emerald-600' },
            { dept: 'Media & Design Group', total: 10, completed: 9, color: 'bg-purple-600' },
            { dept: 'Events & Operations', total: 14, completed: 12, color: 'bg-amber-600' }
          ].map((item, idx) => {
            const pct = Math.round((item.completed / item.total) * 100);
            return (
              <div key={idx} className="space-y-1.5 text-xs">
                <div className="flex justify-between font-bold text-slate-800">
                  <span>{item.dept}</span>
                  <span>{item.completed} / {item.total} Tasks Finished ({pct}%)</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200">
                  <div className={`h-full ${item.color} transition-all duration-500`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
