import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Scan, CheckCircle2, ArrowLeft, Camera, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const QRScannerPage: React.FC = () => {
  const navigate = useNavigate();
  const { markAttendance, currentUser, attendanceSessions } = useApp();
  const [scanned, setScanned] = useState(false);

  const handleSimulateScan = () => {
    if (attendanceSessions.length > 0) {
      markAttendance(attendanceSessions[0].id, currentUser.id, true, 'Dynamic QR Scan');
    }
    setScanned(true);
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <Link to="/attendance" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Attendance</span>
      </Link>

      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-2xl border border-slate-800 space-y-6 text-center">
        <div className="space-y-1">
          <Scan className="w-8 h-8 text-indigo-400 mx-auto" />
          <h1 className="text-lg font-bold">QR Verification Scanner</h1>
          <p className="text-xs text-slate-400">Position the dynamic 30s QR code inside the viewfinder camera box.</p>
        </div>

        {scanned ? (
          <div className="p-6 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
            <h3 className="text-base font-bold text-emerald-200">Attendance Verified!</h3>
            <p className="text-xs text-slate-300">
              Welcome {currentUser.fullName}! Your timestamped entry has been recorded in the attendance ledger.
            </p>
            <button
              onClick={() => navigate('/attendance')}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-sm mt-2"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="relative w-64 h-64 mx-auto border-2 border-indigo-500/50 rounded-2xl flex items-center justify-center overflow-hidden bg-slate-950/80">
              {/* Animated Scan Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-indigo-400 to-transparent animate-pulse shadow-[0_0_15px_#818cf8]" />
              <Camera className="w-12 h-12 text-slate-700" />
              <div className="absolute bottom-2 text-[10px] text-slate-400 font-mono">Camera Feed Active</div>
            </div>

            <button
              onClick={handleSimulateScan}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Simulate Scan Dynamic QR</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
