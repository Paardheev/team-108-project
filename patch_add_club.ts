import fs from 'fs';
let code = fs.readFileSync('src/context/AppContext.tsx', 'utf8');

code = code.replace(
  "approvalStatus: currentUser?.role === 'Admin' ? 'Approved' : 'Pending'",
  "approvalStatus: currentUser?.role === 'Admin' ? 'Approved' : 'Pending',\n      facultyAdvisorId: clubData.facultyAdvisorId"
);

fs.writeFileSync('src/context/AppContext.tsx', code);
