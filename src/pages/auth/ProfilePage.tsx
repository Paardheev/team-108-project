import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User as UserIcon, Mail, Phone, Calendar, Shield, Trophy, 
  Award, Clock, Code, Plus, Check, Edit2 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserSkill, AvailabilitySlot } from '../../types';

export const ProfilePage: React.FC = () => {
  const { currentUser, clubs, userSkills, updateUserSkills, availabilitySlots, updateAvailability } = useApp();

  const [newSkillName, setNewSkillName] = useState('');
  const [newProficiency, setNewProficiency] = useState<'Beginner' | 'Intermediate' | 'Expert'>('Expert');
  const [bio, setBio] = useState(currentUser.bio || '');

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    const updated = [...userSkills, { skillId: Date.now(), skillName: newSkillName, proficiencyLevel: newProficiency }];
    updateUserSkills(updated);
    setNewSkillName('');
  };

  const handleToggleSlot = (id: number) => {
    const updated = availabilitySlots.map(slot => slot.id === id ? { ...slot, status: slot.status === 'Available' ? 'Busy' as const : 'Available' as const } : slot);
    updateAvailability(updated);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Header */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 flex flex-col md:flex-row items-center md:items-start gap-6 relative">
        <Link to="/profile/edit" className="absolute top-4 right-4 p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
          <Edit2 className="w-5 h-5" />
        </Link>
        <img
          src={currentUser.profilePicture}
          alt={currentUser.fullName}
          className="w-24 h-24 rounded-2xl object-cover ring-4 ring-slate-100 shadow-md shrink-0"
        />
        <div className="flex-1 space-y-2 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <h1 className="text-xl font-bold text-slate-900">{currentUser.fullName}</h1>
            <span className="px-2.5 py-0.5 text-xs font-bold bg-amber-100 text-amber-900 rounded-full border border-amber-300">
              {currentUser.role}
            </span>
            <span className="px-2.5 py-0.5 text-xs font-semibold bg-emerald-100 text-emerald-800 rounded-full">
              ● {currentUser.status}
            </span>
          </div>
          <p className="text-xs text-slate-600 max-w-2xl">{bio}</p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-slate-500 pt-1">
            <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-slate-400" /> {currentUser.email}</span>
            <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-slate-400" /> {currentUser.phone}</span>
            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-slate-400" /> Joined {currentUser.joinedDate}</span>
          </div>
        </div>
      </div>

      {/* Clubs & Memberships */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 space-y-4">
        <div>
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-600" />
            <span>Clubs & Memberships</span>
          </h2>
          <p className="text-xs text-slate-500">The innovation teams and clubs you are part of.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {clubs.filter(c => currentUser.joinedClubIds?.includes(c.id)).map(club => (
            <div key={club.id} className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-lg">{club.logo}</span>
              <span className="text-sm font-semibold text-slate-800">{club.name}</span>
            </div>
          ))}
          {(!currentUser.joinedClubIds || currentUser.joinedClubIds.length === 0) && (
            <span className="text-xs text-slate-500">You haven't joined any clubs yet.</span>
          )}
        </div>
      </div>

      {/* Grid for Skills & Weekly Availability */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Skills Tagging & Management */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Code className="w-4 h-4 text-blue-600" />
                <span>Technical & Domain Skills</span>
              </h2>
              <p className="text-xs text-slate-500">Skills are searchable by Coordinators for task assignment.</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {userSkills.map((sk) => (
              <div key={sk.skillId} className="px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-2 text-xs font-semibold text-blue-900">
                <span>{sk.skillName}</span>
                <span className="text-[10px] bg-blue-200/80 text-blue-900 px-1.5 py-0.5 rounded font-bold">
                  {sk.proficiencyLevel}
                </span>
              </div>
            ))}
          </div>

          <form onSubmit={handleAddSkill} className="flex gap-2 pt-2 border-t border-slate-100">
            <input
              type="text"
              value={newSkillName}
              onChange={e => setNewSkillName(e.target.value)}
              placeholder="e.g. Python, Figma, CAD"
              className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <select
              value={newProficiency}
              onChange={e => setNewProficiency(e.target.value as any)}
              className="px-2 py-1.5 border border-slate-300 rounded-lg text-xs bg-white"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Expert">Expert</option>
            </select>
            <button type="submit" className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold">
              Add
            </button>
          </form>
        </div>

        {/* Weekly Availability Calendar */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>Weekly Availability Schedule</span>
              </h2>
              <p className="text-xs text-slate-500">Instead of "Who is free?", coordinators filter tasks by schedule.</p>
            </div>
          </div>

          <div className="space-y-2">
            {availabilitySlots.map(slot => (
              <div
                key={slot.id}
                onClick={() => handleToggleSlot(slot.id)}
                className={`p-2.5 rounded-lg border cursor-pointer flex items-center justify-between text-xs transition-colors ${
                  slot.status === 'Available'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-slate-50 border-slate-200 text-slate-600 opacity-80'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-bold">{slot.weekday}</span>
                  <span className="text-[11px] text-slate-500">({slot.timeSlot})</span>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  slot.status === 'Available' ? 'bg-emerald-200 text-emerald-900' : 'bg-slate-200 text-slate-700'
                }`}>
                  {slot.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
