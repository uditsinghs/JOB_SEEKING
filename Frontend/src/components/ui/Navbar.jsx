import { Link } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Button } from "./button";
import { LogOut, User } from "lucide-react";

const Navbar = () => {
  const user = false;
  return (
    <div className="mt-4">
      <div className="mx-auto max-w-7xl flex justify-between items-center gap-2">
        <div className="flex justify-between items-center font-medium gap-5">
          <h1 className="text-bold text-2xl font-bold">
            Job{" "}
            <span className="text-2xl text-[#F30008] font-bold">Portal</span>
          </h1>
        </div>
        <div className="">
          <ul className="flex items-center gap-5 font-medium">
            <li>
              <Link>Home</Link>
            </li>
            <li>
              <Link>Jobs</Link>
            </li>
            <li>
              <Link>Browse</Link>
            </li>
            {user ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-64">
                  <div className="flex gap-4 items-center">
                    <Avatar className="cursor-pointer">
                      <AvatarImage />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <h4 className="font-medium ">Udit singh</h4>
                  </div>
                  <div className="flex flex-col gap-2 items-start">
                    <Button variant="link">
                      <User />
                      View Profile
                    </Button>
                    <Button variant="link">
                      <LogOut />
                      Logout
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <div className="flex gap-5">
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button>Signup</Button>
                </Link>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
