import { Request, Response, NextFunction } from "express";
import * as authenticationService from "../services/authentication.service";
import { AppError } from "../middleware/ErrorHandler.middleware";
import { setTokenOnCookie } from "../utils/setTokenOnCookie";

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
      setTokenOnCookie(res, response.data.token);
    }
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({ error, statusCode: 500, result: null });
  }
}

export async function loginUser(
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
    const response = await authenticationService.loginUser(
      user.userName,
      user.password
    );

    if (response.data) {
      setTokenOnCookie(res, response.data.token);
    }
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({ error, statusCode: 500, result: null });
  }
}
