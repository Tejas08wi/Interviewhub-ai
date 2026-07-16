import { Outlet } from "react-router-dom";
import CandidateSidebar from "../components/sidebar/CandidateSidebar";
import CandidateNavbar from "../components/navbar/CandidateNavbar";

function CandidateLayout() {
  return (
  // Added "dark:bg-slate-950" to the main wrapper
  <div className="flex h-screen w-screen overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
    
    {/* Fixed Sidebar */}
    <CandidateSidebar />

    {/* Main Content Area */}
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
      
      {/* Navbar */}
      <CandidateNavbar />

      {/* Scrollable Dashboard Page Container */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto w-full">
          <Outlet />
        </div>
      </main>

    </div>
  </div>
  );
}

export default CandidateLayout;