import fs from 'fs';
let code = fs.readFileSync('src/context/AppContext.tsx', 'utf8');

code = code.replace(
  "addClub: (club: Partial<Club>) => void;",
  "addClub: (club: Partial<Club>) => void;\n  approveClub: (clubId: number, status: 'Approved' | 'Rejected') => void;"
);

code = code.replace(
  "const addClub = (clubData: Partial<Club>) => {",
  `const approveClub = (clubId: number, status: 'Approved' | 'Rejected') => {
    setClubs(prev => prev.map(c => c.id === clubId ? { ...c, approvalStatus: status } : c));
    addAuditLog(\`Club \${status}\`, \`Club ID: \${clubId}\`, 'Events'); // using Events category for simplicity
  };

  const addClub = (clubData: Partial<Club>) => {`
);

code = code.replace(
  "memberCount: 1,\n      createdDate: new Date().toISOString().split('T')[0]\n    };",
  "memberCount: 1,\n      createdDate: new Date().toISOString().split('T')[0],\n      approvalStatus: currentUser?.role === 'Admin' ? 'Approved' : 'Pending'\n    };"
);

code = code.replace(
  "      setClubs(prev => [...prev, newClub]);\n      addAuditLog('Created new club', newClub.name, 'Events');\n    }\n  };",
  "      setClubs(prev => [...prev, newClub]);\n      \n      if (newClub.approvalStatus === 'Pending') {\n        const newNotif = {\n          id: Date.now(),\n          userId: 999,\n          title: 'New Club Approval Request',\n          message: \`\${currentUser.fullName} requested to add a new club \"\${newClub.name}\".\`,\n          type: 'Mention',\n          isRead: false,\n          timestamp: new Date().toISOString(),\n          actionUrl: '/admin'\n        };\n        setNotifications(prev => [newNotif, ...prev] as any);\n        addAuditLog('Requested new club (Pending)', newClub.name, 'Events');\n      } else {\n        addAuditLog('Created new club', newClub.name, 'Events');\n      }\n    }\n  };"
);

code = code.replace(
  "switchRole, addAnnouncement, markAnnouncementAsRead, createEvent,",
  "switchRole, addClub, approveClub, addAnnouncement, markAnnouncementAsRead, createEvent,"
); // We should make sure we're not duplicating addClub if it's already there

fs.writeFileSync('src/context/AppContext.tsx', code);
