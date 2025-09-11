import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUpload, FaPaperclip, FaSearch, FaFilter, FaTimes, FaCalendarAlt, FaRegCommentDots } from "react-icons/fa";

const Tasks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [tasks, setTasks] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [fileInputs, setFileInputs] = useState({});
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [activeTab, setActiveTab] = useState("current");
  const [uploadProgress, setUploadProgress] = useState({});
  const [activeQueryTask, setActiveQueryTask] = useState(null);
  const [queryText, setQueryText] = useState("");
  const [isSubmittingQuery, setIsSubmittingQuery] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  

  const colorScheme = {
    primary: {
      bg: "bg-teal-600",
      hover: "hover:bg-teal-700",
      text: "text-black ",
      light: "bg-teal-50",
      border: "border-teal-500",
      ring: "ring-teal-500",
    },
    secondary: {
      bg: "bg-indigo-600",
      hover: "hover:bg-indigo-700",
      text: "text-white",
      light: "bg-indigo-50",
      border: "border-indigo-500",
    },
    status: {
      "Not Started": { bg: "bg-gray-200", text: "text-gray-800" },
      "Pending": { bg: "bg-yellow-200", text: "text-yellow-800" },
      "In Progress": { bg: "bg-blue-200", text: "text-blue-800" },
      "Completed": { bg: "bg-green-200", text: "text-green-800" },
      "Upcoming": { bg: "bg-purple-200", text: "text-purple-800" },
    },
    notification: {
      success: "bg-teal-500",
      error: "bg-red-500",
      info: "bg-indigo-500",
      warning: "bg-yellow-500"
    },
    card: {
      bg: "bg-white",
      hover: "hover:shadow-lg",
      border: "border-gray-200",
    }
  };

  useEffect(() => {
    const loadMockData = async () => {
      try {
        setLoading(false);
        await new Promise(resolve => setTimeout(resolve, 0));

        // Mock current tasks
        setTasks([
          {
            id: 1,
            title: "HTML - Create Portfolio Page",
            description: "Build a personal portfolio page with sections for About, Skills, and Contact.",
            requirements: ["Use semantic HTML", "Add responsive design", "Include at least 3 sections"],
            status: "Pending"
          },
          {
            id: 2,
            title: "HTML - Table Layout",
            description: "Design a product pricing table using HTML table elements.",
            requirements: ["3 columns minimum", "Include header row", "Add proper table borders"],
            status: "In Progress"
          },
          {
            id: 3,
            title: "CSS - Styling Forms",
            description: "Style a registration form with modern CSS techniques.",
            requirements: ["Use flexbox or grid", "Add hover effects", "Mobile-friendly"],
            status: "Completed"
          },
          {
            id: 4,
            title: "JavaScript - Todo App",
            description: "Create a todo application with add, complete, and delete functionality.",
            requirements: ["Tasks stored in state", "Ability to mark complete", "Delete functionality"],
            status: "Not Started"
          }
        ]);

        // Mock upcoming tasks
        setUpcomingTasks([
          {
            id: 5,
            title: "React - Component Library",
            description: "Build a reusable component library for future projects.",
            requirements: ["At least 5 components", "Proper props usage", "Document with Storybook"],
            status: "Upcoming"
          },
          {
            id: 6,
            title: "API Integration",
            description: "Connect frontend to backend API endpoints.",
            requirements: ["Use fetch or axios", "Handle errors", "Show loading states"],
            status: "Upcoming"
          }
        ]);
      } catch (error) {
        console.error("Error loading mock data:", error);
        addNotification("Failed to load tasks", "error");
      } finally {
        setLoading(false);
      }
    };

    loadMockData();
  }, []);

  // Mock file upload function
  const mockFileUpload = async (taskId, file) => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(prev => ({ ...prev, [taskId]: progress }));

        if (progress >= 100) {
          clearInterval(interval);
          resolve({
            status: 200,
            data: {
              message: "File uploaded successfully",
              filename: file.name,
              taskId: taskId
            }
          });
        }
      }, 200);
    });
  };

  const handleFileSubmit = async (taskId) => {
    const file = fileInputs[taskId];
    if (!file) {
      addNotification("Please select a file first", "error");
      return;
    }

    try {
      addNotification(`Uploading ${file.name}...`, "info");
      await mockFileUpload(taskId, file);
      addNotification(`${file.name} uploaded successfully!`, "success");

      setFileInputs({ ...fileInputs, [taskId]: null });
      setUploadProgress(prev => ({ ...prev, [taskId]: null }));
    } catch (error) {
      console.error("Upload error:", error);
      addNotification("Failed to upload file. Please try again.", "error");
      setUploadProgress(prev => ({ ...prev, [taskId]: null }));
    }
  };

  const handleQuerySubmit = (taskId) => {
    if (!queryText.trim()) {
      addNotification("Query cannot be empty", "error");
      return;
    }

    setIsSubmittingQuery(true);
    setTimeout(() => {
      addNotification("Query submitted successfully!", "success");
      setActiveQueryTask(null);
      setQueryText("");
      setIsSubmittingQuery(false);
    }, 1000);
  };

  const addNotification = (message, type = "success") => {
    const id = Date.now();
    const notification = { id, message, type };
    setNotifications(prev => [...prev, notification]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  };

  const filteredTasks = (activeTab === "current" ? tasks : upcomingTasks).filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusOptions = ["All", "Not Started", "Pending", "In Progress", "Completed", "Upcoming"];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 relative">
      {/* Notifications */}
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: -50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className={`fixed top-4 right-4 z-50 rounded-lg shadow-lg p-4 text-white ${
              colorScheme.notification[notification.type] || colorScheme.notification.info
            }`}
          >
            <div className="flex items-center">
              <div className="flex-grow pr-4">{notification.message}</div>
              <button
                onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
                className="text-white hover:text-gray-200"
              >
                <FaTimes />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Task Management System</h1>
      </header>

      {/* Search + Filter */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-teal-500" />
          </div>
          <input
            type="text"
            placeholder="Search tasks..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="relative">
          <button
            onClick={() => setShowStatusFilter(!showStatusFilter)}
            className={`flex items-center justify-between px-4 py-2 w-full md:w-48 border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none ${colorScheme.primary.text}`}
          >
            <span>{statusFilter}</span>
            <FaFilter className="text-teal-500" />
          </button>

          {showStatusFilter && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg"
            >
              {statusOptions.map(option => (
                <div 
                  key={option}
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                    statusFilter === option ? `${colorScheme.primary.light} text-teal-500` : ""
                  }`}
                  onClick={() => {
                    setStatusFilter(option);
                    setShowStatusFilter(false);
                  }}
                >
                  {option}
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === "current" ? "border-b-2 border-teal-500 text-teal-600" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("current")}
        >
          Current Tasks
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === "upcoming" ? "border-b-2 border-teal-500 text-teal-600" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("upcoming")}
        >
          <span className="flex items-center">
            <FaCalendarAlt className="mr-2 text-teal-500" /> Upcoming Tasks
          </span>
        </button>
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`${colorScheme.card.bg} rounded-lg shadow-md overflow-hidden ${colorScheme.card.border} flex flex-col ${colorScheme.card.hover}`}
            >
              <div 
                className="p-6 flex-grow cursor-pointer"
                onClick={(e) => {
                  if (e.target.tagName !== "BUTTON" && e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA" && e.target.tagName !== "svg") {
                    setSelectedTask(task);
                  }
                }}
              >
                <h2 className="text-xl font-semibold text-gray-800">{task.title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-2">{task.description}</p>
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    colorScheme.status[task.status]?.bg || "bg-gray-100"
                  } ${colorScheme.status[task.status]?.text || "text-gray-800"}`}>
                    {task.status}
                  </span>
                  {/* Query Bubble Icon beside status */}
                  <button
                    onClick={() => setActiveQueryTask(activeQueryTask === task.id ? null : task.id)}
                    className="p-2 bg-indigo-100 text-indigo-600 rounded-full hover:bg-indigo-200"
                    title="Ask a query"
                  >
                    <FaRegCommentDots size={18} />
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-200 p-4 bg-gray-50 flex space-x-2 items-center justify-between">
                {task.status !== "Completed" && task.status !== "Upcoming" && (
                  <>
                    <label className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md cursor-pointer flex-grow justify-center bg-white">
                      <FaPaperclip className="mr-2 text-teal-500" />
                      <span className="text-sm truncate max-w-xs">
                        {fileInputs[task.id] ? fileInputs[task.id].name : "Choose file"}
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => setFileInputs({
                          ...fileInputs,
                          [task.id]: e.target.files[0]
                        })}
                      />
                    </label>
                    <button
                      onClick={() => handleFileSubmit(task.id)}
                      disabled={!fileInputs[task.id] || uploadProgress[task.id] > 0}
                      className={`inline-flex items-center px-3 py-1 ${colorScheme.primary.bg} text-white rounded-md ${colorScheme.primary.hover} ${
                        !fileInputs[task.id] || uploadProgress[task.id] > 0 ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {uploadProgress[task.id] ? (
                        <span className="text-sm">{uploadProgress[task.id]}%</span>
                      ) : (
                        <>
                          <FaUpload className="mr-2" /> <span className="text-sm">Submit</span>
                        </>
                      )}
                    </button>
                  </>
                )}
              </div>

              {/* Query Section */}
              {activeQueryTask === task.id && (
                <div className="p-4 border-t bg-gray-50">
                  <textarea
                    value={queryText}
                    onChange={(e) => setQueryText(e.target.value)}
                    placeholder="Enter your query..."
                    className="w-full border border-gray-300 rounded-md p-2 mb-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                  />
                  <button
                    onClick={() => handleQuerySubmit(task.id)}
                    disabled={isSubmittingQuery}
                    className={`px-4 py-2 ${colorScheme.secondary.bg} text-white rounded-md ${colorScheme.secondary.hover}`}
                  >
                    {isSubmittingQuery ? "Submitting..." : "Submit Query"}
                  </button>
                </div>
              )}
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">No tasks found matching your criteria</p>
          
          </div>
        )}
      </div>

      {/* Task Detail Modal */}
      <AnimatePresence>
        {selectedTask && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">{selectedTask.title}</h2>
                <button
                  onClick={() => setSelectedTask(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes size={20} />
                </button>
              </div>
              <p className="text-gray-600 mb-4">{selectedTask.description}</p>
              <h3 className="font-medium text-gray-700 mb-2">Requirements:</h3>
              <ul className="list-disc pl-5 text-gray-600">
                {selectedTask.requirements.map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
              <div className="mt-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    colorScheme.status[selectedTask.status]?.bg || "bg-gray-100"
                  } ${colorScheme.status[selectedTask.status]?.text || "text-gray-800"}`}
                >
                  {selectedTask.status}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tasks;