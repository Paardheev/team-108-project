import fs from 'fs';
let code = fs.readFileSync('src/pages/auth/RegisterPage.tsx', 'utf8');

code = code.replace(
  "{clubs.map(c => (",
  "{clubs.filter(c => c.approvalStatus !== 'Pending' && c.approvalStatus !== 'Rejected').map(c => ("
);

fs.writeFileSync('src/pages/auth/RegisterPage.tsx', code);
