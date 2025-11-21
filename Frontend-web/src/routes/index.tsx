import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { socket } from "../services/socket.ts";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [myID, setMyID] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [useCount, setUserCount] = useState(0);
  const [roomid, setRoomId] = useState("");
  const [joinedRoomId, setJoinedRoomId] = useState<string | null>(null);
  const [joinedRoomStatus, setJoinedRoomStatus] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [receivedMessage, setReceivedMessage] = useState<{
    sender: string;
    message: string;
  }>({ sender: "", message: "" });

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      setMyID(socket.id || null);
    }

    function onDisconnect() {
      setIsConnected(false);
      setMyID(null);
    }

    function onUserCount(data: number) {
      setUserCount(data);
    }
    function onErrorMessage(message: string) {
      alert(message);
    }
    function onRoomJoined(data: {
      roomid: string;
      room: { roomStatus: string };
    }) {
      console.log("Joined room:", data);
      setJoinedRoomId(data.roomid);
      setJoinedRoomStatus(data.room.roomStatus);
    }
    function onPlayerJoin(data: { userId: string }) {
      console.log("Player joined:", data);
      alert(`Player with ID: ${data.userId} has joined the room.`);
    }
    function onMessageRoom(data: { senderId: string; message: string }) {
      console.log("Message received in room:", data);
      setReceivedMessage({ sender: data.senderId, message: data.message });
    }
    function onRoomCreate(data: {
      roomid: string;
      room: {
        host: string;
        roomStatus: string;
        players: Array<{ userid: string; score: number }>;
      };
    }) {
      console.log("Room created:", data);
      setJoinedRoomId(data.roomid);
      setJoinedRoomStatus(data.room.roomStatus);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("userCount", onUserCount);
    socket.on("error_message", onErrorMessage);
    socket.on("room_joined", onRoomJoined);
    socket.on("player_joined", onPlayerJoin);
    socket.on("message_room", onMessageRoom);
    socket.on("room_created", onRoomCreate);

    if (socket.connected) {
      onConnect();
    }

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("userCount", onUserCount);
      socket.off("error_message", onErrorMessage);
      socket.off("room_joined", onRoomJoined);
      socket.off("player_joined", onPlayerJoin);
      socket.off("message_room", onMessageRoom);
      socket.off("room_created", onRoomCreate);
    };
  }, []);

  const handleJoinRoom = () => {
    if (roomid.trim() === "") {
      alert("Please enter a valid Room ID.");
      return;
    }
    console.log("Joining room:", roomid);
    socket.emit("join_room", { roomid });
    setRoomId("");
  };
  const handleCreateRoom = () => {
    if (roomid.trim() === "") {
      alert("Please enter a valid Room ID.");
      return;
    }
    console.log("Creating room:", roomid);
    socket.emit("create_room", { roomid });
    setRoomId("");
  };
  const handleSendMessage = () => {
    if (!joinedRoomId) {
      alert("You must join a room to send messages.");
      return;
    }
    if (message.trim() === "") {
      alert("Please enter a message to send.");
      return;
    }
    console.log("Sending message to room:", joinedRoomId, message);
    socket.emit("sendmessage_room", { roomid: joinedRoomId, message });
    setMessage("");
  };

  return (
    <div>
      <div className="flex flex-row w-full justify-between">
        <div className="border border-gray-900 p-2 w-full">
          <div>
            <div>My Socket ID : {myID}</div>
            Connection :{" "}
            <span className={isConnected ? "text-green-500" : "text-red-500"}>
              {isConnected ? "Connected" : "Disconnected"}
            </span>
          </div>
          <div>Total Users : {useCount}</div>
          {joinedRoomId && <div>Joined Room ID : {joinedRoomId}</div>}
          {joinedRoomStatus && <div>Room Status : {joinedRoomStatus}</div>}
        </div>
        <div className="border border-gray-900 p-3 w-full">
          <div className="felx flex-col ">
            <div className="flex flex-row w-full ">
              <input
                type="text"
                placeholder="Type your message"
                className="border border-gray-300 rounded-md px-2 py-1  w-full"
                id="messageInput"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                className="ml-2 px-2 py-1 bg-emerald-500 text-white rounded-md w-full max-w-30"
                onClick={handleSendMessage}
              >
                Send
              </button>
            </div>
            <div className="p-2">
              {receivedMessage.sender || receivedMessage.message ? (
                <>
                  <h2 className="text-sm font-semibold text-fuchsia-600">
                    Sender: {receivedMessage.sender}
                  </h2>
                  <p className="text-sm">Message: {receivedMessage.message}</p>
                </>
              ) : (
                <p className="text-sm text-gray-500">No messages yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <input
          type="text"
          value={roomid}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Enter Room ID"
          className="border border-gray-300 rounded-md px-2 py-1 mt-4"
        />
        <button
          className="ml-2 px-4 py-1 bg-blue-500 text-white rounded-md"
          onClick={handleJoinRoom}
        >
          Join Room
        </button>
        <button
          className="ml-2 px-4 py-1 bg-green-500 text-white rounded-md"
          onClick={handleCreateRoom}
        >
          Create Room
        </button>
      </div>
    </div>
  );
}
