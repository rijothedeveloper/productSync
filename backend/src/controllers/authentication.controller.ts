import { Request, Response, NextFunction } from "express";
import * as authenticationService from "../services/authentication.service";
import { AppError } from "../middleware/ErrorHandler.middleware";

export async function registerUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (Object.keys(req.body).length === 0) {
    next(new AppError("Request body is missing", 400));
    return;
  }
  try {
    let user: User = req.body;
    const response = await authenticationService.registerUser(user);

    if (response.data) {
      res.cookie("token", response.data.token, {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        // sameSite: Strict,
        secure: process.env.NODE_ENV === "production" ? true : false,
      });
    }
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({ error, statusCode: 500, result: null });
  }
}
