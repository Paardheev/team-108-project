import fs from 'fs';
let code = fs.readFileSync('src/context/AppContext.tsx', 'utf8');

code = code.replace(
  "switchRole, addClub, approveClub, addAnnouncement, markAnnouncementAsRead, createEvent,",
  "switchRole, approveClub, addAnnouncement, markAnnouncementAsRead, createEvent,"
);

fs.writeFileSync('src/context/AppContext.tsx', code);
