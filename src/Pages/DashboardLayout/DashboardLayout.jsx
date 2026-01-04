import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import DashboardNavbar from "./DashboardNavBar";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <DashboardNavbar />
        <div className="p-6 bg-gray-100 min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
