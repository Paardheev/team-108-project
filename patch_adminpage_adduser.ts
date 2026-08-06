import fs from 'fs';
let code = fs.readFileSync('src/pages/system/AdminPage.tsx', 'utf8');

code = code.replace(
  "onClick={() => setShowAddUserModal(true)}",
  "onClick={() => setShowAddUserModal(true)}\n            disabled={currentUser?.role === 'Faculty Advisor'}"
);
code = code.replace(
  "className=\"flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-xl text-sm font-semibold transition-colors shadow-sm\"",
  "className=\"flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-xl text-sm font-semibold transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed\""
);

fs.writeFileSync('src/pages/system/AdminPage.tsx', code);
