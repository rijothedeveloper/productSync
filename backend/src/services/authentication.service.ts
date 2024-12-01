import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

let response: { error: any; statusCode: number; result: object | null };

export async function registerUser(user: User) {
  try {
    const newUser = await prisma.users.create({
      data: {
        name: user.name,
        userName: user.userName,
        email: user.email,
        busines_name: user.busines_name,
        phone: user.phone,
        password: user.password,
      },
    });
    response = { error: null, statusCode: 201, result: newUser };
  } catch (error) {
    response = { error, statusCode: 500, result: null };
  }
  return response;
}
