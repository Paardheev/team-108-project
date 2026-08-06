import fs from 'fs';
let code = fs.readFileSync('src/pages/system/AdminPage.tsx', 'utf8');

// Imports & hooks
code = code.replace(
  "const { currentUser, addClub } = useApp();",
  "const { currentUser, addClub, events, approveEvent } = useApp();\n  const [activeTab, setActiveTab] = useState<'members' | 'approvals'>('members');"
);

// Tabs
const tabsHTML = `
      <div className="flex border-b border-slate-200 mb-6">
        <button
          onClick={() => setActiveTab('members')}
          className={\`px-4 py-2 font-semibold text-sm border-b-2 transition-colors \${activeTab === 'members' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}\`}
        >
          Members & Stats
        </button>
        <button
          onClick={() => setActiveTab('approvals')}
          className={\`px-4 py-2 font-semibold text-sm border-b-2 transition-colors \${activeTab === 'approvals' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}\`}
        >
          Event Approvals
          {events.filter(e => e.approvalStatus === 'Pending').length > 0 && (
            <span className="ml-2 px-2 py-0.5 rounded-full bg-red-100 text-red-600 text-[10px]">
              {events.filter(e => e.approvalStatus === 'Pending').length}
            </span>
          )}
        </button>
      </div>

      {activeTab === 'members' ? (
        <>
`;

code = code.replace(
  '<div className="grid grid-cols-1 md:grid-cols-4 gap-4">',
  tabsHTML + '\n        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">'
);

// Add Approvals section logic
const approvalsHTML = `
        </>
      ) : (
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
`;

code = code.replace(
  '      {/* Add User Modal */}',
  approvalsHTML + '\n      {/* Add User Modal */}'
);

// Restrict Faculty Advisor from modifying user roles
code = code.replace(
  "user.email === 'admin@smail.iitm.ac.in'",
  "user.email === 'admin@smail.iitm.ac.in' || currentUser?.role === 'Faculty Advisor'"
);

fs.writeFileSync('src/pages/system/AdminPage.tsx', code);
