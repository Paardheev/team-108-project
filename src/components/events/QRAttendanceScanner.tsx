import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { CheckCircle, XCircle, Camera, Loader2, RefreshCw } from 'lucide-react';

interface QRAttendanceScannerProps {
  eventId: number;
  onScanSuccess: (userId: number, userName: string) => void;
}

export const QRAttendanceScanner: React.FC<QRAttendanceScannerProps> = ({ eventId, onScanSuccess }) => {
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [lastScanned, setLastScanned] = useState<string>('');

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (scannerRef.current && isScanning) {
        scannerRef.current.stop().catch(console.error);
      }
    };
  }, [isScanning]);

  const startScanning = async () => {
    try {
      if (!scannerRef.current) {
        scannerRef.current = new Html5Qrcode("qr-reader", {
          formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
          verbose: false
        });
      }
      
      setIsScanning(true);
      setError(null);
      setSuccessMsg(null);
      setLastScanned('');
      
      await scannerRef.current.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          try {
            // Prevent duplicate fast scans
            if (lastScanned === decodedText) return;
            setLastScanned(decodedText);
            
            const data = JSON.parse(decodedText);
            if (data.type === 'event_ticket') {
              if (data.eventId === eventId) {
                setSuccessMsg(`Checked in: ${data.userName}`);
                setError(null);
                onScanSuccess(data.userId, data.userName);
                
                // Clear success message after 3 seconds
                setTimeout(() => {
                  setSuccessMsg(null);
                  setLastScanned(''); // reset so they can scan next person
                }, 3000);
              } else {
                setError("Ticket is for a different event!");
                setTimeout(() => setError(null), 3000);
              }
            } else {
              setError("Invalid QR Code format.");
              setTimeout(() => setError(null), 3000);
            }
          } catch (e) {
            setError("Could not parse QR data.");
            setTimeout(() => setError(null), 3000);
          }
        },
        (errorMessage) => {
          // ignore constant scanner errors while looking for code
        }
      );
    } catch (err: any) {
      setError(err?.message || "Failed to start camera. Please check permissions.");
      setIsScanning(false);
    }
  };

  const stopScanning = async () => {
    if (scannerRef.current && isScanning) {
      await scannerRef.current.stop();
      setIsScanning(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col items-center p-6 space-y-6">
      <div className="text-center space-y-1">
        <h3 className="text-lg font-bold text-slate-900 flex items-center justify-center gap-2">
          <Camera className="w-5 h-5 text-blue-600" />
          <span>Scanner Console</span>
        </h3>
        <p className="text-xs text-slate-500">Scan participant QR codes to mark attendance.</p>
      </div>

      {/* Scanner Container */}
      <div 
        id="qr-reader" 
        className={`w-full max-w-sm rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center transition-all ${!isScanning ? 'min-h-[250px]' : ''}`}
      >
        {!isScanning && (
          <div className="text-slate-500 flex flex-col items-center space-y-2">
            <Camera className="w-8 h-8 opacity-50" />
            <span className="text-xs font-semibold">Camera Offline</span>
          </div>
        )}
      </div>

      {/* Status Messages */}
      {successMsg && (
        <div className="w-full max-w-sm flex items-center gap-2 px-4 py-3 bg-green-50 text-green-700 border border-green-200 rounded-xl animate-in fade-in zoom-in duration-300">
          <CheckCircle className="w-5 h-5 shrink-0" />
          <span className="text-sm font-semibold">{successMsg}</span>
        </div>
      )}
      
      {error && (
        <div className="w-full max-w-sm flex items-start gap-2 px-4 py-3 bg-red-50 text-red-700 border border-red-200 rounded-xl animate-in fade-in zoom-in duration-300">
          <XCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span className="text-sm font-medium">{error}</span>
        </div>
      )}

      {/* Controls */}
      <div className="flex gap-3">
        {!isScanning ? (
          <button
            onClick={startScanning}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-2xs transition-colors"
          >
            <Camera className="w-4 h-4" />
            <span>Start Scanner</span>
          </button>
        ) : (
          <button
            onClick={stopScanning}
            className="flex items-center gap-2 px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition-colors"
          >
            <XCircle className="w-4 h-4" />
            <span>Stop Scanner</span>
          </button>
        )}
      </div>
    </div>
  );
};
