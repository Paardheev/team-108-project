import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Navigate } from 'react-router-dom';
import { Users, CheckSquare, Calendar, Bell, Shield, Edit2, Plus, X, Briefcase } from 'lucide-react';

export const AdminPage: React.FC = () => {
  const { currentUser, addClub, updateClub, clubs, approveClub, events, approveEvent } = useApp();
  const [activeTab, setActiveTab] = useState<'members' | 'approvals' | 'clubs'>('members');
  const [stats, setStats] = useState<any>(null);
  const [usersList, setUsersList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [newRole, setNewRole] = useState('');

  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showAddClubModal, setShowAddClubModal] = useState(false);
  const [newUser, setNewUser] = useState({ fullName: '', email: '', password: '', role: 'Volunteer', department: 'General' });
  const [newClub, setNewClub] = useState<any>({ name: '', code: '', description: '', category: 'General', facultyAdvisorId: '' });

  const isAdmin = currentUser?.role === 'Admin' || currentUser?.role === 'Club Head' || currentUser?.role === 'Faculty Advisor';
  const canApproveEvents = currentUser?.role === 'Admin' || currentUser?.role === 'Faculty Advisor';
  const canApproveClubs = currentUser?.role === 'Admin';

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { 'Authorization': `Bearer ${token}` };

      const [statsRes, usersRes] = await Promise.all([
        fetch('/api/admin/stats', { headers }),
        fetch('/api/users', { headers })
      ]);

      if (!statsRes.ok || !usersRes.ok) throw new Error('Failed to fetch data');

      setStats(await statsRes.json());
      setUsersList(await usersRes.json());
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin]);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      });
      if (!res.ok) throw new Error('Failed to create user');
      setShowAddUserModal(false);
      setNewUser({ fullName: '', email: '', password: '', role: 'Volunteer', department: 'General' });
      fetchData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleAddClub = (e: React.FormEvent) => {
    e.preventDefault();
    addClub(newClub);
    setShowAddClubModal(false);
    setNewClub({ name: '', code: '', description: '', category: 'General', facultyAdvisorId: '' });
  };

  const handleUpdateRole = async (userId: number) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/users/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ role: newRole })
      });

      if (!res.ok) throw new Error('Failed to update role');
      
      setEditingUserId(null);
      fetchData(); // Refresh list
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  if (loading) return <div className="p-8">Loading admin dashboard...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
            <Shield className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Admin Dashboard</h1>
            <p className="text-sm text-slate-500">Manage users, roles, and view platform statistics</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowAddClubModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl text-sm font-semibold transition-colors border border-emerald-200"
          >
            <Plus className="w-4 h-4" /> {currentUser?.role === 'Admin' ? 'Add Club' : 'Request Club'}
          </button>
          <button
            onClick={() => setShowAddUserModal(true)}
            disabled={currentUser?.role === 'Faculty Advisor'}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-xl text-sm font-semibold transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4" /> Add User
          </button>
        </div>
      </div>

      
      <div className="flex border-b border-slate-200 mb-6">
        <button
          onClick={() => setActiveTab('members')}
          className={`px-4 py-2 font-semibold text-sm border-b-2 transition-colors ${activeTab === 'members' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          Members & Stats
        </button>
        {(canApproveEvents || canApproveClubs) && (
        <button
          onClick={() => setActiveTab('approvals')}
          className={`px-4 py-2 font-semibold text-sm border-b-2 transition-colors ${activeTab === 'approvals' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          Approvals
          {(events.filter(e => e.approvalStatus === 'Pending').length + (canApproveClubs ? clubs.filter(c => c.approvalStatus === 'Pending').length : 0)) > 0 && (
            <span className="ml-2 px-2 py-0.5 rounded-full bg-red-100 text-red-600 text-[10px]">
              {events.filter(e => e.approvalStatus === 'Pending').length + (canApproveClubs ? clubs.filter(c => c.approvalStatus === 'Pending').length : 0)}
            </span>
          )}
        </button>
      )}

        {canApproveClubs && (
        <button
          onClick={() => setActiveTab('clubs')}
          className={`px-4 py-2 font-semibold text-sm border-b-2 transition-colors ${activeTab === 'clubs' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          Manage Clubs
        </button>
        )}
      </div>

      {activeTab === 'members' || (!canApproveEvents && !canApproveClubs && activeTab !== 'clubs') ? (
        <>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-700">Total Users</h3>
            <Users className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-slate-900">{stats?.totalUsers || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-700">Total Tasks</h3>
            <CheckSquare className="w-5 h-5 text-emerald-500" />
          </div>
          <p className="text-3xl font-bold text-slate-900">{stats?.totalTasks || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-700">Total Events</h3>
            <Calendar className="w-5 h-5 text-amber-500" />
          </div>
          <p className="text-3xl font-bold text-slate-900">{stats?.totalEvents || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-700">Announcements</h3>
            <Bell className="w-5 h-5 text-rose-500" />
          </div>
          <p className="text-3xl font-bold text-slate-900">{stats?.totalAnnouncements || 0}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">User Management</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-semibold">
              <tr>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Department</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {usersList.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{user.fullName}</td>
                  <td className="px-6 py-4 text-slate-500">{user.email}</td>
                  <td className="px-6 py-4 text-slate-500">{user.department}</td>
                  <td className="px-6 py-4">
                    {editingUserId === user.id ? (
                      <select 
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                        className="px-2 py-1 border border-slate-300 rounded-lg text-sm bg-white"
                      >
                        <option value="Club Head">Club Head</option>
                        <option value="Coordinator">Coordinator</option>
                        <option value="Team Lead">Team Lead</option>
                        <option value="Club Member">Club Member</option>
                        <option value="Volunteer">Volunteer</option>
                        <option value="Faculty Advisor">Faculty Advisor</option>
                      </select>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                        {user.role}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {editingUserId === user.id ? (
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => handleUpdateRole(user.id)}
                          className="px-3 py-1 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700"
                        >
                          Save
                        </button>
                        <button 
                          onClick={() => setEditingUserId(null)}
                          className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium hover:bg-slate-200"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => {
                          setEditingUserId(user.id);
                          setNewRole(user.role);
                        }}
                        disabled={user.email === 'admin@smail.iitm.ac.in' || currentUser?.role === 'Faculty Advisor'} // prevent editing main admin
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Change Role"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


        </>

      ) : activeTab === 'clubs' ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-200">
            <h2 className="text-lg font-bold text-slate-900">Manage Clubs</h2>
            <p className="text-xs text-slate-500">Manage existing clubs and their Faculty Advisors.</p>
          </div>
          <div className="p-0 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500">
                  <th className="px-6 py-3 font-medium">Club Name</th>
                  <th className="px-6 py-3 font-medium">Code</th>
                  <th className="px-6 py-3 font-medium">Faculty Advisor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {clubs.filter(c => c.approvalStatus !== 'Pending' && c.approvalStatus !== 'Rejected').map(club => (
                  <tr key={club.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                          {club.logo || club.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{club.name}</p>
                          <p className="text-xs text-slate-500">{club.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                      {club.code}
                    </td>
                    <td className="px-6 py-4">
                      <select 
                        value={club.facultyAdvisorId || ''} 
                        onChange={(e) => updateClub(club.id, { facultyAdvisorId: e.target.value ? Number(e.target.value) : undefined })}
                        className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm bg-white"
                      >
                        <option value="">None assigned</option>
                        {usersList.filter(u => u.role === 'Faculty Advisor').map(u => (
                          <option key={u.id} value={u.id}>{u.fullName} ({u.email})</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      ) : (
        <div className="space-y-6">
          {canApproveClubs && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-200">
                <h2 className="text-lg font-bold text-slate-900">Pending Club Approvals</h2>
                <p className="text-xs text-slate-500">Review and approve new club requests.</p>
              </div>
              <div className="p-0">
                {clubs.filter(c => c.approvalStatus === 'Pending').length === 0 ? (
                  <div className="p-8 text-center text-sm text-slate-500">No pending club requests.</div>
                ) : (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500">
                        <th className="px-6 py-3 font-medium">Club Details</th>
                        <th className="px-6 py-3 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {clubs.filter(c => c.approvalStatus === 'Pending').map(club => (
                        <tr key={club.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-4">
                            <p className="text-sm font-semibold text-slate-900">{club.name}</p>
                            <p className="text-xs text-slate-500 line-clamp-1">{club.description}</p>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-2">
                              <button onClick={() => approveClub(club.id, 'Approved')} className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-medium hover:bg-emerald-700">Approve</button>
                              <button onClick={() => approveClub(club.id, 'Rejected')} className="px-3 py-1 bg-red-600 text-white rounded-lg text-xs font-medium hover:bg-red-700">Reject</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {canApproveEvents && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

          <div className="p-5 border-b border-slate-200">
            <h2 className="text-lg font-bold text-slate-900">Pending Event Approvals</h2>
            <p className="text-xs text-slate-500">Review and approve newly created events before they become active.</p>
          </div>
          <div className="p-0">
            {events.filter(e => e.approvalStatus === 'Pending').length === 0 ? (
              <div className="p-8 text-center text-sm text-slate-500">No pending events for approval.</div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500">
                    <th className="px-6 py-3 font-medium">Event Details</th>
                    <th className="px-6 py-3 font-medium">Organizer</th>
                    <th className="px-6 py-3 font-medium">Date & Venue</th>
                    <th className="px-6 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {events.filter(e => e.approvalStatus === 'Pending').map(event => (
                    <tr key={event.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-slate-900">{event.title}</p>
                        <p className="text-xs text-slate-500 line-clamp-1">{event.description}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-900">{event.organizer}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-900">{new Date(event.eventDate).toLocaleDateString()}</p>
                        <p className="text-xs text-slate-500">{event.venue}</p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => approveEvent(event.id, 'Approved')}
                            className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-medium hover:bg-emerald-700"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => approveEvent(event.id, 'Rejected')}
                            className="px-3 py-1 bg-red-600 text-white rounded-lg text-xs font-medium hover:bg-red-700"
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
          )}
        </div>
      )}

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl relative flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900">Add New User</h2>
              <button onClick={() => setShowAddUserModal(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddUser} className="p-4 space-y-4 overflow-y-auto">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <input required type="text" value={newUser.fullName} onChange={e => setNewUser({...newUser, fullName: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm" placeholder="e.g. John Doe" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                <input required type="email" value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm" placeholder="user@smail.iitm.ac.in" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                <input required type="password" value={newUser.password} onChange={e => setNewUser({...newUser, password: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm" placeholder="Temporary password" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Role</label>
                  <select value={newUser.role} onChange={e => setNewUser({...newUser, role: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm">
                    <option value="Club Head">Club Head</option>
                    <option value="Coordinator">Coordinator</option>
                    <option value="Team Lead">Team Lead</option>
                    <option value="Club Member">Club Member</option>
                    <option value="Volunteer">Volunteer</option>
                    <option value="Faculty Advisor">Faculty Advisor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Department</label>
                  <select value={newUser.department} onChange={e => setNewUser({...newUser, department: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm">
                    <option value="General">General</option>
                    <option value="Software & AI">Software & AI</option>
                    <option value="Media & Design">Media & Design</option>
                    <option value="Events & Operations">Events & Operations</option>
                  </select>
                </div>
              </div>
              <div className="pt-2">
                <button type="submit" className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm">Create User</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Club Modal */}
      {showAddClubModal && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl relative flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2"><Briefcase className="w-5 h-5 text-emerald-600" /> {currentUser?.role === 'Admin' ? 'Add New Club' : 'Request New Club'}</h2>
              <button onClick={() => setShowAddClubModal(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddClub} className="p-4 space-y-4 overflow-y-auto">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Club Name</label>
                <input required type="text" value={newClub.name} onChange={e => setNewClub({...newClub, name: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm" placeholder="e.g. AI Club" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Club Code</label>
                  <input required type="text" value={newClub.code} onChange={e => setNewClub({...newClub, code: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm" placeholder="e.g. AIC" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                  <select value={newClub.category} onChange={e => setNewClub({...newClub, category: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm bg-white">
                    <option value="Tech">Tech</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Sports">Sports</option>
                    <option value="General">General</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
                <textarea required value={newClub.description} onChange={e => setNewClub({...newClub, description: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm resize-none" rows={3} placeholder="Brief description of the club..." />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Faculty Advisor</label>
                <select value={newClub.facultyAdvisorId || ''} onChange={e => setNewClub({...newClub, facultyAdvisorId: e.target.value ? Number(e.target.value) : undefined})} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm bg-white">
                  <option value="">None</option>
                  {usersList.filter(u => u.role === 'Faculty Advisor').map(u => (
                    <option key={u.id} value={u.id}>{u.fullName} ({u.email})</option>
                  ))}
                </select>
              </div>
              <div className="pt-2">
                <button type="submit" className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-sm">{currentUser?.role === 'Admin' ? 'Create Club' : 'Submit Request'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
