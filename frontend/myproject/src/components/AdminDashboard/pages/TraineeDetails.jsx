import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiAward,
  FiBookOpen,
  FiUser,
  FiMail,
  FiPhone,
  FiCpu,
  FiUsers,
  FiTrendingUp,
  FiPieChart
} from "react-icons/fi";

const icons = {
  ArrowLeft: <FiArrowLeft />,
  Calendar: <FiCalendar />,
  CheckCircle: <FiCheckCircle />,
  Clock: <FiClock />,
  XCircle: <FiXCircle />,
  Trophy: <FiAward />,
  BookOpen: <FiBookOpen />,
  User: <FiUser />,
  Mail: <FiMail />,
  Phone: <FiPhone />,
  Cpu: <FiCpu />,
  Users: <FiUsers />,
  TrendingUp: <FiTrendingUp />,
  PieChart: <FiPieChart />
};

// --- your traineesData array here ---
const traineesData = [
  {
    name: "Alice Brown",
    empId: "T201",
    batch: "Python-01",
    email: "alice@company.com",
    phone: "1112223333",
    domain: "Python Development",
    assignedTasks: 5,
    performance: 88,
    tasks: [
      {
        title: "Build REST API with Flask",
        description:
          "Create a complete REST API using Flask framework with authentication",
        status: "completed",
        dueDate: "2024-08-15",
        score: 95
      },
      {
        title: "Data Analysis with Pandas",
        description: "Analyze customer data using Pandas and generate insights",
        status: "in-progress",
        dueDate: "2024-08-20",
        score: null
      },
      {
        title: "Web Scraping Project",
        description: "Build a web scraper to collect data from e-commerce sites",
        status: "pending",
        dueDate: "2024-08-25",
        score: null
      }
    ],
    assessments: [
      {
        title: "Python Fundamentals",
        type: "Technical Assessment",
        date: "2024-08-10",
        score: 92,
        maxScore: 100
      },
      {
        title: "Flask Framework",
        type: "Practical Assessment",
        date: "2024-08-12",
        score: 88,
        maxScore: 100
      }
    ],
    meetingAttendance: {
      totalMeetings: 15,
      attended: 14,
      late: 1,
      absent: 1,
      attendancePercentage: 93
    },
    recentMeetings: [
      { date: "2024-08-15", title: "Flask Advanced Concepts", status: "attended" },
      { date: "2024-08-14", title: "Database Integration", status: "attended" },
      { date: "2024-08-13", title: "API Design Patterns", status: "late" },
      { date: "2024-08-12", title: "Authentication & Security", status: "attended" },
      { date: "2024-08-11", title: "Testing Strategies", status: "absent" }
    ]
  },
  {
    name: "Bob Green",
    empId: "T202",
    batch: "Java-02",
    email: "bob@company.com",
    phone: "4445556666",
    domain: "Java Development",
    assignedBatch: "Java-02",
    assignedTasks: 4,
    performance: 80,
    tasks: [
      {
        title: "Spring Boot Application",
        description: "Build a microservice using Spring Boot with JPA",
        status: "completed",
        dueDate: "2024-08-14",
        score: 82
      },
      {
        title: "Database Design",
        description: "Design and implement relational database schema",
        status: "completed",
        dueDate: "2024-08-16",
        score: 78
      },
      {
        title: "Unit Testing with JUnit",
        description: "Write comprehensive unit tests for the application",
        status: "in-progress",
        dueDate: "2024-08-22",
        score: null
      }
    ],
    assessments: [
      {
        title: "Java Fundamentals",
        type: "Technical Assessment",
        date: "2024-08-08",
        score: 85,
        maxScore: 100
      },
      {
        title: "Spring Framework",
        type: "Practical Assessment",
        date: "2024-08-11",
        score: 75,
        maxScore: 100
      }
    ],
    meetingAttendance: {
      totalMeetings: 12,
      attended: 10,
      late: 1,
      absent: 2,
      attendancePercentage: 83
    },
    recentMeetings: [
      { date: "2024-08-15", title: "Spring Security", status: "attended" },
      { date: "2024-08-14", title: "Microservices Architecture", status: "late" },
      { date: "2024-08-13", title: "JPA Advanced", status: "attended" },
      { date: "2024-08-12", title: "REST API Best Practices", status: "absent" },
      { date: "2024-08-11", title: "Testing with JUnit", status: "attended" }
    ]
  },
  {
    name: "Carol White",
    empId: "T203",
    batch: "React-03",
    email: "carol@company.com",
    phone: "7778889999",
    domain: "Frontend Development",
    assignedBatch: "React-03",
    assignedTasks: 6,
    performance: 94,
    tasks: [
      {
        title: "React Component Library",
        description: "Build reusable component library with TypeScript",
        status: "completed",
        dueDate: "2024-08-13",
        score: 98
      },
      {
        title: "State Management with Redux",
        description: "Implement Redux for complex state management",
        status: "completed",
        dueDate: "2024-08-17",
        score: 92
      },
      {
        title: "Performance Optimization",
        description: "Optimize React app performance using best practices",
        status: "in-progress",
        dueDate: "2024-08-23",
        score: null
      }
    ],
    assessments: [
      {
        title: "React Fundamentals",
        type: "Technical Assessment",
        date: "2024-08-09",
        score: 96,
        maxScore: 100
      },
      {
        title: "TypeScript Advanced",
        type: "Practical Assessment",
        date: "2024-08-13",
        score: 94,
        maxScore: 100
      }
    ],
    meetingAttendance: {
      totalMeetings: 18,
      attended: 17,
      late: 1,
      absent: 0,
      attendancePercentage: 94
    },
    recentMeetings: [
      { date: "2024-08-15", title: "React Performance", status: "attended" },
      { date: "2024-08-14", title: "Advanced Hooks", status: "attended" },
      { date: "2024-08-13", title: "TypeScript Integration", status: "attended" },
      { date: "2024-08-12", title: "Component Design", status: "attended" },
      { date: "2024-08-11", title: "State Management", status: "late" }
    ]
  }
];

