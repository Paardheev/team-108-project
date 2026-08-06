import React, { useState } from 'react';
import { ShieldCheck, UserCheck, CheckCircle2, XCircle, Plus, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { mockPermissions } from '../../data/mockData';
import { UserRole } from '../../types';

export const RolesManagementPage: React.FC = () => {
  const { users, currentUser } = useApp();
  const [selectedUser, setSelectedUser] = useState(users[2]); // Gunja Tejaswi
  const [userPermissions, setUserPermissions] = useState<string[]>([
    'Manage Members', 'Task Management', 'Event Management', 'Resource Upload'
  ]);

  const togglePermission = (permName: string) => {
    if (userPermissions.includes(permName)) {
      setUserPermissions(userPermissions.filter(p => p !== permName));
    } else {
      setUserPermissions([...userPermissions, permName]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-amber-600" />
          <span>Role Management & Delegated Permissions</span>
        </h1>
        <p className="text-xs text-slate-500">
          Club Heads assign functional capabilities directly to coordinators without changing fixed user hierarchy roles.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left List of Members */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-4 space-y-3">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">Select Club Member</h2>
          <div className="space-y-1">
            {users.map(u => (
              <button
                key={u.id}
                onClick={() => setSelectedUser(u)}
                className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-left text-xs transition-colors ${
                  selectedUser.id === u.id ? 'bg-amber-50 border border-amber-200 text-amber-950 font-semibold' : 'hover:bg-slate-50 text-slate-700'
                }`}
              >
                <img src={u.profilePicture} alt={u.fullName} className="w-8 h-8 rounded-full object-cover shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-slate-900 truncate">{u.fullName}</p>
                  <p className="text-[10px] text-slate-500">{u.role} • {u.department}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Permission Delegation Grid */}
        <div className="md:col-span-2 bg-white rounded-xl border border-slate-200 shadow-2xs p-5 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Active Role: {selectedUser.role}
              </span>
              <h2 className="text-base font-bold text-slate-900 mt-1">
                Delegated Permissions for {selectedUser.fullName}
              </h2>
            </div>
            <span className="text-xs text-slate-500">Department: <strong>{selectedUser.department}</strong></span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {mockPermissions.map(perm => {
              const isGranted = userPermissions.includes(perm.name);
              return (
                <div
                  key={perm.id}
                  onClick={() => togglePermission(perm.name)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isGranted
                      ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                      : 'bg-slate-50/60 border-slate-200 text-slate-600 hover:bg-slate-100/80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs">{perm.name}</span>
                    {isGranted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-slate-300 shrink-0" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-600 leading-tight">{perm.description}</p>
                </div>
              );
            })}
          </div>

          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-2 text-xs text-blue-900">
            <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p>
              Delegated permissions take effect immediately across task management, event creation, attendance scanning, and announcement broadcasting.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
