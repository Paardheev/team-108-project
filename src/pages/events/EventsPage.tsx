import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Plus, MapPin, Users, Clock, CheckCircle, Sparkles, Filter } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const EventsPage: React.FC = () => {
  const { events, currentUser } = useApp();
  const canViewPending = ['Admin', 'Club Head', 'Faculty Advisor', 'Coordinator', 'Team Lead'].includes(currentUser?.role || '');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const filtered = events.filter(e => 
    (categoryFilter === 'All' || e.category === categoryFilter) &&
    (e.approvalStatus !== 'Pending' && e.approvalStatus !== 'Rejected' || canViewPending || e.organizer === currentUser?.fullName)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            <span>Event & News Portal</span>
          </h1>
          <p className="text-xs text-slate-500">
            Centralized portal for scheduling, registration, volunteer allocation, and post-event history.
          </p>
        </div>
        <Link
          to="/events/create"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-2xs transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule New Event</span>
        </Link>
      </div>

      {/* Categories Filter */}
      <div className="flex flex-wrap items-center gap-2 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs text-xs">
        <span className="text-slate-400 font-semibold px-2">Category:</span>
        {['All', 'Workshop', 'Hackathon', 'Technical Talk', 'Competition', 'Meeting'].map(cat => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              categoryFilter === cat ? 'bg-blue-600 text-white font-bold' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(evt => (
          <div key={evt.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="h-40 bg-slate-100 relative">
                <img src={evt.banner} alt={evt.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 right-3 px-2.5 py-1 text-[10px] font-bold rounded-lg bg-slate-900/90 text-white backdrop-blur-xs">
                  {evt.approvalStatus === 'Pending' ? 'Pending Approval' : evt.status}
                </span>
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                    {evt.category}
                  </span>
                  <span className="text-slate-400 font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {new Date(evt.eventDate).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">{evt.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-2">{evt.description}</p>

                <div className="space-y-1.5 text-xs text-slate-500 pt-1">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{evt.venue}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span>{evt.registeredCount} / {evt.capacity} Registered</span>
                    </span>
                    <span className="text-[11px] font-semibold text-purple-700">
                      Volunteers: {evt.assignedVolunteersCount}/{evt.requiredVolunteers}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
              <Link
                to={`/events/${evt.id}/register`}
                className="flex-1 text-center py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-colors shadow-2xs"
              >
                Register Now
              </Link>
              <Link
                to={`/events/${evt.id}`}
                className="px-3.5 py-2 border border-slate-300 hover:bg-white text-slate-700 text-xs font-semibold rounded-xl transition-colors"
              >
                Timeline & Report
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
