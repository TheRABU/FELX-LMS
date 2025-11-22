import type { NextFunction, Request, Response } from "express";

export const isloggedin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    return res.json({
      message: "Already logged in",
    });
  }
  next();
};
