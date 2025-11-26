import { Outlet, createRootRoute } from "@tanstack/react-router";
import Navbar from "@/components/ui/custome/navbar";
import { Themeprovider } from "@/components/ui/custome/themeprovider.tsx";
import { useUser } from "@/store/userStore";
import React, { useEffect } from "react";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  // Check authentication status on app load
  const checkauth = useUser((state) => state.checkAuth);
  useEffect(() => {
    checkauth();
  }, [checkauth]);

  return (
    <Themeprovider storageKey="vite-ui-theme" defaultTheme="dark">
      <React.Fragment>
        <div className="p-4">
          <Navbar />
          <Outlet />
        </div>
      </React.Fragment>
    </Themeprovider>
  );
}
