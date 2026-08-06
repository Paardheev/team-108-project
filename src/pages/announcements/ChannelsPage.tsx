import React from 'react';
import { Layers, Users, Lock, Radio } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ChannelsPage: React.FC = () => {
  const { activeClub } = useApp();

  const channels = [
    { name: 'Everyone (Club Wide)', members: activeClub.memberCount, desc: 'Global broadcasts to all club members across departments', isPrivate: false },
    { name: 'Core Team & Leads', members: 18, desc: 'Restricted channel for Club Heads, Coordinators, and Team Leads', isPrivate: true },
    { name: 'Software & AI Team', members: 34, desc: 'Technical discussions, repo commits, and build pipeline alerts', isPrivate: false },
    { name: 'Media & Design Group', members: 22, desc: 'Brand assets, Figma design systems, poster feedback', isPrivate: false },
    { name: 'Robotics & Hardware', members: 28, desc: 'Lab tool inventory, PCB layout files, sensor calibration', isPrivate: false },
    { name: 'Events & Operations', members: 25, desc: 'CRC Hall logistics, sound checks, vendor vouchers', isPrivate: false }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-600" />
          <span>Hierarchy Communication Channels</span>
        </h1>
        <p className="text-xs text-slate-500">
          Replaces fragmented WhatsApp groups with role-scoped institutional channels.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {channels.map((ch, idx) => (
          <div key={idx} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <Radio className="w-4 h-4 text-indigo-600" />
                  #{ch.name}
                </span>
                {ch.isPrivate ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    <Lock className="w-3 h-3 text-slate-500" /> Private Role
                  </span>
                ) : (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                    Public
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-600">{ch.desc}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1 font-medium">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                {ch.members} members
              </span>
              <button className="px-3 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-xs rounded-lg transition-colors">
                View Channel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
