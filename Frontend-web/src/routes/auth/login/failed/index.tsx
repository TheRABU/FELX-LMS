import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/login/failed/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/auth/login/failed/"!</div>;
}
