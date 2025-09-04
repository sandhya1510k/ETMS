// import React, { useState } from "react";
// import Sidebar from "./Sidebar";

// export default function Layout({ children }) {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
//       <div 
//         className="flex-1 overflow-auto p-4 transition-all duration-300"
//         style={{ marginLeft: isSidebarOpen ? '16rem' : '5rem' }}
//       >
//         {children}
//       </div>
//     </div>
//   );
// }



// src/components/TraineeDashboard/Layout.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div
        className={`flex-1 p-6 overflow-auto transition-all duration-300`}
        style={{ marginLeft: isSidebarOpen ? "16rem" : "5rem" }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
