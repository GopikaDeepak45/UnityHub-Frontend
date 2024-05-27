import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import useAuth from "@/hooks/useAuth";

const MainNav = () => {
   
  //select type of user using useAuth custom 
  const { username } = useAuth()
  return (
    <div className=" w-full flex justify-between items-center ">
      <div className="flex gap-10">
        <a href="" className="font-bold">
          Home
        </a>
        <a href="#about" className="font-bold">
          About
        </a>
        <a href="#footer" className="font-bold">
          Contact Us
        </a>
      </div>

      <div className="flex gap-3 items-center">
{username?(<h2>{username}</h2>):(<>
  <HoverCard>
          <HoverCardTrigger
            className={`${buttonVariants({
              variant: "outline",
            })} ${buttonVariants({ variant: "bg1" })}`}
            style={{ fontWeight: "bold",cursor:"pointer" }}
          >
            Log in
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="flex justify-between">
              <Link
                to="/api/comm-admin/login" 
                className={`${buttonVariants({
                  variant: "outline",
                })} ${buttonVariants({ variant: "bg1" })}`}
                style={{ fontWeight: "bold" }}
              >
                Business
              </Link>
              <Link
                to="/"
                className={`${buttonVariants({
                  variant: "outline",
                })} ${buttonVariants({ variant: "bg1" })}`}
                style={{ fontWeight: "bold" }}
              >
                User
              </Link>
            </div>
          </HoverCardContent>
        </HoverCard>

        <HoverCard>
          <HoverCardTrigger
            className={`${buttonVariants({
              variant: "outline",
            })} ${buttonVariants({ variant: "bg1" })}`}
            style={{ fontWeight: "bold",cursor:"pointer" }}
          >
                        Sign Up
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="flex justify-between">
              <Link
                to="/api/comm-admin/register" 
                className={`${buttonVariants({
                  variant: "outline",
                })} ${buttonVariants({ variant: "bg1" })}`}
                style={{ fontWeight: "bold" }}
              >
                Business
              </Link>
              <Link
                to="/"
                className={`${buttonVariants({
                  variant: "outline",
                })} ${buttonVariants({ variant: "bg1" })}`}
                style={{ fontWeight: "bold" }}
              >
                User
              </Link>
            </div>
          </HoverCardContent>
        </HoverCard></>)}
        
        
      </div>
    </div>
  );
};

export default MainNav;
