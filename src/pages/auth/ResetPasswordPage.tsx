import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { KeyRound, ArrowLeft, CheckCircle } from 'lucide-react';

export const ResetPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-1">
          <KeyRound className="w-10 h-10 text-blue-600 mx-auto" />
          <h1 className="text-xl font-bold text-slate-900">Account Recovery</h1>
          <p className="text-xs text-slate-500">Enter your smail email address to recover your username or receive password reset instructions.</p>
        </div>

        {sent ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
            <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
            <h3 className="text-sm font-bold text-emerald-900">Recovery Link Sent</h3>
            <p className="text-xs text-emerald-800">
              We sent an account recovery link to <strong>{email}</strong>. Please check your inbox.
            </p>
            <Link to="/login" className="inline-block pt-2 text-xs text-blue-600 font-bold hover:underline">
              Back to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">smail Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="rollnumber@smail.iitm.ac.in"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl transition-all shadow-sm"
            >
              Send Recovery Instructions
            </button>
          </form>
        )}

        <div className="text-center">
          <Link to="/login" className="text-xs text-slate-600 hover:text-slate-900 inline-flex items-center gap-1 font-medium">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
