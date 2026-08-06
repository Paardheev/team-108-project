import fs from 'fs';
let code = fs.readFileSync('src/pages/system/AdminPage.tsx', 'utf8');

code = code.replace(
  "const canApproveEvents = currentUser?.role === 'Admin' || currentUser?.role === 'Faculty Advisor';",
  "const canApproveEvents = currentUser?.role === 'Admin' || currentUser?.role === 'Faculty Advisor';\n  const canApproveClubs = currentUser?.role === 'Admin';"
);

code = code.replace(
  "          Event Approvals",
  "          Approvals"
);

code = code.replace(
  "          {events.filter(e => e.approvalStatus === 'Pending').length > 0 && (",
  "          {(events.filter(e => e.approvalStatus === 'Pending').length + (canApproveClubs ? clubs.filter(c => c.approvalStatus === 'Pending').length : 0)) > 0 && ("
);

code = code.replace(
  "              {events.filter(e => e.approvalStatus === 'Pending').length}",
  "              {events.filter(e => e.approvalStatus === 'Pending').length + (canApproveClubs ? clubs.filter(c => c.approvalStatus === 'Pending').length : 0)}"
);

code = code.replace(
  "      {activeTab === 'members' || !canApproveEvents ? (",
  "      {activeTab === 'members' || (!canApproveEvents && !canApproveClubs) ? ("
);

code = code.replace(
  "{canApproveEvents && (\n        <button\n          onClick={() => setActiveTab('approvals')}",
  "{(canApproveEvents || canApproveClubs) && (\n        <button\n          onClick={() => setActiveTab('approvals')}"
);

const approvalsCode = `        <div className="space-y-6">
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
`;

code = code.replace(
  '      ) : (\n        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">',
  '      ) : (\n' + approvalsCode
);

code = code.replace(
  "        </div>\n      )}\n\n      {/* Add User Modal */}",
  "        </div>\n          )}\n        </div>\n      )}\n\n      {/* Add User Modal */}"
);

fs.writeFileSync('src/pages/system/AdminPage.tsx', code);
