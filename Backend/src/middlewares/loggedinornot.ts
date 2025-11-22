import type { NextFunction, Request, Response } from "express";

export const loggedinornot = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.json({
      message: "Please login first",
    });
  }
  next();
};
