import fs from 'fs';
let code = fs.readFileSync('src/pages/system/AdminPage.tsx', 'utf8');

code = code.replace(
  "const { currentUser, addClub, events, approveEvent } = useApp();",
  "const { currentUser, addClub, clubs, approveClub, events, approveEvent } = useApp();"
);

fs.writeFileSync('src/pages/system/AdminPage.tsx', code);
