import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaBell,
  FaBellSlash,
  FaSave,
  FaUndo,
  FaCog,
  FaUser,
  FaEdit,
  FaCamera
} from "react-icons/fa";

const Settings = ({ isSidebarOpen }) => {
  // Notification settings state
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

  // User profile state (simplified)
  const [user, setUser] = useState({
    id: localStorage.getItem("user-id") || "CAML16534",
    name: localStorage.getItem("user-name") || "Rayarapu Rakesh",
    avatar: localStorage.getItem("user-avatar") || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  });

  const [editedUser, setEditedUser] = useState({ ...user });
  const [isEditing, setIsEditing] = useState(false);

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

  // Handle profile edit
  const handleEdit = () => {
    setEditedUser({ ...user });
    setIsEditing(true);
  };

  // Handle profile save - FIXED: Now saves to localStorage
  const handleSave = () => {
    // Save to state
    setUser(editedUser);
    
    // Save to localStorage
    localStorage.setItem("user-id", editedUser.id);
    localStorage.setItem("user-name", editedUser.name);
    localStorage.setItem("user-avatar", editedUser.avatar);
    
    setIsEditing(false);
    
    // Show success message
    setShowSaveAlert(true);
    setTimeout(() => setShowSaveAlert(false), 3000);
  };

  // Handle profile cancel
  const handleCancel = () => {
    setEditedUser({ ...user });
    setIsEditing(false);
  };

  // Handle profile input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle avatar upload
  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newAvatar = event.target.result;
        setEditedUser(prev => ({
          ...prev,
          avatar: newAvatar
        }));
        
        // Save to localStorage immediately for better UX
        localStorage.setItem("user-avatar", newAvatar);
      };
      reader.readAsDataURL(file);
    }
  };

  // Save all settings
  const saveSettings = () => {
    // Save notification settings
    Object.entries(notifications).forEach(([key, value]) => {
      localStorage.setItem(`notifications-${key}`, JSON.stringify(value));
    });

    // Save profile settings
    localStorage.setItem("user-id", user.id);
    localStorage.setItem("user-name", user.name);
    localStorage.setItem("user-avatar", user.avatar);

    setShowSaveAlert(true);
    setTimeout(() => setShowSaveAlert(false), 3000);
  };

  // Reset to defaults
  const resetToDefaults = () => {
    // Reset notifications
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

    // Reset profile
    const defaultProfile = {
      id: "CAML12314",
      name: "Rayarapu Rakesh",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    };
    
    // Update state
    setUser(defaultProfile);
    setEditedUser(defaultProfile);
    
    // Update localStorage
    localStorage.setItem("user-id", defaultProfile.id);
    localStorage.setItem("user-name", defaultProfile.name);
    localStorage.setItem("user-avatar", defaultProfile.avatar);
    
    // Update notifications in localStorage
    Object.entries(defaultNotifications).forEach(([key, value]) => {
      localStorage.setItem(`notifications-${key}`, JSON.stringify(value));
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    
     

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Profile Section - Simplified */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6 transition-colors duration-300"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg mr-3">
                  <FaUser className="text-indigo-600 dark:text-indigo-400 text-xl" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Profile Information
                </h2>
              </div>

              {isEditing ? (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="flex items-center px-3 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors duration-200"
                  >
                    Save Profile
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleEdit}
                  className="flex items-center px-3 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors duration-200"
                >
                  <FaEdit className="mr-1" /> Edit Profile
                </button>
              )}
            </div>

            <div className="flex flex-col items-center">
              {/* Avatar Upload */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative mb-4">
                  <img
                    src={isEditing ? editedUser.avatar : user.avatar}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-md"
                  />
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-teal-600 text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-teal-700 transition-colors duration-200">
                      <FaCamera className="text-sm" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarUpload}
                      />
                    </label>
                  )}
                </div>
                {isEditing && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                    Click the camera icon to change your profile picture
                  </p>
                )}
              </div>

              {/* Simplified Profile Info */}
              <div className="w-full max-w-md space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={editedUser.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                    />
                  ) : (
                    <p className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg dark:text-white text-center font-bold text-lg">
                      {user.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Employee ID
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="id"
                      value={editedUser.id}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                    />
                  ) : (
                    <p className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg dark:text-white text-center font-bold text-lg text-teal-600 dark:text-teal-400">
                      {user.id}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Notification Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
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
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  allNotificationsEnabled
                    ? "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300 hover:bg-teal-200 dark:hover:bg-teal-800/40"
                    : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
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
                  className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-750"
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
          className="fixed bottom-4 right-4 bg-teal-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center"
        >
          <FaSave className="mr-2" />
          Settings saved successfully!
        </motion.div>
      )}
    </div>
  );
};

export default Settings;