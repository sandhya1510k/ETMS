import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area, XAxis, YAxis
} from "recharts";
import {
  FaTasks, FaUserCheck, FaCalendarAlt, FaClipboardList,
  FaBell, FaClock, FaCheckCircle, FaUser,
  FaChevronDown, FaChevronUp, FaRegCalendar,
  FaLaptopCode, FaProjectDiagram
} from "react-icons/fa";
import { FiActivity, FiTrendingUp } from "react-icons/fi";

export default function TraineeDashboard({ isSidebarOpen }) {
  const [traineeName, setTraineeName] = useState("Trainee");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeView, setActiveView] = useState("overview"); // overview, tasks, meetings

  const notifications = [];
  
  // Updated meetings data to match the meetings page structure
  const meetings = [
    {
      id: 1,
      title: "Django Fundamentals Training",
      type: "training",
      date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      time: "10:00",
      status: "upcoming"
    },
    {
      id: 2,
      title: "React Advanced Workshop",
      type: "training",
      date: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0],
      time: "14:00",
      status: "upcoming"
    },
    {
      id: 3,
      title: "Project Kickoff Meeting",
      type: "video",
      date: new Date().toISOString().split('T')[0],
      time: "11:00",
      status: "upcoming"
    }
  ];

  // Updated tasks data to match the tasks page structure
  const tasks = [
    {
      id: 1,
      title: "HTML - Create Portfolio Page",
      description: "Build a personal portfolio page with sections for About, Skills, and Contact.",
      status: "Pending"
    },
    {
      id: 2,
      title: "HTML - Table Layout",
      description: "Design a product pricing table using HTML table elements.",
      status: "In Progress"
    },
    {
      id: 3,
      title: "CSS - Styling Forms",
      description: "Style a registration form with modern CSS techniques.",
      status: "Completed"
    },
    {
      id: 4,
      title: "JavaScript - Todo App",
      description: "Create a todo application with add, complete, and delete functionality.",
      status: "Not Started"
    }
  ];

  const taskProgress = [
    { task: "React Module", progress: 80, deadline: "Aug 15", priority: "high" },
    { task: "API Integration", progress: 60, deadline: "Aug 20", priority: "medium" },
    { task: "UI Enhancements", progress: 40, deadline: "Aug 25", priority: "low" },
    { task: "Database Design", progress: 30, deadline: "Aug 30", priority: "medium" }
  ];

  useEffect(() => {
    const name = localStorage.getItem("traineeName") || "Trainee";
    setTraineeName(name);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("traineeName");
    window.location.href = "/";
  };

  const firstName = traineeName.split(" ")[0];
  const initial = firstName.charAt(0).toUpperCase();

  // Updated color scheme - teal and indigo based
  const COLORS = ["#0d9488", "#4f46e5", "#14b8a6", "#6366f1"];
  const CARD_COLORS = ["#5eead4", "#a5b4fc", "#2dd4bf", "#818cf8"];

  const taskData = [
    { name: "Completed", value: 12 },
    { name: "Pending", value: 5 },
    { name: "In Progress", value: 3 },
    { name: "Overdue", value: 2 },
  ];

  const performanceData = [
    { week: "Week 1", performance: 70 },
    { week: "Week 2", performance: 85 },
    { week: "Week 3", performance: 65 },
    { week: "Week 4", performance: 90 },
  ];

  const metrics = [
    {
      name: "Tasks",
      value: tasks.length.toString(),
      change: "+2 from last week",
      icon: <FaTasks className="text-teal-600 text-2xl" />,
      trend: "up"
    },
    {
      name: "Attendance",
      value: "95%",
      change: "Perfect streak",
      icon: <FaUserCheck className="text-indigo-600 text-2xl" />,
      trend: "up"
    },
    {
      name: "Meetings",
      value: meetings.filter(m => m.status === "upcoming").length.toString(),
      change: `${meetings.filter(m => m.status === "upcoming").length} upcoming`,
      icon: <FaCalendarAlt className="text-teal-500 text-2xl" />,
      trend: "neutral"
    },
    {
      name: "Assignments",
      value: "5",
      change: "2 pending",
      icon: <FaClipboardList className="text-indigo-500 text-2xl" />,
      trend: "down"
    },
  ];

  const recentActivities = [
    { id: 1, action: "Completed Task", details: "UI Update", time: "2h ago", icon: <FaCheckCircle className="text-teal-500" /> },
    { id: 2, action: "Scheduled Meeting", details: "Client Review", time: "Yesterday", icon: <FaCalendarAlt className="text-indigo-500" /> },
    { id: 3, action: "Uploaded Assignment", details: "Module 4 Submission", time: "2 days ago", icon: <FaClipboardList className="text-teal-400" /> },
    { id: 4, action: "Attendance Marked", details: "Present", time: "3 days ago", icon: <FaUserCheck className="text-indigo-400" /> },
  ];

  const getMeetingIcon = (type) => {
    switch (type) {
      case "video": return <FaCalendarAlt className="text-blue-500" />;
      case "training": return <FaLaptopCode className="text-purple-500" />;
      default: return <FaCalendarAlt className="text-gray-500" />;
    }
  };

  const getStatusStyles = (status) => {
    switch(status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Not Started": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="flex justify-between items-center bg-white shadow-sm px-6 py-3 sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <h1 className="font-bold text-xl text-gray-800">Trainee Dashboard</h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-full hover:bg-gray-100 relative"
            >
              <FaBell className="text-gray-600" />
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <div className="p-3 border-b border-gray-200 bg-gray-50">
                  <h4 className="font-semibold text-gray-800">Notifications</h4>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((n, i) => (
                      <div key={i} className="p-3 border-b border-gray-100 hover:bg-gray-50">
                        <p className="text-sm text-gray-700">{n}</p>
                        <p className="text-xs text-gray-500 mt-1">Just now</p>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      No new notifications
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <div className="w-9 h-9 bg-gradient-to-r from-teal-500 to-indigo-600 text-white rounded-full flex items-center justify-center shadow">
                {initial}
              </div>
              <span className="hidden md:inline font-medium text-gray-700">{firstName}</span>
              {showProfileMenu ? (
                <FaChevronUp className="hidden md:inline text-gray-500" />
              ) : (
                <FaChevronDown className="hidden md:inline text-gray-500" />
              )}
            </button>
            {showProfileMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
              >
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <FaUser className="inline mr-2" /> Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </header>

      

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6">
        {activeView === "overview" && (
          <>
            {/* Welcome Banner */}
            <motion.div 
              className="mb-6 p-6 bg-gradient-to-r from-teal-600 to-indigo-700 rounded-xl shadow-lg text-white"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, {firstName}!</h2>
                <p className="text-teal-100 max-w-2xl">
                  Here's your daily overview. You have {tasks.length} active tasks and {meetings.filter(m => m.status === "upcoming").length} upcoming meetings.
                </p>
              </div>
            </motion.div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
              {metrics.map((metric, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition"
                  style={{ borderTop: `4px solid ${CARD_COLORS[i]}` }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-500">{metric.name}</p>
                      <p className="text-2xl font-bold mt-1 text-gray-800">{metric.value}</p>
                    </div>
                    <div className={`p-3 rounded-lg bg-opacity-20 ${metric.trend === "up" ? "bg-teal-100 text-teal-600" : metric.trend === "down" ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600"}`}>
                      {metric.icon}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    {metric.trend === "up" ? (
                      <FiTrendingUp className="text-teal-500 mr-1" />
                    ) : metric.trend === "down" ? (
                      <FiTrendingUp className="text-red-500 mr-1 transform rotate-180" />
                    ) : (
                      <FiActivity className="text-gray-500 mr-1" />
                    )}
                    <span className={metric.trend === "up" ? "text-teal-600" : metric.trend === "down" ? "text-red-600" : "text-gray-600"}>
                      {metric.change}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Tasks and Meetings Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Task Progress */}
              <motion.div 
                className="bg-white p-5 rounded-xl shadow-sm border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-gray-800 flex items-center">
                    <FaTasks className="text-teal-600 mr-2" /> Recent Tasks
                  </h3>
                  <button 
                    onClick={() => setActiveView("tasks")}
                    className="text-sm text-indigo-600 hover:text-indigo-800"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {tasks.slice(0, 3).map((task, i) => (
                    <div key={i} className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800">{task.title}</h4>
                          <p className="text-sm text-gray-500 mt-1 line-clamp-1">{task.description}</p>
                        </div>
                        <span className={`ml-3 px-2 py-1 text-xs rounded-full ${getStatusStyles(task.status)}`}>
                          {task.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Upcoming Meetings */}
              <motion.div 
                className="bg-white p-5 rounded-xl shadow-sm border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-gray-800 flex items-center">
                    <FaCalendarAlt className="text-indigo-600 mr-2" /> Upcoming Meetings
                  </h3>
                  <button 
                    onClick={() => setActiveView("meetings")}
                    className="text-sm text-indigo-600 hover:text-indigo-800"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-3">
                  {meetings.filter(m => m.status === "upcoming").slice(0, 3).map((meeting, i) => (
                    <div key={i} className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition">
                      <div className="flex items-start">
                        <div className={`p-2 rounded-lg mr-3 ${
                          meeting.type === "training" ? "bg-purple-100 text-purple-600" : "bg-blue-100 text-blue-600"
                        }`}>
                          {getMeetingIcon(meeting.type)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800">{meeting.title}</h4>
                          <div className="flex items-center mt-1 text-sm text-gray-500">
                            <FaClock className="mr-1" />
                            <span>{meeting.date} at {meeting.time}</span>
                          </div>
                        </div>
                        <span className="ml-2 px-2 py-1 text-xs bg-teal-100 text-teal-800 rounded-full">
                          Upcoming
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Recent Activity */}
            <motion.div 
              className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-800">Recent Activity</h3>
                <button className="text-sm text-indigo-600 hover:text-indigo-800">View All</button>
              </div>
              <div className="space-y-3">
                {recentActivities.map(activity => (
                  <div key={activity.id} className="flex items-start py-2 border-b border-gray-100 last:border-0">
                    <div className={`p-2 rounded-full ${activity.id % 2 === 0 ? 'bg-indigo-100 text-indigo-600' : 'bg-teal-100 text-teal-600'} mr-3`}>
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">
                        {activity.action} <span className="text-indigo-600">{activity.details}</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Task Overview Chart */}
              <motion.div 
                className="bg-white p-5 rounded-xl shadow-sm border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="font-semibold text-gray-800 mb-4">Task Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie 
                      data={taskData} 
                      dataKey="value" 
                      innerRadius={70}
                      outerRadius={90}
                      paddingAngle={5}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {taskData.map((entry, i) => (
                        <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value} tasks`, 'Count']}
                      contentStyle={{ 
                        borderRadius: '8px', 
                        border: 'none', 
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                        backgroundColor: '#ffffff'
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Performance Trend Chart */}
              <motion.div 
                className="bg-white p-5 rounded-xl shadow-sm border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h3 className="font-semibold text-gray-800 mb-4">Weekly Performance</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={performanceData}>
                    <defs>
                      <linearGradient id="colorPerformance" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="week" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Performance']}
                      contentStyle={{ 
                        borderRadius: '8px', 
                        border: 'none', 
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                        backgroundColor: '#ffffff'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="performance" 
                      stroke="#4f46e5" 
                      fillOpacity={1} 
                      fill="url(#colorPerformance)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </motion.div>
            </div>
          </>
        )}

        {activeView === "tasks" && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Tasks Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map((task, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 flex flex-col hover:shadow-lg"
                >
                  <div className="p-6 flex-grow">
                    <h2 className="text-xl font-semibold text-gray-800">{task.title}</h2>
                    <p className="text-gray-600 mb-4 line-clamp-2">{task.description}</p>
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyles(task.status)}`}>
                        {task.status}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeView === "meetings" && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Meetings Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {meetings.map((meeting, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`bg-white rounded-lg shadow-md overflow-hidden p-5 border-l-4 ${
                    meeting.type === "training" ? "border-purple-500" : "border-blue-500"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {getMeetingIcon(meeting.type)}
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                        meeting.status === "upcoming" ? "bg-teal-100 text-teal-800" : "bg-gray-100 text-gray-800"
                      }`}>
                        {meeting.status}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {meeting.title}
                  </h3>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <FaClock className="text-gray-400" />
                      <span>
                        {meeting.date} • {meeting.time}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}