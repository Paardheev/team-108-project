import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, CheckSquare, Calendar, FolderGit2, AlertTriangle, 
  ArrowUpRight, Users, Trophy, PlayCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CoordinatorDashboard: React.FC = () => {
  const { 
    currentUser, announcements, tasks, events, resources 
  } = useApp();

  const urgentAnnouncements = announcements.filter(a => a.priority === 'Urgent');
  const myTasks = tasks.filter(t => t.assigneeName === currentUser.fullName);
  const myPendingTasks = myTasks.filter(t => t.status !== 'Completed');
  const upcomingEvents = events.filter(e => e.status === 'Upcoming' || e.status === 'Registration Open');

  return (
    <div className="space-y-6">
      {/* Coordinator Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-emerald-900 to-emerald-800 rounded-2xl p-6 text-white shadow-lg border border-emerald-800/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">Project Management Hub</span>
            </div>
            <h1 className="text-2xl font-bold">Hello, {currentUser.fullName}!</h1>
            <p className="text-sm text-emerald-100/90 max-w-xl">
              Track your team's progress, manage active event timelines, and review volunteer checkpoints.
            </p>
          </div>
          <div className="flex gap-2">
            <Link to="/tasks/create" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl transition-all shadow-md">
              Assign New Task
            </Link>
          </div>
        </div>
      </div>

      {urgentAnnouncements.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 shadow-sm">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-amber-900">Urgent Announcements</h4>
            <p className="text-xs text-amber-700 mt-1">Please review the latest urgent updates from the Club Head.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Task Tracking */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-emerald-600" />
              <span>My Department Tasks</span>
            </h2>
            <Link to="/tasks" className="text-xs font-semibold text-emerald-600 hover:underline">Manage All</Link>
          </div>
          <div className="space-y-3">
            {myPendingTasks.length > 0 ? (
              myPendingTasks.slice(0, 4).map(task => (
                <div key={task.id} className="p-4 border border-slate-200 rounded-xl bg-slate-50">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{task.title}</h4>
                      <p className="text-xs text-slate-500 mt-1">Due: {task.dueDate}</p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-1 rounded bg-white border border-slate-200 text-slate-600">
                      {task.status}
                    </span>
                  </div>
                  <div className="mt-3">
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500" 
                        style={{ width: `${task.progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-slate-500 text-sm">No pending tasks for you right now.</div>
            )}
          </div>
        </div>

        {/* Upcoming Events & Resources */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-600" />
                <span>Active Event Timelines</span>
              </h2>
              <Link to="/events" className="text-xs font-semibold text-purple-600 hover:underline">Calendar</Link>
            </div>
            <div className="space-y-3">
              {upcomingEvents.slice(0, 2).map(event => (
                <div key={event.id} className="flex gap-3 p-3 border border-slate-100 bg-white shadow-2xs rounded-xl">
                  <div className="w-16 h-16 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                    <img src={event.banner} alt={event.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-slate-900 truncate">{event.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-1">{event.eventDate}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] bg-purple-50 text-purple-700 px-2 py-0.5 rounded font-semibold border border-purple-100">
                        {event.registeredCount} / {event.capacity} Reg
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FolderGit2 className="w-5 h-5 text-blue-600" />
                <span>Latest Resources</span>
              </h2>
            </div>
            <div className="space-y-2">
              {resources.slice(0, 3).map(res => (
                <div key={res.id} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{res.title}</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">By {res.uploadedBy}</p>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400">{res.fileSize}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
