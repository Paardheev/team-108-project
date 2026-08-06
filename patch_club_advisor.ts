import fs from 'fs';
let code = fs.readFileSync('src/types.ts', 'utf8');

code = code.replace(
  "approvalStatus?: 'Pending' | 'Approved' | 'Rejected';\n}",
  "approvalStatus?: 'Pending' | 'Approved' | 'Rejected';\n  facultyAdvisorId?: number;\n}"
);

fs.writeFileSync('src/types.ts', code);
