import React from "react";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeToggle = ({ darkMode, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-2 px-2 py-1 rounded-md bg-green-100 hover:bg-green-50 border border-green-200"
    >
      {darkMode ? <FiMoon className="text-lg text-green-700" /> : <FiSun className="text-lg text-yellow-500" />}
      <span className="hidden md:inline text-gray-700">{darkMode ? "Dark" : "Light"} Mode</span>
    </button>
  );
};

export default ThemeToggle;
