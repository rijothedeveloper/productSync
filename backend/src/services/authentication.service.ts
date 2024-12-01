import dbPool from "../config/db.config";

let response: { error: any; statusCode: number; data: object | null };

export async function registerUser(user: User) {
  try {
    if (!user.userName || !user.email || !user.password) {
      response = {
        error: "userName, email and password are required",
        statusCode: 400,
        data: null,
      };
      return response;
    }
    if (user.password.length < 6) {
      response = {
        error: "password length should be greater than 6",
        statusCode: 400,
        data: null,
      };
      return response;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!user.email.match(emailRegex)) {
      response = {
        error: "email is not in correct format",
        statusCode: 400,
        data: null,
      };
      return response;
    }

    if (await userNameExisted(user.userName)) {
      response = {
        error: "userName already exists",
        statusCode: 400,
        data: null,
      };
      return response;
    }

    if (await emailExisted(user.email)) {
      response = {
        error: "email already exists",
        statusCode: 400,
        data: null,
      };
      return response;
    }

    const query = {
      text: `INSERT INTO "Users" (name, "userName", email, busines_name, phone, password)
                VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      values: [
        user.name,
        user.userName,
        user.email,
        user.busines_name,
        user.phone,
        user.password,
      ],
    };
    const newUser = await dbPool.query(query);
    response = { error: null, statusCode: 201, data: newUser };
  } catch (error) {
    response = { error, statusCode: 500, data: null };
  }
  return response;
}

const userNameExisted = async (userName: string) => {
  const result = await dbPool.query(
    `SELECT "userName" FROM "Users" WHERE "userName" = $1`,
    [userName]
  );
  return result.rows.length > 0;
};

const emailExisted = async (email: string) => {
  const result = await dbPool.query(
    `SELECT email FROM "Users" WHERE email = $1`,
    [email]
  );
  return result.rows.length > 0;
};

// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// let response: { error: any; statusCode: number; data: object | null };

// export async function registerUser(user: User) {
//   try {
//     if (!user.userName || !user.email || !user.password) {
//       response = {
//         error: "userName, email and password are required",
//         statusCode: 400,
//         data: null,
//       };
//       return response;
//     }
//     if (user.password.length < 6) {
//       response = {
//         error: "password length should be greater than 6",
//         statusCode: 400,
//         data: null,
//       };
//       return response;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!user.email.match(emailRegex)) {
//       response = {
//         error: "email is not in correct format",
//         statusCode: 400,
//         data: null,
//       };
//       return response;
//     }

//     const userNameExists = await prisma.users.findUnique({
//       where: {
//         userName: user.userName,
//       },
//     });
//     if (userNameExists) {
//       response = {
//         error: "userName already exists",
//         statusCode: 400,
//         data: null,
//       };
//       return response;
//     }
//     const emailExists = await prisma.users.findUnique({
//       where: {
//         email: user.email,
//       },
//     });
//     if (emailExists) {
//       response = {
//         error: "email already exists",
//         statusCode: 400,
//         data: null,
//       };
//       return response;
//     }
//     const newUser = await prisma.users.create({
//       data: {
//         name: user.name,
//         userName: user.userName,
//         email: user.email,
//         busines_name: user.busines_name,
//         phone: user.phone,
//         password: user.password,
//       },
//     });
//     response = { error: null, statusCode: 201, data: newUser };
//   } catch (error) {
//     response = { error, statusCode: 500, data: null };
//   }
//   return response;
// }
