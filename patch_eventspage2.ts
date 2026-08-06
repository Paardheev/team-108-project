import fs from 'fs';
let code = fs.readFileSync('src/pages/events/EventsPage.tsx', 'utf8');

code = code.replace(
  "{evt.status}",
  "{evt.approvalStatus === 'Pending' ? 'Pending Approval' : evt.status}"
);

fs.writeFileSync('src/pages/events/EventsPage.tsx', code);
