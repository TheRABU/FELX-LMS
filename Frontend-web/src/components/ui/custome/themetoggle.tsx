import { useTheme } from "@/hooks/useTheme";
import { SunIcon, MoonIcon } from "lucide-react";
import { Button } from "../button";

const Themetoggle = () => {
  const { theme, setTheme } = useTheme();

  const handleToogleButton = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button variant={"outline"} size={"icon"} onClick={handleToogleButton}>
      {theme === "light" ? (
        <MoonIcon className="cursor-pointer" />
      ) : (
        <SunIcon className="cursor-pointer" />
      )}
    </Button>
  );
};

export default Themetoggle;
