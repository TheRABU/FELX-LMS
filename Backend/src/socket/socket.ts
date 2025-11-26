import { Server, Socket } from "socket.io";
import type { roomType } from "../constants/types.ts";
import { registerRoomHandlers } from "./room.handler.ts";
import { registerChatHandlers } from "./chat.handler.ts";
import { registerBattleHandlers } from "./battle.handler.ts";

const rooms: Record<string, roomType> = {};

const socketController = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("User Connected:", socket.id);
    io.emit("userCount", io.engine.clientsCount);

    socket.on("request_user_count", () => {
      socket.emit("userCount", io.engine.clientsCount);
    });

    socket.on("disconnect", () => {
      setTimeout(() => {
        io.emit("userCount", io.engine.clientsCount);
        console.log("User disconnected:", socket.id);
      }, 100);
    });

    registerRoomHandlers(io, socket, rooms);
    registerChatHandlers(io, socket);
    registerBattleHandlers(io, socket, rooms);
  });
};

export default socketController;
