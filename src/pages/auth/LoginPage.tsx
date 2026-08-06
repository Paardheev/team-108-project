import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, KeyRound, Mail, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { users, setCurrentUser, setIsAuthenticated } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }
      
      localStorage.setItem('token', data.token);
      setCurrentUser(data.user);
      setIsAuthenticated(true);
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl mx-auto flex items-center justify-center font-bold text-xl shadow-md">
            V
          </div>
          <h1 className="text-xl font-bold text-slate-900">Student Portal Login</h1>
          <p className="text-xs text-slate-500">Sign in to Vector Stack Student Club Management Platform</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs font-medium border border-red-100">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">smail Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="rollnumber@smail.iitm.ac.in"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-1.5 text-slate-600">
              <input type="checkbox" defaultChecked className="rounded text-blue-600 focus:ring-blue-500" />
              <span>Remember me</span>
            </label>
            <Link to="/reset-password" className="text-blue-600 hover:underline font-medium">Forgot Username / Password?</Link>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <span>Sign In to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 font-bold hover:underline">Register Here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
