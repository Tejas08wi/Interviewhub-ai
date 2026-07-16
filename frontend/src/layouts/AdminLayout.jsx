import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/sidebar/AdminSidebar";
import AdminNavbar from "../components/navbar/AdminNavbar";

const AdminLayout = () => {
  return (
    // h-screen + overflow-hidden pins the primary grid container directly to the viewport bounds
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
      
      {/* Fixed Administrative Sidebar */}
      <AdminSidebar />

      {/* Main Content Area Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Fixed Header Navbar */}
        <AdminNavbar />

        {/* Scrollable System Page Workspace */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto w-full animate-fade-in">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;