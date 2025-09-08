import {
  Calendar,
  CheckCircle,
  Users,
  TrendingUp,
  Bell,
  MessageSquare,
  Clock,
  AlertCircle,
} from "lucide-react";
import DashboardWidget from "./dashboardwidget";

const Dashboard = () => {
  const notifications = [
    {
      id: 1,
      title: "New batch assignment",
      message: "You've been assigned to Web Development Batch #23",
      time: "2 hours ago",
      type: "info",
    },
    {
      id: 2,
      title: "Task deadline approaching",
      message: "React fundamentals quiz due tomorrow",
      time: "4 hours ago",
      type: "warning",
    },
    {
      id: 3,
      title: "Student submitted project",
      message: "John Doe submitted final portfolio project",
      time: "6 hours ago",
      type: "success",
    },
  ];

  const studentQueries = [
    {
      id: 1,
      student: "Sarah Wilson",
      query: "Need help with React hooks implementation",
      time: "30 min ago",
      priority: "high",
    },
    {
      id: 2,
      student: "Mike Johnson",
      query: "Clarification on JavaScript async/await",
      time: "1 hour ago",
      priority: "medium",
    },
    {
      id: 3,
      student: "Emily Chen",
      query: "CSS Grid layout best practices",
      time: "2 hours ago",
      priority: "low",
    },
  ];

  const getBadgeColor = (priority) => {
    if (priority === "high") return "bg-red-100 text-red-600";
    if (priority === "medium") return "bg-yellow-100 text-yellow-700";
    return "bg-gray-100 text-gray-700";
  };

  const getNotificationIcon = (type) => {
    if (type === "warning") return <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />;
    if (type === "success") return <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />;
    return <Bell className="h-4 w-4 text-blue-600 mt-0.5" />;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Dashboard Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Welcome back! Here's your training overview for today.
        </p>
      </div>

      {/* Widgets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardWidget
          title="Today's Sessions"
          value="3"
          subtitle="2 completed, 1 upcoming"
          icon={Calendar}
          trend={{ value: 15, label: "from last week" }}
        />
        <DashboardWidget
          title="Tasks Overview"
          value="12"
          subtitle="8 completed, 4 pending"
          icon={CheckCircle}
          trend={{ value: -5, label: "from last week" }}
        />
        <DashboardWidget
          title="Active Batches"
          value="5"
          subtitle="142 total students"
          icon={Users}
          trend={{ value: 8, label: "from last month" }}
        />
        <DashboardWidget
          title="Performance Score"
          value="92%"
          subtitle="Student satisfaction"
          icon={TrendingUp}
          trend={{ value: 3, label: "from last month" }}
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Batches */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Upcoming Batches</h2>
          </div>
          <div className="space-y-4">
            {[
              {
                title: "Frontend Development",
                subtitle: "Batch #23 • 28 students",
                time: "Today 2:00 PM",
                tag: "React Basics",
              },
              {
                title: "Backend Development",
                subtitle: "Batch #15 • 24 students",
                time: "Tomorrow 10:00 AM",
                tag: "Node.js",
              },
              {
                title: "Full Stack Project",
                subtitle: "Batch #31 • 20 students",
                time: "Tomorrow 4:00 PM",
                tag: "Portfolio Review",
              },
            ].map((batch, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-100 rounded-md"
              >
                <div>
                  <p className="font-medium">{batch.title}</p>
                  <p className="text-sm text-gray-500">{batch.subtitle}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{batch.time}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded bg-blue-100 text-blue-700">
                    {batch.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Notifications</h2>
          </div>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-start gap-3 p-3 bg-gray-100 rounded-md"
              >
                {getNotificationIcon(notification.type)}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{notification.title}</p>
                  <p className="text-xs text-gray-500">{notification.message}</p>
                  <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {notification.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Student Queries */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Recent Student Queries</h2>
        </div>
        <div className="space-y-3">
          {studentQueries.map((query) => (
            <div
              key={query.id}
              className="flex items-center justify-between p-3 bg-gray-100 rounded-md"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium">{query.student}</p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded ${getBadgeColor(
                      query.priority
                    )}`}
                  >
                    {query.priority}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{query.query}</p>
              </div>
              <div className="text-right text-xs text-gray-400">{query.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
 export default Dashboard