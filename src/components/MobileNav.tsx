import {
  Sheet,
  SheetContent,
  // SheetDescription,
  SheetHeader,
  // SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          {/* <SheetTitle>Are you absolutely sure?</SheetTitle> */}
          {/* <SheetDescription className="flex">
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </SheetDescription> */}
        </SheetHeader>
        <div className="flex flex-col gap-4">
          <a href="">Home</a>
          <a href="">About Us </a>
          <a href="">Contact </a>
          <a href=""></a>
        </div>
        <Button variant="outline">Login</Button>
        <Button variant="outline">SignUp</Button>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
