import { useUser } from "@/store/userStore";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/user/")({
  component: RouteComponent,
});

function RouteComponent() {
  const user = useUser((state) => state.user);
  const natigator = useNavigate();
  const logoutUser = useUser((state) => state.logoutUser);

  if (!user) {
    return (
      <div className="flex min-h-[200px] items-center justify-center text-sm text-muted-foreground">
        No user data available.
      </div>
    );
  }
  const handleProfileLogoutClick = () => {
    logoutUser();
    
    natigator({ to: "/" });
  };

  const createdAt = new Date(user.createdAt).toLocaleDateString();
  const updatedAt = new Date(user.updatedAt).toLocaleDateString();

  return (
    <div className="mx-auto w-full py-6">
      <section className="border bg-card text-card-foreground shadow-sm rounded-md">
        <header className="flex flex-col gap-2 border-b p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold">{user.name}</h1>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleProfileLogoutClick}
                className="rounded-md border px-3 py-1 text-xs uppercase text-muted-foreground hover:bg-muted"
              >
                Logout
              </button>
              <span className="rounded-full border px-3 py-1 text-xs uppercase text-muted-foreground">
                {user.role}
              </span>
            </div>
          </div>
        </header>

        <div className="grid gap-4 p-6 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">User ID</span>
            <span className="font-medium">{user.id}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Created</span>
            <span className="font-medium">{createdAt}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Last Updated</span>
            <span className="font-medium">{updatedAt}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
