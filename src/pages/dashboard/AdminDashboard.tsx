import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, Users, Activity, FileText, Calendar, ArrowUpRight, 
  CheckCircle, Clock, BarChart3, AlertTriangle, Layers
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminDashboard: React.FC = () => {
  const { 
    currentUser, activeClub, announcements, events, 
    tasks, resources, auditLogs 
  } = useApp();

  const urgentAnnouncements = announcements.filter(a => a.priority === 'Urgent');
  const recentLogs = auditLogs.slice(0, 5);
  
  return (
    <div className="space-y-6">
      {/* High-Level Overview Banner */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-2xl p-6 text-white shadow-lg border border-indigo-900/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-indigo-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">Club Administration</span>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white/10">{activeClub.name}</span>
            </div>
            <h1 className="text-2xl font-bold">Welcome, {currentUser.fullName}</h1>
            <p className="text-sm text-indigo-200/80 max-w-xl">
              Oversee club operations, manage delegated permissions, and track organizational health metrics.
            </p>
          </div>
          <div className="flex gap-2">
            <Link to="/admin" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition-all shadow-md">
              Control Panel
            </Link>
          </div>
        </div>
      </div>

      {urgentAnnouncements.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 shadow-sm">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-amber-900">Urgent Announcements ({urgentAnnouncements.length})</h4>
            <p className="text-xs text-amber-700 mt-1">There are announcements requiring immediate attention.</p>
          </div>
        </div>
      )}

      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Members</p>
            <p className="text-2xl font-black text-slate-900 mt-1">{activeClub.memberCount}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
            <Users className="w-5 h-5 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Active Tasks</p>
            <p className="text-2xl font-black text-slate-900 mt-1">{tasks.filter(t => t.status !== 'Completed').length}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
            <Activity className="w-5 h-5 text-emerald-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Upcoming Events</p>
            <p className="text-2xl font-black text-slate-900 mt-1">{events.filter(e => e.status !== 'Completed').length}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-purple-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Knowledge Base</p>
            <p className="text-2xl font-black text-slate-900 mt-1">{resources.length}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center">
            <Layers className="w-5 h-5 text-amber-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-blue-600" />
                <span>Recent Club Events</span>
              </h2>
              <Link to="/events" className="text-xs font-semibold text-blue-600 hover:underline">View All</Link>
            </div>
            <div className="space-y-3">
              {events.slice(0, 3).map(event => (
                <div key={event.id} className="flex items-center justify-between p-3 border border-slate-100 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-lg border border-slate-200 flex items-center justify-center overflow-hidden shrink-0">
                      {event.banner ? <img src={event.banner} alt={event.title} className="w-full h-full object-cover" /> : <Calendar className="w-5 h-5 text-slate-400" />}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">{event.title}</h4>
                      <p className="text-xs text-slate-500">{event.eventDate} • {event.category}</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-white border border-slate-200 shadow-2xs">
                    {event.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-600" />
                <span>Audit Log</span>
              </h2>
              <Link to="/audit-log" className="text-xs font-semibold text-blue-600 hover:underline">History</Link>
            </div>
            <div className="space-y-4 relative before:absolute before:left-[9px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
              {recentLogs.map(log => (
                <div key={log.id} className="relative pl-6">
                  <div className="absolute left-0 top-1.5 w-[20px] h-[20px] rounded-full bg-white border-[3px] border-indigo-500" />
                  <p className="text-xs font-bold text-slate-800">{log.action}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{log.target}</p>
                  <p className="text-[10px] font-medium text-slate-400 mt-1">{log.userName} • {log.timestamp}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
