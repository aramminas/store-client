import { useLocation } from "react-router-dom";
import { SitebarHeader } from "./sidebar-header";
import { SitebarNavItem } from "./sitebar-nav-item";
import { AccountUserInfo } from "./account-user-info";
import { dashboardRoutes } from "@/store-client/src/constants/dashboard-routes";
import "./styles.scss";

export const DashboardSitebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <SitebarHeader />
      <ul className="sidebar-list">
        {dashboardRoutes.map((route) => (
          <SitebarNavItem
            key={route.key}
            item={route}
            isActive={location.pathname === route.path}
          />
        ))}
      </ul>
      <AccountUserInfo />
    </div>
  );
};
