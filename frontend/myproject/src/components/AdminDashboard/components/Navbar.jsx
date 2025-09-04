// import React, { useState } from "react";
// import { FiSearch, FiBell, FiUser, FiLogOut, FiSettings } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";


// const Navbar = () => {
//   const [search, setSearch] = useState("");
//   const [showProfileMenu, setShowProfileMenu] = useState(false);
//   const [notifications, setNotifications] = useState(3); 
// const navigate = useNavigate();
//   const handleLogout = () => {
//     navigate("/",{ replace: true }); 
//   };

//   return (
//     <nav className="sticky top-0 z-30 w-full bg-green-50 border-b border-green-200 shadow-sm flex items-center justify-between px-6 py-3">
//       {/* Left Section - Logo */}
//       <div className="flex items-center gap-2">
//         <span className="text-xl font-bold text-green-700 whitespace-nowrap">
//           ETMS Admin Panel
//         </span>
//       </div>

//       {/* Right Section */}
//       <div className="flex items-center gap-4">
//         {/* Search Bar */}
//         <div className="relative hidden sm:block">
//           <input
//             type="text"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="Search..."
//             className="pl-10 pr-10 py-1 rounded-md border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-200 bg-green-50"
//           />
//           <FiSearch className="absolute left-2 top-2 text-gray-400" />
//           {search && (
//             <button
//               onClick={() => setSearch("")}
//               className="absolute right-2 top-2 text-gray-400 hover:text-red-500"
//             >
//               ✕
//             </button>
//           )}
//         </div>

//         {/* Notification Bell */}
//         <div className="relative cursor-pointer">
//           <FiBell className="text-xl text-gray-500 hover:text-green-600" />
//           {notifications > 0 && (
//             <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
//               {notifications}
//             </span>
//           )}
//         </div>

//         {/* Profile Menu */}
//         <div className="relative">
//           <button
//             onClick={() => setShowProfileMenu((prev) => !prev)}
//             className="flex items-center gap-2 px-2 py-1 rounded-md bg-green-100 hover:bg-green-50 border border-green-200"
//           >
//             <FiUser className="text-lg text-green-700" />
//             <span className="hidden md:inline text-gray-700">Admin</span>
//           </button>

//           {/* Dropdown Menu */}
//           {showProfileMenu && (
//             <div className="absolute right-0 mt-2 w-40 bg-white border border-green-200 rounded-md shadow-lg">
//               <button
//                 onClick={() => alert("Profile Clicked")}
//                 className="flex items-center gap-2 px-4 py-2 w-full text-left text-gray-700 hover:bg-green-100"
//               >
//                 <FiUser /> Profile
//               </button>
//               <button
//                 onClick={() => alert("Settings Clicked")}
//                 className="flex items-center gap-2 px-4 py-2 w-full text-left text-gray-700 hover:bg-green-100"
//               >
//                 <FiSettings /> Settings
//               </button>
//               <button
//                 onClick={handleLogout}
//                 className="flex items-center gap-2 px-4 py-2 w-full text-left text-red-600 hover:bg-red-100"
//               >
//                 <FiLogOut /> Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiBell, FiUser, FiLogOut, FiSettings } from "react-icons/fi";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/", { replace: true });
  };

  const [notifications, setNotifications] = useState([
    { id: 1, text: "Alice Brown completed 'React Basics' module", time: "5m ago" },
    { id: 2, text: "Training session 'Node.js Advanced' scheduled for tomorrow", time: "1h ago" },
    { id: 3, text: "Server downtime reported during assessment upload", time: "3h ago" },
  ]);

  const clearNotifications = () => setNotifications([]);

  return (
    <nav className="sticky top-0 z-10 w-full bg-gradient-to-br from-indigo-200 via-blue-300 to-indigo-500 border-b border-gray-200 shadow-sm flex items-center justify-between px-6 h-16">
      {/* Left Section */}
      <div className="flex items-center gap-2">
        {/* <span className="text-xl font-bold text-gray-800">ETMS Admin Panel</span> */}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden sm:block">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="pl-8 pr-3 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
          />
          <FiSearch className="absolute left-2 top-2 text-gray-500" />
        </div>

        {/* Notifications */}
        <div
          className="relative"
          onMouseEnter={() => setShowNotifications(true)}
          onMouseLeave={() => setShowNotifications(false)}
        >
          <button
            onClick={() => navigate("/notifications")}
            className="relative p-2 rounded-md hover:bg-gray-100 transition"
          >
            <FiBell className="text-xl text-gray-600" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {notifications.length}
              </span>
            )}
          </button>

          {showNotifications && notifications.length > 0 && (
            <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-md shadow-lg">
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
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
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
              <button
                onClick={() => alert("Profile Clicked")}
                className="flex items-center gap-2 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
              >
                <FiUser /> Profile
              </button>
              <button
                onClick={() => alert("Settings Clicked")}
                className="flex items-center gap-2 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
              >
                <FiSettings /> Settings
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-4 py-2 text-left text-red-600 hover:bg-red-100"
              >
                <FiLogOut /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
