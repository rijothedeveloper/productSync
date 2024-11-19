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
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({ error, statusCode: 500, result: null });
  }
}
