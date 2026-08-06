import React from 'react';
import { Clock, Filter, Users, Calendar } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AvailabilityPage: React.FC = () => {
  const { availabilitySlots, users } = useApp();

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Clock className="w-5 h-5 text-amber-600" />
          <span>Member Weekly Free-Time Matrix</span>
        </h1>
        <p className="text-xs text-slate-500">
          Coordinators match task deadlines with member available time slots.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {availabilitySlots.map(slot => (
            <div
              key={slot.id}
              className={`p-3.5 rounded-xl border space-y-2 ${
                slot.status === 'Available' ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs">{slot.weekday}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  slot.status === 'Available' ? 'bg-emerald-200 text-emerald-900' : 'bg-slate-200 text-slate-700'
                }`}>
                  {slot.status}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 font-mono">{slot.timeSlot}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
