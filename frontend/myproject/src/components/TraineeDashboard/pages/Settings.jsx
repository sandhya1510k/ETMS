import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaBell,
  FaBellSlash,
  FaSave,
  FaUndo,
  FaCog
} from "react-icons/fa";

const Settings = ({ isSidebarOpen }) => {
 
  const [notifications, setNotifications] = useState({
    dashboard: JSON.parse(localStorage.getItem("notifications-dashboard") || "true"),
    tasks: JSON.parse(localStorage.getItem("notifications-tasks") || "true"),
    attendance: JSON.parse(localStorage.getItem("notifications-attendance") || "true"),
    assignments: JSON.parse(localStorage.getItem("notifications-assignments") || "true"),
    meetings: JSON.parse(localStorage.getItem("notifications-meetings") || "true"),
    chat: JSON.parse(localStorage.getItem("notifications-chat") || "true"),
    profile: JSON.parse(localStorage.getItem("notifications-profile") || "true"),
    settings: JSON.parse(localStorage.getItem("notifications-settings") || "true")
  });

  // State for master notification toggle
  const [allNotificationsEnabled, setAllNotificationsEnabled] = useState(
    Object.values(notifications).every(val => val === true)
  );

  const [showSaveAlert, setShowSaveAlert] = useState(false);

  // Update master toggle when individual notifications change
  useEffect(() => {
    setAllNotificationsEnabled(Object.values(notifications).every(val => val === true));
  }, [notifications]);

  // Toggle all notifications
  const toggleAllNotifications = () => {
    const newState = !allNotificationsEnabled;
    setAllNotificationsEnabled(newState);

    const updatedNotifications = {};
    Object.keys(notifications).forEach(key => {
      updatedNotifications[key] = newState;
    });

    setNotifications(updatedNotifications);
  };

  // Toggle individual notification
  const toggleNotification = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Save settings
  const saveSettings = () => {
    Object.entries(notifications).forEach(([key, value]) => {
      localStorage.setItem(`notifications-${key}`, JSON.stringify(value));
    });

    setShowSaveAlert(true);
    setTimeout(() => setShowSaveAlert(false), 3000);
  };

  // Reset to defaults
  const resetToDefaults = () => {
    const defaultNotifications = {
      dashboard: true,
      tasks: true,
      attendance: true,
      assignments: true,
      meetings: true,
      chat: true,
      profile: true,
      settings: true
    };

    setNotifications(defaultNotifications);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm px-6 py-4 sticky top-0 z-50 transition-colors duration-300">
        <div className="flex items-center space-x-3">
          <FaCog className="text-teal-600 dark:text-teal-400 text-xl" />
          <h1 className="font-bold text-xl text-gray-800 dark:text-white">Settings</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Notification Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6 transition-colors duration-300"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg mr-3">
                  <FaBell className="text-indigo-600 dark:text-indigo-400 text-xl" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Notification Settings
                </h2>
              </div>

              <button
                onClick={toggleAllNotifications}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium ${
                  allNotificationsEnabled
                    ? "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300"
                    : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                }`}
              >
                {allNotificationsEnabled ? (
                  <>
                    <FaBell className="mr-1" />  Disable All
                  </>
                ) : (
                  <>
                    <FaBellSlash className="mr-1" /> Enable All
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-gray-200 capitalize">
                      {key === "chat" ? "Chat" : key}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {value ? "Notifications enabled" : "Notifications disabled"}
                    </p>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={value}
                      onChange={() => toggleNotification(key)}
                    />
                    <div
                      className={`w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 
                      peer-checked:after:translate-x-full peer-checked:after:border-white 
                      after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                      after:bg-white after:border-gray-300 after:border after:rounded-full 
                      after:h-5 after:w-5 after:transition-all dark:border-gray-600 ${
                        value
                          ? "peer-checked:bg-teal-600 dark:peer-checked:bg-teal-600"
                          : ""
                      }`}
                    ></div>
                  </label>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 flex justify-between transition-colors duration-300"
          >
            <button
              onClick={resetToDefaults}
              className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              <FaUndo className="mr-2" /> Reset to Defaults
            </button>

            <button
              onClick={saveSettings}
              className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200"
            >
              <FaSave className="mr-2" /> Save Changes
            </button>
          </motion.div>
        </div>
      </main>

      {/* Save Alert */}
      {showSaveAlert && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 bg-teal-600 text-white px-4 py-3 rounded-lg shadow-lg"
        >
          Settings saved successfully!
        </motion.div>
      )}
    </div>
  );
};

export default Settings;
