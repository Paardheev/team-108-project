import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Plus, ThumbsUp, Tag, Search, Pin } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DiscussionsPage: React.FC = () => {
  const { discussions } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');

  const filtered = discussions.filter(d => {
    const matchesSearch = d.title.toLowerCase().includes(searchTerm.toLowerCase()) || d.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === 'All' || d.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-indigo-600" />
            <span>Technical Discussions & Q&A</span>
          </h1>
          <p className="text-xs text-slate-500">
            Threaded discussions, upvotes, and institutional knowledge preservation across batches.
          </p>
        </div>
        <Link
          to="/discussions/create"
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-2xs transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Thread</span>
        </Link>
      </div>

      {/* Search & Tag Filters */}
      <div className="flex flex-col sm:flex-row items-center gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs text-xs">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search discussions, topics, or code snippets..."
            className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {['All', 'Hardware', 'Software', 'CFM', 'Design'].map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0 ${
                selectedTag === tag ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Threads List */}
      <div className="space-y-4">
        {filtered.map(disc => (
          <div key={disc.id} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-all space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {disc.isPinned && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
                    <Pin className="w-3 h-3 text-amber-600" /> Pinned Q&A
                  </span>
                )}
                {disc.tags.map((t, idx) => (
                  <span key={idx} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                    #{t}
                  </span>
                ))}
              </div>
              <span className="text-[10px] text-slate-400">{disc.createdAt}</span>
            </div>

            <Link to={`/discussions/${disc.id}`} className="block group">
              <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {disc.title}
              </h3>
              <p className="text-xs text-slate-600 line-clamp-2 mt-1">{disc.content}</p>
            </Link>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-slate-800">Posted by {disc.authorName} ({disc.authorRole})</span>

              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 font-semibold text-indigo-600">
                  <ThumbsUp className="w-3.5 h-3.5" /> {disc.upvotes} Upvotes
                </span>
                <Link to={`/discussions/${disc.id}`} className="font-semibold text-slate-700 hover:text-slate-900">
                  {disc.replies.length} Replies →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
