import fs from 'fs';
let code = fs.readFileSync('src/db.ts', 'utf8');

code = code.replace(
  'args: ["Admin User", "admin@smail.iitm.ac.in", "Club Head", "Core Team", 4, "$2b$10$r9/i2WaYZ9aiKg/XYj4yoe8LXCJuDO6C.qQ3CG3afeMNhKKWD5mQK"]',
  'args: ["Admin User", "admin@smail.iitm.ac.in", "Admin", "Core Team", 4, "$2b$10$r9/i2WaYZ9aiKg/XYj4yoe8LXCJuDO6C.qQ3CG3afeMNhKKWD5mQK"]'
);

fs.writeFileSync('src/db.ts', code);
