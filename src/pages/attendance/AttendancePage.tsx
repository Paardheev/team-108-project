import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { QrCode, Scan, Users, FileSpreadsheet, BarChart2, Plus, RefreshCw, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AttendancePage: React.FC = () => {
  const { attendanceSessions, activeClub } = useApp();
  const [countdown, setCountdown] = useState(30);

  // Rotate QR code timer every 30s
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => (prev <= 1 ? 30 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <QrCode className="w-5 h-5 text-indigo-600" />
            <span>Attendance & Verification System</span>
          </h1>
          <p className="text-xs text-slate-500">
            Dynamic 30-second rotating QR code validation to eliminate proxy attendance.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/attendance/qr-scanner"
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-2xs transition-all shrink-0"
          >
            <Scan className="w-4 h-4" />
            <span>Open Mobile Scanner</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Dynamic Rotating QR Generator Box */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800 space-y-4 text-center">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
              <QrCode className="w-4 h-4" /> Live Dynamic QR
            </span>
            <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
              <RefreshCw className="w-3 h-3 animate-spin text-indigo-400" /> Auto Refresh: {countdown}s
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl inline-block mx-auto shadow-inner border-4 border-indigo-500/30">
            {/* SVG Representation of Dynamic QR code */}
            <svg className="w-44 h-44" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h30v30H0zM10 10h10v10H10zM70 0h30v30H70zM80 10h10v10H80zM0 70h30v30H0zM10 80h10v10H10z" fill="#0f172a" />
              <rect x="35" y="5" width="25" height="10" fill="#0f172a" />
              <rect x="40" y="20" width="15" height="20" fill="#6366f1" />
              <rect x="5" y="35" width="20" height="15" fill="#0f172a" />
              <rect x="35" y="55" width="30" height="15" fill="#0f172a" />
              <rect x="75" y="40" width="20" height="20" fill="#6366f1" />
              <rect x="70" y="70" width="25" height="25" fill="#0f172a" />
              <circle cx="50" cy="50" r="8" fill="#ec4899" />
            </svg>
          </div>

          <p className="text-xs text-slate-300">
            Scan using the Vector Stack scanner on mobile. Token changes every 30s to prevent screenshot sharing.
          </p>

          <div className="pt-2">
            <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-3 py-1 rounded-full border border-slate-700">
              HASH: 0x8F9A...{countdown * 37}
            </span>
          </div>
        </div>

        {/* Recent Attendance Sessions List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">Recent Attendance Sessions</h2>
              <Link to="/attendance/reports" className="text-xs font-semibold text-blue-600 hover:underline">
                View Reports & Export CSV
              </Link>
            </div>

            <div className="space-y-3">
              {attendanceSessions.map(session => (
                <div key={session.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-900">
                        {session.sessionType}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">{session.sessionDate}</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">{session.title}</h3>
                    <p className="text-xs text-slate-600">{session.location}</p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <span className="text-sm font-extrabold text-slate-900">{session.presentCount} Present</span>
                      <p className="text-[10px] text-slate-400">{session.absentCount} Absent</p>
                    </div>

                    <Link
                      to={`/attendance/${session.id}/sheet`}
                      className="px-3.5 py-2 bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 text-xs font-semibold rounded-xl transition-colors"
                    >
                      Sheet →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
