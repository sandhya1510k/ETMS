import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  FaCalendarAlt, FaCheckCircle, FaTimesCircle, 
  FaInfoCircle, FaChevronLeft, FaChevronRight,
  FaRegCalendarAlt, FaHistory, FaFilter,
  FaDotCircle, FaRegDotCircle
} from "react-icons/fa";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

// Sample attendance data from July 1st to current date
const generateAttendanceData = () => {
  const startDate = moment("2025-07-01");
  const endDate = moment(); 
  const data = [];
  let id = 1;
  
  // Loop through each day from July 1st to today
  for (let date = moment(startDate); date.isSameOrBefore(endDate); date.add(1, 'day')) {
    const dayOfWeek = date.day(); // 0 (Sunday) to 6 (Saturday)
    const dateStr = date.format("YYYY-MM-DD");
    
    // Default status based on day of week
    let status = "present";
    let notes = "On time";
    
    // Mark weekends as weekoff
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      status = "weekoff";
      notes = dayOfWeek === 0 ? "Sunday" : "Saturday";
    }
    
    // Add some random variations for realism
    if (status === "present") {
      // 10% chance of being absent
      if (Math.random() < 0.1 && !date.isSame(moment(), 'day')) {
        status = "absent";
        notes = ["Sick leave", "Personal leave", "Emergency"][Math.floor(Math.random() * 3)];
      }
      // 5% chance of being half-day
    
      // 15% chance of no session
      else if (Math.random() < 0.15 && !date.isSame(moment(), 'day')) {
        status = "no-session";
        notes = ["No class scheduled", "Holiday", "No session"][Math.floor(Math.random() * 3)];
      }
    }

    data.push({
      id: id++,
      date: dateStr,
      status,
      notes
    });
  }

  return data;
};

const allAttendanceData = generateAttendanceData();

// Custom Event Component with compact badges
const CustomEvent = ({ event }) => {
  const getStatusStyles = () => {
    switch(event.status) {
      case "present":
        return { 
          bg: "bg-green-100", 
          text: "text-green-800", 
          icon: <FaDotCircle className="text-green-500" size={10} />,
          title: "P"
        };
      case "absent":
        return { 
          bg: "bg-red-100", 
          text: "text-red-800", 
          icon: <FaTimesCircle className="text-red-500" size={10} />,
          title: "A"
        };
      case "weekoff":
        return { 
          bg: "bg-blue-100", 
          text: "text-blue-800", 
          icon: <FaInfoCircle className="text-blue-500" size={10} />,
          title: "W"
        };
      case "no-session":
        return { 
          bg: "bg-gray-100", 
          text: "text-gray-800", 
          icon: <FaRegDotCircle className="text-gray-500" size={10} />,
          title: "N"
        };
      default:
        
    }
  };

  const statusStyles = getStatusStyles();

  return (
    <div className="w-full h-full flex items-center justify-center p-1">
      <span 
        className={`${statusStyles.bg} ${statusStyles.text} px-2 py-1 text-xs font-semibold rounded-full flex items-center gap-1`}
        title={event.status}
      >
        {statusStyles.icon}
        {statusStyles.title}
      </span>
    </div>
  );
};

