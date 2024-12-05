import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { getUser } from "../models/User.model";

export const protectRoute = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies["product-sync-token"];
    if (!token) {
      return res.status(401).json({
        statusCode: 401,
        message: "Unauthorized - no token provided",
        result: null,
      });
      const secret = process.env.JWT_SECRET || "test";
      const decoded = jwt.verify(token, secret);
      if (!decoded) {
        return res.status(401).json({
          statusCode: 401,
          message: "Unauthorized - invalid token",
          result: null,
        });
      }
      if (decoded && typeof decoded === "object") {
        const user = getUser((decoded as jwt.JwtPayload).id);
        return user;
      } else {
        return res.status(401).json({
          statusCode: 401,
          message: "Unauthorized - user not found from id",
          result: null,
        });
      }
    }
    next();
  } catch (error) {
    return res.status(500).json({ error, statusCode: 500, result: null });
  }
};
