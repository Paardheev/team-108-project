import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Megaphone, Send, ArrowLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const EditAnnouncementPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { announcements } = useApp();
  
  const announcement = announcements.find(a => a.id === Number(id)) || announcements[0];
  
  const [title, setTitle] = useState(announcement?.title || '');
  const [content, setContent] = useState(announcement?.content || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Announcement updated successfully!');
    navigate('/announcements');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link to="/announcements" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900">
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </Link>
      
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Megaphone className="w-5 h-5 text-amber-600" />
          <span>Edit Announcement</span>
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Content</label>
          <textarea
            required
            rows={6}
            value={content}
            onChange={e => setContent(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Link
            to="/announcements"
            className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Update</span>
          </button>
        </div>
      </form>
    </div>
  );
};
