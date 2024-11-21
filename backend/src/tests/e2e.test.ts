import request from "supertest";
import app from "../app";
import { describe } from "node:test";
import dbPool from "../config/db.config";

describe("auth api tests", () => {
  it("should create one user", async () => {
    const res = await request(app).post("/auth/register").send({
      name: "George",
      userName: "George7372test",
      email: "george737test@gmail.com",
      phone: "5102365874",
      password: "pass",
    });
    expect(res.status).toBe(201);
  });
});

afterAll(() => {
  dbPool.end();
});
