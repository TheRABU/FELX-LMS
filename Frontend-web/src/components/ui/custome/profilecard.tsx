import { useTheme } from "@/hooks/useTheme.tsx";
import { Button } from "../button.tsx";
import { useUser } from "@/store/userStore.ts";
import { useNavigate } from "@tanstack/react-router";

export const ProfileCard = () => {
  const navigator = useNavigate();
  const { theme } = useTheme();
  const user = useUser((state) => state.user?.name);
  const admin = useUser((state) => state.user?.role);
  const handleProfilebtnClick = () => {
    navigator({ to: "/auth/user" });
  };

  return (
    <Button
      className={`${admin === "admin" ? "bg-white border border-red-500/60 hover:bg-red-500/30 dark:bg-red-500/30 dark:border-red-500/60 dark:border dark:text-white dark:hover:bg-red-500/30 dark:hover:border-red-500/90" : ""} flex items-center gap-2`}
      onClick={handleProfilebtnClick}
    >
      <h1>{user}</h1>
      <div
        className={`h-2 w-2 rounded-full ${theme === "dark" ? "bg-green-400" : "bg-green-400"}`}
      ></div>
    </Button>
  );
};
