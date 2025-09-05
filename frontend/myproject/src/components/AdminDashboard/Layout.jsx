// import React from "react";
// import Navbar from "./components/Navbar";
// import Sidebar from "./components/Sidebar";
// import { Outlet } from "react-router-dom";

// const Layout = () => {
//   return (
//     <div className="flex flex-col h-screen">
//       <Navbar />
//       <div className="flex flex-1 overflow-hidden">
//         <Sidebar />
//         <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
//           <Outlet /> {/* Renders nested route content */}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Layout;


// import React from "react";
// import Navbar from "./components/Navbar";
// import Sidebar from "./components/Sidebar";
// import { Outlet } from "react-router-dom";

// const Layout = () => {
//   return (
//     <div className="flex h-screen">
//       {/* Sidebar - fixed */}
//       <div className="w-64 fixed top-0 left-0 h-screen bg-white border-r border-gray-200 z-40">
//         <Sidebar />
//       </div>

//       {/* Main Content Area (with margin to accommodate sidebar) */}
//       <div className="flex-1 ml-64 flex flex-col">
//         <Navbar /> {/* Navbar at top of main content */}
//         <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Layout;

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false); // shared state ✅

  return (
    <div className="relative h-screen overflow-hidden flex">
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main Content */}
      <div
        className={`flex flex-col transition-all duration-300 w-full ${
          collapsed ? "ml-20" : "ml-64"
        }`}
      >
        <Navbar />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
