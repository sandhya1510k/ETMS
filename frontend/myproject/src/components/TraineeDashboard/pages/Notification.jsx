import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBell,
  FaTasks,
  FaUserCheck,
  FaClipboardList,
  FaCalendarAlt,
  FaUser,
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaClock,
  FaFilter,
  FaTrash,
  FaCheck,
  FaTimes
} from "react-icons/fa";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // Sample notifications data
  useEffect(() => {
    const sampleNotifications = [
      {
        id: 1,
        type: "task",
        title: "Task Update: HTML - Create Portfolio Page",
        message: "Your task status has been updated to 'In Progress'",
        timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
        read: false,
        priority: "medium"
      },
      {
        id: 2,
        type: "attendance",
        title: "Attendance Recorded",
        message: "Your attendance for today has been marked as Present",
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        read: false,
        priority: "low"
      },
      {
        id: 3,
        type: "assignment",
        title: "New Assignment: CSS - Styling Forms",
        message: "A new assignment has been assigned to you. Due date: Aug 25",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        read: true,
        priority: "high"
      },
      {
        id: 4,
        type: "meeting",
        title: "Meeting Reminder: Django Fundamentals Training",
        message: "Your meeting starts in 30 minutes",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
        read: true,
        priority: "medium"
      },
      {
        id: 5,
        type: "profile",
        title: "Profile Updated",
        message: "Your profile information has been successfully updated",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        read: true,
        priority: "low"
      },
      {
        id: 6,
        type: "task",
        title: "Task Completed: JavaScript - Todo App",
        message: "Congratulations! You've completed this task",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
        read: true,
        priority: "medium"
      },
      {
        id: 7,
        type: "assignment",
        title: "Assignment Graded: React Advanced Workshop",
        message: "Your assignment has been graded. Score: 92/100",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
        read: true,
        priority: "high"
      }
    ];
    setNotifications(sampleNotifications);
  }, []);

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

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const filteredNotifications = filter === "all" 
    ? notifications 
    : notifications.filter(notification => notification.type === filter);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case "task": return <FaTasks className="text-blue-500" />;
      case "attendance": return <FaUserCheck className="text-green-500" />;
      case "assignment": return <FaClipboardList className="text-purple-500" />;
      case "meeting": return <FaCalendarAlt className="text-orange-500" />;
      case "profile": return <FaUser className="text-teal-500" />;
      default: return <FaBell className="text-gray-500" />;
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "high": return <FaExclamationCircle className="text-red-500" />;
      case "medium": return <FaInfoCircle className="text-yellow-500" />;
      case "low": return <FaCheckCircle className="text-green-500" />;
      default: return <FaInfoCircle className="text-gray-500" />;
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    
    if (diff < 60000) return "Just now";
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    if (diff < 604800000) return `${Math.floor(diff / 86400000)}d ago`;
    
    return timestamp.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
              <FaBell className="mr-3 text-teal-600" />
              Notifications
            </h1>
            <p className="text-gray-600">
              {unreadCount > 0 
                ? `${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}`
                : 'All caught up!'
              }
            </p>
          </div>
          
          <div className="flex space-x-2">
            <div className="relative">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50"
              >
                <FaFilter className="mr-2 text-gray-600" />
                <span className="capitalize">{filter}</span>
              </button>
              
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200"
                >
                  <button
                    onClick={() => { setFilter("all"); setShowFilters(false); }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    All Notifications
                  </button>
                  <button
                    onClick={() => { setFilter("task"); setShowFilters(false); }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Tasks
                  </button>
                  <button
                    onClick={() => { setFilter("attendance"); setShowFilters(false); }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Attendance
                  </button>
                  <button
                    onClick={() => { setFilter("assignment"); setShowFilters(false); }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Assignments
                  </button>
                  <button
                    onClick={() => { setFilter("meeting"); setShowFilters(false); }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Meetings
                  </button>
                  <button
                    onClick={() => { setFilter("profile"); setShowFilters(false); }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </button>
                </motion.div>
              )}
            </div>
            
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200"
              >
                Mark all as read
              </button>
            )}
            
            {notifications.length > 0 && (
              <button
                onClick={clearAllNotifications}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {filteredNotifications.length === 0 ? (
            <div className="p-8 text-center">
              <FaBell className="mx-auto text-4xl text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No notifications</h3>
              <p className="text-gray-500">
                {filter === "all" 
                  ? "You're all caught up!" 
                  : `No ${filter} notifications found`
                }
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              <AnimatePresence>
                {filteredNotifications.map((notification) => (
                  <motion.li
                    key={notification.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`p-4 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
                  >
                    <div className="flex items-start">
                      <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center mr-3 ${!notification.read ? 'bg-blue-100' : 'bg-gray-100'}`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className={`text-sm font-medium ${!notification.read ? 'text-blue-800' : 'text-gray-900'}`}>
                            {notification.title}
                          </h4>
                          <div className="flex items-center space-x-1">
                            {getPriorityIcon(notification.priority)}
                            <span className="text-xs text-gray-500 flex items-center">
                              <FaClock className="mr-1" />
                              {formatTime(notification.timestamp)}
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 mt-1">
                          {notification.message}
                        </p>
                        
                        <div className="mt-2 flex space-x-2">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="inline-flex items-center text-xs text-blue-600 hover:text-blue-800"
                            >
                              <FaCheck className="mr-1" />
                              Mark as read
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="inline-flex items-center text-xs text-red-600 hover:text-red-800"
                          >
                            <FaTrash className="mr-1" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </div>

        {/* Notification Types Explanation */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Notification Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start p-3 bg-blue-50 rounded-lg">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <FaTasks className="text-blue-500" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Task Notifications</h3>
                <p className="text-sm text-gray-600">Updates on your assigned tasks, status changes, and deadlines</p>
              </div>
            </div>
            
            <div className="flex items-start p-3 bg-green-50 rounded-lg">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                <FaUserCheck className="text-green-500" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Attendance Notifications</h3>
                <p className="text-sm text-gray-600">Information about your attendance records and status</p>
              </div>
            </div>
            
            <div className="flex items-start p-3 bg-purple-50 rounded-lg">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                <FaClipboardList className="text-purple-500" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Assignment Notifications</h3>
                <p className="text-sm text-gray-600">New assignments, submissions, and grading updates</p>
              </div>
            </div>
            
            <div className="flex items-start p-3 bg-orange-50 rounded-lg">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                <FaCalendarAlt className="text-orange-500" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Meeting Notifications</h3>
                <p className="text-sm text-gray-600">Meeting schedules, reminders, and updates</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}