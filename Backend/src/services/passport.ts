import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { UserModel } from "../models/user.mode";
import { ENV } from "../constants/env";

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

passport.use(
  new GoogleStrategy(
    {
      clientID: ENV.GOOGLE_CLIENT_ID,
      clientSecret: ENV.GOOGLE_CLIENT_SECRET,
      callbackURL: ENV.GOOGLE_REDIRECT_URI,
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const user = await UserModel.findOne({
          googleId: profile.id,
        });

        if (user) {
          return done(null, user);
        }

        const email = profile.emails?.[0]?.value;

        if (email) {
          const finduserbyemail = await UserModel.findOne({ email });
          if (finduserbyemail) {
            finduserbyemail.googleId = profile.id;
            await finduserbyemail.save();
            return done(null, finduserbyemail);
          }
        }

        const newUser = new UserModel({
          googleId: profile.id,
          name: profile.displayName.split(" ")[0],
          email: email,
        });

        await newUser.save();
        return done(null, newUser);
      } catch (error) {
        return done(error, false);
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
      .select("-_id")
      .select("-googleId");
    done(null, User);
  } catch (error) {
    done(error);
  }
});
export default passport;
