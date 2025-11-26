import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/auth/login/success/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useRouter();

  useEffect(() => {
    setTimeout(() => {
      navigate.navigate({ href: "/" });
    }, 3000);
  }, []);

  return (
    <div className="flex flex-row justify-center items-center h-[80dvh]">
      <h1 className="text-2xl font-bold">Login Successful..</h1>
    </div>
  );
}
