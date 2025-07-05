import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "lembest", // change if needed
  password: "lfc123",
  port: 5432,
});

export default pool;
