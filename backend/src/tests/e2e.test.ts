import request from "supertest";
import app from "../app";
import { describe } from "node:test";
import DBConfig from "../config/db.config";
import PostGresConnection from "../db/db";

const db = new PostGresConnection(DBConfig);

describe("auth api tests", () => {
  beforeAll(async () => {
    process.env.JWT_SECRET = "test";
  });
  test("should create one user", async () => {
    const res = await request(app).post("/auth/register").send({
      name: "George",
      userName: "George7372test",
      email: "george737test@gmail.com",
      phone: "5102365874",
      password: "pass22",
    });
    expect(res.status).toBe(201);
    expect(res.body.data.user).toHaveProperty("id");
    expect(res.body.data.user.name).toEqual("George");
    expect(res.body.data.user.userName).toEqual("George7372test");
  });

  test("should return error 400 if user name is not passed in body", async () => {
    const res = await request(app).post("/auth/register").send({
      name: "George",
      email: "george737test@gmail.com",
      phone: "5102365874",
      password: "pass22",
    });
    // expect(res.status).toBe(400);
  });

  test("should return error 400 if password is not passed in body", async () => {
    const res = await request(app).post("/auth/register").send({
      name: "George",
      userName: "George7372_2test",
      email: "george737test2@gmail.com",
      phone: "5102365874",
    });
    expect(res.status).toBe(400);
  });

  test("should return error 400 if password length is < 6", async () => {
    const res = await request(app).post("/auth/register").send({
      name: "George",
      userName: "George7372test",
      phone: "5102365874",
      password: "pass",
    });
    expect(res.status).toBe(400);
  });

  test("should return error 400 if email is not passed in body", async () => {
    const res = await request(app).post("/auth/register").send({
      name: "George",
      userName: "George7372test",
      phone: "5102365874",
      password: "pass",
    });
    expect(res.status).toBe(400);
  });

  test("should return error 400 if email is not in correct format", async () => {
    const res = await request(app).post("/auth/register").send({
      name: "George",
      userName: "George7372test",
      phone: "5102365874",
      password: "pass22",
    });
    expect(res.status).toBe(400);
  });

  test("should return error 400 if user name already exists", async () => {
    const res = await request(app).post("/auth/register").send({
      name: "George",
      userName: "George7372test",
      email: "george737test2@gmail.com",
      phone: "5102365874",
      password: "pass",
    });
    expect(res.status).toBe(400);
  });

  test("should return error 400 if email already exists", async () => {
    const res = await request(app).post("/auth/register").send({
      name: "George",
      userName: "George7372test",
      email: "george737test2@gmail.com",
      phone: "5102365874",
      password: "pass",
    });
    expect(res.status).toBe(400);
  });

  test("should login the registered user", async () => {
    const res = await request(app).post("/auth/login").send({
      userName: "George7372test",
      password: "pass22",
    });
    expect(res.status).toBe(200);
    expect(res.body.data.user).toHaveProperty("id");
    expect(res.body.data).toHaveProperty("token");
  });

  afterAll(async () => {
    const result = await db.query(`DELETE FROM "Users" WHERE email = $1`, [
      "george737test@gmail.com",
    ]);
    console.log(result);
  });
});
