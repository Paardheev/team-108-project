import fs from 'fs';
let code = fs.readFileSync('src/types.ts', 'utf8');

code = code.replace(
  "  createdDate: string;\n}",
  "  createdDate: string;\n  approvalStatus?: 'Pending' | 'Approved' | 'Rejected';\n}"
);

fs.writeFileSync('src/types.ts', code);
