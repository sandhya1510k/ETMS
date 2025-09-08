import React, { useState } from "react";
import {
  FiBell,
  FiCheckCircle,
  FiAlertCircle,
  FiInfo,
  FiCalendar,
  FiMessageSquare,
  // FiFilter,
  FiCheck,
  FiTrash2,
  FiSettings
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Notifications = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "success",
      title: "Assessment Completed",
      message: "Alice Brown completed the Java Fundamentals assessment",
      time: "10 minutes ago",
      read: false,
      icon: <FiCheckCircle />
    },
    {
      id: 2,
      type: "warning",
      title: "Deadline Approaching",
      message: "Python for Data Science assignment due in 2 days",
      time: "25 minutes ago",
      read: false,
      icon: <FiCalendar />
    },
    {
      id: 3,
      type: "info",
      title: "New Message",
      message: "You have a new message from John Doe",
      time: "1 hour ago",
      read: true,
      icon: <FiMessageSquare />
    },
    {
      id: 4,
      type: "error",
      title: "Submission Failed",
      message: "Bob Green's assignment submission failed to upload",
      time: "2 hours ago",
      read: true,
      icon: <FiAlertCircle />
    },
    {
      id: 5,
      type: "success",
      title: "Training Completed",
      message: "DevOps Essentials batch completed training",
      time: "5 hours ago",
      read: true,
      icon: <FiCheckCircle />
    },
    {
      id: 6,
      type: "info",
      title: "System Update",
      message: "ETMS will be down for maintenance on Saturday",
      time: "1 day ago",
      read: true,
      icon: <FiInfo />
    },
    {
      id: 7,
      type: "warning",
      title: "Low Attendance",
      message: "HR Compliance training has low attendance",
      time: "2 days ago",
      read: true,
      icon: <FiAlertCircle />
    }
  ]);

  const filterOptions = [
    { id: "all", name: "All" },
    { id: "unread", name: "Unread" },
    { id: "success", name: "Success" },
    { id: "warning", name: "Warning" },
    { id: "error", name: "Error" },
    { id: "info", name: "Info" }
  ];

  const getTypeColor = (type) => {
    switch (type) {
      case "success":
        return "bg-emerald-100 text-emerald-700";
      case "warning":
        return "bg-amber-100 text-amber-700";
      case "error":
        return "bg-rose-100 text-rose-700";
      case "info":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const filteredNotifications = notifications.filter(notification => {
    if (activeFilter === "all") return true;
    if (activeFilter === "unread") return !notification.read;
    return notification.type === activeFilter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <FiBell className="text-indigo-600" />
            Notifications
          </h1>
          <p className="text-slate-600">
            {unreadCount > 0 ? `${unreadCount} unread notifications` : "All caught up!"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-slate-200 hover:bg-slate-50"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            <FiCheck size={16} />
            <span>Mark all as read</span>
          </button>
          <button 
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-slate-200 hover:bg-slate-50 text-rose-600 hover:text-rose-700"
            onClick={clearAll}
            disabled={notifications.length === 0}
          >
            <FiTrash2 size={16} />
            <span>Clear all</span>
          </button>
          {/* <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-slate-200 hover:bg-slate-50">
            <FiSettings size={16} />
            <span>Settings</span>
          </button> */}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 mb-6">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-slate-700 font-medium">Filter:</span>
          {filterOptions.map(option => (
            <button
              key={option.id}
              className={`px-3 py-1.5 text-sm rounded-lg flex items-center gap-2 ${activeFilter === option.id ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
              onClick={() => setActiveFilter(option.id)}
            >
              {option.id === "unread" && unreadCount > 0 && (
                <span className="bg-indigo-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
              {option.name}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map(notification => (
              <motion.div
                key={notification.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className={`bg-white rounded-xl p-4 shadow-sm border border-slate-200 flex gap-4 ${!notification.read ? 'border-l-4 border-l-indigo-500' : ''}`}
              >
                <div className={`p-3 rounded-full ${getTypeColor(notification.type)}`}>
                  {notification.icon}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-slate-800">{notification.title}</h3>
                    <span className="text-sm text-slate-500">{notification.time}</span>
                  </div>
                  <p className="text-slate-600 mt-1">{notification.message}</p>
                  <div className="flex gap-3 mt-3">
                    {!notification.read && (
                      <button 
                        className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <FiCheck size={14} />
                        Mark as read
                      </button>
                    )}
                    <button 
                      className="text-sm text-slate-500 hover:text-rose-600 flex items-center gap-1"
                      onClick={() => deleteNotification(notification.id)}
                    >
                      <FiTrash2 size={14} />
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div 
              className="bg-white rounded-xl p-8 text-center shadow-sm border border-slate-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <FiBell className="mx-auto text-slate-400 text-4xl mb-4" />
              <h3 className="text-lg font-medium text-slate-700 mb-2">No notifications</h3>
              <p className="text-slate-500">
                {activeFilter === "unread" 
                  ? "You're all caught up! No unread notifications." 
                  : "No notifications to display with the current filters."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      
    </div>
  );
};

export default Notifications;