import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Send, Tag } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CreateDiscussionPage: React.FC = () => {
  const navigate = useNavigate();
  const { addDiscussion } = useApp();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('Hardware, CFD, Shaastra');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addDiscussion({
      title,
      content,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean)
    });
    navigate('/discussions');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-indigo-600" />
          <span>Start Technical Discussion Thread</span>
        </h1>
        <p className="text-xs text-slate-500">
          Share technical solutions, ask questions, or log past club decisions for future batches.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Thread Title / Topic</label>
          <input
            type="text"
            required
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="e.g. Best Practices for STM32 Microcontroller DMA Configuration"
            className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Detailed Discussion Post</label>
          <textarea
            required
            rows={6}
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Explain the background, code snippets, or architecture rationale..."
            className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Tags (Comma-separated)</label>
          <input
            type="text"
            value={tags}
            onChange={e => setTags(e.target.value)}
            placeholder="Hardware, AI, Shaastra"
            className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/discussions')}
            className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold rounded-xl"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Post Thread</span>
          </button>
        </div>
      </form>
    </div>
  );
};
