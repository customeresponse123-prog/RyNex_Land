const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.PGUSER || "postgres",
  host: process.env.PGHOST || "localhost",
  database: process.env.PGDATABASE || "rynex_land",
  password: process.env.PGPASSWORD || "12345",
  port: process.env.PGPORT ? parseInt(process.env.PGPORT, 10) : 5432
});

module.exports = pool;