import { Link, useRouter } from "@tanstack/react-router";
import { Button } from "../button";
import { ProfileCard } from "./profilecard";
import Themetoggle from "./themetoggle.tsx";
import { useUser } from "@/store/userStore.ts";

const Navbar = () => {
  const { navigate } = useRouter();
  const user = useUser((state) => state.user);

  return (
    <div className="w-full h-16 flex justify-between items-center px-4 border rounded-md">
      <Link to="/" className="text-2xl font-bold font-edu">
        Flex
      </Link>
      <div className="flex flex-row justify-center items-center gap-4">
        {user ? (
          <ProfileCard />
        ) : (
          <Button
            variant={"outline"}
            onClick={() => {
              navigate({ href: "/auth/login" });
            }}
          >
            Login
          </Button>
        )}

        <Themetoggle />
      </div>
    </div>
  );
};

export default Navbar;
