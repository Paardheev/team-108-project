import React from 'react';
import { Bell, Check, Trash2, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NotificationsPage: React.FC = () => {
  const { notifications, markNotificationAsRead } = useApp();

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Bell className="w-5 h-5 text-blue-600" />
            <span>Activity Notifications & Alerts</span>
          </h1>
          <p className="text-xs text-slate-500">Real-time alerts for task assignments, attendance sessions, and approvals.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden divide-y divide-slate-100">
        {notifications.map(n => (
          <div
            key={n.id}
            onClick={() => markNotificationAsRead(n.id)}
            className={`p-4 flex items-start justify-between gap-3 text-xs cursor-pointer transition-colors ${
              n.read ? 'bg-white text-slate-600' : 'bg-blue-50/60 text-slate-900 font-medium border-l-4 border-l-blue-600'
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900">{n.title}</span>
                <span className="text-[10px] text-slate-400">{n.createdAt}</span>
              </div>
              <p className="text-slate-600">{n.content}</p>
            </div>
            {!n.read && (
              <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
