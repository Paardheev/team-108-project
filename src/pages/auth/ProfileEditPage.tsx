import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Phone, Edit2, ArrowLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ProfileEditPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useApp();

  const [fullName, setFullName] = useState(currentUser.fullName);
  const [phone, setPhone] = useState(currentUser.phone);
  const [bio, setBio] = useState(currentUser.bio || '');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentUser({ ...currentUser, fullName, phone, bio });
    navigate('/profile');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link to="/profile" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Profile</span>
      </Link>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Edit2 className="w-5 h-5 text-blue-600" />
          Edit Profile
        </h1>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Bio</label>
            <textarea
              rows={4}
              value={bio}
              onChange={e => setBio(e.target.value)}
              placeholder="Tell us about yourself..."
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/profile')}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 shadow-sm"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