function getStatusColor(status) {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800 border-green-200";
    case "in-progress":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "pending":
      return "bg-slate-100 text-slate-800 border-slate-200";
    case "attended":
      return "bg-green-100 text-green-800 border-green-200";
    case "late":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "absent":
      return "bg-rose-100 text-rose-800 border-rose-200";
    default:
      return "bg-slate-100 text-slate-800 border-slate-200";
  }
}

function getStatusIcon(status) {
  switch (status) {
    case "completed":
    case "attended":
      return <FiCheckCircle className="inline mr-1" size={14} />;
    case "in-progress":
    case "late":
      return <FiClock className="inline mr-1" size={14} />;
    case "absent":
      return <FiXCircle className="inline mr-1" size={14} />;
    default:
      return <FiClock className="inline mr-1" size={14} />;
  }
}

const TraineeDetails = () => {
  const { empId } = useParams();
  const trainee = traineesData.find((t) => t.empId === empId);
  const [activeTab, setActiveTab] = useState("overview");

  if (!trainee) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 flex items-center justify-center p-6">
        <div className="text-center bg-white p-8 rounded-2xl shadow-sm max-w-md w-full">
          <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center mx-auto mb-4">
            <FiXCircle className="text-rose-500" size={24} />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Trainee Not Found</h1>
          <p className="text-slate-600 mb-6">The requested trainee could not be found in our system.</p>
          <Link 
            to="/trainees" 
            className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Back to Trainees
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 p-5">
      <div className="max-w-6xl mx-auto">
        {/* Back link */}
        <Link 
          to="/trainees" 
          className="inline-flex items-center text-blue-500 hover:text-blue-700 mb-6 transition-colors"
        >
          <FiArrowLeft className="mr-2" />
          Back to Trainees
        </Link>

        {/* Header */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6 border border-slate-100">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="h-20 w-20 flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold text-2xl">
              {trainee.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            
            {/* Details */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-slate-800 mb-1">{trainee.name}</h1>
              <p className="text-slate-600 text-lg mb-3">
                {trainee.domain} • {trainee.batch}
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <span className="inline-flex items-center text-sm bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
                  <FiUser className="mr-1" size={14} />
                  ID: {trainee.empId}
                </span>
                <span className="inline-flex items-center text-sm bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
                  <FiMail className="mr-1" size={14} />
                  {trainee.email}
                </span>
                <span className="inline-flex items-center text-sm bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
                  <FiPhone className="mr-1" size={14} />
                  {trainee.phone}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 text-center">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
              <FiUsers className="text-green-500" size={20} />
            </div>
            <div className="text-2xl font-bold text-green-600">
              {trainee.meetingAttendance.attendancePercentage}%
            </div>
            <div className="text-sm text-slate-600 mt-1">Attendance</div>
            <div className="text-xs text-slate-500">
              {trainee.meetingAttendance.attended}/{trainee.meetingAttendance.totalMeetings} meetings
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 text-center">
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-3">
              <FiTrendingUp className="text-amber-500" size={20} />
            </div>
            <div className="text-2xl font-bold text-amber-600">{trainee.performance}%</div>
            <div className="text-sm text-slate-600 mt-1">Performance</div>
          </div>
          
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 text-center">
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-3">
              <FiBookOpen className="text-indigo-500" size={20} />
            </div>
            <div className="text-2xl font-bold text-indigo-600">{trainee.assignedTasks}</div>
            <div className="text-sm text-slate-600 mt-1">Tasks</div>
          </div>
          
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 text-center">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-3">
              <FiAward className="text-purple-500" size={20} />
            </div>
            <div className="text-2xl font-bold text-purple-600">
              {trainee.assessments.length}
            </div>
            <div className="text-sm text-slate-600 mt-1">Assessments</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-6">
          <div className="flex overflow-x-auto">
            {["overview", "tasks", "assessments", "meetings"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 min-w-max py-4 px-6 capitalize font-medium transition-colors ${
                  activeTab === tab
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-slate-600 hover:text-slate-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          {/* Overview */}
          {activeTab === "overview" && (
            <div className="grid md:grid-cols-2 gap-6">
              <section>
                <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
                  <FiUser className="mr-2 text-blue-500" />
                  Personal Information
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-600">Employee ID</span>
                    <span className="font-medium">{trainee.empId}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-600">Email</span>
                    <span className="font-medium">{trainee.email}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-600">Phone</span>
                    <span className="font-medium">{trainee.phone}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-600">Domain</span>
                    <span className="font-medium">{trainee.domain}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-600">Batch</span>
                    <span className="font-medium">{trainee.batch}</span>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
                  <FiPieChart className="mr-2 text-blue-500" />
                  Performance Summary
                </h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-600">Overall Performance</span>
                      <span className="font-medium text-amber-600">{trainee.performance}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2.5">
                      <div
                        className="h-2.5 bg-amber-500 rounded-full"
                        style={{ width: `${trainee.performance}%` }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-600">Meeting Attendance</span>
                      <span className="font-medium text-green-600">{trainee.meetingAttendance.attendancePercentage}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2.5">
                      <div
                        className="h-2.5 bg-green-500 rounded-full"
                        style={{ width: `${trainee.meetingAttendance.attendancePercentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* Tasks */}
          {activeTab === "tasks" && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
                <FiBookOpen className="mr-2 text-blue-500" />
                Assigned Tasks ({trainee.tasks.length})
              </h2>
              
              {trainee.tasks.map((task, i) => (
                <div key={i} className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-slate-800 m-0">{task.title}</h3>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}
                    >
                      {getStatusIcon(task.status)}
                      {task.status.replace("-", " ")}
                    </span>
                  </div>
                  <p className="text-slate-600 mb-4">{task.description}</p>
                  <div className="flex justify-between items-center text-sm text-slate-500">
                    <div className="flex items-center">
                      <FiCalendar className="mr-1" size={14} />
                      Due: {task.dueDate}
                    </div>
                    {task.score != null && (
                      <div className="font-semibold text-green-600">
                        Score: {task.score}%
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Assessments */}
          {activeTab === "assessments" && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
                <FiAward className="mr-2 text-blue-500" />
                Assessments ({trainee.assessments.length})
              </h2>
              
              {trainee.assessments.map((assessment, i) => {
                const percent = Math.round(
                  (assessment.score / assessment.maxScore) * 100
                );
                return (
                  <div key={i} className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-800 m-0">{assessment.title}</h3>
                        <p className="text-slate-600 m-0">{assessment.type}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-green-600">
                          {assessment.score}/{assessment.maxScore}
                        </div>
                        <div className="text-xs text-slate-500">{percent}%</div>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-slate-500">
                      <FiCalendar className="mr-1" size={14} />
                      <span>Completed on {assessment.date}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Meetings */}
          {activeTab === "meetings" && (
            <div>
              <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
                <FiUsers className="mr-2 text-blue-500" />
                Meeting Attendance
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-center">
                <div className="bg-slate-50 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-slate-800">
                    {trainee.meetingAttendance.totalMeetings}
                  </div>
                  <div className="text-sm text-slate-600">Total</div>
                </div>
                <div className="bg-green-50 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-green-600">
                    {trainee.meetingAttendance.attended}
                  </div>
                  <div className="text-sm text-green-600">Attended</div>
                </div>
                <div className="bg-amber-50 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-amber-600">
                    {trainee.meetingAttendance.late}
                  </div>
                  <div className="text-sm text-amber-600">Late</div>
                </div>
                <div className="bg-rose-50 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-rose-600">
                    {trainee.meetingAttendance.absent}
                  </div>
                  <div className="text-sm text-rose-600">Absent</div>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Meetings</h3>
              <div className="space-y-3">
                {trainee.recentMeetings.map((meeting, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center border border-slate-200 p-4 rounded-xl hover:shadow-md transition-shadow"
                  >
                    <div>
                      <h4 className="font-medium text-slate-800 m-0">{meeting.title}</h4>
                      <p className="text-slate-500 m-0 text-sm">{meeting.date}</p>
                    </div>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(meeting.status)}`}
                    >
                      {getStatusIcon(meeting.status)}
                      <span>{meeting.status}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TraineeDetails;