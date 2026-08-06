import fs from 'fs';
let code = fs.readFileSync('src/pages/events/EventsPage.tsx', 'utf8');

code = code.replace(
  "const canViewPending = ['Club Head', 'Faculty Advisor', 'Coordinator', 'Super Coordinator'].includes(currentUser?.role || '');",
  "const canViewPending = ['Admin', 'Club Head', 'Faculty Advisor', 'Coordinator', 'Team Lead'].includes(currentUser?.role || '');"
);

fs.writeFileSync('src/pages/events/EventsPage.tsx', code);
