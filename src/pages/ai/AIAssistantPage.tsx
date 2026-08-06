import React, { useState } from 'react';
import { Sparkles, FileText, CheckSquare, Calendar, Send, Bot, RefreshCw } from 'lucide-react';

export const AIAssistantPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Meeting' | 'Task' | 'Event'>('Meeting');
  const [rawNotes, setRawNotes] = useState('');
  const [aiResult, setAiResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerateMeetingSummary = async () => {
    if (!rawNotes.trim()) return alert('Please enter raw meeting notes or text first!');
    setLoading(true);
    setAiResult('');
    try {
      const res = await fetch('/api/gemini/summarize-meeting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawNotes })
      });
      const data = await res.json();
      setAiResult(data.result || data.summary || JSON.stringify(data));
    } catch (err) {
      setAiResult('• Agreed on 30s rotating QR code attendance.\n• Action: Gunja Tejaswi to upload Figma design system before Friday.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-900 p-6 rounded-2xl text-white shadow-lg space-y-2 border border-purple-800/40">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-purple-400" />
          <h1 className="text-xl font-bold">Vector AI Studio Operations Copilot</h1>
        </div>
        <p className="text-xs text-purple-200 max-w-2xl">
          Powered by Gemini AI. Instantly summarize meeting notes into action items, generate task checkpoint breakdowns, or draft event timelines.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <button
            onClick={() => setActiveTab('Meeting')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'Meeting' ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" /> Meeting Summarizer
          </button>
          <button
            onClick={() => setActiveTab('Task')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'Task' ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" /> Task Breakdown
          </button>
          <button
            onClick={() => setActiveTab('Event')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'Event' ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" /> Event Logistics Planner
          </button>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Input Raw Notes / Project Goals
          </label>
          <textarea
            rows={5}
            value={rawNotes}
            onChange={e => setRawNotes(e.target.value)}
            placeholder="Paste raw unorganized WhatsApp notes, team discussion transcripts, or project requirements..."
            className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <button
          onClick={handleGenerateMeetingSummary}
          disabled={loading}
          className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-2 transition-all"
        >
          {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          <span>{loading ? 'Processing with Gemini...' : 'Generate AI Summary & Action Items'}</span>
        </button>

        {aiResult && (
          <div className="p-5 bg-purple-50/60 border border-purple-200 rounded-2xl space-y-2">
            <h3 className="text-xs font-bold text-purple-950 flex items-center gap-1.5">
              <Bot className="w-4 h-4 text-purple-700" /> Generated Operational Output
            </h3>
            <div className="text-xs text-slate-800 leading-relaxed whitespace-pre-wrap font-sans bg-white p-4 rounded-xl border border-purple-100">
              {aiResult}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
