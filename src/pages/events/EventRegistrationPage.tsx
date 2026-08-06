import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Calendar, CheckCircle2, ArrowLeft, User, Mail, ShieldAlert } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const EventRegistrationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { events, registerForEvent, currentUser } = useApp();

  const event = events.find(e => e.id === Number(id)) || events[0];
  const [registered, setRegistered] = useState(false);
  const [roleType, setRoleType] = useState<'Participant' | 'Volunteer'>('Participant');

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    registerForEvent(event.id, roleType);
    setRegistered(true);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <Link to="/events" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Events</span>
      </Link>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl mx-auto flex items-center justify-center font-bold">
            <Calendar className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-slate-900">Event Registration</h1>
          <p className="text-xs text-slate-500 font-semibold">{event.title}</p>
        </div>

        {registered ? (
          <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h3 className="text-base font-bold text-emerald-950">Registration Confirmed!</h3>
            <p className="text-xs text-emerald-800">
              You are officially registered as a <strong>{roleType}</strong> for {event.title}.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigate('/events')}
                className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Return to Event Portal
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleConfirm} className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Attendee Name:</span>
                <strong className="text-slate-900">{currentUser.fullName}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Email:</span>
                <strong className="text-slate-900">{currentUser.email}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Venue:</span>
                <strong className="text-slate-900">{event.venue}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date:</span>
                <strong className="text-slate-900">{new Date(event.eventDate).toLocaleDateString()}</strong>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Registration Role</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRoleType('Participant')}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all text-center ${
                    roleType === 'Participant' ? 'bg-blue-50 border-blue-400 text-blue-900 ring-2 ring-blue-500/20' : 'bg-white border-slate-200 text-slate-600'
                  }`}
                >
                  Event Participant
                </button>
                <button
                  type="button"
                  onClick={() => setRoleType('Volunteer')}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all text-center ${
                    roleType === 'Volunteer' ? 'bg-purple-50 border-purple-400 text-purple-900 ring-2 ring-purple-500/20' : 'bg-white border-slate-200 text-slate-600'
                  }`}
                >
                  Event Volunteer
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm"
            >
              Confirm Registration
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
