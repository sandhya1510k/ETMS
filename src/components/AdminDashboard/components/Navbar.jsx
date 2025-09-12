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

  const clearNotifications = () => setNotifications([]);

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
            onClick={() => navigate("/admin/notification")} // navigate when clicked
            className="relative p-2 rounded-md hover:bg-gray-100 transition"
          >
            <FiBell className="text-xl text-gray-600" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {notifications.length}
              </span>
            )}
          </button>

          {/* Hover Dropdown Preview */}
          {showNotifications && notifications.length > 0 && (
            <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-md shadow-lg z-40">
              <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200">
                <span className="text-sm font-medium text-gray-700">Notifications</span>
                <button
                  onClick={clearNotifications}
                  className="text-xs text-blue-600 hover:underline"
                >
                  Clear All
                </button>
              </div>
              <div className="max-h-60 overflow-y-auto">
                {notifications.map((note) => (
                  <div key={note.id} className="px-4 py-2 hover:bg-gray-50">
                    <p className="text-sm text-gray-800">{note.text}</p>
                    <span className="text-xs text-gray-500">{note.time}</span>
                  </div>
                ))}
              </div>
              {/* <div
                className="text-center text-sm text-blue-600 py-2 border-t border-gray-200 hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate("/admin/notification")}
              >
                View All
              </div> */}
            </div>
          )}
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
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-40">
              <div className="p-4">
                <p className="text-gray-800 font-medium">Admin User</p>
                <p className="text-gray-500 text-sm">admin@etms.com</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
