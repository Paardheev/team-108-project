import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckSquare, Sparkles, Plus, Trash2, ArrowLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Department, TaskPriority } from '../../types';

export const CreateTaskPage: React.FC = () => {
  const navigate = useNavigate();
  const { createTask, users } = useApp();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assigneeId, setAssigneeId] = useState(users[2].id); // Gunja Tejaswi
  const [department, setDepartment] = useState<Department>('Software & AI');
  const [priority, setPriority] = useState<TaskPriority>('High');
  const [deadline, setDeadline] = useState('2026-08-05');
  const [checkpoints, setCheckpoints] = useState<{ title: string; requiredProofType: 'image' | 'PDF' | 'link' | 'note' }[]>([
    { title: 'Requirements & Scope Draft', requiredProofType: 'note' },
    { title: 'Core Implementation & Testing', requiredProofType: 'image' },
    { title: 'Final Proof & Review', requiredProofType: 'PDF' }
  ]);
  const [isAiBreaking, setIsAiGenerating] = useState(false);

  const handleAddCheckpoint = () => {
    setCheckpoints([...checkpoints, { title: 'New Checkpoint Step', requiredProofType: 'note' }]);
  };

  const handleRemoveCheckpoint = (idx: number) => {
    setCheckpoints(checkpoints.filter((_, i) => i !== idx));
  };

  const handleAiBreakdown = async () => {
    if (!title) return alert('Please enter a task title first!');
    setIsAiGenerating(true);
    try {
      const res = await fetch('/api/gemini/task-breakdown', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskTitle: title, taskDescription: description })
      });
      const data = await res.json();
      if (data.checkpoints && Array.isArray(data.checkpoints)) {
        setCheckpoints(data.checkpoints.map((cp: any) => ({
          title: cp.title,
          requiredProofType: 'note'
        })));
      } else if (data.result) {
        // Parse raw result string into lines
        const lines = data.result.split('\n').filter((l: string) => l.trim().length > 0).slice(0, 5);
        setCheckpoints(lines.map((l: string) => ({
          title: l.replace(/^[0-9-*\s.]+/, '').trim(),
          requiredProofType: 'note'
        })));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsAiGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const assignedUser = users.find(u => u.id === assigneeId) || users[0];
    createTask({
      title,
      description,
      assigneeId: assignedUser.id,
      assigneeName: assignedUser.fullName,
      assigneeRole: assignedUser.role,
      department,
      priority,
      deadline,
      checkpoints: checkpoints.map((cp, idx) => ({
        id: Date.now() + idx,
        taskId: 0,
        sequenceNumber: idx + 1,
        title: cp.title,
        completed: false,
        requiredProofType: cp.requiredProofType
      }))
    });
    navigate('/tasks');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <CheckSquare className="w-5 h-5 text-emerald-600" />
          <span>Assign New Task</span>
        </h1>
        <p className="text-xs text-slate-500">
          Create structured tasks with sequential checkpoints, required proof types, and reviewer workflows.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Task Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="e.g. Design Hyperloop Levitation Circuit PCB & Gerber Files"
            className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Task Description</label>
          <textarea
            required
            rows={3}
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Detailed instructions and criteria..."
            className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Assignee</label>
            <select
              value={assigneeId}
              onChange={e => setAssigneeId(Number(e.target.value))}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white"
            >
              {users.map(u => (
                <option key={u.id} value={u.id}>
                  {u.fullName} ({u.role})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Priority</label>
            <select
              value={priority}
              onChange={e => setPriority(e.target.value as TaskPriority)}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white"
            >
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Deadline Date</label>
            <input
              type="date"
              required
              value={deadline}
              onChange={e => setDeadline(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Checkpoints Section with AI Breakdown */}
        <div className="space-y-3 pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-800">Sequential Task Checkpoints</label>
            <button
              type="button"
              onClick={handleAiBreakdown}
              disabled={isAiBreaking}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>{isAiBreaking ? 'AI Analyzing...' : 'AI Task Breakdown'}</span>
            </button>
          </div>

          <div className="space-y-2">
            {checkpoints.map((cp, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <input
                  type="text"
                  value={cp.title}
                  onChange={e => {
                    const updated = [...checkpoints];
                    updated[idx].title = e.target.value;
                    setCheckpoints(updated);
                  }}
                  className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500"
                />
                <select
                  value={cp.requiredProofType}
                  onChange={e => {
                    const updated = [...checkpoints];
                    updated[idx].requiredProofType = e.target.value as any;
                    setCheckpoints(updated);
                  }}
                  className="px-2 py-1.5 border border-slate-300 rounded-lg text-[11px] bg-white text-slate-700"
                >
                  <option value="note">Proof: Note</option>
                  <option value="image">Proof: Image</option>
                  <option value="PDF">Proof: PDF</option>
                  <option value="link">Proof: Link</option>
                </select>
                <button
                  type="button"
                  onClick={() => handleRemoveCheckpoint(idx)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAddCheckpoint}
            className="w-full py-2 border border-dashed border-slate-300 text-slate-600 hover:bg-slate-50 text-xs font-semibold rounded-xl flex items-center justify-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add Checkpoint
          </button>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/tasks')}
            className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold rounded-xl"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs"
          >
            Assign Task
          </button>
        </div>
      </form>
    </div>
  );
};
