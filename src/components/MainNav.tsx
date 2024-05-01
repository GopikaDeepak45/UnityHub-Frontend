import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";

const MainNav = () => {
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
        <Link
          to="/"
          className={
            buttonVariants({ variant: "outline" }) +
            " " +
            buttonVariants({ variant: "bg1" })
          }
          style={{ fontWeight: "bold" }}
        >
          Login
        </Link>
        <Link
          to="/"
          className={`${buttonVariants({
            variant: "outline",
          })} ${buttonVariants({ variant: "bg1" })}`}
          style={{ fontWeight: "bold" }}
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default MainNav;
