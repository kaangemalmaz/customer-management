import bcrypt from "bcryptjs";
import { db } from "./db.js";

export const initializeDatabase = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) NOT NULL UNIQUE,
      password_hash TEXT NOT NULL
    );
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS customers (
      id SERIAL PRIMARY KEY,
      first_name VARCHAR(100) NOT NULL,
      last_name VARCHAR(100) NOT NULL,
      tc_no CHAR(11) NOT NULL UNIQUE,
      register_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const result = await db.query("SELECT * FROM users WHERE username = $1", [
    process.env.DEFAULT_USERNAME,
  ]);

  if (result.rows.length === 0) {
    const hash = await bcrypt.hash(process.env.DEFAULT_PASSWORD, 10);
    await db.query(
      `INSERT INTO users (username, password_hash) VALUES ($1, $2)`,
      [process.env.DEFAULT_USERNAME, hash]
    );
    console.log("Default kullanici eklendi.");
  } else {
    console.log("Default kullanici kayitli.");
  }
};
