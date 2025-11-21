import { Server, Socket } from "socket.io";

export const registerChatHandlers = (io: Server, socket: Socket) => {
  socket.on("sendmessage_room", ({ message, roomid }) => {
    if (!socket.rooms.has(roomid)) return;

    socket.broadcast.to(roomid).emit("message_room", {
      senderId: socket.id,
      message,
    });
  });
};
