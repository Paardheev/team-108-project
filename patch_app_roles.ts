import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(/allowedRoles=\{\['Faculty Advisor', 'Club Head'\]\}/g, "allowedRoles={['Admin', 'Faculty Advisor', 'Club Head']}");
code = code.replace(/allowedRoles=\{\['Faculty Advisor', 'Club Head', 'Coordinator', 'Team Lead'\]\}/g, "allowedRoles={['Admin', 'Faculty Advisor', 'Club Head', 'Coordinator', 'Team Lead']}");

fs.writeFileSync('src/App.tsx', code);
