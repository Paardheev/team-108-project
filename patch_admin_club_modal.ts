import fs from 'fs';
let code = fs.readFileSync('src/pages/system/AdminPage.tsx', 'utf8');

code = code.replace(
  "const [newClub, setNewClub] = useState({ name: '', code: '', description: '', category: 'General' });",
  "const [newClub, setNewClub] = useState<any>({ name: '', code: '', description: '', category: 'General', facultyAdvisorId: '' });"
);

code = code.replace(
  "setNewClub({ name: '', code: '', description: '', category: 'General' });",
  "setNewClub({ name: '', code: '', description: '', category: 'General', facultyAdvisorId: '' });"
);

const advisorSelectCode = `
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Faculty Advisor</label>
                <select value={newClub.facultyAdvisorId} onChange={e => setNewClub({...newClub, facultyAdvisorId: e.target.value ? Number(e.target.value) : undefined})} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm bg-white">
                  <option value="">None</option>
                  {usersList.filter(u => u.role === 'Faculty Advisor').map(u => (
                    <option key={u.id} value={u.id}>{u.fullName} ({u.email})</option>
                  ))}
                </select>
              </div>
              <div className="pt-2">
`

code = code.replace(
  `              </div>
              <div className="pt-2">`,
  advisorSelectCode
);

fs.writeFileSync('src/pages/system/AdminPage.tsx', code);
