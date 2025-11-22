import type { NextFunction, Request, Response } from "express";

export const loggedinornot = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  }

  // Return 401 Unauthorized, not just JSON
  return res.status(401).json({
    message: "Please login first",
  });
};
