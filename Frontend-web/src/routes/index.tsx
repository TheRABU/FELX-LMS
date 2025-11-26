import { createFileRoute } from "@tanstack/react-router";
import LiveUserCount from "@/components/ui/custome/liveusercounter";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    //TODO: Place holder hero section
    <div>
      <LiveUserCount />
    </div>
  );
}
