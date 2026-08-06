import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Search, Bell, Sparkles, User as UserIcon, Shield, ChevronDown, Lock, X, Check,
  Plus, CheckCircle, AlertTriangle, Layers, BookOpen, Clock, Calendar, MessageSquare, Settings, LogOut
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { 
    currentUser, activeClub, setActiveClub, clubs, switchRole, 
    notifications, globalSearchQuery, setGlobalSearchQuery, markNotificationAsRead,
    joinRequests, createJoinRequest
  } = useApp();

  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showClubMenu, setShowClubMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [joinClubTarget, setJoinClubTarget] = useState<number | null>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const unreadNotifs = notifications.filter(n => !n.isRead);

  const rolesList: UserRole[] = [
    'Club Head', 'Coordinator', 'Team Lead', 'Club Member', 'Volunteer', 'Faculty Advisor'
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (globalSearchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(globalSearchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-slate-200/80 px-4 md:px-6 flex items-center justify-between gap-4 shadow-2xs">
      {/* Left: Brand & Active Club Selector */}
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-blue-600 transition-colors">
            V
          </div>
          <div className="hidden sm:block">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-900 tracking-tight text-sm">Vector Stack</span>
              <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-slate-100 text-slate-600 rounded">Team-108</span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">IIT Madras Club Platform</p>
          </div>
        </Link>

        {/* Divider */}
        <div className="h-6 w-px bg-slate-200 hidden md:block" />

        {/* Club Switcher Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowClubMenu(!showClubMenu)}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-800 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-all"
          >
            <span className="text-base">{activeClub.logo}</span>
            <span className="max-w-[130px] sm:max-w-[180px] truncate">{activeClub.name}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showClubMenu && (
            <div className="absolute left-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-lg p-1.5 z-50">
              <div className="px-2 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Select Active Club
              </div>
              {clubs.filter(c => c.approvalStatus !== 'Pending' && c.approvalStatus !== 'Rejected').map(c => {
                const isJoined = currentUser.joinedClubIds?.includes(c.id);
                const hasPendingRequest = joinRequests.some(r => r.clubId === c.id && r.userId === currentUser.id && r.status === 'Pending');

                return (
                  <button
                    key={c.id}
                    onClick={() => {
                      if (isJoined) {
                        setActiveClub(c);
                        setShowClubMenu(false);
                      } else if (!hasPendingRequest) {
                        setJoinClubTarget(c.id);
                        setShowClubMenu(false);
                      }
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg transition-colors text-left ${
                      c.id === activeClub.id 
                        ? 'bg-blue-50 text-blue-700 font-semibold' 
                        : isJoined
                          ? 'text-slate-700 hover:bg-slate-50'
                          : 'text-slate-400 cursor-not-allowed hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={!isJoined ? 'opacity-50 grayscale' : ''}>{c.logo}</span>
                      <span>{c.name}</span>
                    </div>
                    {isJoined ? (
                      <span className="text-[10px] text-slate-400">{c.memberCount} members</span>
                    ) : hasPendingRequest ? (
                      <span className="text-[10px] text-amber-500 font-semibold">Pending</span>
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-slate-300" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Middle: Global Search */}
      <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md items-center">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search members, tasks, events, resources, discussions..."
            value={globalSearchQuery}
            onChange={(e) => setGlobalSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-xs text-slate-800 placeholder-slate-400 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
      </form>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* AI Assistant Hub Button */}
        <Link
          to="/ai-assistant"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200/80 rounded-lg transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-600 animate-pulse" />
          <span className="hidden sm:inline">AI Suite</span>
        </Link>

        {/* Quick Add Menu */}
        <div className="relative">
          <button
            onClick={() => setShowQuickAdd(!showQuickAdd)}
            className="w-8 h-8 rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-colors shadow-2xs"
            title="Create New Action"
          >
            <Plus className="w-4 h-4" />
          </button>

          {showQuickAdd && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg p-1.5 z-50">
              <Link
                to="/tasks/create"
                onClick={() => setShowQuickAdd(false)}
                className="flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-lg"
              >
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Create Task</span>
              </Link>
              <Link
                to="/events/create"
                onClick={() => setShowQuickAdd(false)}
                className="flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-lg"
              >
                <Calendar className="w-3.5 h-3.5 text-blue-600" />
                <span>Schedule Event</span>
              </Link>
              <Link
                to="/announcements/create"
                onClick={() => setShowQuickAdd(false)}
                className="flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-lg"
              >
                <Bell className="w-3.5 h-3.5 text-amber-600" />
                <span>New Announcement</span>
              </Link>
              <Link
                to="/discussions/create"
                onClick={() => setShowQuickAdd(false)}
                className="flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-lg"
              >
                <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
                <span>Start Discussion</span>
              </Link>
            </div>
          )}
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifMenu(!showNotifMenu)}
            className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifs.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
            )}
          </button>

          {showNotifMenu && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl p-2 z-50">
              <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-900">Notifications ({unreadNotifs.length} unread)</span>
                <Link to="/notifications" onClick={() => setShowNotifMenu(false)} className="text-[11px] font-semibold text-blue-600 hover:underline">
                  View All
                </Link>
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                {notifications.slice(0, 5).map(n => (
                  <div
                    key={n.id}
                    onClick={() => markNotificationAsRead(n.id)}
                    className={`p-3 text-xs cursor-pointer hover:bg-slate-50 transition-colors ${!n.isRead ? 'bg-blue-50/40' : ''}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-slate-800">{n.title}</span>
                      <span className="text-[10px] text-slate-400">{n.createdAt}</span>
                    </div>
                    <p className="text-slate-600 line-clamp-2 text-[11px]">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 group focus:outline-none"
          >
            <img
              src={currentUser.profilePicture}
              alt={currentUser.fullName}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-200 group-hover:ring-blue-500 transition-all"
            />
          </button>
          
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg p-1.5 z-50">
              <Link
                to="/profile"
                onClick={() => setShowProfileMenu(false)}
                className="flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-lg"
              >
                <UserIcon className="w-3.5 h-3.5 text-slate-400" />
                <span>My Profile</span>
              </Link>
              <Link
                to="/settings"
                onClick={() => setShowProfileMenu(false)}
                className="flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-lg"
              >
                <Settings className="w-3.5 h-3.5 text-slate-400" />
                <span>Settings</span>
              </Link>
              <div className="h-px bg-slate-100 my-1"></div>
              <button
                onClick={() => {
                  localStorage.removeItem('token');
                  window.location.href = '/login';
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-lg"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-500" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {joinClubTarget && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setJoinClubTarget(null)}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="mb-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-3">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Request to Join</h3>
              <p className="text-sm text-slate-500 mt-1">
                You are about to send a join request to the Club Head of {clubs.find(c => c.id === joinClubTarget)?.name}. They will review your request.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setJoinClubTarget(null)}
                className="flex-1 px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  createJoinRequest(joinClubTarget);
                  setJoinClubTarget(null);
                }}
                className="flex-1 px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}

    </header>
  );
};
