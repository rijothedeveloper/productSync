import DBConfig from "../../config/db.config";
import PostGresConnection from "../../db/db";
import { User } from "../../models/User.model";
import UserRepository from "../../repository/user.repository";

const db = new PostGresConnection(DBConfig);

describe("user repository test", () => {
  let userRepository: UserRepository;
  const user: User = {
    name: "Georget",
    userName: "George7372t",
    email: "george737t@gmail.com",
    phone: "5102365874",
    password: "pass22",
  };
  beforeAll(async () => {
    userRepository = new UserRepository(db);
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
    const newUser = (await db.query(query.text, query.values)).rows[0];
  });
  afterAll(async () => {
    const result1 = await db.query(`DELETE FROM "Users" WHERE email = $1`, [
      user.email,
    ]);
    const result2 = await db.query(`DELETE FROM "Users" WHERE email = $1`, [
      "george7test@gmail.com",
    ]);
  });
  test("should create one user", async () => {
    const user: User = {
      name: "George",
      userName: "George7test",
      email: "george7test@gmail.com",
      phone: "5102365874",
      password: "pass22",
    };
    const res = await userRepository.addUser(user);
    expect(res).toHaveProperty("id");
  });
});
