import fs from 'fs';
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(
  "  app.put(\"/api/users/:id/role\", authenticateToken, async (req: any, res: any) => {\n    if (req.user.role !== 'Club Head' && req.user.role !== 'Faculty Advisor') {",
  "  app.put(\"/api/users/:id/role\", authenticateToken, async (req: any, res: any) => {\n    if (req.user.role !== 'Club Head') {"
);

fs.writeFileSync('server.ts', code);
