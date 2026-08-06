import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { User } from '../../types';

interface EventTicketQRProps {
  eventId: number;
  user: User;
}

export const EventTicketQR: React.FC<EventTicketQRProps> = ({ eventId, user }) => {
  // We encode a JSON string with the event ID and user ID to act as a ticket
  const ticketData = JSON.stringify({
    type: 'event_ticket',
    eventId,
    userId: user.id,
    userName: user.fullName
  });

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-4 text-center">
      <h3 className="text-sm font-bold text-slate-800">Your Entry Ticket</h3>
      <p className="text-xs text-slate-500 max-w-[200px]">Present this QR code at the venue for quick check-in.</p>
      
      <div className="p-3 bg-white rounded-xl border-2 border-slate-100 shadow-inner">
        <QRCodeSVG 
          value={ticketData} 
          size={180} 
          level="H"
          fgColor="#0f172a" 
          bgColor="#ffffff"
        />
      </div>
      
      <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
        {user.fullName} • ID: {user.id}
      </div>
    </div>
  );
};
