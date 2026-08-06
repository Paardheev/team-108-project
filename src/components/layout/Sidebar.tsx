import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Megaphone, Calendar, CheckSquare, MessageSquare, 
  FolderGit2, QrCode, Trophy, Users, BarChart3, Sparkles, History, 
  ShieldCheck, Layers, ChevronRight, Search
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface NavGroup {
  title: string;
  items: {
    name: string;
    path: string;
    icon: React.ElementType;
    badge?: string | number;
  }[];
}

export const Sidebar: React.FC = () => {
  const { tasks, notifications, announcements, currentUser } = useApp();

  const pendingTaskCount = tasks.filter(t => t.status === 'In Progress' || t.status === 'Waiting Review').length;
  const unreadAnnouncements = announcements.filter(a => a.priority === 'Urgent').length;

  const isAdmin = currentUser?.role === 'Admin' || currentUser?.role === 'Club Head' || currentUser?.role === 'Faculty Advisor';

  const navGroups: NavGroup[] = [
    {
      title: 'MAIN',
      items: [
        { name: 'Dashboard', path: '/', icon: LayoutDashboard }
      ]
    },
    ...(isAdmin ? [{
      title: 'ADMINISTRATION',
      items: [
        { name: 'Admin Dashboard', path: '/admin', icon: ShieldCheck }
      ]
    }] : []),
    {
      title: 'COMMUNICATION & EVENTS',
      items: [
        { name: 'Announcements', path: '/announcements', icon: Megaphone, badge: unreadAnnouncements || undefined },
        { name: 'Channels & Groups', path: '/channels', icon: Layers },
        { name: 'Events & News', path: '/events', icon: Calendar },
        { name: 'Discussion Forum', path: '/discussions', icon: MessageSquare }
      ]
    },
    {
      title: 'EXECUTION & TRACKING',
      items: [
        { name: 'Tasks & Progress', path: '/tasks', icon: CheckSquare, badge: pendingTaskCount || undefined },
        { name: 'Resource Repository', path: '/resources', icon: FolderGit2 },
        { name: 'Attendance & QR', path: '/attendance', icon: QrCode },
        { name: 'Competition Tracker', path: '/competitions', icon: Trophy }
      ]
    },
    {
      title: 'MEMBERS & ANALYTICS',
      items: [
        { name: 'Member Directory', path: '/members', icon: Users },
        { name: 'Availability Calendar', path: '/availability', icon: Calendar },
        { name: 'Analytics Insights', path: '/analytics', icon: BarChart3 }
      ]
    },
    {
      title: 'INTELLIGENCE & AUDIT',
      items: [
        { name: 'AI Assistance Suite', path: '/ai-assistant', icon: Sparkles },
        { name: 'Audit Log & History', path: '/audit-log', icon: History },
        ...(isAdmin ? [{ name: 'Role Management', path: '/roles', icon: ShieldCheck }] : [])
      ]
    }
  ];

  return (
    <aside className="w-64 shrink-0 bg-slate-900 text-slate-300 min-h-[calc(100vh-4rem)] border-r border-slate-800 p-4 flex flex-col justify-between select-none">
      <div className="space-y-6">
        {navGroups.map((group, idx) => (
          <div key={idx}>
            <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
              {group.title}
            </p>
            <nav className="space-y-1">
              {group.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white font-semibold shadow-xs'
                        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    }`
                  }
                >
                  <div className="flex items-center gap-2.5">
                    <item.icon className="w-4 h-4 shrink-0" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className="px-1.5 py-0.5 text-[10px] font-bold bg-blue-500/30 text-blue-300 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>
        ))}
      </div>

      {/* Footer info card */}
      <div className="mt-8 pt-4 border-t border-slate-800/80">
        <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-semibold text-slate-200">Vector Stack v1.0</span>
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-400">
              ● Live Sync
            </span>
          </div>
          <p className="text-[10px] text-slate-400">Student Club & Team Management System</p>
        </div>
      </div>
    </aside>
  );
};
