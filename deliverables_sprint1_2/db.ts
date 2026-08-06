import { createClient } from "@libsql/client";
import path from "path";

const dbPath = path.resolve(process.cwd(), "database.sqlite");

export const db = createClient({
  url: `file:${dbPath}`,
});

export const initDb = async () => {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      phone TEXT,
      role TEXT NOT NULL,
      department TEXT NOT NULL,
      academic_year INTEGER NOT NULL,
      profile_picture TEXT,
      password_hash TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS announcements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      author_id INTEGER,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      priority TEXT,
      channel TEXT NOT NULL,
      pinned BOOLEAN DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (author_id) REFERENCES users(id)
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      created_by INTEGER,
      assigned_to INTEGER,
      title TEXT NOT NULL,
      description TEXT,
      department TEXT NOT NULL,
      priority TEXT,
      status TEXT,
      due_date DATE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (created_by) REFERENCES users(id),
      FOREIGN KEY (assigned_to) REFERENCES users(id)
    )
  `);
  
  await db.execute(`
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      organizer_id INTEGER,
      title TEXT NOT NULL,
      description TEXT,
      venue TEXT,
      date_time DATETIME,
      department TEXT,
      max_participants INTEGER,
      registration_deadline DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (organizer_id) REFERENCES users(id)
    )
  `);

  // Insert mock data if empty
  const rs = await db.execute("SELECT COUNT(*) as count FROM users");
  if (rs.rows[0].count === 0) {
    // Hash for 'Admin@test' is $2b$10$r9/i2WaYZ9aiKg/XYj4yoe8LXCJuDO6C.qQ3CG3afeMNhKKWD5mQK
    await db.execute({
      sql: `INSERT INTO users (full_name, email, role, department, academic_year, password_hash) VALUES (?, ?, ?, ?, ?, ?)`,
      args: ["Admin User", "admin@smail.iitm.ac.in", "Club Head", "Core Team", 4, "$2b$10$r9/i2WaYZ9aiKg/XYj4yoe8LXCJuDO6C.qQ3CG3afeMNhKKWD5mQK"]
    });
  }
};

export default db;
