import fs from 'fs';
let code = fs.readFileSync('server.ts', 'utf8');

const addUserEndpoint = `
  app.post("/api/users", authenticateToken, async (req: any, res: any) => {
    if (req.user.role !== 'Admin' && req.user.role !== 'Club Head') {
      return res.status(403).json({ error: "Unauthorized" });
    }
    const { fullName, email, password, phone = "", role = "Volunteer", department = "General", academicYear = 1 } = req.body;
    if (!fullName || !email || !password) return res.status(400).json({ error: "Missing required fields" });
    
    try {
      const existing = await db.execute({ sql: "SELECT id FROM users WHERE email = ?", args: [email] });
      if (existing.rows.length > 0) return res.status(400).json({ error: "Email already exists" });
      
      const hash = await bcrypt.hash(password, 10);
      const rs = await db.execute({
        sql: \`INSERT INTO users (full_name, email, password_hash, phone, role, department, academic_year) VALUES (?, ?, ?, ?, ?, ?, ?)\`,
        args: [fullName, email, hash, phone, role, department, academicYear]
      });
      
      res.status(201).json({ 
        user: { id: Number(rs.lastInsertRowid), fullName, email, role, department, academicYear } 
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });
`;

code = code.replace(
  '  app.get("/api/users"', 
  addUserEndpoint + '\n  app.get("/api/users"'
);

fs.writeFileSync('server.ts', code);
