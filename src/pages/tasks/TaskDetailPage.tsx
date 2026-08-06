import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  CheckSquare, Clock, ArrowLeft, Upload, CheckCircle2, 
  XCircle, FileText, Link2, Image as ImageIcon, AlertCircle 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TaskDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { tasks, toggleCheckpoint, submitTaskProof, approveCheckpointProof, currentUser } = useApp();

  const task = tasks.find(t => t.id === Number(id)) || tasks[0];

  const [selectedCpId, setSelectedCpId] = useState<number | null>(null);
  const [proofFileUrl, setProofFileUrl] = useState('');
  const [proofRemarks, setProofRemarks] = useState('');

  const handleProofSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCpId) return;
    submitTaskProof(task.id, selectedCpId, { fileUrl: proofFileUrl, remarks: proofRemarks });
    setSelectedCpId(null);
    setProofFileUrl('');
    setProofRemarks('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link to="/tasks" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Tasks</span>
      </Link>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900">
                {task.priority} Priority
              </span>
              <span className="text-xs text-slate-500 font-semibold">{task.department}</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-1">{task.title}</h1>
          </div>
          <div className="text-right">
            <span className="text-base font-extrabold text-slate-900">{task.progressPercent}% Overall Progress</span>
            <p className="text-xs text-slate-400">Deadline: {task.deadline}</p>
          </div>
        </div>

        <p className="text-xs text-slate-700 leading-relaxed">{task.description}</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
          <div>
            <span className="text-slate-400 text-[10px] font-bold uppercase block">Assignee</span>
            <strong className="text-slate-800">{task.assigneeName} ({task.assigneeRole})</strong>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] font-bold uppercase block">Reviewer</span>
            <strong className="text-slate-800">{task.reviewerName}</strong>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] font-bold uppercase block">Est. Hours</span>
            <strong className="text-slate-800">{task.estimatedHours} hrs</strong>
          </div>
        </div>
      </div>

      {/* Checkpoints and Proof Submissions */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 flex items-center justify-between border-b border-slate-100 pb-3">
          <span>Checkpoints Verification & Reviewer Approvals</span>
          <span className="text-xs text-slate-500 font-normal">
            {task.checkpoints.filter(cp => cp.completed).length} / {task.checkpoints.length} Finished
          </span>
        </h2>

        <div className="space-y-3">
          {task.checkpoints.map((cp) => (
            <div key={cp.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={cp.completed}
                    onChange={() => toggleCheckpoint(task.id, cp.id)}
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                  <span className={`text-xs font-bold ${cp.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                    Step {cp.sequenceNumber}: {cp.title}
                  </span>
                </div>

                {cp.requiredProofType && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-200">
                    Required: {cp.requiredProofType}
                  </span>
                )}
              </div>

              {/* Submitted Proof Card */}
              {cp.submittedProof ? (
                <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-blue-600" /> Proof Submitted by {cp.submittedProof.submittedBy}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      cp.submittedProof.approvalStatus === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                      cp.submittedProof.approvalStatus === 'Requested Changes' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {cp.submittedProof.approvalStatus}
                    </span>
                  </div>

                  <p className="text-slate-600 text-[11px]">{cp.submittedProof.remarks}</p>

                  {/* Reviewer Action Buttons */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <a
                      href={cp.submittedProof.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <Link2 className="w-3 h-3" /> View Submitted File
                    </a>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => approveCheckpointProof(task.id, cp.id, false)}
                        className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-800 text-[11px] font-bold rounded-lg transition-colors"
                      >
                        Request Changes
                      </button>
                      <button
                        onClick={() => approveCheckpointProof(task.id, cp.id, true)}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold rounded-lg transition-colors shadow-2xs"
                      >
                        Approve Checkpoint
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex justify-end">
                  <button
                    onClick={() => setSelectedCpId(cp.id)}
                    className="px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold rounded-lg border border-blue-200"
                  >
                    Upload Checkpoint Proof
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Uploading Proof */}
      {selectedCpId && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <form onSubmit={handleProofSubmit} className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Upload Checkpoint Proof</h3>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">File URL / Drive Link</label>
              <input
                type="url"
                required
                value={proofFileUrl}
                onChange={e => setProofFileUrl(e.target.value)}
                placeholder="https://drive.google.com/..."
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Remarks & Notes</label>
              <textarea
                rows={3}
                value={proofRemarks}
                onChange={e => setProofRemarks(e.target.value)}
                placeholder="Key completion observations..."
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedCpId(null)}
                className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-xs"
              >
                Submit for Approval
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
