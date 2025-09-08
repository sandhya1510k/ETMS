
import { useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import {

  LayoutDashboard,
  User,
  CheckSquare,
  Users,
  Bell,
  CalendarCheck,
  MessageSquare,
  FileCheck,
  VideoIcon,
} from "lucide-react";
import cqLogo from "../../../assets/cqimg.jpeg"; 


const navigationItems = [
  { title: "Dashboard", href: "/trainer/dashboard", icon: LayoutDashboard },
  { title: "Trainer Profile", href: "/trainer/profile", icon: User },
  { title: "Task Management", href: "/trainer/tasks", icon: CheckSquare },
  { title: "Batch Management", href: "/trainer/batches", icon: Users },
  { title: "Attendance", href: "/trainer/attendance", icon: CalendarCheck },
  { title: "Meetings", href: "/trainer/meetings", icon: VideoIcon },
  { title: "Assessments", href: "/trainer/assessments", icon: FileCheck },
  { title: "Notifications", href: "/trainer/notifications", icon: Bell },
  { title: "Chat", href: "/trainer/chat", icon: MessageSquare },
];

const TrainerSidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <aside
      className={`bg-gradient-to-b from-indigo-200 via-gray-900 to-orange-300 transition-all duration-300 ease-in-out flex flex-col relative h-screen shadow-lg ${
        isCollapsed ? "w-16 sm:w-20" : "w-64 sm:w-72"
      }`}
      role="navigation"
      aria-label="Trainer Navigation Sidebar"
      aria-expanded={!isCollapsed}
    >
      {/* Logo container with toggle */}
      <div
        className={`flex flex-col items-center mt-6 cursor-pointer ${
          isCollapsed ? "mb-1" : "mb-4"
        }`}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <img
          src={cqLogo}
          alt="Company Logo"
          className={`rounded-full border-2 border-white shadow-lg object-cover transition-all duration-300 hover:scale-105 ${
            isCollapsed ? "h-12 w-12" : "h-16 w-16"
          }`}
        />
        <h2
          className={`mt-3 text-white text-center text-lg font-semibold tracking-tight px-2 transition-all duration-300 ${
            isCollapsed
              ? "opacity-0 scale-95 w-0 overflow-hidden"
              : "opacity-100 scale-100 w-auto"
          }`}
        >
          CamelQ Software Solutions
        </h2>
      </div>

      {/* Navigation links container */}
      <nav
        className={`flex-1 overflow-y-auto px-2 ${
          isCollapsed ? "mt-1" : "mt-3"
        }`}
      >
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.href}>
                <NavLink
                  to={item.href}
                  className={`flex items-center ${
                    isCollapsed ? "justify-center" : "justify-start"
                  } gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium text-white hover:bg-black ${
                    isActive ? "bg-black shadow-sm" : ""
                  } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  title={isCollapsed ? item.title : undefined}
                  aria-current={isActive ? "page" : undefined}
                  aria-label={`Navigate to ${item.title}`}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0 text-white transition-transform duration-200 hover:scale-105" />
                  {!isCollapsed && <span className="truncate">{item.title}</span>}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default TrainerSidebar;
