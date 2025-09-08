import React, { useState, useEffect } from "react";
import {
  FaCalendarAlt, FaVideo, FaPhone, FaMapMarkerAlt,
  FaUserFriends, FaClock, FaEllipsisH, FaPlus,
  FaSearch, FaTimes, FaBell, FaCheck, FaTrash,
  FaTasks, FaProjectDiagram, FaGraduationCap, FaLaptopCode
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Updated Color Scheme
const colors = {
  dashboard: {
    background: 'bg-gray-100',
    card: 'bg-white',
    primary: 'bg-teal-600',
    primaryHover: 'bg-teal-700',
    text: 'text-gray-800',
    secondaryText: 'text-gray-600'
  },
  sidebar: {
    background: 'bg-teal-800',
    text: 'text-white',
    hover: 'bg-teal-700',
    active: 'bg-teal-900'
  },
  tasks: {
    background: 'bg-blue-50',
    card: 'bg-white',
    priorityHigh: 'bg-red-100 text-red-800',
    priorityMedium: 'bg-amber-100 text-amber-800',
    priorityLow: 'bg-green-100 text-green-800'
  },
  meetings: {
    video: 'bg-blue-100 text-blue-800',
    call: 'bg-green-100 text-green-800',
    inPerson: 'bg-orange-100 text-orange-800',
    training: 'bg-indigo-100 text-indigo-800',
    completed: 'bg-gray-100 text-gray-800'
  },
  projects: {
    background: 'bg-emerald-50',
    card: 'bg-white',
    statusActive: 'bg-teal-100 text-teal-800',
    statusCompleted: 'bg-green-100 text-green-800',
    statusOnHold: 'bg-yellow-100 text-yellow-800'
  }
};

const MeetingsPage = () => {
  // Sample meeting data with training and project focus
  const [meetings, setMeetings] = useState([
    {
      id: 1,
      title: "Django Fundamentals Training",
      type: "training",
      participants: ["John D.", "Sarah M.", "Alex T.", "Lisa R."],
      date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
      time: "10:00",
      duration: "120 mins",
      link: "https://zoom.us/j/123456789",
      description: "Introduction to Django framework and basic concepts",
      status: "upcoming",
      isNew: true,
      relatedTask: "Django Learning Path",
      relatedProject: "Backend Development Training"
    },
    {
      id: 2,
      title: "React Advanced Workshop",
      type: "training",
      participants: ["Frontend Team", "UI/UX Team"],
      date: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0],
      time: "14:00",
      duration: "90 mins",
      link: "https://zoom.us/j/987654321",
      description: "Advanced React patterns and best practices",
      status: "upcoming",
      isNew: true,
      relatedTask: "React Mastery",
      relatedProject: "Frontend Development Training"
    },
    {
      id: 3,
      title: "Project Kickoff Meeting",
      type: "video",
      participants: ["Project Team", "Stakeholders"],
      date: new Date().toISOString().split('T')[0], // Today
      time: "11:00",
      duration: "60 mins",
      link: "https://teams.microsoft.com/l/meetup-join/123",
      description: "Initial meeting for the new e-commerce project",
      status: "upcoming",
      relatedTask: "Project Planning",
      relatedProject: "E-commerce Platform"
    },
    {
      id: 4,
      title: "Code Review Session",
      type: "video",
      participants: ["Dev Team", "Tech Lead"],
      date: "2023-06-05",
      time: "15:00",
      duration: "45 mins",
      link: "https://teams.microsoft.com/l/meetup-join/456",
      description: "Weekly code review for current sprint",
      status: "completed",
      relatedTask: "Code Quality",
      relatedProject: "Development Process"
    },
    {
      id: 5,
      title: "Django REST Framework Workshop",
      type: "training",
      participants: ["Backend Developers"],
      date: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
      time: "13:30",
      duration: "150 mins",
      link: "https://zoom.us/j/555555555",
      description: "Building REST APIs with Django REST Framework",
      status: "upcoming",
      isNew: true,
      relatedTask: "API Development",
      relatedProject: "Backend Development Training"
    },
    {
      id: 6,
      title: "React Hooks Deep Dive",
      type: "training",
      participants: ["Frontend Developers"],
      date: new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0],
      time: "09:00",
      duration: "120 mins",
      link: "https://zoom.us/j/666666666",
      description: "Comprehensive session on React Hooks and state management",
      status: "upcoming",
      relatedTask: "React Advanced Concepts",
      relatedProject: "Frontend Development Training"
    },
    {
      id: 7,
      title: "Python Basics Completed Session",
      type: "training",
      participants: ["All Trainees"],
      date: "2023-05-20",
      time: "10:00",
      duration: "120 mins",
      link: "https://zoom.us/j/777777777",
      description: "Introduction to Python programming language",
      status: "completed",
      relatedTask: "Python Fundamentals",
      relatedProject: "Backend Development Training"
    },
    {
      id: 8,
      title: "Project Status Review",
      type: "video",
      participants: ["Project Team", "Managers"],
      date: "2023-05-15",
      time: "14:00",
      duration: "60 mins",
      link: "https://teams.microsoft.com/l/meetup-join/789",
      description: "Monthly project status review meeting",
      status: "completed",
      relatedTask: "Project Reporting",
      relatedProject: "E-commerce Platform"
    }
  ]);

  const [filter, setFilter] = useState("upcoming");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("meetings");

  // Sample tasks and projects data focused on training
  const [tasks] = useState([
    { id: 1, title: "Django Learning Path", priority: "high", status: "in-progress" },
    { id: 2, title: "React Mastery", priority: "high", status: "in-progress" },
    { id: 3, title: "Project Planning", priority: "medium", status: "pending" },
    { id: 4, title: "API Development", priority: "medium", status: "in-progress" },
    { id: 5, title: "Code Quality", priority: "low", status: "completed" },
    { id: 6, title: "React Advanced Concepts", priority: "medium", status: "pending" },
    { id: 7, title: "Python Fundamentals", priority: "high", status: "completed" },
    { id: 8, title: "Project Reporting", priority: "medium", status: "completed" }
  ]);

  const [projects] = useState([
    { id: 1, title: "Backend Development Training", status: "active" },
    { id: 2, title: "Frontend Development Training", status: "active" },
    { id: 3, title: "E-commerce Platform", status: "active" },
    { id: 4, title: "Development Process", status: "active" }
  ]);

  // Function to check if a meeting is completed based on date and time
  const isMeetingCompleted = (meetingDate, meetingTime) => {
    const now = new Date();
    const meetingDateTime = new Date(`${meetingDate}T${meetingTime}`);
    return meetingDateTime < now;
  };

  // Update meeting status based on current time
  useEffect(() => {
    const updatedMeetings = meetings.map(meeting => {
      if (meeting.status === "upcoming" && isMeetingCompleted(meeting.date, meeting.time)) {
        return { ...meeting, status: "completed" };
      }
      return meeting;
    });
    
    // Only update if there are changes to prevent infinite loops
    if (JSON.stringify(updatedMeetings) !== JSON.stringify(meetings)) {
      setMeetings(updatedMeetings);
    }
  }, [meetings]);

  // Check for new meetings and show notifications
  useEffect(() => {
    const newMeetings = meetings.filter(m => m.isNew);
    if (newMeetings.length > 0) {
      newMeetings.forEach(meeting => {
        toast.info(
          <div className="p-2">
            <p className="font-semibold">📅 New Session: {meeting.title}</p>
            <p className="text-sm">{meeting.date} at {meeting.time}</p>
            {meeting.relatedTask && (
              <div className="mt-1 flex items-center text-xs text-blue-600">
                <FaTasks className="mr-1" /> Related to: {meeting.relatedTask}
              </div>
            )}
          </div>,
          {
            autoClose: 6000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            className: 'border-l-4 border-teal-500'
          }
        );
      });
      
      // Mark as seen after notification
      setMeetings(prev => prev.map(m => ({...m, isNew: false})));
    }
  }, [meetings]);

  const filteredMeetings = meetings.filter(meeting => {
    const matchesFilter = filter === "all" || meeting.status === filter;
    const matchesSearch = meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         meeting.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (meeting.relatedTask && meeting.relatedTask.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (meeting.relatedProject && meeting.relatedProject.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const getMeetingIcon = (type) => {
    switch (type) {
      case "video": return <FaVideo className={`${colors.meetings.video} p-2 rounded-lg`} />;
      case "call": return <FaPhone className={`${colors.meetings.call} p-2 rounded-lg`} />;
      case "in-person": return <FaMapMarkerAlt className={`${colors.meetings.inPerson} p-2 rounded-lg`} />;
      case "training": return <FaLaptopCode className={`${colors.meetings.training} p-2 rounded-lg`} />;
      default: return <FaCalendarAlt className="text-purple-500 text-xl" />;
    }
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    return `${hour > 12 ? hour - 12 : hour}:${minutes} ${hour >= 12 ? 'PM' : 'AM'}`;
  };

  const handleJoinMeeting = (meeting) => {
    if (meeting.type === "video" || meeting.type === "call" || meeting.type === "training") {
      window.open(meeting.link, "_blank");
    } else {
      toast.info(
        <div>
          <p className="font-semibold">📍 Meeting Location</p>
          <p>{meeting.location}</p>
          {meeting.relatedTask && (
            <div className="mt-2 flex items-center text-sm text-blue-600">
              <FaTasks className="mr-1" /> Related task: {meeting.relatedTask}
            </div>
          )}
        </div>,
        {
          autoClose: 5000,
          className: 'border-l-4 border-blue-500'
        }
      );
    }
  };

  // Group meetings by category and status
  const trainingMeetings = filteredMeetings.filter(m => m.type === "training");
  const projectMeetings = filteredMeetings.filter(m => m.type === "video" || m.type === "in-person");

  // Separate completed meetings for display in a different section
  const upcomingTrainingMeetings = trainingMeetings.filter(m => m.status === "upcoming");
  const completedTrainingMeetings = trainingMeetings.filter(m => m.status === "completed");
  
  const upcomingProjectMeetings = projectMeetings.filter(m => m.status === "upcoming");
  const completedProjectMeetings = projectMeetings.filter(m => m.status === "completed");

  return (
    <div className={`p-6 ${colors.dashboard.background} min-h-screen`}>
      <ToastContainer position="top-right" />
      
      {/* Header with Tabs */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex items-center gap-4">
          <div className={`p-3 ${colors.dashboard.primary} rounded-lg text-white`}>
            <FaCalendarAlt className="text-2xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Training Sessions & Meetings</h1>
            <p className="text-gray-600">View and manage your training sessions and project meetings</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`px-4 py-2 font-medium text-sm ${activeTab === "meetings" ? 'border-b-2 border-teal-500 text-teal-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab("meetings")}
        >
          All Sessions
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${activeTab === "training" ? 'border-b-2 border-teal-500 text-teal-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab("training")}
        >
          Training Sessions
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${activeTab === "projects" ? 'border-b-2 border-teal-500 text-teal-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab("projects")}
        >
          Project Meetings
        </button>
      </div>

      {/* Filters */}
      <div className={`${colors.dashboard.card} rounded-xl shadow-sm p-4 mb-6`}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search training sessions, meetings, or projects..."
              className="pl-10 w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none bg-white"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Sessions</option>
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === "meetings" || activeTab === "training" || activeTab === "projects" ? (
        <div className="space-y-8">
          {/* Upcoming Training Sessions Section */}
          {(activeTab === "meetings" || activeTab === "training") && upcomingTrainingMeetings.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaLaptopCode className="text-purple-500 mr-2" /> Upcoming Training Sessions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {upcomingTrainingMeetings.map(meeting => (
                  <motion.div
                    key={meeting.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`${colors.dashboard.card} rounded-xl shadow-sm overflow-hidden border-l-4 border-purple-500 p-5`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getMeetingIcon(meeting.type)}
                        <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                          Upcoming
                        </span>
                      </div>
                      {meeting.isNew && (
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                          New
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {meeting.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4">{meeting.description}</p>
                    
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-2">
                        <FaClock className="text-gray-400" />
                        <span>
                          {new Date(meeting.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} • {formatTime(meeting.time)} ({meeting.duration})
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <FaUserFriends className="text-gray-400" />
                        <span>{meeting.participants.length} participant{meeting.participants.length !== 1 ? 's' : ''}</span>
                      </div>
                    </div>
                    
                    {meeting.relatedProject && (
                      <div className="mb-4">
                        <span className="flex items-center text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded">
                          <FaProjectDiagram className="mr-1" /> {meeting.relatedProject}
                        </span>
                      </div>
                    )}
                    
                    <button
                      onClick={() => handleJoinMeeting(meeting)}
                      className={`w-full px-4 py-2 rounded-lg flex items-center justify-center gap-2 ${
                        colors.dashboard.primary
                      } hover:${colors.dashboard.primaryHover} text-white transition-colors`}
                    >
                      Join Training Session
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Completed Training Sessions Section */}
          {(activeTab === "meetings" || activeTab === "training") && completedTrainingMeetings.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaLaptopCode className="text-gray-500 mr-2" /> Completed Training Sessions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {completedTrainingMeetings.map(meeting => (
                  <motion.div
                    key={meeting.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`${colors.dashboard.card} rounded-xl shadow-sm overflow-hidden border-l-4 border-gray-400 p-5 opacity-80`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getMeetingIcon(meeting.type)}
                        <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                          Completed
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-500 mb-2">
                      {meeting.title}
                    </h3>
                    
                    <p className="text-gray-500 text-sm mb-4">{meeting.description}</p>
                    
                    <div className="space-y-2 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-2">
                        <FaClock className="text-gray-400" />
                        <span>
                          {new Date(meeting.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} • {formatTime(meeting.time)} ({meeting.duration})
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <FaUserFriends className="text-gray-400" />
                        <span>{meeting.participants.length} participant{meeting.participants.length !== 1 ? 's' : ''}</span>
                      </div>
                    </div>
                    
                    {meeting.relatedProject && (
                      <div className="mb-4">
                        <span className="flex items-center text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          <FaProjectDiagram className="mr-1" /> {meeting.relatedProject}
                        </span>
                      </div>
                    )}
                    
                    <div className="text-center py-2 text-sm text-gray-500">
                      This session has been completed
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Upcoming Project Meetings Section */}
          {(activeTab === "meetings" || activeTab === "projects") && upcomingProjectMeetings.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaProjectDiagram className="text-teal-500 mr-2" /> Upcoming Project Meetings
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {upcomingProjectMeetings.map(meeting => (
                  <motion.div
                    key={meeting.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`${colors.dashboard.card} rounded-xl shadow-sm overflow-hidden border-l-4 border-teal-500 p-5`}
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="mt-1">
                          {getMeetingIcon(meeting.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-800">
                                {meeting.title}
                                {meeting.isNew && (
                                  <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                                    New
                                  </span>
                                )}
                              </h3>
                              <p className="text-gray-600 mt-1 text-sm">{meeting.description}</p>
                              
                              {/* Related task and project */}
                              {(meeting.relatedTask || meeting.relatedProject) && (
                                <div className="mt-2 flex flex-wrap gap-2">
                                  {meeting.relatedTask && (
                                    <span className="flex items-center text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                                      <FaTasks className="mr-1" /> {meeting.relatedTask}
                                    </span>
                                  )}
                                  {meeting.relatedProject && (
                                    <span className="flex items-center text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded">
                                      <FaProjectDiagram className="mr-1" /> {meeting.relatedProject}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-teal-100 text-teal-800">
                                Upcoming
                              </span>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <FaClock className="text-gray-400" />
                              <span>
                                {new Date(meeting.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} • {formatTime(meeting.time)} ({meeting.duration})
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <FaUserFriends className="text-gray-400" />
                              <span>{meeting.participants.length} participant{meeting.participants.length !== 1 ? 's' : ''}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleJoinMeeting(meeting)}
                          className={`px-4 py-2 rounded-lg flex items-center justify-center gap-2 ${
                            meeting.type === "in-person" 
                              ? "bg-gray-100 hover:bg-gray-200 text-gray-800" 
                              : `${colors.dashboard.primary} hover:${colors.dashboard.primaryHover} text-white`
                          } transition-colors`}
                        >
                          {meeting.type === "video" ? "Join Meeting" : "View Location"}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Completed Project Meetings Section */}
          {(activeTab === "meetings" || activeTab === "projects") && completedProjectMeetings.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaProjectDiagram className="text-gray-500 mr-2" /> Completed Project Meetings
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {completedProjectMeetings.map(meeting => (
                  <motion.div
                    key={meeting.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`${colors.dashboard.card} rounded-xl shadow-sm overflow-hidden border-l-4 border-gray-400 p-5 opacity-80`}
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="mt-1">
                          {getMeetingIcon(meeting.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-500">
                                {meeting.title}
                              </h3>
                              <p className="text-gray-500 mt-1 text-sm">{meeting.description}</p>
                              
                              {/* Related task and project */}
                              {(meeting.relatedTask || meeting.relatedProject) && (
                                <div className="mt-2 flex flex-wrap gap-2">
                                  {meeting.relatedTask && (
                                    <span className="flex items-center text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                      <FaTasks className="mr-1" /> {meeting.relatedTask}
                                    </span>
                                  )}
                                  {meeting.relatedProject && (
                                    <span className="flex items-center text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                      <FaProjectDiagram className="mr-1" /> {meeting.relatedProject}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                                Completed
                              </span>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                              <FaClock className="text-gray-400" />
                              <span>
                                {new Date(meeting.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} • {formatTime(meeting.time)} ({meeting.duration})
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <FaUserFriends className="text-gray-400" />
                              <span>{meeting.participants.length} participant{meeting.participants.length !== 1 ? 's' : ''}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center text-sm text-gray-500">
                        This meeting has been completed
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {((activeTab === "meetings" && filteredMeetings.length === 0) ||
            (activeTab === "training" && trainingMeetings.length === 0) ||
            (activeTab === "projects" && projectMeetings.length === 0)) && (
            <div className={`${colors.dashboard.card} rounded-xl shadow-sm p-8 text-center`}>
              <FaCalendarAlt className="mx-auto text-gray-300 text-4xl mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                No {activeTab === "training" ? "training sessions" : activeTab === "projects" ? "project meetings" : "sessions"} found
              </h3>
              <p className="text-gray-500 mb-4">
                {searchTerm ? "Try a different search term" : `No ${activeTab === "training" ? "training sessions" : activeTab === "projects" ? "project meetings" : "sessions"} scheduled yet`}
              </p>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default MeetingsPage;