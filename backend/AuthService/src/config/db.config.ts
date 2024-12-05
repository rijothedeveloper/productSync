export interface DatabaseConfig {
  host: string;
  user: string;
  password: string;
  database: string;
  max: number;
  idleTimeoutMillis: number;
  connectionTimeoutMillis: number;
}

let DBConfig: DatabaseConfig;

if (process.env.NODE_ENV === "development") {
  DBConfig = {
    host: "localhost",
    user: "rijo",
    password: "password7",
    database: "productSyncAuthDB",
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  };
} else if (process.env.NODE_ENV === "test") {
  DBConfig = {
    host: "localhost",
    user: "rijo",
    password: "password7",
    database: "productSyncAuthDB",
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  };
} else if (process.env.NODE_ENV === "production") {
  DBConfig = {
    host: "localhost",
    user: "root",
    password: "pass",
    database: "productAuth",
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  };
} else {
  DBConfig = {
    host: "localhost",
    user: "rijo",
    password: "password7",
    database: "productSyncAuthDB",
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  };
}

export default DBConfig;

// import pg from "pg";

// const { Pool } = pg;

// let dbPool: pg.Pool;

// if (process.env.NODE_ENV === "development") {
//   dbPool = new Pool({
//     host: "localhost",
//     user: "rijo",
//     password: "password7",
//     database: "productSyncAuthDB",
//     max: 20,
//     idleTimeoutMillis: 30000,
//     connectionTimeoutMillis: 2000,
//   });
// } else if (process.env.NODE_ENV === "test") {
//   dbPool = new Pool({
//     host: "localhost",
//     user: "rijo",
//     password: "password7",
//     database: "productSyncAuthDB",
//     max: 20,
//     idleTimeoutMillis: 30000,
//     connectionTimeoutMillis: 2000,
//   });
// } else if (process.env.NODE_ENV === "production") {
//   dbPool = new Pool({
//     host: "localhost",
//     user: "root",
//     password: "pass",
//     database: "productAuth",
//     max: 20,
//     idleTimeoutMillis: 30000,
//     connectionTimeoutMillis: 2000,
//   });
// } else {
//   dbPool = new Pool({
//     host: "localhost",
//     user: "rijo",
//     password: "password7",
//     database: "productSyncAuthDB",
//     max: 20,
//     idleTimeoutMillis: 30000,
//     connectionTimeoutMillis: 2000,
//   });
// }

// export default dbPool;
