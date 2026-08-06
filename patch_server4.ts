import fs from 'fs';
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(
  "  app.post(\"/api/users\", authenticateToken, async (req: any, res: any) => {\n    if (req.user.role !== 'Faculty Advisor' && req.user.role !== 'Club Head') {",
  "  app.post(\"/api/users\", authenticateToken, async (req: any, res: any) => {\n    if (req.user.role !== 'Admin' && req.user.role !== 'Club Head') {"
);

code = code.replace(
  "  app.put(\"/api/users/:id/role\", authenticateToken, async (req: any, res: any) => {\n    if (req.user.role !== 'Club Head') {",
  "  app.put(\"/api/users/:id/role\", authenticateToken, async (req: any, res: any) => {\n    if (req.user.role !== 'Admin' && req.user.role !== 'Club Head') {"
);

code = code.replace(
  "  app.get(\"/api/admin/stats\", authenticateToken, async (req: any, res: any) => {\n    if (req.user.role !== 'Club Head' && req.user.role !== 'Faculty Advisor') {",
  "  app.get(\"/api/admin/stats\", authenticateToken, async (req: any, res: any) => {\n    if (req.user.role !== 'Admin' && req.user.role !== 'Club Head' && req.user.role !== 'Faculty Advisor') {"
);

fs.writeFileSync('server.ts', code);
