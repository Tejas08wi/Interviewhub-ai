import { Outlet } from "react-router-dom";
import RecruiterSidebar from "../components/sidebar/RecruiterSidebar";
import RecruiterNavbar from "../components/navbar/RecruiterNavbar";

function RecruiterLayout() {
  return (
    // h-screen + overflow-hidden pins the main container to the exact viewport size
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
      
      {/* Fixed Sidebar */}
      <RecruiterSidebar />

      {/* Main Content Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Navbar */}
        <RecruiterNavbar />

        {/* Scrollable Recruiter Page Container */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
}

export default RecruiterLayout;