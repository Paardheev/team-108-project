import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckSquare, Calendar, Sparkles, Clock, MapPin, QrCode
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MemberDashboard: React.FC = () => {
  const { 
    currentUser, tasks, events, eventRegistrations
  } = useApp();

  const myTasks = tasks.filter(t => t.assigneeName === currentUser.fullName);
  const pendingTasks = myTasks.filter(t => t.status !== 'Completed');
  
  const upcomingEvents = events.filter(e => e.status === 'Upcoming' || e.status === 'Registration Open');
  const myRegisteredEventIds = eventRegistrations.filter(r => r.userId === currentUser.id).map(r => r.eventId);
  const myUpcomingEvents = upcomingEvents.filter(e => myRegisteredEventIds.includes(e.id));
  const availableEvents = upcomingEvents.filter(e => !myRegisteredEventIds.includes(e.id));

  return (
    <div className="space-y-6">
      {/* Member/Volunteer Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-sky-800 to-cyan-900 rounded-2xl p-6 text-white shadow-lg border border-sky-800/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-sky-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-sky-300">Club Member Portal</span>
            </div>
            <h1 className="text-2xl font-bold">Welcome back, {currentUser.fullName}!</h1>
            <p className="text-sm text-sky-100/90 max-w-xl">
              Track your assigned tasks, check your event tickets, and update your weekly availability.
            </p>
          </div>
          <div className="flex gap-2">
            <Link to="/profile" className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold rounded-xl transition-all shadow-md">
              Update Profile
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Tasks */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-blue-600" />
              <span>My Tasks</span>
            </h2>
            <Link to="/tasks" className="text-xs font-semibold text-blue-600 hover:underline">View All</Link>
          </div>
          
          <div className="space-y-3">
            {pendingTasks.length > 0 ? (
              pendingTasks.slice(0, 4).map(task => (
                <Link key={task.id} to={`/tasks/${task.id}`} className="block p-4 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 transition-colors shadow-2xs">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{task.title}</h4>
                      <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-500 font-medium">
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Due {task.dueDate}</span>
                      </div>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded border ${
                      task.priority === 'High' || task.priority === 'Critical' 
                        ? 'bg-rose-50 text-rose-700 border-rose-200' 
                        : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-[10px] font-semibold text-slate-500">
                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: `${task.progressPercent}%` }} />
                    </div>
                    <span>{task.progressPercent}%</span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center py-8 text-slate-500 text-sm bg-slate-50 rounded-xl border border-slate-100">
                You're all caught up! No pending tasks.
              </div>
            )}
          </div>
        </div>

        {/* My Events & Discover */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <QrCode className="w-5 h-5 text-purple-600" />
                <span>My Registered Events</span>
              </h2>
            </div>
            <div className="space-y-3">
              {myUpcomingEvents.length > 0 ? (
                myUpcomingEvents.slice(0, 2).map(event => (
                  <Link key={event.id} to={`/events/${event.id}`} className="flex gap-3 p-3 border border-purple-100 bg-purple-50/30 rounded-xl hover:bg-purple-50 transition-colors">
                    <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                      <img src={event.banner} alt={event.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-slate-900 truncate">{event.title}</h4>
                      <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-500">
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {event.eventDate}</span>
                        <span className="flex items-center gap-1 truncate"><MapPin className="w-3.5 h-3.5" /> {event.venue}</span>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-xs text-slate-500">You haven't registered for any upcoming events.</p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-600" />
                <span>Available Events</span>
              </h2>
              <Link to="/events" className="text-xs font-semibold text-emerald-600 hover:underline">Explore All</Link>
            </div>
            <div className="space-y-3">
              {availableEvents.slice(0, 2).map(event => (
                <Link key={event.id} to={`/events/${event.id}`} className="flex items-center justify-between p-3 border border-slate-100 bg-white shadow-2xs rounded-xl hover:border-emerald-200 transition-colors">
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">{event.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{event.eventDate}</p>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded">
                    Join Now
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