export default function Attendance() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState(null);
  const [currentDate, setCurrentDate] = useState(moment());
  const [viewMode, setViewMode] = useState("calendar");
  const [showMonthSelector, setShowMonthSelector] = useState(false);
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter attendance data for the current month view
  const getFilteredAttendance = () => {
    const startOfMonth = moment(currentDate).startOf('month').format('YYYY-MM-DD');
    const endOfMonth = moment(currentDate).endOf('month').format('YYYY-MM-DD');
    
    let filtered = allAttendanceData.filter(record => 
      record.date >= startOfMonth && record.date <= endOfMonth
    );

    if (statusFilter !== "all") {
      filtered = filtered.filter(record => record.status === statusFilter);
    }

    return filtered;
  };

  // Convert to calendar events
  const getCalendarEvents = () => {
    return getFilteredAttendance().map((record) => ({
      id: record.id,
      title: record.status,
      start: new Date(record.date),
      end: new Date(record.date),
      status: record.status,
      notes: record.notes,
    }));
  };

  // Calculate attendance stats for the current month
  const calculateStats = () => {
    const filteredData = getFilteredAttendance();
    const totalDays = moment(currentDate).daysInMonth();
    const presentDays = filteredData.filter(d => d.status === "present").length;
    const absentDays = filteredData.filter(d => d.status === "absent").length;
    const halfDays = filteredData.filter(d => d.status === "half-day").length;
    const weekoffDays = filteredData.filter(d => d.status === "weekoff").length;
    const noSessionDays = filteredData.filter(d => d.status === "no-session").length;

    return [
      { name: "Total Days", value: totalDays, trend: "in month" },
      { name: "Present", value: presentDays, trend: `${Math.round((presentDays/totalDays)*100)}% attendance` },
      { name: "Absent", value: absentDays, trend: absentDays > 0 ? "Needs improvement" : "Perfect" },
      { name: "No Session", value: noSessionDays, trend: noSessionDays > 0 ? "No classes" : "All days active" },
    ];
  };

  const [stats, setStats] = useState(calculateStats());

  // Update stats when month or filter changes
  useEffect(() => {
    setStats(calculateStats());
    setSelectedRecords(getFilteredAttendance());
  }, [currentDate, statusFilter]);

  const handleSelectEvent = (event) => {
    setDetails({
      date: moment(event.start).format("MMMM Do, YYYY"),
      status: event.status,
      notes: event.notes,
    });
    setShowDetails(true);
  };

  const handleSelectSlot = (slotInfo) => {
    setSelectedDate(slotInfo.start);
  };

  const eventStyleGetter = () => {
    return {
      style: {
        backgroundColor: 'transparent',
        border: 'none',
        boxShadow: 'none',
        padding: 0,
      },
    };
  };

  const dayPropGetter = (date) => {
    const isWeekend = date.getDay() === 0 || date.getDay() === 6; 
    const isToday = moment(date).isSame(moment(), 'day');
    
    if (isWeekend) {
      return {
        className: 'weekend-day',
        style: {
          backgroundColor: '#F8FAFC',
        },
      };
    }
    
    if (isToday) {
      return {
        style: {
          backgroundColor: '#EFF6FF',
        },
      };
    }
    
    return {};
  };

  const navigateToPreviousMonth = () => {
    setCurrentDate(moment(currentDate).subtract(1, 'month'));
  };

  const navigateToNextMonth = () => {
    setCurrentDate(moment(currentDate).add(1, 'month'));
  };

  const jumpToCurrentMonth = () => {
    setCurrentDate(moment());
  };

  const handleMonthSelect = (months) => {
    setCurrentDate(moment().subtract(months, 'month'));
    setShowMonthSelector(false);
  };

  return (
    <motion.div
      className="p-6 overflow-y-auto min-h-screen bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
        <FaRegCalendarAlt className="text-teal-500" />
        Attendance Records 
        <button 
          onClick={() => setShowMonthSelector(!showMonthSelector)}
          className="ml-auto text-sm bg-blue-50 hover:bg-blue-100 text-teal-600 px-3 py-1 rounded-full flex items-center gap-1"
        >
          <FaHistory size={14} />
          View History
        </button>
      </h2>

      {/* Month Selector Dropdown */}
      {showMonthSelector && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-3 rounded-lg shadow-md mb-4 w-64"
        >
          <h4 className="font-medium text-gray-700 mb-2">Select Previous Month</h4>
          <div className="grid grid-cols-2 gap-2">
            {[1, 2, 3, 4, 5, 6].map(month => (
              <button
                key={month}
                onClick={() => handleMonthSelect(month)}
                className="text-sm bg-gray-100 hover:bg-gray-200 p-2 rounded"
              >
                {moment().subtract(month, 'month').format("MMM YYYY")}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
          >
            <h3 className="text-sm font-medium text-gray-500">{stat.name}</h3>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.trend}</p>
          </motion.div>
        ))}
      </div>

      {/* View and Filter Controls */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <div className="flex bg-white p-1 rounded-lg shadow-inner w-fit">
          <button
            onClick={() => setViewMode("calendar")}
            className={`px-4 py-2 rounded-md ${viewMode === "calendar" ? "bg-teal-500 text-white" : "text-gray-600"}`}
          >
            Calendar View
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`px-4 py-2 rounded-md ${viewMode === "table" ? "bg-teal-500 text-white" : "text-gray-600"}`}
          >
            Table View
          </button>
        </div>

        <div className="flex items-center gap-2 bg-white p-1 rounded-lg shadow-inner w-fit">
          <FaFilter className="text-gray-500 ml-2" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-md border-none bg-transparent focus:outline-none"
          >
            <option value="all">All Status</option>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
           
            <option value="weekoff">Weekoff</option>
            <option value="no-session">No Session</option>
          </select>
        </div>
      </div>

      {/* Calendar View */}
      {viewMode === "calendar" && (
        <div className="bg-white p-5 rounded-xl shadow mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <FaCalendarAlt className="text-teal-500" /> 
              {currentDate.format("MMMM YYYY")} Attendance
            </h3>
            <div className="flex items-center gap-4">
              <button 
                onClick={navigateToPreviousMonth}
                className="p-1 rounded-full hover:bg-gray-100"
                disabled={currentDate.format('YYYY-MM') === "2025-07"} 
              >
                <FaChevronLeft 
                  className={`${currentDate.format('YYYY-MM') === "2025-07" ? 'text-gray-300' : 'text-gray-600'}`} 
                />
              </button>
              <button 
                onClick={jumpToCurrentMonth}
                className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded"
              >
                Today
              </button>
              <button 
                onClick={navigateToNextMonth}
                className="p-1 rounded-full hover:bg-gray-100"
                disabled={currentDate.format('YYYY-MM') === moment().format('YYYY-MM')}
              >
                <FaChevronRight 
                  className={`${currentDate.format('YYYY-MM') === moment().format('YYYY-MM') ? 'text-gray-300' : 'text-gray-600'}`} 
                />
              </button>
            </div>
          </div>

          <div style={{ height: 500 }}>
            <Calendar
              localizer={localizer}
              events={getCalendarEvents()}
              startAccessor="start"
              endAccessor="end"
              defaultView="month"
              views={["month"]}
              onSelectEvent={handleSelectEvent}
              onSelectSlot={handleSelectSlot}
              selectable
              components={{
                event: CustomEvent,
              }}
              eventPropGetter={eventStyleGetter}
              dayPropGetter={dayPropGetter}
              date={currentDate.toDate()}
              onNavigate={(date) => setCurrentDate(moment(date))}
            />
          </div>
        </div>
      )}

      {/* Table View */}
      {viewMode === "table" && (
        <div className="bg-white p-5 rounded-xl shadow mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <FaCalendarAlt className="text-teal-500" /> 
              {currentDate.format("MMMM YYYY")} Records
              <span className="text-sm font-normal text-gray-500 ml-2">
                (Filtered: {statusFilter === "all" ? "All" : statusFilter})
              </span>
            </h3>
            <div className="flex items-center gap-4">
              <button 
                onClick={navigateToPreviousMonth}
                className="p-1 rounded-full hover:bg-gray-100"
                disabled={currentDate.format('YYYY-MM') === "2025-07"}
              >
                <FaChevronLeft 
                  className={`${currentDate.format('YYYY-MM') === "2025-07" ? 'text-gray-300' : 'text-gray-600'}`} 
                />
              </button>
              <button 
                onClick={jumpToCurrentMonth}
                className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded"
              >
                Current Month
              </button>
              <button 
                onClick={navigateToNextMonth}
                className="p-1 rounded-full hover:bg-gray-100"
                disabled={currentDate.format('YYYY-MM') === moment().format('YYYY-MM')}
              >
                <FaChevronRight 
                  className={`${currentDate.format('YYYY-MM') === moment().format('YYYY-MM') ? 'text-gray-300' : 'text-gray-600'}`} 
                />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Day
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {selectedRecords.length > 0 ? (
                  selectedRecords.map((record) => (
                    <tr 
                      key={record.id} 
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => {
                        setDetails({
                          date: moment(record.date).format("MMMM Do, YYYY"),
                          status: record.status,
                          notes: record.notes,
                        });
                        setShowDetails(true);
                      }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {moment(record.date).format("MMM D, YYYY")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {moment(record.date).format("dddd")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            record.status === "present"
                              ? "bg-green-100 text-green-800"
                              : record.status === "absent"
                              ? "bg-red-100 text-red-800"
                              : record.status === "weekoff"
                              ? "bg-blue-100 text-blue-800"
                              : record.status === "no-session"
                              ? "bg-gray-100 text-gray-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {record.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.notes}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                      No records found for the selected filter
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Attendance Details Modal */}
      {showDetails && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowDetails(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-4">Attendance Details</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">{details.date}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Day</p>
                <p className="font-medium">{moment(details.date).format("dddd")}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-medium capitalize flex items-center gap-1">
                  {details.status === "present" ? (
                    <FaDotCircle className="text-green-500" />
                  ) : details.status === "absent" ? (
                    <FaTimesCircle className="text-red-500" />
                  ) : details.status === "weekoff" ? (
                    <FaInfoCircle className="text-blue-500" />
                  ) : details.status === "no-session" ? (
                    <FaRegDotCircle className="text-gray-500" />
                  ) : (
                    <FaInfoCircle className="text-yellow-500" />
                  )}
                  {details.status}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Notes</p>
                <p className="font-medium">{details.notes}</p>
              </div>
            </div>
            <button
              className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => setShowDetails(false)}
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}