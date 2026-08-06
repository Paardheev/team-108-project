import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Megaphone, Pin, AlertTriangle, Plus, CheckCircle, Users, Clock, Filter, Eye, Edit2, Trash2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AnnouncementPriority } from '../../types';

export const AnnouncementsPage: React.FC = () => {
  const { announcements, markAnnouncementAsRead } = useApp();
  const [priorityFilter, setPriorityFilter] = useState<string>('All');
  const [channelFilter, setChannelFilter] = useState<string>('All');

  const filtered = announcements.filter(a => {
    if (priorityFilter !== 'All' && a.priority !== priorityFilter) return false;
    if (channelFilter !== 'All' && !a.targetChannels.includes(channelFilter)) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header & Quick Action */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-amber-600" />
            <span>Role-Based Hierarchy Communication</span>
          </h1>
          <p className="text-xs text-slate-500">
            Structured announcements targeted by role, department, or custom groups.
          </p>
        </div>
        <Link
          to="/announcements/create"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-2xs transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Announcement</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs text-xs">
        <div className="flex items-center gap-1.5 text-slate-500 font-semibold pr-2 border-r border-slate-200">
          <Filter className="w-3.5 h-3.5" />
          <span>Filters:</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-slate-500">Priority:</span>
          {['All', 'Normal', 'Important', 'Urgent'].map(p => (
            <button
              key={p}
              onClick={() => setPriorityFilter(p)}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                priorityFilter === p ? 'bg-amber-100 text-amber-900 font-bold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 ml-auto">
          <span className="text-slate-500">Channel:</span>
          <select
            value={channelFilter}
            onChange={e => setChannelFilter(e.target.value)}
            className="px-2.5 py-1 border border-slate-300 rounded-lg bg-white text-slate-700"
          >
            <option value="All">All Channels</option>
            <option value="Everyone">Everyone</option>
            <option value="Core Team">Core Team</option>
            <option value="Media & Design">Media & Design</option>
            <option value="Software & AI">Software & AI</option>
          </select>
        </div>
      </div>

      {/* Announcements Feed */}
      <div className="space-y-4">
        {filtered.map(a => (
          <div
            key={a.id}
            className={`p-5 bg-white rounded-2xl border transition-all ${
              a.isPinned ? 'border-amber-300 shadow-xs ring-2 ring-amber-400/20' : 'border-slate-200 shadow-2xs'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div className="flex flex-wrap items-center gap-2">
                {a.isPinned && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                    <Pin className="w-3 h-3 text-amber-600" /> Pinned
                  </span>
                )}
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  a.priority === 'Urgent' ? 'bg-rose-100 text-rose-800' :
                  a.priority === 'Important' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {a.priority}
                </span>
                {a.targetChannels.map((ch, i) => (
                  <span key={i} className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                    #{ch}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {new Date(a.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <h3 className="text-base font-bold text-slate-900 mb-2">{a.title}</h3>
            <p className="text-xs text-slate-700 leading-relaxed mb-4">{a.content}</p>

            <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-800">{a.creatorName}</span>
                <span className="text-[11px] text-slate-400">({a.creatorRole})</span>
                {a.requiresApproval && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    Approved by {a.approvedBy || 'Club Head'}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[11px] font-semibold text-slate-600 flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                  Seen by {a.readCount} / {a.totalTargetUsers} members
                </span>
                <Link
                  to={`/announcements/${a.id}/read-status`}
                  className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-[11px] rounded-lg transition-colors"
                >
                  View Receipts
                </Link>
                <Link
                  to={`/announcements/${a.id}/edit`}
                  className="p-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
                  title="Edit Announcement"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </Link>
                <button
                  onClick={() => alert('Delete Announcement not fully implemented in API.')}
                  className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition-colors"
                  title="Delete Announcement"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
