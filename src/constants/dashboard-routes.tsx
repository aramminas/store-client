import { FaHome } from "react-icons/fa";
import { FaClipboardUser } from "react-icons/fa6";

import { DashboardRouteT } from "../types";
const iconSize = "22px";

export const dashboardRoutes: DashboardRouteT[] = [
  {
    key: 1,
    name: "Home",
    path: "/",
    icon: <FaHome size={iconSize} />,
  },
  {
    key: 2,
    name: "My Profile",
    path: "/my-profile",
    icon: <FaClipboardUser size={iconSize} />,
  },
];
