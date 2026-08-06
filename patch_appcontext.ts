import fs from 'fs';
let code = fs.readFileSync('src/context/AppContext.tsx', 'utf8');

code = code.replace(
  "createEvent: (eventData: Partial<Event>) => void;",
  "createEvent: (eventData: Partial<Event>) => void;\n  approveEvent: (eventId: number, status: 'Approved' | 'Rejected') => void;"
);

code = code.replace(
  "const createEvent = (data: Partial<Event>) => {",
  `const approveEvent = (eventId: number, status: 'Approved' | 'Rejected') => {
    setEvents(prev => prev.map(e => e.id === eventId ? {
      ...e,
      approvalStatus: status,
      status: status === 'Approved' ? 'Registration Open' : 'Cancelled'
    } : e));
    addAuditLog(\`Event \${status}\`, \`Event ID: \${eventId}\`, 'Events');
  };

  const createEvent = (data: Partial<Event>) => {`
);

code = code.replace(
  "status: 'Registration Open',",
  "status: 'Upcoming',\n      approvalStatus: 'Pending',"
);

code = code.replace(
  "addAuditLog('Created new event', newEvt.title, 'Events');",
  "addAuditLog('Created new event (Pending Approval)', newEvt.title, 'Events');"
);

code = code.replace(
  "registerForEvent, createTask, toggleCheckpoint, submitTaskProof,",
  "approveEvent, registerForEvent, createTask, toggleCheckpoint, submitTaskProof,"
);

fs.writeFileSync('src/context/AppContext.tsx', code);
