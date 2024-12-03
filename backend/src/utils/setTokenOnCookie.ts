import { Response } from "express";

export const setTokenOnCookie = (res: Response, token: string) => {
  res.cookie("product-sync-token", token, {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    // sameSite: Strict,
    secure: process.env.NODE_ENV === "production" ? true : false,
  });
};
