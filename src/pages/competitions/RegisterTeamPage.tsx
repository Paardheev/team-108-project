import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Trophy, CheckCircle2, ArrowLeft, Users } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const RegisterTeamPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { competitions, registerTeamForCompetition, currentUser } = useApp();

  const comp = competitions.find(c => c.id === Number(id)) || competitions[0];
  const [teamName, setTeamName] = useState('Vector Alpha Innovators');
  const [memberEmails, setMemberEmails] = useState('ee25b049@smail.iitm.ac.in, me24b012@smail.iitm.ac.in');
  const [registered, setRegistered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerTeamForCompetition(comp.id, teamName, memberEmails.split(',').map(m => m.trim()));
    setRegistered(true);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <Link to="/competitions" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Competitions</span>
      </Link>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-1">
          <Trophy className="w-10 h-10 text-amber-500 mx-auto" />
          <h1 className="text-xl font-bold text-slate-900">Team Registration</h1>
          <p className="text-xs text-slate-500 font-semibold">{comp.title}</p>
        </div>

        {registered ? (
          <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h3 className="text-base font-bold text-emerald-950">Team Registered!</h3>
            <p className="text-xs text-emerald-800">
              Team <strong>{teamName}</strong> has been successfully registered for {comp.title}.
            </p>
            <button
              onClick={() => navigate('/competitions')}
              className="px-5 py-2 bg-emerald-700 text-white font-bold text-xs rounded-xl mt-2"
            >
              Return to Competitions
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Team Name</label>
              <input
                type="text"
                required
                value={teamName}
                onChange={e => setTeamName(e.target.value)}
                placeholder="e.g. Hyperloop Propulsion Team"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Team Leader</label>
              <input
                type="text"
                disabled
                value={`${currentUser.fullName} (${currentUser.email})`}
                className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-600 font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Teammates smail Emails (Comma-separated)</label>
              <textarea
                required
                rows={3}
                value={memberEmails}
                onChange={e => setMemberEmails(e.target.value)}
                placeholder="roll1@smail.iitm.ac.in, roll2@smail.iitm.ac.in"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-xs"
            >
              Confirm Team Registration
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
