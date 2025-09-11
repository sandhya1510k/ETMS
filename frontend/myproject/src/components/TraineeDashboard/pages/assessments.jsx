import React, { useState, useEffect } from "react";
import {
  FaUpload, FaPaperclip, FaSearch, FaFilter, FaTimes, 
  FaCalendarAlt, FaRegClock, FaCheckCircle, FaExclamationTriangle,
  FaClipboardList, FaFileAlt, FaGraduationCap, FaChartLine,
  FaSort, FaSortUp, FaSortDown, FaClock
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Assessments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [Assessments , setAssessments ] = useState([]);
  const [fileInputs, setFileInputs] = useState({});
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: 'dueDate', direction: 'ascending' });
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [stats, setStats] = useState({ total: 0, submitted: 0, pending: 0, graded: 0, upcoming: 0 });
  const [activeTab, setActiveTab] = useState("all");

  const colorScheme = {
    primary: { bg: "bg-teal-600", hover: "hover:bg-teal-700", text: "text-white" },
    status: {
      "Not Started": { bg: "bg-gray-100", text: "text-gray-800", icon: FaRegClock },
      "Pending": { bg: "bg-yellow-100", text: "text-yellow-800", icon: FaExclamationTriangle },
      "In Progress": { bg: "bg-blue-100", text: "text-blue-800", icon: FaRegClock },
      "Submitted": { bg: "bg-purple-100", text: "text-purple-800", icon: FaCheckCircle },
      "Graded": { bg: "bg-green-100", text: "text-green-800", icon: FaCheckCircle },
      "Overdue": { bg: "bg-red-100", text: "text-red-800", icon: FaExclamationTriangle },
    },
    priority: {
      "High": "bg-red-100 text-red-800",
      "Medium": "bg-yellow-100 text-yellow-800",
      "Low": "bg-green-100 text-green-800"
    }
  };

  const generateThisYearDate = (month, day) => {
    const currentYear = new Date().getFullYear();
    return `${currentYear}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  };

  const getUpcomingAssessments  = () => {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    
    return Assessments .filter(assignment => {
      const dueDate = new Date(assignment.dueDate);
      return dueDate > today && dueDate <= nextWeek && 
             assignment.status !== "Submitted" && 
             assignment.status !== "Graded";
    });
  };

  useEffect(() => {
    const loadMockData = async () => {
      try {
        setLoading(false);
        await new Promise(resolve => setTimeout(resolve, 0));

        const mockAssessments  = [
          {
            id: 1, title: "HTML Portfolio Website",
            description: "Create a personal portfolio website using HTML and CSS.",
            module: "HTML & CSS Fundamentals", dueDate: generateThisYearDate(8, 15),
            status: "Submitted", priority: "High", grade: "A", instructor: "Sarah Johnson",
            submissionDate: generateThisYearDate(8, 14), files: ["portfolio.html", "styles.css"],
            topics: ["HTML Structure", "CSS Styling", "Responsive Design"], totalMarks: 100,
            marksObtained: 92, duration: 2
          },
          {
            id: 2, title: "JavaScript Todo App",
            description: "Build a todo application with add, complete, and delete functionality.",
            module: "JavaScript Basics", dueDate: generateThisYearDate(8, 22),
            status: "In Progress", priority: "High", grade: null, instructor: "Michael Chen",
            submissionDate: null, files: [], topics: ["DOM Manipulation", "Event Handling"],
            totalMarks: 100, marksObtained: null, duration: 3
          },
          {
            id: 3, title: "React Component Library",
            description: "Create a reusable component library with at least 5 components.",
            module: "React Fundamentals", dueDate: generateThisYearDate(9, 5),
            status: "Not Started", priority: "Medium", grade: null, instructor: "Emily Rodriguez",
            submissionDate: null, files: [], topics: ["Components", "Props", "State Management"],
            totalMarks: 120, marksObtained: null, duration: 4
          },
          {
            id: 4, title: "Database Design Exercise",
            description: "Design a database schema for an e-commerce platform.",
            module: "Database Fundamentals", dueDate: generateThisYearDate(8, 18),
            status: "Submitted", priority: "Medium", grade: "B+", instructor: "Lisa Thompson",
            submissionDate: generateThisYearDate(8, 17), files: ["schema.sql", "queries.sql"],
            topics: ["Database Schema", "SQL Queries", "Normalization"], totalMarks: 100,
            marksObtained: 87, duration: 1.5
          },
          {
            id: 5, title: "CSS Framework Comparison",
            description: "Compare and contrast three popular CSS frameworks.",
            module: "Advanced CSS", dueDate: generateThisYearDate(8, 19),
            status: "Not Started", priority: "Low", grade: null, instructor: "Alex Parker",
            submissionDate: null, files: [], topics: ["Bootstrap", "Tailwind CSS", "Material UI"],
            totalMarks: 80, marksObtained: null, duration: 1
          }
        ];

        setAssessments (mockAssessments );
        const total = mockAssessments .length;
        const submitted = mockAssessments .filter(a => a.status === "Submitted" || a.status === "Graded").length;
        const pending = mockAssessments .filter(a => a.status === "In Progress" || a.status === "Not Started").length;
        const graded = mockAssessments .filter(a => a.status === "Graded").length;
        const upcoming = getUpcomingAssessments ().length;
        setStats({ total, submitted, pending, graded, upcoming });
      } catch (error) {
        console.error("Error loading mock data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMockData();
  }, []);

  useEffect(() => {
    if (Assessments .length > 0) {
      const upcomingCount = getUpcomingAssessments ().length;
      setStats(prev => ({ ...prev, upcoming: upcomingCount }));
    }
  }, [Assessments ]);

  const mockFileUpload = async (assignmentId, file) => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(prev => ({ ...prev, [assignmentId]: progress }));
        if (progress >= 100) {
          clearInterval(interval);
          resolve({ status: 200, data: { message: "File uploaded successfully", filename: file.name } });
        }
      }, 200);
    });
  };

  const handleFileSubmit = async (assignmentId) => {
    const file = fileInputs[assignmentId];
    if (!file) return;

    try {
      await mockFileUpload(assignmentId, file);
      setAssessments (prev => prev.map(a => 
        a.id === assignmentId 
          ? { ...a, status: "Submitted", submissionDate: new Date().toISOString().split('T')[0], files: [file.name] } 
          : a
      ));
      setStats(prev => ({
        ...prev,
        submitted: prev.submitted + 1,
        pending: prev.pending - 1,
        upcoming: getUpcomingAssessments ().length
      }));
      setFileInputs(prev => ({ ...prev, [assignmentId]: null }));
      setUploadProgress(prev => ({ ...prev, [assignmentId]: null }));
    } catch (error) {
      console.error("Upload error:", error);
      setUploadProgress(prev => ({ ...prev, [assignmentId]: null }));
    }
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedAssessments  = React.useMemo(() => {
    let sortableItems = [...Assessments ];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [Assessments , sortConfig]);

  const filteredAssessments  = sortedAssessments .filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         assignment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.module.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || assignment.status === statusFilter;
    
    let matchesTab = true;
    if (activeTab === "upcoming") {
      const today = new Date();
      const nextWeek = new Date();
      nextWeek.setDate(today.getDate() + 7);
      const dueDate = new Date(assignment.dueDate);
      matchesTab = dueDate > today && dueDate <= nextWeek && 
                  assignment.status !== "Submitted" && 
                  assignment.status !== "Graded";
    }
    
    return matchesSearch && matchesStatus && matchesTab;
  });

  const statusOptions = ["All", "Not Started", "In Progress", "Submitted", "Graded", "Overdue"];

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <FaSort className="text-gray-400" />;
    return sortConfig.direction === 'ascending' 
      ? <FaSortUp className="text-teal-500" /> 
      : <FaSortDown className="text-teal-500" />;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date() && new Date(dueDate).setHours(0,0,0,0) !== new Date().setHours(0,0,0,0);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center">
          <FaClipboardList className="text-teal-500 mr-3" />
          Assessments 
        </h1>
        <p className="text-gray-600 mt-2">Track and submit your course Assessments </p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
        {[
          { title: "Total Assessments ", value: stats.total, icon: FaClipboardList, color: "teal" },
          { title: "Submitted", value: stats.submitted, icon: FaCheckCircle, color: "purple" },
          { title: "Pending", value: stats.pending, icon: FaRegClock, color: "yellow" },
          { title: "Graded", value: stats.graded, icon: FaChartLine, color: "green" },
          { title: "Upcoming (7 days)", value: stats.upcoming, icon: FaCalendarAlt, color: "blue" }
        ].map((stat, index) => (
          <motion.div 
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-5 rounded-xl shadow-sm border border-gray-100"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold mt-1 text-gray-800">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-${stat.color}-100 text-${stat.color}-600`}>
                <stat.icon className="text-xl" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tabs for All/Upcoming Assessments  */}
      <div className="mb-6 flex border-b border-gray-200">
        {["All Assessments ", "Upcoming This Week"].map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 font-medium text-sm ${activeTab === tab.toLowerCase().split(' ')[0] ? "border-b-2 border-teal-500 text-teal-600" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab(tab.toLowerCase().split(' ')[0])}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search + Filter */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-teal-500" />
          </div>
          <input
            type="text"
            placeholder="Search Assessments ..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="relative">
          <button
            onClick={() => setShowStatusFilter(!showStatusFilter)}
            className="flex items-center justify-between px-4 py-2 w-full md:w-48 border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
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
                    statusFilter === option ? "bg-teal-50 text-teal-700" : ""
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

      {/* Assessments  Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {filteredAssessments .length > 0 ? (
          filteredAssessments .map((assignment) => {
            const StatusIcon = colorScheme.status[assignment.status]?.icon || FaRegClock;
            const isDue = isOverdue(assignment.dueDate);
            
            return (
              <motion.div 
                key={assignment.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedAssignment(assignment)}
              >
                <div className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-shrink-0 h-12 w-12 bg-teal-100 text-teal-600 rounded-lg flex items-center justify-center">
                      <FaFileAlt />
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${colorScheme.status[assignment.status]?.bg} ${colorScheme.status[assignment.status]?.text}`}>
                      <StatusIcon className="inline mr-1" size={10} />
                      {assignment.status}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{assignment.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{assignment.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-500">
                      <FaGraduationCap className="mr-2 text-teal-500" />
                      <span>{assignment.module}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500">
                      <FaCalendarAlt className="mr-2 text-teal-500" />
                      <span className={isDue && assignment.status !== "Submitted" && assignment.status !== "Graded" ? "text-red-500" : ""}>
                        Due: {formatDate(assignment.dueDate)}
                        {isDue && assignment.status !== "Submitted" && assignment.status !== "Graded" && (
                          <span className="ml-1 text-xs text-red-500">(Overdue)</span>
                        )}
                      </span>
                    </div>

                    <div className="flex items-center text-sm text-gray-500">
                      <FaClock className="mr-2 text-teal-500" />
                      <span>Duration: {assignment.duration} hour{assignment.duration !== 1 ? 's' : ''}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${colorScheme.priority[assignment.priority]}`}>
                        {assignment.priority} Priority
                      </span>
                      
                      <span className="text-sm font-medium text-gray-700">
                        {assignment.grade ? `Grade: ${assignment.grade}` : `Marks: ${assignment.totalMarks}`}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
                  {assignment.status !== "Submitted" && assignment.status !== "Graded" ? (
                    <label className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md cursor-pointer bg-white hover:bg-gray-50 text-sm">
                      <FaPaperclip className="mr-2 text-teal-500" />
                      <span className="truncate">
                        {fileInputs[assignment.id] ? fileInputs[assignment.id].name : "Choose file"}
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          e.stopPropagation();
                          setFileInputs({
                            ...fileInputs,
                            [assignment.id]: e.target.files[0]
                          });
                        }}
                      />
                    </label>
                  ) : (
                    <div className="text-xs text-gray-500">
                      Submitted on {formatDate(assignment.submissionDate)}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="col-span-full text-center py-10 text-gray-500">
            No Assessments  found matching your criteria
          </div>
        )}
      </div>

      {/* Submit buttons for Assessments  with files selected */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAssessments 
          .filter(assignment => assignment.status !== "Submitted" && assignment.status !== "Graded" && fileInputs[assignment.id])
          .map(assignment => (
            <motion.div 
              key={assignment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center justify-between"
            >
              <div className="truncate">
                <p className="text-sm font-medium text-gray-900 truncate">{assignment.title}</p>
                <p className="text-xs text-gray-500 truncate">{fileInputs[assignment.id]?.name}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleFileSubmit(assignment.id);
                }}
                disabled={uploadProgress[assignment.id] > 0}
                className={`ml-2 px-3 py-1 ${colorScheme.primary.bg} text-white rounded-md ${colorScheme.primary.hover} ${
                  uploadProgress[assignment.id] > 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {uploadProgress[assignment.id] ? (
                  <span className="text-sm">{uploadProgress[assignment.id]}%</span>
                ) : (
                  "Submit"
                )}
              </button>
            </motion.div>
          ))
        }
      </div>

      {/* Assignment Detail Modal */}
      <AnimatePresence>
        {selectedAssignment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedAssignment(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{selectedAssignment.title}</h2>
                  <p className="text-sm text-gray-500 mt-1">{selectedAssignment.module}</p>
                </div>
                <button
                  onClick={() => setSelectedAssignment(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                {[
                  { label: "Due Date", value: formatDate(selectedAssignment.dueDate), overdue: isOverdue(selectedAssignment.dueDate) },
                  { label: "Instructor", value: selectedAssignment.instructor },
                  { label: "Status", value: selectedAssignment.status, status: true },
                  { label: "Priority", value: selectedAssignment.priority, priority: true },
                  { label: "Duration", value: `${selectedAssignment.duration} hour${selectedAssignment.duration !== 1 ? 's' : ''}` },
                  ...(selectedAssignment.grade ? [{ label: "Grade", value: selectedAssignment.grade }] : []),
                  ...(selectedAssignment.submissionDate ? [{ label: "Submitted On", value: formatDate(selectedAssignment.submissionDate) }] : []),
                  ...(selectedAssignment.totalMarks ? [{ label: "Total Marks", value: selectedAssignment.totalMarks }] : []),
                  ...(selectedAssignment.marksObtained ? [{ label: "Marks Obtained", value: selectedAssignment.marksObtained }] : [])
                ].map((item, index) => (
                  <div key={index}>
                    <p className="text-sm text-gray-500">{item.label}</p>
                    {item.status ? (
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${colorScheme.status[selectedAssignment.status]?.bg} ${colorScheme.status[selectedAssignment.status]?.text}`}>
                        {item.value}
                      </span>
                    ) : item.priority ? (
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${colorScheme.priority[selectedAssignment.priority]}`}>
                        {item.value}
                      </span>
                    ) : (
                      <p className="font-medium">
                        {item.value}
                        {item.overdue && selectedAssignment.status !== "Submitted" && selectedAssignment.status !== "Graded" && (
                          <span className="ml-2 text-red-500 text-sm">(Overdue)</span>
                        )}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-500">Description</p>
                <p className="text-gray-800">{selectedAssignment.description}</p>
              </div>

              {selectedAssignment.topics && selectedAssignment.topics.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">Topics Covered</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedAssignment.topics.map((topic, index) => (
                      <span key={index} className="px-2 py-1 bg-teal-100 text-teal-800 text-xs rounded-full">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedAssignment.files && selectedAssignment.files.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">Submitted Files</p>
                  <div className="space-y-2">
                    
                    {selectedAssignment.files.map((file, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-700 bg-gray-100 p-2 rounded">
                        <FaPaperclip className="mr-2 text-teal-500" />
                        {file}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedAssignment.status !== "Submitted" && selectedAssignment.status !== "Graded" && (
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500 mb-2">Submit Assignment</p>
                  <div className="flex items-center gap-2">
                    <label className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md cursor-pointer flex-grow bg-white">
                      <FaPaperclip className="mr-2 text-teal-500" />
                      <span className="text-sm truncate">
                        {fileInputs[selectedAssignment.id] ? fileInputs[selectedAssignment.id].name : "Choose file"}
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => setFileInputs({
                          ...fileInputs,
                          [selectedAssignment.id]: e.target.files[0]
                        })}
                      />
                    </label>
                    <button
                      onClick={() => handleFileSubmit(selectedAssignment.id)}
                      disabled={!fileInputs[selectedAssignment.id] || uploadProgress[selectedAssignment.id] > 0}
                      className={`px-4 py-2 ${colorScheme.primary.bg} text-white rounded-md ${colorScheme.primary.hover} ${
                        !fileInputs[selectedAssignment.id] || uploadProgress[selectedAssignment.id] > 0 ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {uploadProgress[selectedAssignment.id] ? (
                        <span className="text-sm">{uploadProgress[selectedAssignment.id]}%</span>
                      ) : (
                        <>
                          <FaUpload className="inline mr-1" />
                          Submit
                        </>
                      )}
                    </button>
                  </div>
                  {uploadProgress[selectedAssignment.id] > 0 && (
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-teal-600 h-2 rounded-full" 
                        style={{ width: `${uploadProgress[selectedAssignment.id]}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Assessments ;