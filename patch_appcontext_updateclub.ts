import fs from 'fs';
let code = fs.readFileSync('src/context/AppContext.tsx', 'utf8');

code = code.replace(
  "approveClub: (clubId: number, status: 'Approved' | 'Rejected') => void;",
  "approveClub: (clubId: number, status: 'Approved' | 'Rejected') => void;\n  updateClub: (clubId: number, data: Partial<Club>) => void;"
);

const updateClubCode = `
  const updateClub = (clubId: number, data: Partial<Club>) => {
    setClubs(prev => prev.map(c => c.id === clubId ? { ...c, ...data } : c));
    addAuditLog('Updated Club Details', \`Club ID: \${clubId}\`, 'Events');
  };

  const addClub = (clubData: Partial<Club>) => {`

code = code.replace(
  "  const addClub = (clubData: Partial<Club>) => {",
  updateClubCode
);

code = code.replace(
  "switchRole, approveClub, addAnnouncement, markAnnouncementAsRead, createEvent,",
  "switchRole, approveClub, updateClub, addAnnouncement, markAnnouncementAsRead, createEvent,"
);

fs.writeFileSync('src/context/AppContext.tsx', code);
