import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckSquare, Plus, Clock, Filter, AlertTriangle, CheckCircle2, 
  CheckCircle, ArrowUpRight, BarChart2, Layers 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TaskStatus, TaskPriority } from '../../types';

export const TasksPage: React.FC = () => {
  const { tasks, toggleCheckpoint } = useApp();
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');

  const filteredTasks = tasks.filter(t => {
    if (statusFilter !== 'All' && t.status !== statusFilter) return false;
    if (priorityFilter !== 'All' && t.priority !== priorityFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-emerald-600" />
            <span>Task Assignment & Progress Tracking</span>
          </h1>
          <p className="text-xs text-slate-500">
            Checkpoint-based progress, proof uploads, reviewer approvals, and custom completion ratios.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/tasks/progress"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold rounded-xl"
          >
            <BarChart2 className="w-3.5 h-3.5 text-blue-600" />
            <span>Coordinator View</span>
          </Link>
          <Link
            to="/tasks/create"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-2xs transition-all shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Assign New Task</span>
          </Link>
        </div>
      </div>

      {/* Filters bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-slate-400 font-semibold px-1">Status:</span>
          {['All', 'In Progress', 'Waiting Review', 'Completed', 'Pending'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                statusFilter === st ? 'bg-blue-600 text-white font-bold' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-semibold">Priority:</span>
          <select
            value={priorityFilter}
            onChange={e => setPriorityFilter(e.target.value)}
            className="px-2.5 py-1 border border-slate-300 rounded-lg bg-white text-slate-700"
          >
            <option value="All">All Priorities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {filteredTasks.map(task => {
          const completedCPs = task.checkpoints.filter(cp => cp.completed).length;
          return (
            <div key={task.id} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                      task.priority === 'Critical' ? 'bg-rose-100 text-rose-800 border border-rose-200' :
                      task.priority === 'High' ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {task.priority} Priority
                    </span>
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                      {task.department}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                      task.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                      task.status === 'Waiting Review' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {task.status}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mt-1">{task.title}</h3>
                  <p className="text-xs text-slate-600 line-clamp-2">{task.description}</p>
                </div>

                <div className="text-left sm:text-right shrink-0 space-y-1">
                  <span className="text-sm font-extrabold text-slate-900">{task.progressPercent}% Progress</span>
                  <p className="text-[11px] text-slate-400">
                    Deadline: <strong className="text-slate-700">{task.deadline}</strong>
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Reviewer: <span className="text-slate-600 font-semibold">{task.reviewerName}</span>
                  </p>
                </div>
              </div>

              {/* Progress visual bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-semibold text-slate-500">
                  <span>Checkpoints Completed: {completedCPs} / {task.checkpoints.length}</span>
                  <span>{task.progressPercent}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
                  <div
                    className={`h-full transition-all duration-300 ${
                      task.progressPercent === 100 ? 'bg-emerald-500' : 'bg-blue-600'
                    }`}
                    style={{ width: `${task.progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Interactive Checkpoints */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Subtask Checkpoints</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {task.checkpoints.map(cp => (
                    <div
                      key={cp.id}
                      onClick={() => toggleCheckpoint(task.id, cp.id)}
                      className={`p-2.5 rounded-xl border text-xs cursor-pointer flex items-center gap-2 transition-all ${
                        cp.completed
                          ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950 font-semibold'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={cp.completed}
                        onChange={() => {}} // handled by div click
                        className="rounded text-emerald-600 focus:ring-emerald-500 shrink-0"
                      />
                      <span className="truncate flex-1">{cp.title}</span>
                      {cp.requiredProofType && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 shrink-0">
                          {cp.requiredProofType} Proof
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
                <span>Assignee: <strong className="text-slate-800">{task.assigneeName}</strong> ({task.assigneeRole})</span>
                <Link
                  to={`/tasks/${task.id}`}
                  className="font-bold text-blue-600 hover:underline flex items-center gap-1"
                >
                  View Details & Upload Proof →
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
