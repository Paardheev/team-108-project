import fs from 'fs';
let code = fs.readFileSync('src/context/AppContext.tsx', 'utf8');

const notifCode = `    setEvents(prev => [newEvt, ...prev]);
    
    // Notify Faculty Advisor and Admin
    const newNotif: NotificationItem = {
      id: Date.now(),
      userId: 999, // General notification for admins
      title: 'New Event Approval Request',
      message: \`\${currentUser.fullName} has requested approval for "\${newEvt.title}".\`,
      type: 'Mention',
      isRead: false,
      timestamp: new Date().toISOString(),
      actionUrl: '/admin'
    };
    setNotifications(prev => [newNotif, ...prev]);
    
    addAuditLog('Scheduled Event', newEvt.title, 'Events');`

code = code.replace(
  "    setEvents(prev => [newEvt, ...prev]);\n    addAuditLog('Scheduled Event', newEvt.title, 'Events');",
  notifCode
);

fs.writeFileSync('src/context/AppContext.tsx', code);
