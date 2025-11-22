import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import type { Iuser } from "../types/user.type.ts";
import { UserModel } from "../models/user.mode.ts";
import passport from "../services/passport.ts";
import { loggedinornot } from "../middlewares/loggedinornot.ts";
import { isloggedin } from "../middlewares/isloggedin.ts";
const userRouter = express.Router();

userRouter.post(
  "/register",
  async (req: Request<{}, {}, Iuser>, res: Response) => {
    try {
      const { email, password, name } = req.body;
      if (!email || !password || !name) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // check if email exists or not
      const userExists = await UserModel.findOne({ email });
      if (userExists) {
        return res.status(400).json({ error: "Email already exists" });
      }

      // create user
      const newUser = new UserModel({
        email,
        password,
        name,
      });
      await newUser.save();

      // response
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

userRouter.post(
  "/login",
  isloggedin,
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      "local",
      (err: any, user: Iuser | false, info: { message: string }) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.status(401).json({
            error: info?.message || "Authentication failed",
          });
        }
        req.logIn(user, (loginErr) => {
          if (loginErr) {
            return next(loginErr);
          }

          return res.status(200).json({
            message: "Login Successful",
          });
        });
      }
    )(req, res, next);
  }
);

userRouter.get(
  "/logout",
  loggedinornot,
  (req: Request, res: Response, next: NextFunction) => {
    try {
      req.logout((error) => {
        if (error) {
          return res.json({
            message: "Error while logging out",
          });
        }
        return res.json({
          message: "User logged out",
        });
      });
    } catch (error) {
      next(error);
    }
  }
);

userRouter.get("/me", (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.isAuthenticated()) {
      return res.json({
        Message: "Login first",
      });
    }

    return res.json({
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
});

export default userRouter;
