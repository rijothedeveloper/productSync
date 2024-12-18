import request from "supertest";
import app from "../app";
import { describe } from "node:test";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("auth api tests", () => {
  test("should create one user", async () => {
    const res = await request(app).post("/auth/register").send({
      name: "George",
      userName: "George7372test",
      email: "george737test@gmail.com",
      phone: "5102365874",
      password: "pass22",
    });
    expect(res.status).toBe(201);
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

  test("should return error 400 if password length is < 6", async () => {
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
      password: "pass",
    });
    expect(res.status).toBe(400);
  });

  test("should return error 400 if password is not passed in body", async () => {
    const res = await request(app).post("/auth/register").send({
      name: "George",
      userName: "George7372test",
      email: "george737test@gmail.com",
      phone: "5102365874",
      password: "pass",
    });
    expect(res.status).toBe(400);
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

  afterAll(async () => {
    await prisma.users.delete({
      where: {
        userName: "George7372test",
      },
    });
  });
});

afterAll(() => {});
