import { LayoutDashboard, Users } from "lucide-react";

interface LinkData {
    title: string;
    label: string;
    icon: any; // Change 'any' to the appropriate type of your icon component
    variant: "default" | "ghost"; // Specify that variant should be one of these two strings
    route: string;
  }
  // Define linksData array
  export const commAdminLinksData:LinkData[] = [
    {
      title: "Dashboard",
      label: "",
      icon: LayoutDashboard,
      variant: "default",
      route: "/api/comm-admin",
    },
    {
      title: "Users",
      label: "",
      icon: Users,
      variant: "ghost", 
      route: "/api/comm-admin/users",
    }
  ];