
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, LogOut } from "lucide-react";

// Utility for combining Tailwind classes
const cn = (...classes) => classes.filter(Boolean).join(" ");

const TrainerNavbar = ({ trainerName, trainerImage }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Generate initials from trainer name for avatar
  const initials = trainerName
    ? trainerName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "";

  return (
    <nav className="bg-gradient-to-r from-indigo-200 via-gray-900 to-orange-300 shadow-sm">
      <div className="flex flex-col sm:flex-row items-center justify-start px-10 sm:px-6 py-4 max-w-7xl mx-auto">
  {/* Control Panel Title */}
  <div className="flex-1 text-center sm:text-left">
    <h1 className="text-xl sm:text-2xl font-bold text-amber-950 tracking-tight">
      ETMS Trainer Panel
    </h1>
  </div>

        {/* Trainer Profile */}
        <div className="relative flex items-center gap-3 mt-3 sm:mt-0">
          <button
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            aria-label={`Toggle profile menu for ${trainerName}`}
            aria-haspopup="true"
            aria-expanded={isDropdownOpen}
          >
            <div
              className="h-10 w-10 rounded-full border-2 border-emerald-300 overflow-hidden flex items-center justify-center bg-emerald-100 text-emerald-800 font-semibold text-sm select-none shadow-sm transition-transform duration-200 group-hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              title={trainerName}
            >
              {trainerImage ? (
                <img
                  src="/src/assets/pflimg.webp"
                  alt={trainerName}
                  className="h-full w-full object-cover"
                />
              ) : (
                initials
              )}
            </div>
            <div className="hidden sm:block leading-tight">
              <p className="text-sm font-semibold text-amber-800">{trainerName}</p>
              <p className="text-xs text-emerald-700">Senior Trainer</p>
            </div>
          </button>

          {/* Profile Dropdown */}
          {isDropdownOpen && (
            <div className="absolute top-12 right-0 w-48 bg-stone-100 border border-stone-200 rounded-lg shadow-xl py-2 z-20">
              <button
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-amber-800 hover:bg-emerald-50 transition-colors"
                onClick={() => {
                  navigate("/profile");
                  setIsDropdownOpen(false);
                }}
                aria-label="View trainer profile"
              >
                <User className="h-4 w-4 text-emerald-200" />
                View Profile
              </button>
              <button
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-amber-800 hover:bg-emerald-50 transition-colors"
                onClick={() => {
                  // TODO: Implement logout functionality (e.g., POST /api/logout)
                  navigate("/");
                  setIsDropdownOpen(false);
                }}
                aria-label="Logout"
              >
                <LogOut className="h-4 w-4 text-emerald-200" />
                LogOut
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default TrainerNavbar;
