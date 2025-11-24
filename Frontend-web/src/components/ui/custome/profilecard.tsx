import { useTheme } from "@/hooks/useTheme.tsx";
import { Button } from "../button.tsx";

export const ProfileCard = () => {
  const { theme } = useTheme();
  return (
    <Button
      className="flex flex-row gap-2 items-center  px-3 py-1 rounded-md "
      variant={"outline"}
    >
      <h1>NAFI</h1>
      <div
        className={`h-2 w-2 rounded-full ${theme === "dark" ? "bg-green-400" : "bg-green-400"}`}
      ></div>
    </Button>
  );
};
