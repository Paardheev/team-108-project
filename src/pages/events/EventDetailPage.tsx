import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Calendar, MapPin, Users, Phone, Clock, FileText, QrCode, Camera,
  CheckCircle2, ArrowLeft, DollarSign, Award, Image as ImageIcon, Star 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EventTicketQR } from '../../components/events/EventTicketQR';
import { QRAttendanceScanner } from '../../components/events/QRAttendanceScanner';

export const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { events, currentUser, eventRegistrations, markEventAttendance } = useApp();
  const [showQR, setShowQR] = useState(false);

  const event = events.find(e => e.id === Number(id)) || events[0];
  const registration = eventRegistrations.find(r => r.eventId === event.id && r.userId === currentUser.id);
  const isRegistered = !!registration;
  const hasAttended = registration?.attendanceStatus;
  const isAdminOrCore = ['Faculty Advisor', 'Club Head', 'Coordinator', 'Team Lead'].includes(currentUser.role);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link to="/events" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Events</span>
      </Link>

      {/* Hero Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs space-y-4">
        <div className="h-52 bg-slate-900 relative">
          <img src={event.banner} alt={event.title} className="w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-6 right-4 text-white">
            <span className="text-xs font-bold px-2.5 py-1 rounded bg-blue-600 text-white">
              {event.category}
            </span>
            <h1 className="text-2xl font-bold mt-2">{event.title}</h1>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-xs text-slate-700 leading-relaxed">{event.description}</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] font-semibold uppercase">Venue</span>
              <strong className="text-slate-800">{event.venue}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] font-semibold uppercase">Date & Time</span>
              <strong className="text-slate-800">{new Date(event.eventDate).toLocaleDateString()}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] font-semibold uppercase">Capacity</span>
              <strong className="text-slate-800">{event.registeredCount} / {event.capacity} Registered</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] font-semibold uppercase">Contact Person</span>
              <strong className="text-slate-800">{event.contactPerson} ({event.contactPhone})</strong>
            </div>
          </div>
          
          <div className="pt-4 flex flex-wrap gap-4 border-t border-slate-100">
            {isRegistered ? (
              hasAttended ? (
                <div className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-50 text-green-700 border border-green-200 text-sm font-semibold rounded-xl shadow-2xs">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Attendance Verified</span>
                </div>
              ) : (
                <button 
                  onClick={() => setShowQR(true)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-xl shadow-2xs transition-colors"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Show My Ticket QR</span>
                </button>
              )
            ) : (
              <Link 
                to={`/events/${event.id}/register`}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-2xs transition-colors"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Register Now</span>
              </Link>
            )}

            {isAdminOrCore && (
              <button 
                onClick={() => setShowQR(prev => !prev)}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-amber-100 hover:bg-amber-200 text-amber-800 text-sm font-semibold rounded-xl transition-colors"
              >
                <Camera className="w-4 h-4" />
                <span>Scan Attendance QR</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Conditional QR Content */}
      {showQR && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-300">
          {isAdminOrCore && !isRegistered ? (
            <QRAttendanceScanner 
              eventId={event.id} 
              onScanSuccess={(userId, userName) => markEventAttendance(event.id, userId)} 
            />
          ) : isRegistered ? (
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {!hasAttended && (
                <div className="flex-1 w-full">
                  <EventTicketQR eventId={event.id} user={currentUser} />
                </div>
              )}
              {isAdminOrCore && (
                <div className="flex-1 w-full">
                  <QRAttendanceScanner 
                    eventId={event.id} 
                    onScanSuccess={(userId, userName) => markEventAttendance(event.id, userId)} 
                  />
                </div>
              )}
            </div>
          ) : null}
        </div>
      )}

      {/* Event Lifecycle Timeline */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
          <Clock className="w-4 h-4 text-blue-600" />
          <span>Event Lifecycle Timeline</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {event.timeline.map((step) => (
            <div
              key={step.id}
              className={`p-3 rounded-xl border text-center space-y-1 ${
                step.status === 'completed' ? 'bg-emerald-50 border-emerald-200 text-emerald-950' :
                step.status === 'current' ? 'bg-blue-50 border-blue-300 text-blue-950 font-bold ring-2 ring-blue-400/20' :
                'bg-slate-50 border-slate-200 text-slate-400'
              }`}
            >
              <div className="w-5 h-5 rounded-full mx-auto flex items-center justify-center text-[10px] font-bold border border-current">
                {step.status === 'completed' ? '✓' : step.id}
              </div>
              <p className="text-[11px] font-semibold line-clamp-2">{step.title}</p>
              {step.date && <p className="text-[9px] text-slate-500">{step.date}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Post-Event History & Final Report Attachment (If available) */}
      {event.report && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <FileText className="w-4 h-4 text-purple-600" />
            <span>Post-Event Institutional Record & Report</span>
          </h2>

          <div className="p-4 bg-purple-50/50 border border-purple-200 rounded-xl space-y-3">
            <p className="text-xs text-slate-800 font-medium">{event.report.summary}</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2">
              <div className="p-2.5 bg-white rounded-lg border border-purple-100">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Attendance</span>
                <strong className="text-purple-900 text-sm">{event.report.attendanceCount} Attendees</strong>
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-purple-100">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Expenditure</span>
                <strong className="text-purple-900 text-sm">₹{event.report.expenditure}</strong>
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-purple-100">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Feedback Score</span>
                <strong className="text-purple-900 text-sm flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  {event.report.feedbackScore} / 5.0
                </strong>
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-purple-100">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Winners</span>
                <strong className="text-purple-900 text-xs truncate block">{event.report.winners?.join(', ')}</strong>
              </div>
            </div>

            {/* Photo Gallery */}
            <div className="space-y-1 pt-2">
              <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
                <ImageIcon className="w-3.5 h-3.5 text-slate-500" /> Attached Event Photos
              </span>
              <div className="flex gap-2">
                {event.report.photos.map((img, i) => (
                  <img key={i} src={img} alt="Event Photo" className="w-24 h-16 object-cover rounded-lg border border-slate-200" />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
