import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import "dotenv/config";
import { connectdb } from "./services/db.ts";
import itemRouter from "./routers/item.router.ts";
import type { roomType, userType } from "./constants/types.ts";
import { GameStatus } from "./constants/types.ts";

const app = express();

app.use(express.json());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const rooms: Record<string, roomType> = {};

io.on("connection", (socket) => {
  console.log("User connected : ", socket.id);
  console.log("Total User : ", io.engine.clientsCount);
  io.emit("userCount", io.engine.clientsCount);

  socket.on("disconnect", () => {
    setTimeout(() => {
      io.emit("userCount", io.engine.clientsCount);
      console.log("User disconnected : ", socket.id);
      console.log("Total User : ", io.engine.clientsCount);
    }, 100);
  });

  socket.on("create_room", ({ roomid }) => {
    if (rooms[roomid]) {
      socket.emit("error_message", "This room ID is already taken.");
      return;
    }

    const userId = socket.id;
    socket.join(roomid);
    rooms[roomid] = roomid;

    rooms[roomid] = {
      host: userId,
      players: [{ userid: userId, score: 0 }],
      roomStatus: GameStatus.WAITING,
    };

    socket.emit("room_created", {
      roomid,
      room: rooms[roomid],
    });
    console.log("Room created:", roomid, "by Host:", userId);
  });

  socket.on("join_room", ({ roomid }) => {
    const room = rooms[roomid];
    const userId = socket.id;

    if (!room) {
      socket.emit("error_message", "Room not found.");
      return;
    }

    if (room.players.some((p: userType) => p.userid === userId)) {
      socket.emit("error_message", "You have already joined this room");
      return;
    }

    socket.join(roomid);

    rooms[roomid]?.players.push({
      userid: userId,
      score: 0,
    });

    socket.emit("room_joined", {
      room,
      roomid,
    });
    socket.broadcast.to(roomid).emit("player_joined", { userId });
    console.log("Room Joined with room id : ", roomid, "user id ", socket.id);
    console.log("Room status : ", rooms[roomid]);
  });

  socket.on("sendmessage_room", ({ message, roomid }) => {
    if (socket.rooms.has(roomid)) {
      console.log(
        "[Room:",
        roomid,
        "] [User:",
        socket.id,
        "] [Msg:",
        message,
        "]"
      );
      socket.broadcast.to(roomid).emit("message_room", {
        senderId: socket.id,
        message: message,
      });
    }
  });

  socket.on("start_battle", ({ roomid }) => {
    const hostid = socket.id;

    if (!rooms[roomid]) {
      socket.emit("error_message", "Room not found.");
      return;
    }

    if (rooms[roomid].host !== hostid) {
      socket.emit("error_message", "Only the host can start the battle.");
      return;
    }
    rooms[roomid].roomStatus = GameStatus.RUNNING;
    io.to(roomid).emit("battle_status", rooms[roomid]);
    console.log("Battle started in room : ", rooms[roomid]);
  });
});

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
