import pg from "pg";
import { DatabaseConfig } from "../config/db.config";

export default class PostGresConnection {
  config: DatabaseConfig;
  pool: pg.Pool;
  constructor(config: any) {
    this.config = config;
    this.pool = new pg.Pool(config);
  }

  async query(test: string, params: any) {
    try {
      const client = await this.pool.connect();
      const result = await client.query(test, params);
      client.release();
      return result;
    } catch (error) {
      throw error;
    }
  }
  async close() {
    await this.pool.end();
  }
}
