import fs from 'fs';
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(
  /req\.user\.role !== 'Admin' && req\.user\.role !== 'Club Head'/g,
  "req.user.role !== 'Faculty Advisor' && req.user.role !== 'Club Head'"
);

code = code.replace(
  /req\.user\.role !== "Club Head" && req\.user\.role !== "Admin"/g,
  "req.user.role !== 'Club Head' && req.user.role !== 'Faculty Advisor'"
);

fs.writeFileSync('server.ts', code);
