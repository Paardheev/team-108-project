import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Phone, BookOpen, CheckCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Department } from '../../types';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentUser, setIsAuthenticated, clubs, createJoinRequest } = useApp();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState<Department>('Software & AI');
  const [academicYear, setAcademicYear] = useState<number>(2);
  const [selectedClubId, setSelectedClubId] = useState<number | ''>('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password, department, academicYear })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      localStorage.setItem('token', data.token);
      setCurrentUser(data.user);
      setIsAuthenticated(true);
      
      if (selectedClubId) {
        createJoinRequest(Number(selectedClubId), data.user.id);
      }
      
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-xl font-bold text-slate-900">Member Registration</h1>
          <p className="text-xs text-slate-500">Join CFI & IIT Madras Student Clubs on Vector Stack</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs font-medium border border-red-100">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              placeholder="e.g. Dinesh Falle"
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">IITM Roll Email (smail)</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="ee25b049@smail.iitm.ac.in"
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Choose a strong password"
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Department Team</label>
              <select
                value={department}
                onChange={e => setDepartment(e.target.value as Department)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
              >
                <option value="Core Team">Core Team</option>
                <option value="Software & AI">Software & AI</option>
                <option value="Media & Design">Media & Design</option>
                <option value="Robotics & Hardware">Robotics & Hardware</option>
                <option value="Events & Operations">Events & Operations</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Academic Year</label>
              <select
                value={academicYear}
                onChange={e => setAcademicYear(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
              >
                <option value={1}>1st Year (Freshman)</option>
                <option value={2}>2nd Year (Sophomore)</option>
                <option value={3}>3rd Year (Junior)</option>
                <option value={4}>4th Year (Senior)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Club to Join (Optional)</label>
            <select
              value={selectedClubId}
              onChange={e => setSelectedClubId(e.target.value ? Number(e.target.value) : '')}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
            >
              <option value="">Select a club...</option>
              {clubs.filter(c => c.approvalStatus !== 'Pending' && c.approvalStatus !== 'Rejected').map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <p className="text-[10px] text-slate-500 mt-1">This will send a join request to the club head.</p>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl transition-all shadow-sm"
          >
            Create Account & Join Club
          </button>
        </form>

        <div className="text-center pt-2">
          <Link to="/login" className="text-xs text-blue-600 hover:underline font-semibold">
            Already registered? Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};
