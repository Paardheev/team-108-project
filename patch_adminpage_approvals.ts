import fs from 'fs';
let code = fs.readFileSync('src/pages/system/AdminPage.tsx', 'utf8');

code = code.replace(
  "const isAdmin = currentUser?.role === 'Club Head' || currentUser?.role === 'Faculty Advisor';",
  "const isAdmin = currentUser?.role === 'Admin' || currentUser?.role === 'Club Head' || currentUser?.role === 'Faculty Advisor';\n  const canApproveEvents = currentUser?.role === 'Admin' || currentUser?.role === 'Faculty Advisor';"
);

code = code.replace(
  "<button\n          onClick={() => setActiveTab('approvals')}",
  "{canApproveEvents && (\n        <button\n          onClick={() => setActiveTab('approvals')}"
);

code = code.replace(
  "</span>\n          )}\n        </button>",
  "</span>\n          )}\n        </button>\n      )}"
);

code = code.replace(
  "      {activeTab === 'members' ? (",
  "      {activeTab === 'members' || !canApproveEvents ? ("
);

fs.writeFileSync('src/pages/system/AdminPage.tsx', code);
