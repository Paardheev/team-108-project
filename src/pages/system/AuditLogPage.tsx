import React from 'react';
import { Clock, ShieldAlert, CheckCircle, FileText } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AuditLogPage: React.FC = () => {
  const { auditLogs } = useApp();

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Clock className="w-5 h-5 text-slate-700" />
          <span>System Audit Log & Immutable Activity Ledger</span>
        </h1>
        <p className="text-xs text-slate-500">
          Timestamped security history tracking permission delegations, task reviews, and resource uploads.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="divide-y divide-slate-100">
          {auditLogs.map(log => (
            <div key={log.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs hover:bg-slate-50">
              <div className="space-y-0.5">
                <span className="font-bold text-slate-900">{log.action}</span>
                <p className="text-slate-600">{log.target}</p>
              </div>

              <div className="text-left sm:text-right text-[11px] text-slate-400">
                <span className="font-semibold text-slate-700">{log.userName}</span>
                <p>{log.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
