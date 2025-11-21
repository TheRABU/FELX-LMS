import { Server, Socket } from "socket.io";
import { GameStatus, type roomType } from "../constants/types.ts";

export const registerRoomHandlers = (
  io: Server,
  socket: Socket,
  rooms: Record<string, roomType>
) => {
  socket.on("create_room", ({ roomid }) => {
    if (rooms[roomid]) {
      socket.emit("error_message", "This room ID already exists");
      return;
    }

    const userId = socket.id;
    socket.join(roomid);

    rooms[roomid] = {
      host: userId,
      players: [{ userid: userId, score: 0 }],
      roomStatus: GameStatus.WAITING,
    };

    socket.emit("room_created", { roomid, room: rooms[roomid] });
  });

  socket.on("join_room", ({ roomid }) => {
    const room = rooms[roomid];
    const userId = socket.id;

    if (!room) return socket.emit("error_message", "Room not found");

    if (room.players.find((p) => p.userid === userId))
      return socket.emit("error_message", "Already joined");

    socket.join(roomid);
    room.players.push({ userid: userId, score: 0 });

    socket.emit("room_joined", { roomid, room });
    socket.broadcast.to(roomid).emit("player_joined", { userId });
  });
};
