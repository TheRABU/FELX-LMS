import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import "dotenv/config";
import { connectdb } from "./services/db.ts";
import itemRouter from "./routers/item.router.ts";
import socketController from "./socket/socket.ts";
import userRouter from "./routers/user.router.ts";
import passport from "./services/passport.ts";
import session from "express-session";
import { ENV } from "./constants/env.ts";

const app = express();

app.use(express.json());
app.use(
  session({
    secret: ENV.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 6000 * 60,
      secure: false,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

socketController(io);

app.use("/api/item", itemRouter);
app.use("/api/auth/user", userRouter);

connectdb().then(() => {
  server.listen(ENV.PORT, () => {
    console.log(`Server running at http://localhost:${ENV.PORT}`);
  });
});
