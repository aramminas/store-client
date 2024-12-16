import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../store";
import { useAuth } from "../../hooks/useAuth";
import { DashboardSitebar } from "../pages/dashboard/dashboard-sidebar";

export const Layout = () => {
  const refetchUserData = useAuth();
  const user = useAppSelector((state) => state.user.data);

  useEffect(() => {
    if (!user) {
      refetchUserData();
    }
  }, [user, refetchUserData]);

  return (
    <div>
      <main>
        <div className="dashboard-container">
          <DashboardSitebar />
          <div className="app-content">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};
