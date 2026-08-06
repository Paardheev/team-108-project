import React, { useState } from 'react';
import { Bell, Shield, KeyRound, Globe, Save } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SettingsPage: React.FC = () => {
  const { currentUser } = useApp();
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [theme, setTheme] = useState('light');
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Settings saved!");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-4">
      <div className="space-y-1">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <span>Settings</span>
        </h1>
        <p className="text-xs text-slate-500">Manage your notifications and account preferences.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 space-y-4">
          <h2 className="text-sm font-bold flex items-center gap-2 border-b border-slate-100 pb-2">
            <Bell className="w-4 h-4 text-blue-600" /> Notifications
          </h2>
          <div className="space-y-3">
            <label className="flex items-center justify-between text-xs font-semibold text-slate-700">
              <span>Email Notifications</span>
              <input type="checkbox" checked={emailNotif} onChange={e => setEmailNotif(e.target.checked)} className="rounded text-blue-600" />
            </label>
            <label className="flex items-center justify-between text-xs font-semibold text-slate-700">
              <span>Push Notifications</span>
              <input type="checkbox" checked={pushNotif} onChange={e => setPushNotif(e.target.checked)} className="rounded text-blue-600" />
            </label>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 space-y-4">
          <h2 className="text-sm font-bold flex items-center gap-2 border-b border-slate-100 pb-2">
            <Globe className="w-4 h-4 text-emerald-600" /> Appearance
          </h2>
          <div className="space-y-3">
            <label className="block text-xs font-semibold text-slate-700">Theme</label>
            <select value={theme} onChange={e => setTheme(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-blue-500">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="px-5 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl shadow-xs hover:bg-blue-700 flex items-center gap-2">
            <Save className="w-4 h-4" /> Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};
