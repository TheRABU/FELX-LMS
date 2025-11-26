import { Outlet, createRootRoute } from "@tanstack/react-router";
import Navbar from "@/components/ui/custome/navbar";
import { Themeprovider } from "@/components/ui/custome/themeprovider.tsx";
import { useUser } from "@/store/userStore";
import React, { useEffect, useState } from "react";
import { socket } from "@/services/socket";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const user = useUser((state) => state.user);
  const isLoading = useUser((state) => state.isLoading);
  const [isConnected, setIsConnected] = useState(socket.connected);
  // Check authentication status on app load
  const checkauth = useUser((state) => state.checkAuth);
  useEffect(() => {
    checkauth();
  }, [checkauth]);

  useEffect(() => {
    if (user && !isLoading) {
      console.log("User is logged in:", user);
      const onConnect = () => {
        console.log("Connected to real-time server", socket.id);
        setIsConnected(true);
      };

      const onDisconnect = () => {
        console.log("Disconnected from real-time server");
        setIsConnected(false);
      };

      socket.on("connect", onConnect);
      socket.on("disconnect", onDisconnect);

      socket.connect();

      return () => {
        socket.off("connect", onConnect);
        socket.off("disconnect", onDisconnect);
        socket.disconnect();
      };
    }
  }, [user]);

  return (
    <Themeprovider storageKey="vite-ui-theme" defaultTheme="dark">
      <React.Fragment>
        <div className="p-4">
          <Navbar />
          {isConnected ? (
            <div className="w-full p-2 my-4 text-sm text-center text-white bg-green-400/40 rounded-md border border-green-600">
              Server is connected for real-time updates
            </div>
          ) : (
            <div className="w-full p-2 my-4 text-sm text-center text-gray-800 bg-red-400 rounded-md border border-red-600">
              Not connected to real-time server
            </div>
          )}
          <Outlet />
        </div>
      </React.Fragment>
    </Themeprovider>
  );
}
