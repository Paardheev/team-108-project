import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FileSpreadsheet, ArrowLeft, CheckCircle2, XCircle, Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AttendanceSheetPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { attendanceSessions, markAttendance, users } = useApp();

  const session = attendanceSessions.find(s => s.id === Number(id)) || attendanceSessions[0];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link to="/attendance" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Attendance</span>
      </Link>

      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-900">
            {session.sessionType} Session
          </span>
          <span className="text-xs text-slate-500 font-medium">{session.sessionDate}</span>
        </div>
        <h1 className="text-xl font-bold text-slate-900">{session.title}</h1>
        <p className="text-xs text-slate-500">Location: {session.location} • Verified Records</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700">
          <span>Member Attendance Sheet</span>
          <span>{session.presentCount} Present / {session.presentCount + session.absentCount} Total</span>
        </div>

        <div className="divide-y divide-slate-100">
          {session.records.map(rec => (
            <div key={rec.userId} className="p-3.5 flex items-center justify-between text-xs hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-2.5 h-2.5 rounded-full ${rec.isPresent ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                <div>
                  <p className="font-bold text-slate-900">{rec.userName}</p>
                  <p className="text-[10px] text-slate-400">Method: {rec.verificationMethod} {rec.scannedAt ? `• ${new Date(rec.scannedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : ''}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => markAttendance(session.id, rec.userId, !rec.isPresent, 'Manual Organizer Toggle')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    rec.isPresent ? 'bg-emerald-100 text-emerald-800 hover:bg-rose-100 hover:text-rose-800' : 'bg-rose-100 text-rose-800 hover:bg-emerald-100 hover:text-emerald-800'
                  }`}
                >
                  {rec.isPresent ? 'Mark Absent' : 'Mark Present'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
