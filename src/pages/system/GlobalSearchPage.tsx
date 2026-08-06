import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, CheckSquare, Calendar, Megaphone, FolderGit2, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const GlobalSearchPage: React.FC = () => {
  const { tasks, events, announcements, resources, discussions, globalSearchQuery, setGlobalSearchQuery } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const q = new URLSearchParams(location.search).get('q') || '';
    if (q && q !== globalSearchQuery) {
      setGlobalSearchQuery(q);
    }
  }, [location.search, setGlobalSearchQuery]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setGlobalSearchQuery(newQuery);
    navigate(`/search?q=${encodeURIComponent(newQuery)}`, { replace: true });
  };

  const matchingTasks = tasks.filter(t => t.title.toLowerCase().includes(globalSearchQuery.toLowerCase()));
  const matchingEvents = events.filter(e => e.title.toLowerCase().includes(globalSearchQuery.toLowerCase()));
  const matchingAnnouncements = announcements.filter(a => a.title.toLowerCase().includes(globalSearchQuery.toLowerCase()));
  const matchingResources = resources.filter(r => r.title.toLowerCase().includes(globalSearchQuery.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Search className="w-5 h-5 text-blue-600" />
          <span>Global Cross-Module Search</span>
        </h1>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={globalSearchQuery}
            onChange={handleQueryChange}
            placeholder="Search across tasks, announcements, events, resources, and discussions..."
            className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {globalSearchQuery.trim() && (
        <div className="space-y-4">
          {matchingTasks.length > 0 && (
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckSquare className="w-4 h-4 text-emerald-600" /> Tasks ({matchingTasks.length})
              </h2>
              <div className="space-y-1">
                {matchingTasks.map(t => (
                  <Link key={t.id} to={`/tasks/${t.id}`} className="block p-2 bg-slate-50 hover:bg-slate-100 rounded-xl text-xs font-bold text-slate-900">
                    {t.title}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {matchingEvents.length > 0 && (
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-blue-600" /> Events ({matchingEvents.length})
              </h2>
              <div className="space-y-1">
                {matchingEvents.map(e => (
                  <Link key={e.id} to={`/events/${e.id}`} className="block p-2 bg-slate-50 hover:bg-slate-100 rounded-xl text-xs font-bold text-slate-900">
                    {e.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
