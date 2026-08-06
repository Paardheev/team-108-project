import React from 'react';
import { BarChart3, Users, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ProgressTrackerPage: React.FC = () => {
  const { tasks, users } = useApp();

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          <span>Coordinator Progress Tracker</span>
        </h1>
        <p className="text-xs text-slate-500">
          Executive team breakdown of task checkpoint progress ratios and workload balance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Team Workload Breakdown */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
            Workload Distribution by Member
          </h2>
          <div className="space-y-3">
            {users.map(u => {
              const assignedTasks = tasks.filter(t => t.assigneeName === u.fullName);
              const completedTasks = assignedTasks.filter(t => t.status === 'Completed').length;
              const ratio = assignedTasks.length > 0 ? Math.round((completedTasks / assignedTasks.length) * 100) : 0;
              return (
                <div key={u.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <img src={u.profilePicture} alt={u.fullName} className="w-6 h-6 rounded-full object-cover" />
                      <span className="font-bold text-slate-900">{u.fullName}</span>
                      <span className="text-[10px] text-slate-500">({u.role})</span>
                    </div>
                    <span className="font-semibold text-slate-700">{assignedTasks.length} Assigned</span>
                  </div>

                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${ratio}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Department Overview */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
            Department Checkpoint Completion Ratios
          </h2>
          <div className="space-y-3">
            {['Software & AI', 'Robotics & Hardware', 'Media & Design', 'Events & Operations'].map((dept, idx) => {
              const deptTasks = tasks.filter(t => t.department === dept);
              const avgProgress = deptTasks.length > 0 
                ? Math.round(deptTasks.reduce((acc, t) => acc + t.progressPercent, 0) / deptTasks.length) 
                : 85;
              return (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-slate-800">
                    <span>{dept}</span>
                    <span className="text-blue-600">{avgProgress}% Avg Progress</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: `${avgProgress}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
