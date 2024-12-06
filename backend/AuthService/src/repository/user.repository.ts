import PostGresConnection from "../db/db";
import { User } from "../models/User.model";
import { UserRepositoryInterface } from "./user.repositoryInterface";

export default class UserRepository implements UserRepositoryInterface {
  db: PostGresConnection;
  constructor(db: PostGresConnection) {
    this.db = db;
  }

  async addUser(user: User): Promise<User> {
    try {
      const query = {
        text: `INSERT INTO "Users" (name, "userName", email, busines_name, phone, password)
                        VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, name, "userName", email, busines_name, phone`,
        values: [
          user.name,
          user.userName,
          user.email,
          user.busines_name,
          user.phone,
          user.password,
        ],
      };
      const newUser = (await this.db.query(query.text, query.values)).rows[0];
      return newUser;
    } catch (error) {
      throw error;
    }
  }
  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const result = await this.db.query(
        `SELECT id, name, "userName", email, busines_name, phone, password FROM "Users" WHERE "email" = $1`,
        [email]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
  async getUserById(id: number): Promise<User | null> {
    try {
      const result = await this.db.query(
        `SELECT id, name, "userName", email, busines_name, phone, password FROM "Users" WHERE "id" = $1`,
        [id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
  async getUserByUsername(userName: string): Promise<User | null> {
    try {
      const result = await this.db.query(
        `SELECT id, name, "userName", email, busines_name, phone, password FROM "Users" WHERE "userName" = $1`,
        [userName]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
  async userNameExisted(userName: string): Promise<boolean> {
    try {
      const result = await this.db.query(
        `SELECT email FROM "Users" WHERE "userName" = $1`,
        [userName]
      );
      return result.rows.length > 0;
    } catch (error) {
      throw error;
    }
  }
  async emailExisted(email: string): Promise<boolean> {
    try {
      const result = await this.db.query(
        `SELECT email FROM "Users" WHERE email = $1`,
        [email]
      );
      return result.rows.length > 0;
    } catch (error) {
      throw error;
    }
  }
  async removeUser(id: number): Promise<boolean> {
    try {
      const result = await this.db.query(`DELETE FROM "Users" WHERE id = $1`, [
        id,
      ]);
      return result.rowCount !== null && result.rowCount > 0;
    } catch (error) {
      throw error;
    }
  }
}
