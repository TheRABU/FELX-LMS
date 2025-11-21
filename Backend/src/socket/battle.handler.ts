import type { Server, Socket } from "socket.io";
import { GameStatus, type roomType } from "../constants/types.ts";

export const registerBattleHandlers = (
  io: Server,
  socket: Socket,
  rooms: Record<string, roomType>
) => {
  socket.on("start_battle", ({ roomid }) => {
    const room = rooms[roomid];
    if (!room) return socket.emit("error_message", "Room not found");

    if (room.host !== socket.id)
      return socket.emit("error_message", "Only the host can start battle");

    room.roomStatus = GameStatus.RUNNING;

    io.to(roomid).emit("battle_status", room);
  });
};
