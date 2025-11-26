import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/auth/login/failed/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate({ to: "/auth/login" });
    }, 3000);
  }, []);

  return (
    <div className="flex flex-row justify-center items-center h-[80dvh]">
      <h1 className="text-2xl font-bold">Login Failed..</h1>
    </div>
  );
}
