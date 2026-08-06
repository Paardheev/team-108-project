import fs from 'fs';
let code = fs.readFileSync('src/pages/Dashboard.tsx', 'utf8');

code = code.replace(
  "const isAdminOrHead = ['Club Head', 'Faculty Advisor'].includes(currentUser.role);",
  "const isAdminOrHead = ['Admin', 'Club Head', 'Faculty Advisor'].includes(currentUser.role);"
);

fs.writeFileSync('src/pages/Dashboard.tsx', code);
