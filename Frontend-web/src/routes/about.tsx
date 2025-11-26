import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <div className="min-h-screen bg-[#1B3C53]">
        <h2 className="text-3xl text-white text-center">About Us</h2>
      </div>
    </>
  );
}
