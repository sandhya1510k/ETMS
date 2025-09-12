import React from "react";
import {
  FiMenu,
  FiHome,
  FiUsers,
  FiLayers,
  FiUserCheck,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";

const menuItems = [
  { label: "Dashboard", icon: <FiHome />, path: "dashboard" },
  { label: "Trainer Management", icon: <FiUserCheck />, path: "employees" },
  { label: "Trainees Management", icon: <FiUsers />, path: "trainees" },
  { label: "Batch Management", icon: <FiLayers />, path: "batches" },
  { label: "Employees Management", icon: <FiUsers />, path: "add-employee" },
];

const Sidebar = ({ collapsed, setCollapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // 🔑 Clear auth (if using JWT/localStorage)
    localStorage.removeItem("token"); 
    navigate("/"); // redirect to login page
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-screen z-50
        bg-gradient-to-br from-indigo-200 via-blue-300 to-indigo-500 
        border-r border-white text-white shadow-md
        transition-all duration-300
        ${collapsed ? "w-20" : "w-64"}
        flex flex-col overflow-hidden`}
    >
      {/* Header */}
      <div
        className={`flex items-center px-3 py-6 relative ${
          collapsed ? "justify-center" : "justify-between"
        }`}
      >
        {!collapsed && (
          <span className="text-lg text-black font-bold">ETMS Admin</span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-black hover:text-black"
        >
          <FiMenu />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-2 my-1 rounded-md transition-colors duration-200 ${
              location.pathname.endsWith(item.path)
                ? "bg-white text-black"
                : "text-black hover:bg-white hover:text-black"
            }`}
          >
            <span className="text-2xl">{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Settings + Logout */}
      <div className="border-t border-white/50 py-4">
        {/* Settings */}
        <Link
          to="settings"
          className={`flex items-center gap-3 px-4 py-2 my-1 rounded-md transition-colors duration-200 ${
            location.pathname.endsWith("settings")
              ? "bg-white text-black"
              : "text-black hover:bg-white hover:text-black"
          }`}
        >
          <span className="text-2xl">
            <FiSettings />
          </span>
          {!collapsed && <span>Settings</span>}
        </Link>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2 my-1 w-full rounded-md transition-colors duration-200 text-black hover:bg-white hover:text-black"
        >
          <span className="text-2xl">
            <FiLogOut />
          </span>
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
