import fs from 'fs';
let code = fs.readFileSync('src/pages/system/AdminPage.tsx', 'utf8');

code = code.replace(
  "<Plus className=\"w-4 h-4\" /> Add Club",
  "<Plus className=\"w-4 h-4\" /> {currentUser?.role === 'Admin' ? 'Add Club' : 'Request Club'}"
);

code = code.replace(
  "<Briefcase className=\"w-5 h-5 text-emerald-600\" /> Add New Club</h2>",
  "<Briefcase className=\"w-5 h-5 text-emerald-600\" /> {currentUser?.role === 'Admin' ? 'Add New Club' : 'Request New Club'}</h2>"
);

code = code.replace(
  "<button type=\"submit\" className=\"w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-sm\">Create Club</button>",
  "<button type=\"submit\" className=\"w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-sm\">{currentUser?.role === 'Admin' ? 'Create Club' : 'Submit Request'}</button>"
);

fs.writeFileSync('src/pages/system/AdminPage.tsx', code);
