import { useState } from "react";
import { Outlet } from "react-router-dom";
import TrainerNavbar from "../components/TrainerNavbar";
import TrainerSidebar from "../components/trainersidebar";

const TrainerLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Full height */}
      <TrainerSidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={toggleSidebar}
        className="h-full"
      />

      {/* Main Section */}
      <div className="flex flex-col flex-1">
        {/* Navbar - only spans the content area */}
        <TrainerNavbar
          onToggleSidebar={toggleSidebar}
          trainerName="Sumanth reddy"
          trainerImage="/placeholder-trainer.jpg"
        />

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default TrainerLayout;

