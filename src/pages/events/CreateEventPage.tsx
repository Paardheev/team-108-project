import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Sparkles, MapPin, Users, Phone, ArrowLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CreateEventPage: React.FC = () => {
  const navigate = useNavigate();
  const { createEvent, currentUser, activeClub, users } = useApp();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [venue, setVenue] = useState('CRC Hall 101, IIT Madras');
  const [eventDate, setEventDate] = useState('2026-08-10T10:00');
  const [capacity, setCapacity] = useState(100);
  const [category, setCategory] = useState<'Workshop' | 'Hackathon' | 'Technical Talk' | 'Competition' | 'Meeting'>('Workshop');
  const [requiredVolunteers, setRequiredVolunteers] = useState(5);
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  const handleAiPlan = async () => {
    if (!title) return alert('Please enter an event title first!');
    setIsAiGenerating(true);
    try {
      const res = await fetch('/api/gemini/event-planner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventTitle: title, category, capacity })
      });
      const data = await res.json();
      if (data.plan) {
        setDescription(prev => prev ? `${prev}\n\n${data.plan}` : data.plan);
      } else if (data.result) {
        setDescription(prev => prev ? `${prev}\n\n${data.result}` : data.result);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsAiGenerating(false);
    }
  };


  const facultyAdvisor = activeClub?.facultyAdvisorId 
    ? users.find(u => u.id === activeClub.facultyAdvisorId) 
    : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!facultyAdvisor) {
      alert("Events cannot be created: This club does not have a Faculty Advisor assigned.");
      return;
    }

    createEvent({
      title,
      description,
      venue,
      eventDate,
      capacity,
      category,
      requiredVolunteers
    });
    navigate('/events');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          <span>Schedule New Club Event</span>
        </h1>
        <p className="text-xs text-slate-500">
          Configure event details, volunteer needs, venue logistics, and timeline.
        </p>
        <div className="mt-2 p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-2">
          <Users className="w-4 h-4 text-slate-500" />
          <span className="text-sm font-medium text-slate-700">
            Faculty Advisor: {facultyAdvisor ? facultyAdvisor.fullName : <span className="text-red-500">None Assigned (Cannot create event)</span>}
          </span>
        </div>
      </div>


      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Event Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="e.g. Generative AI & LLM Fine-Tuning Bootcamp"
            className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-semibold text-slate-700">Event Description & Agenda</label>
            <button
              type="button"
              onClick={handleAiPlan}
              disabled={isAiGenerating}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg"
            >
              <Sparkles className="w-3 h-3 text-purple-600" />
              <span>{isAiGenerating ? 'Generating AI Plan...' : 'AI Event Plan'}</span>
            </button>
          </div>
          <textarea
            required
            rows={5}
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Provide event objectives, prerequisites, and timeline..."
            className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value as any)}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white"
            >
              <option value="Workshop">Workshop</option>
              <option value="Hackathon">Hackathon</option>
              <option value="Technical Talk">Technical Talk</option>
              <option value="Competition">Competition</option>
              <option value="Meeting">Meeting</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Venue Location</label>
            <input
              type="text"
              required
              value={venue}
              onChange={e => setVenue(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Event Date & Time</label>
            <input
              type="datetime-local"
              required
              value={eventDate}
              onChange={e => setEventDate(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Max Capacity (Seats)</label>
            <input
              type="number"
              value={capacity}
              onChange={e => setCapacity(Number(e.target.value))}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Required Volunteers</label>
            <input
              type="number"
              value={requiredVolunteers}
              onChange={e => setRequiredVolunteers(Number(e.target.value))}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/events')}
            className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold rounded-xl"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={!facultyAdvisor}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold rounded-xl shadow-xs"
          >
            Publish Event
          </button>

        </div>
      </form>
    </div>
  );
};
