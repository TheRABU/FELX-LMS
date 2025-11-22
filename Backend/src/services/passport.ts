import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { UserModel } from "../models/user.mode";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const User = await UserModel.findOne({ email });

        if (!User || User.email !== email) {
          return done(null, false, {
            message: "User not found create an account",
          });
        }

        if (User.password !== password) {
          return done(null, false, { message: "Invalid Cradientls" });
        }
        const { password: _, ...userwithoutpassword } = User.toObject();

        return done(null, userwithoutpassword);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const User = await UserModel.findOne({ id })
      .select("-password")
      .select("-_id");
    done(null, User);
  } catch (error) {
    done(error);
  }
});
export default passport;
