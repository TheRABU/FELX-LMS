import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import "dotenv/config";
import { connectdb } from "./services/db.ts";
import itemRouter from "./routers/item.router.ts";
import socketController from "./socket/socket.ts";

const app = express();

app.use(express.json());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

socketController(io);
app.use("/api/item", itemRouter);

connectdb()
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log(`Server running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Failed to connect to database");
  });
