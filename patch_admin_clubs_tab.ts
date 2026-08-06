import fs from 'fs';
let code = fs.readFileSync('src/pages/system/AdminPage.tsx', 'utf8');

code = code.replace(
  "const [activeTab, setActiveTab] = useState<'members' | 'approvals'>('members');",
  "const [activeTab, setActiveTab] = useState<'members' | 'approvals' | 'clubs'>('members');"
);

code = code.replace(
  "const { currentUser, addClub, clubs, approveClub, events, approveEvent } = useApp();",
  "const { currentUser, addClub, updateClub, clubs, approveClub, events, approveEvent } = useApp();"
);

const clubsTabButton = `
        {canApproveClubs && (
        <button
          onClick={() => setActiveTab('clubs')}
          className={\`px-4 py-2 font-semibold text-sm border-b-2 transition-colors \${activeTab === 'clubs' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}\`}
        >
          Manage Clubs
        </button>
        )}
      </div>
`

code = code.replace(
  "      </div>\n\n      {activeTab === 'members' || (!canApproveEvents && !canApproveClubs) ? (",
  clubsTabButton + "\n      {activeTab === 'members' || (!canApproveEvents && !canApproveClubs && activeTab !== 'clubs') ? ("
);

const clubsTabContent = `
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
`

code = code.replace(
  "      ) : (\n        <div className=\"space-y-6\">",
  clubsTabContent + "\n      ) : (\n        <div className=\"space-y-6\">"
);

fs.writeFileSync('src/pages/system/AdminPage.tsx', code);
