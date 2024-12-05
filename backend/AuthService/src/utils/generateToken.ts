import jwt from "jsonwebtoken";

export const generateToken = (userId: string) => {
  let secret = "test";
  if (process.env.JWT_SECRET) {
    secret = process.env.JWT_SECRET;
  }
  const token = jwt.sign({ id: userId }, secret, {
    expiresIn: "30d",
  });

  const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    // sameSite: Strict,
    secure: process.env.NODE_ENV === "production" ? true : false,
  };
  return token;
};
