import { useState } from "react";
import {
  ClipboardList,
  Users,
  CheckSquare,
  Calendar,
  Bell,
  Eye,
  EyeOff,
  Search
} from "lucide-react";

const Notifications = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterReadStatus, setFilterReadStatus] = useState("all");

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Task Assigned",
      message: "Create TypeScript practice problems for batch #27.",
      category: "tasks",
      timestamp: "2025-08-20T09:00:00Z",
      isRead: false,
    },
    {
      id: 2,
      title: "Batch #30 Query",
      message: "Students are confused about the Redux toolkit implementation.",
      category: "batches",
      timestamp: "2025-08-19T15:30:00Z",
      isRead: false,
    },
    {
      id: 3,
      title: "Assessment Uploaded",
      message: "Frontend Project Evaluation for Batch #25 is now live.",
      category: "assessments",
      timestamp: "2025-08-18T18:00:00Z",
      isRead: true,
    },
    {
      id: 4,
      title: "Meeting Reminder",
      message: "Weekly trainer sync at 10:00 AM tomorrow (Zoom link inside).",
      category: "meetings",
      timestamp: "2025-08-20T14:45:00Z",
      isRead: true,
    },
    {
      id: 5,
      title: "Daily Task",
      message: "Review 3 React assignments from yesterday’s submissions.",
      category: "tasks",
      timestamp: "2025-08-21T08:15:00Z",
      isRead: false,
    },
    {
      id: 6,
      title: "Assessment Deadline Approaching",
      message: "JavaScript Quiz #3 deadline ends today at 6 PM.",
      category: "assessments",
      timestamp: "2025-08-21T07:00:00Z",
      isRead: false,
    },
  ]);

  const toggleRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: !n.isRead } : n))
    );
  };

  const filteredNotifications = notifications
    .filter(
      (n) =>
        (filterCategory === "all" || n.category === filterCategory) &&
        (filterReadStatus === "all" ||
          (filterReadStatus === "read" && n.isRead) ||
          (filterReadStatus === "unread" && !n.isRead)) &&
        (n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          n.message.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  const counts = {
    all: notifications.length,
    tasks: notifications.filter((n) => n.category === "tasks").length,
    batches: notifications.filter((n) => n.category === "batches").length,
    assessments: notifications.filter((n) => n.category === "assessments").length,
    meetings: notifications.filter((n) => n.category === "meetings").length,
    unread: notifications.filter((n) => !n.isRead).length,
  };

  const categoryColors = {
    tasks: "bg-blue-500",
    batches: "bg-purple-500",
    assessments: "bg-green-500",
    meetings: "bg-orange-500",
    all: "bg-gray-500",
  };

  const getIcon = (category) => {
    switch (category) {
      case "tasks":
        return <ClipboardList className="h-5 w-5 text-blue-500" />;
      case "batches":
        return <Users className="h-5 w-5 text-purple-500" />;
      case "assessments":
        return <CheckSquare className="h-5 w-5 text-green-500" />;
      case "meetings":
        return <Calendar className="h-5 w-5 text-orange-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const formatTimestamp = (ts) => {
    const d = new Date(ts);
    return d.toLocaleDateString() + " " + d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Notifications</h1>
        <div className="relative w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Category Badges */}
      <div className="flex gap-2 flex-wrap mb-6">
        {["all", "tasks", "batches", "assessments", "meetings", "unread"].map((cat) => (
          <button
            key={cat}
            onClick={() => {
              if (cat === "unread") {
                setFilterReadStatus("unread");
                setFilterCategory("all");
              } else {
                setFilterCategory(cat === "all" ? "all" : cat);
                setFilterReadStatus("all");
              }
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition
              ${filterCategory === cat || (cat === "unread" && filterReadStatus === "unread")
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                cat === "unread" ? "bg-red-500" : categoryColors[cat] || "bg-gray-400"
              }`}
            />
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
            <span className="ml-1 bg-white text-gray-700 rounded-full px-2 py-0.5 text-xs font-semibold">
              {cat === "unread" ? counts.unread : counts[cat] || 0}
            </span>
          </button>
        ))}
      </div>

      {/* Notification List */}
      <ul className="divide-y divide-gray-200 bg-white rounded-lg shadow-sm">
        {filteredNotifications.length === 0 && (
          <li className="py-10 text-center text-gray-500 italic">No notifications found.</li>
        )}

        {filteredNotifications.map((n) => (
          <li
            key={n.id}
            className={`flex items-center justify-between px-4 py-4 transition-all ${
              !n.isRead ? "bg-blue-50 border-l-4 border-blue-600" : ""
            }`}
            onClick={() => toggleRead(n.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                toggleRead(n.id);
                e.preventDefault();
              }
            }}
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="flex-shrink-0">{getIcon(n.category)}</div>
              <div className="min-w-0">
                <p className="font-medium text-gray-900 truncate">{n.title}</p>
                <p className="text-sm text-gray-600 truncate">{n.message}</p>
              </div>
            </div>
            <div className="text-right ml-4 flex flex-col items-end">
              <time className="text-xs text-gray-500">{formatTimestamp(n.timestamp)}</time>
              <button
                className="mt-1 text-gray-400 hover:text-gray-700 focus:outline-none"
                aria-label={n.isRead ? "Mark as unread" : "Mark as read"}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleRead(n.id);
                }}
              >
                {n.isRead ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
