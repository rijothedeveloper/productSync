import pg from "pg";

const { Pool } = pg;

let dbPool;

if (process.env.NODE_ENV === "test") {
  dbPool = new Pool({
    host: "localhost",
    user: "root",
    password: "pass",
    database: "productAuth",
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });
} else {
  dbPool = new Pool({
    host: "localhost",
    user: "root",
    password: "pass",
    database: "productAuth",
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });
}

export default dbPool;
