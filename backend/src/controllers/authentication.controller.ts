import { Request, Response } from "express";
import * as authenticationService from "../services/authentication.service";

export async function registerUser(req: Request, res: Response) {
  if (!req.body) {
    res
      .status(400)
      .json({
        error: "Request body is missing",
        statusCode: 400,
        result: null,
      });
    return;
  }
  try {
    // const { userName, name, email, business_name, phone, password } = req.body;
    let user: User = req.body;
    // user = {
    //   id: req.body.id,
    //   userName: req.body.userName,
    //   name: req.body.name,
    //   email: req.body.email,
    //   business_name: req.body.business_name,
    //   phone: req.body.phone,
    //   password: req.body.password,
    //   createdAt: req.body.createdAt,
    //   updatedAt: req.body.updatedAt,
    // };
    const response = await authenticationService.registerUser(user);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({ error, statusCode: 500, result: null });
  }
}
