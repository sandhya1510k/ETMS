import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome, FaTasks, FaUserCheck, FaClipboardList,
  FaCalendarAlt, FaComments, FaCog, FaUser,
  FaChevronLeft, FaChevronRight, FaBell, FaSignOutAlt
} from "react-icons/fa";

export default function Sidebar({ isOpen, setIsOpen }) {
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  // Function to update unread count from localStorage
  const updateUnreadCount = () => {
    const storedCount = localStorage.getItem("unreadNotifications");
    if (storedCount) {
      setUnreadCount(parseInt(storedCount));
    } else {
      // Initialize with 2 unread notifications if not set
      localStorage.setItem("unreadNotifications", "2");
      setUnreadCount(2);
    }
  };

  // Listen for storage events to sync across tabs
  useEffect(() => {
    updateUnreadCount();
    
    const handleStorageChange = (e) => {
      if (e.key === "unreadNotifications") {
        setUnreadCount(parseInt(e.newValue) || 0);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events from the same tab
    const handleUnreadCountChange = () => {
      updateUnreadCount();
    };
    
    window.addEventListener('unreadCountChanged', handleUnreadCountChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('unreadCountChanged', handleUnreadCountChange);
    };
  }, []);

  const links = [
    { path: "dashboard", label: "Dashboard", icon: <FaHome /> },
    { path: "tasks", label: "Tasks", icon: <FaTasks /> },
    { path: "attendance", label: "Attendance", icon: <FaUserCheck /> },
    { path: "Assessments ", label: "Assessments ", icon: <FaClipboardList /> },
    { path: "meetings", label: "Meetings", icon: <FaCalendarAlt /> },
    { path: "chat", label: "Chat", icon: <FaComments /> },
    { path: "notifications", label: "Notifications", icon: <FaBell /> },
    { path: "profile", label: "Profile", icon: <FaUser /> },
    { path: "settings", label: "Settings", icon: <FaCog /> },
  ];

  const handleLogout = () => {
    // Clear any stored user data
    localStorage.removeItem("traineeName");
    localStorage.removeItem("traineeId");
    localStorage.removeItem("traineeEmail");
    localStorage.removeItem("unreadNotifications");
    
    // Redirect to login page
    navigate("/");
  };

  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-gradient-to-b from-teal-600 to-indigo-500 text-white h-screen fixed flex flex-col transition-all duration-300 z-50`}
    >
      {/* Toggle Button */}
      <div className="p-4 border-t border-teal-700 flex justify-end">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md bg-teal-700 hover:bg-indigo-600"
        >
          {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </button>
      </div>

      {/* Logo / Title */}
      <div className="mb-10 text-center py-4">
        {isOpen ? (
          <>
            <h2 className="text-3xl font-extrabold tracking-wide text-white">TMS</h2>
            <p className="text-white text-sm">Employee Panel</p>
          </>
        ) : (
          <h2 className="text-xl font-extrabold tracking-wide text-white">TMS</h2>
        )}
      </div>

      {/* Links */}
      <nav className="flex-1 space-y-2 px-2">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end
            className={({ isActive }) =>
              `flex items-center justify-between px-4 py-2 rounded-md transition-all duration-200 ${
                isActive
                  ? "bg-teal-500 text-white shadow-md"
                  : "hover:bg-gray-700 hover:text-teal-400 text-gray-300"
              }`
            }
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">{link.icon}</span>
              {isOpen && <span className="font-medium">{link.label}</span>}
            </div>

            {/* Show notification badge */}
            {link.path === "notifications" && unreadCount > 0 && (
              <span className="bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Logout Button at the bottom */}
      <div className="mt-auto p-4 border-t border-teal-700">
        <button
          onClick={handleLogout}
          className={`flex items-center w-full px-4 py-2 rounded-md transition-all duration-200 hover:bg-gray-700 hover:text-teal-400 text-gray-300 ${
            isOpen ? "justify-start gap-3" : "justify-center"
          }`}
        >
          <span className="text-lg"><FaSignOutAlt /></span>
          {isOpen && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
}