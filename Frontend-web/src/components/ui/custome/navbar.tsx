import { Link, useRouter } from "@tanstack/react-router";
import { Button } from "../button";
import { ProfileCard } from "./profilecard";
import Themetoggle from "./themetoggle.tsx";

const Navbar = () => {
  const { navigate } = useRouter();

  return (
    <div className="w-full h-16 flex justify-between items-center px-4  border rounded-md">
      <Link to="/" className="text-2xl font-bold font-edu">
        Flex
      </Link>
      <div className="flex flex-row justify-center items-center gap-4">
        <ProfileCard />
        <Button
          variant={"outline"}
          onClick={() => {
            navigate({ href: "/auth/login" });
          }}
        >
          Login
        </Button>
        <Themetoggle />
      </div>
    </div>
  );
};

export default Navbar;
