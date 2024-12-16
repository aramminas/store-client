import { FC } from "react";
import { Link } from "react-router-dom";
import { DashboardRouteT } from "@/store-client/src/types";

type SitebarNavItemProps = {
  item: DashboardRouteT;
  isActive: boolean;
};

export const SitebarNavItem: FC<SitebarNavItemProps> = ({ item, isActive }) => {
  return (
    <li className={`sidebar-list-item ${isActive && "active"}`}>
      <Link to={item.path}>
        {item.icon}
        <span>{item.name}</span>
      </Link>
    </li>
  );
};
