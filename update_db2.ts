import { createClient } from "@libsql/client";
import path from "path";

const dbPath = path.resolve(process.cwd(), "database.sqlite");
const db = createClient({
  url: `file:${dbPath}`,
});

async function run() {
  await db.execute("UPDATE users SET role = 'Admin' WHERE email = 'admin@smail.iitm.ac.in'");
  console.log("Updated admin user role to Admin");
}
run();
