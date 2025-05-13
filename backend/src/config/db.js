import pg from "pg";
const { Pool } = pg;

export const db = new Pool({
  connectionString: "postgres://postgres:1@localhost:5432/deneme",
});
