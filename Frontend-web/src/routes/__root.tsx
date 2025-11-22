import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import Navbar from "@/components/ui/custome/navbar";
import { Themeprovider } from "@/components/ui/custome/themeprovider.tsx";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
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
