import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Megaphone, Pin, AlertTriangle, Send, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AnnouncementPriority } from '../../types';

export const CreateAnnouncementPage: React.FC = () => {
  const navigate = useNavigate();
  const { addAnnouncement, currentUser } = useApp();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState<AnnouncementPriority>('Normal');
  const [isPinned, setIsPinned] = useState(false);
  const [requiresApproval, setRequiresApproval] = useState(false);
  const [selectedChannels, setSelectedChannels] = useState<string[]>(['Everyone']);

  const channelsList = ['Everyone', 'Core Team', 'Media & Design', 'Software & AI', 'Robotics & Hardware', 'Events & Operations'];

  const toggleChannel = (ch: string) => {
    if (selectedChannels.includes(ch)) {
      setSelectedChannels(selectedChannels.filter(c => c !== ch));
    } else {
      setSelectedChannels([...selectedChannels, ch]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAnnouncement({
      title,
      content,
      priority,
      isPinned,
      requiresApproval,
      targetChannels: selectedChannels
    });
    navigate('/announcements');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Megaphone className="w-5 h-5 text-amber-600" />
          <span>Create New Announcement</span>
        </h1>
        <p className="text-xs text-slate-500">
          Target messages to specific role hierarchies or department channels.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Announcement Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="e.g. Mandatory Hardware Lab Equipment Inventory Check"
            className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Message Content</label>
          <textarea
            required
            rows={5}
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Write clear, actionable details for club members..."
            className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-2">Target Communication Channels</label>
          <div className="flex flex-wrap gap-2">
            {channelsList.map(ch => {
              const active = selectedChannels.includes(ch);
              return (
                <button
                  type="button"
                  key={ch}
                  onClick={() => toggleChannel(ch)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    active ? 'bg-amber-100 border-amber-300 text-amber-950' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  #{ch}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Priority Level</label>
            <select
              value={priority}
              onChange={e => setPriority(e.target.value as AnnouncementPriority)}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white focus:ring-2 focus:ring-amber-500"
            >
              <option value="Normal">Normal Priority</option>
              <option value="Important">Important Priority</option>
              <option value="Urgent">Urgent Priority (Stay pinned until acknowledged)</option>
            </select>
          </div>

          <div className="space-y-2 pt-5">
            <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={isPinned}
                onChange={e => setIsPinned(e.target.checked)}
                className="rounded text-amber-600 focus:ring-amber-500"
              />
              <span className="font-semibold">Pin Announcement to top of feed</span>
            </label>

            <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={requiresApproval}
                onChange={e => setRequiresApproval(e.target.checked)}
                className="rounded text-amber-600 focus:ring-amber-500"
              />
              <span>Require Club Head approval before broadcasting</span>
            </label>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/announcements')}
            className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold rounded-xl"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Publish Announcement</span>
          </button>
        </div>
      </form>
    </div>
  );
};
