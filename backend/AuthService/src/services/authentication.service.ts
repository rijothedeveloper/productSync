import bcryptjs from "bcryptjs";
import { generateToken } from "../utils/generateToken";
import { User } from "../models/User.model";
import DBConfig from "../config/db.config";
import PostGresConnection from "../db/db";
import UserRepository from "../repository/user.repository";

interface Data {
  user: object;
  token: string;
}

let response: { error: any; statusCode: number; data: Data | null };

const db = new PostGresConnection(DBConfig);
const userRepository = new UserRepository(db);

// register new user
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

    const salt = await bcryptjs.genSaltSync(10);
    const hashedPassword = await bcryptjs.hash(user.password, salt);
    user.password = hashedPassword;

    // const query = {
    //   text: `INSERT INTO "Users" (name, "userName", email, busines_name, phone, password)
    //             VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, name, "userName", email, busines_name, phone`,
    //   values: [
    //     user.name,
    //     user.userName,
    //     user.email,
    //     user.busines_name,
    //     user.phone,
    //     hashedPassword,
    //   ],
    // };
    // const newUser = (await db.query(query.text, query.values)).rows[0];
    const newUser = await userRepository.addUser(user);

    if (!newUser.id) {
      response = {
        error: "User ID is undefined in new user",
        statusCode: 400,
        data: null,
      };
      return response;
    }
    const token = generateToken(newUser.id);
    if (!token) {
      response = {
        error: "couldn't generate token",
        statusCode: 400,
        data: null,
      };
      return response;
    }
    response = { error: null, statusCode: 201, data: { user: newUser, token } };
  } catch (error) {
    response = { error, statusCode: 500, data: null };
  }
  return response;
}

const userNameExisted = async (userName: string) => {
  const userNameExisted = await userRepository.userNameExisted(userName);
  return userNameExisted;
};

const emailExisted = async (email: string) => {
  const emailExisted = await userRepository.emailExisted(email);
  return emailExisted;
};

export async function loginUser(userName: string, password: string) {
  if (!userName || !password) {
    response = {
      error: "userName, email and password are required",
      statusCode: 400,
      data: null,
    };
    return response;
  }
  try {
    const user = await userRepository.getUserByUsername(userName);
    if (!user) {
      response = {
        error: "userName doesn't exist",
        statusCode: 400,
        data: null,
      };
      return response;
    }
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      response = {
        error: "password is incorrect",
        statusCode: 400,
        data: null,
      };
      return response;
    }
    if (!user.id) {
      response = {
        error: "User ID is undefined in logged user",
        statusCode: 400,
        data: null,
      };
      return response;
    }
    const token = generateToken(user.id);
    if (!token) {
      response = {
        error: "couldn't generate token",
        statusCode: 400,
        data: null,
      };
      return response;
    }
    response = {
      error: null,
      statusCode: 200,
      data: { user: user, token },
    };
  } catch (error) {
    response = { error, statusCode: 500, data: null };
  }
  return response;
}

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
