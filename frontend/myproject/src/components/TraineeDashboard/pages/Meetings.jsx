import React, { useState, useEffect } from "react";
import {
  FaCalendarAlt, FaVideo, FaPhone, FaMapMarkerAlt,
  FaUserFriends, FaClock, FaTasks, FaProjectDiagram, 
  FaLaptopCode, FaSearch, FaChevronLeft, FaChevronRight
} from "react-icons/fa";
import { motion } from "framer-motion";

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
  meetings: {
    video: 'bg-blue-100 text-blue-800',
    call: 'bg-green-100 text-green-800',
    inPerson: 'bg-orange-100 text-orange-800',
    training: 'bg-indigo-100 text-indigo-800',
    completed: 'bg-gray-100 text-gray-800'
  }
};

// Sample meeting data
const initialMeetings = [
  {
    id: 1,
    title: "Django Fundamentals Training",
    type: "training",
    participants: ["John D.", "Sarah M.", "Alex T.", "Lisa R."],
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
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
    date: new Date().toISOString().split('T')[0],
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
  }
];

// Calendar Component
const CalendarView = ({ meetings, selectedDate, onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };
  
  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };
  
  const hasMeetingsOnDate = (dateStr) => {
    return meetings.some(meeting => meeting.date === dateStr);
  };
  
  const getMeetingsOnDate = (dateStr) => {
    return meetings.filter(meeting => meeting.date === dateStr);
  };
  
  const changeMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  
  // Generate days array
  const days = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  
  // Add days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
    days.push({
      day: i,
      date: dateStr,
      hasMeetings: hasMeetingsOnDate(dateStr)
    });
  }
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={() => changeMonth(-1)}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <FaChevronLeft className="text-gray-600" />
        </button>
        <h3 className="text-lg font-semibold">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <button 
          onClick={() => changeMonth(1)}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <FaChevronRight className="text-gray-600" />
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-1">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {days.map((dayInfo, index) => {
          if (!dayInfo) {
            return <div key={`empty-${index}`} className="h-10"></div>;
          }
          
          const isSelected = selectedDate === dayInfo.date;
          const isToday = dayInfo.date === formatDate(new Date());
          
          return (
            <div
              key={dayInfo.date}
              className={`h-10 flex items-center justify-center rounded-full cursor-pointer text-sm relative
                ${isToday ? 'border-2 border-teal-500' : ''}
                ${isSelected ? 'bg-teal-500 text-white' : 'hover:bg-gray-100'}
              `}
              onClick={() => onDateSelect(dayInfo.date)}
            >
              {dayInfo.day}
              {dayInfo.hasMeetings && (
                <div className="absolute bottom-1 w-1 h-1 rounded-full bg-teal-500"></div>
              )}
            </div>
          );
        })}
      </div>
      
      {selectedDate && (
        <div className="mt-4 border-t pt-4">
          <h4 className="font-medium mb-2">
            Meetings on {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {getMeetingsOnDate(selectedDate).length > 0 ? (
              getMeetingsOnDate(selectedDate).map(meeting => (
                <div key={meeting.id} className="text-sm p-2 bg-gray-50 rounded">
                  <div className="font-medium">{meeting.title}</div>
                  <div className="text-gray-600">{meeting.time} • {meeting.type}</div>
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-500 text-center py-2">
                No meetings scheduled
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const MeetingsPage = () => {
  const [meetings, setMeetings] = useState(initialMeetings);
  const [filter, setFilter] = useState("upcoming");
  const [searchTerm, setSearchTerm] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

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
    
    if (JSON.stringify(updatedMeetings) !== JSON.stringify(meetings)) {
      setMeetings(updatedMeetings);
    }
  }, [meetings]);

  // Remove toast notification functionality
  useEffect(() => {
    // Mark all meetings as seen (no longer new) without showing notifications
    setMeetings(prev => prev.map(m => ({...m, isNew: false})));
  }, []);

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
      case "video": return <FaVideo className={`${colors.meetings.video} p-2 rounded-lg`} size={20} />;
      case "call": return <FaPhone className={`${colors.meetings.call} p-2 rounded-lg`} size={20} />;
      case "in-person": return <FaMapMarkerAlt className={`${colors.meetings.inPerson} p-2 rounded-lg`} size={20} />;
      case "training": return <FaLaptopCode className={`${colors.meetings.training} p-2 rounded-lg`} size={20} />;
      default: return <FaCalendarAlt className="text-purple-500" size={20} />;
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
      // For in-person meetings, just show the location info without toast
      alert(`📍 Meeting Location: ${meeting.location || 'No location specified'}`);
    }
  };

  // Meeting card component
  const MeetingCard = ({ meeting, isTraining = false }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`${colors.dashboard.card} rounded-xl shadow-sm overflow-hidden border-l-4 ${
        isTraining ? "border-purple-500" : "border-teal-500"
      } p-5 ${meeting.status === "completed" ? "opacity-80 border-gray-400" : ""}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {getMeetingIcon(meeting.type)}
          <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
            meeting.status === "upcoming" 
              ? isTraining ? "bg-purple-100 text-purple-800" : "bg-teal-100 text-teal-800"
              : "bg-gray-100 text-gray-800"
          }`}>
            {meeting.status === "upcoming" ? "Upcoming" : "Completed"}
          </span>
        </div>
        {meeting.isNew && meeting.status === "upcoming" && (
          <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
            New
          </span>
        )}
      </div>
      
      <h3 className={`text-lg font-semibold ${meeting.status === "completed" ? "text-gray-500" : "text-gray-800"} mb-2`}>
        {meeting.title}
      </h3>
      
      <p className={`text-sm mb-4 ${meeting.status === "completed" ? "text-gray-500" : "text-gray-600"}`}>
        {meeting.description}
      </p>
      
      <div className="space-y-2 text-sm mb-4">
        <div className={`flex items-center gap-2 ${meeting.status === "completed" ? "text-gray-500" : "text-gray-600"}`}>
          <FaClock className="text-gray-400" />
          <span>
            {new Date(meeting.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} • {formatTime(meeting.time)} ({meeting.duration})
          </span>
        </div>
        
        <div className={`flex items-center gap-2 ${meeting.status === "completed" ? "text-gray-500" : "text-gray-600"}`}>
          <FaUserFriends className="text-gray-400" />
          <span>{meeting.participants.length} participant{meeting.participants.length !== 1 ? 's' : ''}</span>
        </div>
      </div>
      
      {(meeting.relatedTask || meeting.relatedProject) && (
        <div className="mb-4 flex flex-wrap gap-2">
          {meeting.relatedTask && (
            <span className={`flex items-center text-xs px-2 py-1 rounded ${
              meeting.status === "completed" 
                ? "bg-gray-100 text-gray-700" 
                : "bg-blue-50 text-blue-700"
            }`}>
              <FaTasks className="mr-1" /> {meeting.relatedTask}
            </span>
          )}
          {meeting.relatedProject && (
            <span className={`flex items-center text-xs px-2 py-1 rounded ${
              meeting.status === "completed" 
                ? "bg-gray-100 text-gray-700" 
                : "bg-emerald-50 text-emerald-700"
            }`}>
              <FaProjectDiagram className="mr-1" /> {meeting.relatedProject}
            </span>
          )}
        </div>
      )}
      
      {meeting.status === "upcoming" ? (
        <button
          onClick={() => handleJoinMeeting(meeting)}
          className={`w-full px-4 py-2 rounded-lg flex items-center justify-center gap-2 ${
            colors.dashboard.primary
          } hover:${colors.dashboard.primaryHover} text-white transition-colors`}
        >
          {meeting.type === "in-person" ? "View Location" : "Join Session"}
        </button>
      ) : (
        <div className="text-center py-2 text-sm text-gray-500">
          This session has been completed
        </div>
      )}
    </motion.div>
  );

  return (
    <div className={`p-6 ${colors.dashboard.background} min-h-screen`}>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex items-center gap-4">
          <div className={`p-3 ${colors.dashboard.primary} rounded-lg text-white`}>
            <FaCalendarAlt className="text-2xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Training Sessions </h1>
            <p className="text-gray-600">View and manage your training sessions</p>
          </div>
        </div>
        
        <button
          onClick={() => setShowCalendar(!showCalendar)}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
            showCalendar ? 'bg-gray-200 text-gray-800' : `${colors.dashboard.primary} text-white`
          }`}
        >
          <FaCalendarAlt />
          {showCalendar ? 'Hide Calendar' : 'Show Calendar'}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content */}
        <div className={`${showCalendar ? 'lg:w-2/3' : 'w-full'}`}>
          {/* Filters */}
          <div className={`${colors.dashboard.card} rounded-xl shadow-sm p-4 mb-6`}>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search training sessions or meetings..."
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

          {/* Content */}
          <div className="space-y-8">
            {/* Training Sessions Section */}
            {filteredMeetings.filter(m => m.type === "training").length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <FaLaptopCode className="text-purple-500 mr-2" /> 
                  {filter === "completed" ? "Completed Training Sessions" : "Training Sessions"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredMeetings
                    .filter(m => m.type === "training")
                    .map(meeting => (
                      <MeetingCard key={meeting.id} meeting={meeting} isTraining={true} />
                    ))}
                </div>
              </div>
            )}

            {/* Other Meetings Section */}
            {filteredMeetings.filter(m => m.type !== "training").length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <FaCalendarAlt className="text-teal-500 mr-2" /> 
                  {filter === "completed" ? "Completed Meetings" : "Meetings"}
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {filteredMeetings
                    .filter(m => m.type !== "training")
                    .map(meeting => (
                      <MeetingCard key={meeting.id} meeting={meeting} />
                    ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {filteredMeetings.length === 0 && (
              <div className={`${colors.dashboard.card} rounded-xl shadow-sm p-8 text-center`}>
                <FaCalendarAlt className="mx-auto text-gray-300 text-4xl mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  No sessions found
                </h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm ? "Try a different search term" : "No sessions scheduled yet"}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Calendar Sidebar - Only shown when toggled */}
        {showCalendar && (
          <div className="lg:w-1/3 flex-shrink-0">
            <CalendarView 
              meetings={meetings} 
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
            />
            
            {selectedDate && (
              <div className={`${colors.dashboard.card} rounded-xl shadow-sm p-4 mt-4`}>
                <h3 className="text-lg font-semibold mb-3">
                  Meetings on {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </h3>
                <div className="space-y-3">
                  {meetings
                    .filter(meeting => meeting.date === selectedDate)
                    .map(meeting => (
                      <div key={meeting.id} className="p-3 border rounded-lg">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium">{meeting.title}</h4>
                            <p className="text-sm text-gray-600">{meeting.time} • {meeting.type}</p>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            meeting.status === "upcoming" ? "bg-teal-100 text-teal-800" : "bg-gray-100 text-gray-800"
                          }`}>
                            {meeting.status}
                          </span>
                        </div>
                        <p className="text-sm mt-2 text-gray-700">{meeting.description}</p>
                        {meeting.status === "upcoming" && (
                          <button
                            onClick={() => handleJoinMeeting(meeting)}
                            className={`mt-3 w-full px-3 py-1.5 text-sm rounded-lg ${colors.dashboard.primary} text-white`}
                          >
                            Join Meeting
                          </button>
                        )}
                      </div>
                    ))}
                  
                  {meetings.filter(meeting => meeting.date === selectedDate).length === 0 && (
                    <div className="text-center py-4 text-gray-500">
                      No meetings scheduled for this date
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MeetingsPage;