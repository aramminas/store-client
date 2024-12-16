import { DashboardLogo } from "@/store-client/src/assets/images/svgs/dashboard-logo";
import "./styles.scss";

export const SitebarHeader = () => {
  return (
    <div className="sidebar-header">
      <div className="app-icon">
        <DashboardLogo />
      </div>
    </div>
  );
};
