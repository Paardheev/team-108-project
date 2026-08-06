import fs from 'fs';
let code = fs.readFileSync('src/components/layout/Sidebar.tsx', 'utf8');

code = code.replace(
  "const isAdmin = currentUser?.role === 'Club Head' || currentUser?.role === 'Faculty Advisor';",
  "const isAdmin = currentUser?.role === 'Admin' || currentUser?.role === 'Club Head' || currentUser?.role === 'Faculty Advisor';"
);

fs.writeFileSync('src/components/layout/Sidebar.tsx', code);
