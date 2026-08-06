import fs from 'fs';
let code = fs.readFileSync('src/pages/events/EventsPage.tsx', 'utf8');

code = code.replace(
  "const { events } = useApp();",
  "const { events, currentUser } = useApp();\n  const canViewPending = ['Club Head', 'Faculty Advisor', 'Coordinator', 'Super Coordinator'].includes(currentUser?.role || '');"
);

code = code.replace(
  "const filtered = events.filter(e => categoryFilter === 'All' || e.category === categoryFilter);",
  "const filtered = events.filter(e => \n    (categoryFilter === 'All' || e.category === categoryFilter) &&\n    (e.approvalStatus !== 'Pending' && e.approvalStatus !== 'Rejected' || canViewPending || e.organizer === currentUser?.fullName)\n  );"
);

fs.writeFileSync('src/pages/events/EventsPage.tsx', code);
