import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Mail, Phone, Clock, Code, Filter, Search, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MembersPage: React.FC = () => {
  const { users, userSkills } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');

  const filtered = users.filter(u => {
    const matchesSearch = u.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = deptFilter === 'All' || u.department === deptFilter;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-600" />
          <span>Club Members Roster</span>
        </h1>
        <p className="text-xs text-slate-500">
          Filter club members by department, role hierarchy, skills, and weekly availability.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs text-xs">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search member by name or roll email..."
            className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <select
          value={deptFilter}
          onChange={e => setDeptFilter(e.target.value)}
          className="px-3 py-2 border border-slate-300 rounded-xl bg-white text-slate-700 text-xs w-full sm:w-auto"
        >
          <option value="All">All Departments</option>
          <option value="Core Team">Core Team</option>
          <option value="Software & AI">Software & AI</option>
          <option value="Media & Design">Media & Design</option>
          <option value="Robotics & Hardware">Robotics & Hardware</option>
          <option value="Events & Operations">Events & Operations</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(u => (
          <div key={u.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center gap-3">
              <img src={u.profilePicture} alt={u.fullName} className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-100 shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-slate-900 text-sm truncate">{u.fullName}</h3>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 shrink-0">
                    {u.role}
                  </span>
                </div>
                <p className="text-xs text-slate-500">{u.department} • Year {u.academicYear}</p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-1 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span className="truncate">{u.email}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{u.phone}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <Link to="/availability" className="text-[11px] font-semibold text-amber-700 hover:underline flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Check Weekly Schedule
              </Link>
              <Link to="/roles" className="text-[11px] font-bold text-blue-600 hover:underline">
                Permissions →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
