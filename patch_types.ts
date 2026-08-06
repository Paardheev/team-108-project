import fs from 'fs';
let code = fs.readFileSync('src/types.ts', 'utf8');

code = code.replace(
  "export type UserRole = \n  | 'Club Head'",
  "export type UserRole = \n  | 'Admin'\n  | 'Club Head'"
);

fs.writeFileSync('src/types.ts', code);
