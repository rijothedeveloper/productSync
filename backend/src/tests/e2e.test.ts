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
      password: "pass",
    });
    expect(res.status).toBe(201);
  });

  afterEach(async () => {
    await prisma.users.delete({
      where: {
        userName: "George7372test",
      },
    });
  });
});

afterAll(() => {});
