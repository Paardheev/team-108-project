import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Eye, CheckCircle2, Clock, AlertCircle, ArrowLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { mockAnnouncementRecipients } from '../../data/mockData';

export const ReadStatusPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { announcements } = useApp();

  const announcement = announcements.find(a => a.id === Number(id)) || announcements[0];

  const seenMembers = mockAnnouncementRecipients.filter(r => r.isRead);
  const unreadMembers = mockAnnouncementRecipients.filter(r => !r.isRead);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link to="/announcements" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Announcements</span>
      </Link>

      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
          {announcement.priority} Priority
        </span>
        <h1 className="text-xl font-bold text-slate-900">{announcement.title}</h1>
        <p className="text-xs text-slate-500">
          Read Receipts Breakdown • Seen by {seenMembers.length + 42} / {announcement.totalTargetUsers} target members
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Seen List */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h2 className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Seen ({seenMembers.length + 42})</span>
            </h2>
          </div>
          <div className="space-y-2 text-xs">
            {seenMembers.map(m => (
              <div key={m.id} className="flex items-center justify-between p-2 bg-emerald-50/50 rounded-lg border border-emerald-100">
                <span className="font-semibold text-emerald-950">{m.userName}</span>
                <span className="text-[10px] text-emerald-700">{m.readAt ? new Date(m.readAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Seen'}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Unread List */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h2 className="text-xs font-bold text-rose-800 uppercase tracking-wider flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-rose-600" />
              <span>Unread ({unreadMembers.length + 10})</span>
            </h2>
          </div>
          <div className="space-y-2 text-xs">
            {unreadMembers.map(m => (
              <div key={m.id} className="flex items-center justify-between p-2 bg-rose-50/50 rounded-lg border border-rose-100">
                <span className="font-semibold text-rose-950">{m.userName}</span>
                <span className="text-[10px] text-rose-700 font-medium">Pending Acknowledgment</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
