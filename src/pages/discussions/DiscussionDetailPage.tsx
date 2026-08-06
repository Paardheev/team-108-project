import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MessageSquare, ThumbsUp, Send, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DiscussionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { discussions, addDiscussionReply, upvoteDiscussion, currentUser } = useApp();

  const disc = discussions.find(d => d.id === Number(id)) || discussions[0];
  const [replyText, setReplyText] = useState('');

  const handlePostReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    addDiscussionReply(disc.id, replyText);
    setReplyText('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link to="/discussions" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Discussions</span>
      </Link>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {disc.tags.map((t, i) => (
              <span key={i} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                #{t}
              </span>
            ))}
          </div>
          <button
            onClick={() => upvoteDiscussion(disc.id)}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-lg transition-colors border border-indigo-200"
          >
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>{disc.upvotes} Upvotes</span>
          </button>
        </div>

        <h1 className="text-xl font-bold text-slate-900">{disc.title}</h1>
        <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">{disc.content}</p>

        <div className="pt-3 border-t border-slate-100 text-xs text-slate-500">
          Posted by <strong className="text-slate-800">{disc.authorName}</strong> ({disc.authorRole}) on {disc.createdAt}
        </div>
      </div>

      {/* Replies List */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
          Thread Replies ({disc.replies.length})
        </h2>

        <div className="space-y-3">
          {disc.replies.map(r => (
            <div key={r.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">{r.authorName} ({r.authorRole})</span>
                <span className="text-[10px] text-slate-400">{r.createdAt}</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">{r.content}</p>
            </div>
          ))}
        </div>

        {/* Post Reply Form */}
        <form onSubmit={handlePostReply} className="pt-4 border-t border-slate-100 flex items-center gap-2">
          <input
            type="text"
            required
            value={replyText}
            onChange={e => setReplyText(e.target.value)}
            placeholder="Write a technical answer or solution..."
            className="flex-1 px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Reply</span>
          </button>
        </form>
      </div>
    </div>
  );
};
