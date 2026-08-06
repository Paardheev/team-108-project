import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Calendar, Users, ArrowUpRight, Award, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CompetitionsPage: React.FC = () => {
  const { competitions } = useApp();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          <span>Inter-Club & Flagship Competitions</span>
        </h1>
        <p className="text-xs text-slate-500">
          Track multi-stage qualifiers, prize pools, submission criteria, and registered teams.
        </p>
      </div>

      {/* Competitions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {competitions.map(comp => (
          <div key={comp.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2.5 py-1 rounded bg-amber-100 text-amber-900 border border-amber-200">
                  Prize Pool: {comp.prizePool}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  {comp.registeredTeamsCount} / {comp.maxTeams} Teams
                </span>
              </div>

              <h2 className="text-lg font-bold text-slate-900">{comp.title}</h2>
              <p className="text-xs text-slate-600 line-clamp-2">{comp.description}</p>

              {/* Multi-stage qualifiers timeline */}
              <div className="space-y-1 pt-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tournament Stages</span>
                <div className="flex flex-wrap gap-1.5">
                  {comp.stages.map((st, i) => (
                    <span key={i} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {st}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
              <Link
                to={`/competitions/${comp.id}/register`}
                className="flex-1 text-center py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-2xs transition-colors"
              >
                Register Team
              </Link>
              <Link
                to={`/competitions/${comp.id}`}
                className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl"
              >
                Rules & Stages
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
