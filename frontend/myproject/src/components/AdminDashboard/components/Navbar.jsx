import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiBell, FiUser } from "react-icons/fi";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([
    { id: 1, text: "Rani completed 'React Basics' module", time: "5m ago" },
    { id: 2, text: "Training session 'Node.js Advanced' scheduled", time: "1h ago" },
    { id: 3, text: "Server downtime reported", time: "3h ago" },
  ]);

  // const clearNotifications = () => setNotifications([]);

  return (
    <nav className="sticky top-0 z-30 w-full bg-gradient-to-br from-indigo-200 via-blue-300 to-indigo-500 border-b border-gray-200 shadow-sm flex items-center justify-between px-6 h-16">
      {/* Left Section */}
      <div className="flex items-center gap-2"></div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden sm:block">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="pl-8 pr-3 py-1 rounded-md border bg-white border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
          />
          <FiSearch className="absolute right-2 top-2 text-gray-500 cursor-pointer" />
        </div>

        {/* Notifications */}
        <div
          className="relative"
          onMouseEnter={() => setShowNotifications(true)}
          onMouseLeave={() => setShowNotifications(false)}
        >
          <button
            onClick={() => navigate("/admin/notification")}
            className="relative p-2 rounded-md hover:bg-gray-100 transition"
          >
            <FiBell className="text-xl text-gray-600" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {notifications.length}
              </span>
            )}
          </button>
        </div>

        {/* Profile */}
        <div
          className="relative"
          onMouseEnter={() => setShowProfileMenu(true)}
          onMouseLeave={() => setShowProfileMenu(false)}
        >
          <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
              <FiUser />
            </div>
            <span className="hidden md:inline text-gray-700 font-medium">Admin</span>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg">
              <div className="p-4 border-b">
                <p className="text-gray-800 font-medium">Admin User</p>
                <p className="text-gray-500 text-sm">admin@etms.com</p>
              </div>
              <button
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 transition"
                onClick={() => {
                  setShowProfileMenu(false);
                  navigate("/");
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
