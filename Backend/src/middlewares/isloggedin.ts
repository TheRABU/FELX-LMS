import type { NextFunction, Request, Response } from "express";

export const isloggedin = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return res.status(400).json({
      message: "You are already logged in",
      user: req.user,
    });
  }
  next();
};
