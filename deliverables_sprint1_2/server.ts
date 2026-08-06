import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import yaml from "yaml";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db, { initDb } from "./src/db";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_for_dev";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // Initialize DB
  await initDb();

  // Load Swagger Document
  try {
    const file = fs.readFileSync(path.resolve(process.cwd(), "openapi.yaml"), "utf8");
    const swaggerDocument = yaml.parse(file);
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  } catch (err) {
    console.log("Swagger UI not loaded yet. Create openapi.yaml first.");
  }

  // Middleware for Auth
  const authenticateToken = (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "No token provided" });
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
  };

  // --- AUTH APIs ---
  app.post("/api/auth/register", async (req, res) => {
    const { fullName, email, password, phone = "", role = "Volunteer", department = "General", academicYear = 1 } = req.body;
    if (!fullName || !email || !password) return res.status(400).json({ error: "Missing required fields" });
    
    try {
      const existing = await db.execute({ sql: "SELECT id FROM users WHERE email = ?", args: [email] });
      if (existing.rows.length > 0) return res.status(400).json({ error: "Email already exists" });

      const hash = await bcrypt.hash(password, 10);
      const rs = await db.execute({
        sql: `INSERT INTO users (full_name, email, password_hash, phone, role, department, academic_year) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        args: [fullName, email, hash, phone, role, department, academicYear]
      });
      
      const token = jwt.sign({ id: Number(rs.lastInsertRowid), email, role }, JWT_SECRET, { expiresIn: '7d' });
      res.status(201).json({ 
        token, 
        user: { id: Number(rs.lastInsertRowid), fullName, email, role, department, academicYear } 
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Missing email or password" });

    try {
      const rs = await db.execute({ sql: "SELECT * FROM users WHERE email = ?", args: [email] });
      if (rs.rows.length === 0) return res.status(401).json({ error: "Invalid credentials" });

      const user = rs.rows[0];
      const isValid = await bcrypt.compare(password, user.password_hash as string);
      if (!isValid) return res.status(401).json({ error: "Invalid credentials" });

      const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
      res.json({
        token,
        user: {
          id: user.id,
          fullName: user.full_name,
          email: user.email,
          role: user.role,
          department: user.department,
          academicYear: user.academic_year,
          profilePicture: user.profile_picture
        }
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/auth/me", async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "No token provided" });

    const token = authHeader.split(" ")[1];
    try {
      const decoded: any = jwt.verify(token, JWT_SECRET);
      const rs = await db.execute({ sql: "SELECT id, full_name, email, role, department, academic_year, profile_picture FROM users WHERE id = ?", args: [decoded.id] });
      if (rs.rows.length === 0) return res.status(404).json({ error: "User not found" });
      
      const user = rs.rows[0];
      res.json({
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        role: user.role,
        department: user.department,
        academicYear: user.academic_year,
        profilePicture: user.profile_picture
      });
    } catch (err) {
      res.status(401).json({ error: "Invalid token" });
    }
  });

  // --- USER APIs ---
  app.get("/api/users", authenticateToken, async (req: any, res: any) => {
    try {
      const rs = await db.execute("SELECT id, full_name, email, role, department, academic_year, profile_picture, created_at FROM users ORDER BY created_at DESC");
      res.json(rs.rows.map(user => ({
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        role: user.role,
        department: user.department,
        academicYear: user.academic_year,
        profilePicture: user.profile_picture,
        createdAt: user.created_at
      })));
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.put("/api/users/:id/role", authenticateToken, async (req: any, res: any) => {
    if (req.user.role !== "Club Head" && req.user.role !== "Admin") {
      return res.status(403).json({ error: "Only Club Head or Admin can change roles" });
    }

    const { role } = req.body;
    if (!role) return res.status(400).json({ error: "Role is required" });

    try {
      const rs = await db.execute({
        sql: "UPDATE users SET role = ? WHERE id = ?",
        args: [role, req.params.id]
      });
      res.json({ success: true, changes: rs.rowsAffected });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // --- ADMIN APIs ---
  app.get("/api/admin/stats", authenticateToken, async (req: any, res: any) => {
    if (req.user.role !== "Club Head" && req.user.role !== "Admin") {
      return res.status(403).json({ error: "Access denied" });
    }

    try {
      const usersCount = (await db.execute("SELECT COUNT(*) as count FROM users")).rows[0].count;
      const tasksCount = (await db.execute("SELECT COUNT(*) as count FROM tasks")).rows[0].count;
      const eventsCount = (await db.execute("SELECT COUNT(*) as count FROM events")).rows[0].count;
      const announcementsCount = (await db.execute("SELECT COUNT(*) as count FROM announcements")).rows[0].count;

      res.json({
        totalUsers: usersCount,
        totalTasks: tasksCount,
        totalEvents: eventsCount,
        totalAnnouncements: announcementsCount
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // --- ANNOUNCEMENT APIs ---
  app.get("/api/announcements", async (req, res) => {
    try {
      const rs = await db.execute("SELECT * FROM announcements ORDER BY created_at DESC");
      res.json(rs.rows);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/announcements", async (req, res) => {
    const { title, content, channel, priority = "Medium", pinned = 0, author_id = 1 } = req.body;
    if (!title || !content || !channel) return res.status(400).json({ error: "Missing required fields" });
    
    try {
      const rs = await db.execute({
        sql: `INSERT INTO announcements (title, content, channel, priority, pinned, author_id) VALUES (?, ?, ?, ?, ?, ?)`,
        args: [title, content, channel, priority, pinned, author_id]
      });
      res.status(201).json({ id: Number(rs.lastInsertRowid), title, content, channel, priority, pinned, author_id });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.put("/api/announcements/:id", async (req, res) => {
    const { title, content } = req.body;
    try {
      const rs = await db.execute({
        sql: `UPDATE announcements SET title = ?, content = ? WHERE id = ?`,
        args: [title, content, req.params.id]
      });
      res.json({ success: true, changes: rs.rowsAffected });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.delete("/api/announcements/:id", async (req, res) => {
    try {
      const rs = await db.execute({
        sql: `DELETE FROM announcements WHERE id = ?`,
        args: [req.params.id]
      });
      res.json({ success: true, changes: rs.rowsAffected });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // --- TASK APIs ---
  app.get("/api/tasks", async (req, res) => {
    try {
      const rs = await db.execute("SELECT * FROM tasks ORDER BY created_at DESC");
      res.json(rs.rows);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/tasks", async (req, res) => {
    const { title, description, department, priority = "Medium", status = "Pending", created_by = 1, assigned_to = 1 } = req.body;
    if (!title || !department) return res.status(400).json({ error: "Missing required fields" });
    
    try {
      const rs = await db.execute({
        sql: `INSERT INTO tasks (title, description, department, priority, status, created_by, assigned_to) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        args: [title, description, department, priority, status, created_by, assigned_to]
      });
      res.status(201).json({ id: Number(rs.lastInsertRowid), title, description, department, status });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Initialize Gemini AI Client lazily/safely
  const getGeminiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  };

  // API Route: AI Meeting Summarizer
  app.post("/api/gemini/summarize-meeting", async (req, res) => {
    try {
      const { rawNotes } = req.body;
      if (!rawNotes) {
        return res.status(400).json({ error: "rawNotes is required" });
      }

      const ai = getGeminiClient();
      if (!ai) {
        // Mock fallback if key missing
        return res.json({
          summary: "• Agreed on dynamic 30s rotating QR code for attendance.\n• Finalized Shaastra poster color tokens and typography scale.\n• Action: Paardheev to complete API permission middleware by Friday.",
          actionItems: [
            { owner: "Paardheev", task: "Complete API Gateway Middleware", deadline: "Friday 5 PM" },
            { owner: "Gunja Tejaswi", task: "Export Figma logo pack SVG", deadline: "Thursday" }
          ]
        });
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: `Summarize the following student club meeting notes or discussion thread into high-level bullet points and clear actionable assignments:\n\n${rawNotes}`,
        config: {
          systemInstruction: "You are an expert AI Product Manager for student club operations at IIT Madras."
        }
      });

      res.json({ result: response.text });
    } catch (err: any) {
      console.error("Gemini Error:", err);
      res.status(500).json({ error: err.message || "Failed to generate AI summary" });
    }
  });

  // API Route: AI Task Breakdown
  app.post("/api/gemini/task-breakdown", async (req, res) => {
    try {
      const { taskTitle, taskDescription } = req.body;
      const ai = getGeminiClient();
      if (!ai) {
        return res.json({
          checkpoints: [
            { title: "Define Requirements & Scope", estimatedHours: 4 },
            { title: "Initial Prototype & Design Review", estimatedHours: 8 },
            { title: "Implementation & Integration", estimatedHours: 12 },
            { title: "Quality Assurance & Proof Submission", estimatedHours: 4 }
          ]
        });
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: `Break down the high-level club task titled "${taskTitle}" (${taskDescription || ''}) into 4-6 sequential actionable checkpoints with estimated hours.`,
      });

      res.json({ result: response.text });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // API Route: AI Event Planner
  app.post("/api/gemini/event-planner", async (req, res) => {
    try {
      const { eventTitle, category, capacity } = req.body;
      const ai = getGeminiClient();
      if (!ai) {
        return res.json({
          plan: `### Event Plan for ${eventTitle}\n- **Phase 1**: Booking CRC Hall 101 & Dean clearance\n- **Phase 2**: Social Media Poster Release\n- **Phase 3**: Volunteer Allocation & Sound Check\n- **Phase 4**: Event Execution & Dynamic QR Attendance\n- **Phase 5**: Post-Event Expenditure Report Upload`
        });
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: `Generate a comprehensive event plan, timeline, volunteer allocation requirements, and budget template for a college club event titled "${eventTitle}" (Category: ${category}, Target Capacity: ${capacity}).`,
      });

      res.json({ result: response.text });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // API Route: Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
