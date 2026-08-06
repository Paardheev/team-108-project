import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Trophy, Award, Calendar, Users, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CompetitionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { competitions } = useApp();

  const comp = competitions.find(c => c.id === Number(id)) || competitions[0];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link to="/competitions" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Competitions</span>
      </Link>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <span className="text-xs font-bold px-3 py-1 bg-amber-100 text-amber-900 rounded-full border border-amber-300">
            Prize Pool: {comp.prizePool}
          </span>
          <span className="text-xs text-slate-500 font-semibold">Deadline: {comp.registrationDeadline}</span>
        </div>

        <h1 className="text-2xl font-bold text-slate-900">{comp.title}</h1>
        <p className="text-xs text-slate-700 leading-relaxed">{comp.description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-amber-50/50 rounded-xl border border-amber-200 text-xs">
          <div>
            <span className="text-amber-800 text-[10px] font-bold uppercase block">Team Size</span>
            <strong className="text-amber-950">{comp.teamSizeRange} Members per Team</strong>
          </div>
          <div>
            <span className="text-amber-800 text-[10px] font-bold uppercase block">Evaluation Criteria</span>
            <strong className="text-amber-950">{comp.evaluationCriteria}</strong>
          </div>
        </div>

        {/* Tournament Stages */}
        <div className="space-y-2 pt-2">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Tournament Stages</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {comp.stages.map((stage, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                <span className="text-[10px] font-bold text-amber-600 block">Stage {idx + 1}</span>
                <p className="font-bold text-slate-900">{stage}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <Link
            to={`/competitions/${comp.id}/register`}
            className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-xs"
          >
            Register Team Now →
          </Link>
        </div>
      </div>
    </div>
  );
};
