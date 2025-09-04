import React, { useState } from "react";
import { Link } from "react-router-dom";

const initialData = [
  {
    name: "John Doe",
    trainerId: "T101",
    batches: "PY-01, PY-02",
    traineeCount: 35,
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    domain: "Full Stack Development",
    performance: 92,
    experience: "5 years",
    joinDate: "2022-03-15",
    meetings: [
      { date: "2023-10-15", topic: "React Fundamentals", duration: "2h" },
      { date: "2023-10-17", topic: "State Management", duration: "1.5h" },
      { date: "2023-10-20", topic: "API Integration", duration: "2h" }
    ]
  },
  {
    name: "Jane Smith",
    trainerId: "T102",
    batches: "JA-02, JA-03",
    traineeCount: 20,
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    email: "jane.smith@example.com",
    phone: "+1 (555) 987-6543",
    domain: "Data Science",
    performance: 87,
    experience: "4 years",
    joinDate: "2022-05-22",
    meetings: [
      { date: "2023-10-16", topic: "Python Basics", duration: "2h" },
      { date: "2023-10-19", topic: "Data Visualization", duration: "2h" }
    ]
  },
  // Add the rest of your initialData objects here
];

export default function EmployeeManagement() {
  const [data] = useState(initialData);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [view, setView] = useState("grid"); // 'grid' or 'detail'
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDomain, setFilterDomain] = useState("all");

  // Get unique domains for filter
  const domains = ["all", ...new Set(data.map(emp => emp.domain))];

  // Filter employees based on search and domain
  const filteredEmployees = data.filter(emp => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.trainerId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDomain = filterDomain === "all" || emp.domain === filterDomain;
    return matchesSearch && matchesDomain;
  });

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
    setView("detail");
  };

  const handleBackToList = () => {
    setView("grid");
    setSelectedEmployee(null);
  };

  const getPerformanceColor = (score) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-yellow-600";
    if (score >= 70) return "text-orange-600";
    return "text-red-600";
  };

  const getPerformanceBgColor = (score) => {
    if (score >= 90) return "bg-green-100";
    if (score >= 80) return "bg-yellow-100";
    if (score >= 70) return "bg-orange-100";
    return "bg-red-100";
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
            {view === "detail" ? (
              <div className="flex items-center">
                <button
                  onClick={handleBackToList}
                  className="mr-4 p-2 rounded-full hover:bg-blue-100 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                </button>
                Employee Details
              </div>
            ) : (
              "Employee Management"
            )}
          </h2>

          {view === "grid" && (
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400 absolute left-3 top-2.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              <select
                value={filterDomain}
                onChange={(e) => setFilterDomain(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
              >
                {domains.map((domain) => (
                  <option key={domain} value={domain}>
                    {domain === "all" ? "All Domains" : domain}
                  </option>
                ))}
              </select>

              {/* Link to Add Employee Page */}
              <Link
                to="/add-employee"
                className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                    clipRule="evenodd"
                  />
                </svg>
                ADD EMPLOYEE
              </Link>
            </div>
          )}
        </div>

        {/* Employee Grid */}
        {view === "grid" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEmployees.map((emp) => (
              <div
                key={emp.trainerId}
                className="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer border border-gray-100"
                onClick={() => handleEmployeeClick(emp)}
              >
                <div className="relative">
                  <div className="h-24 bg-gradient-to-r from-blue-400 to-indigo-400"></div>
                  <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                    <img
                      src={emp.photo}
                      alt={emp.name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  </div>
                </div>
                <div className="pt-14 pb-5 px-5 text-center">
                  <h3 className="text-lg font-bold text-gray-800">{emp.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">ID: {emp.trainerId}</p>
                  <p className="text-sm text-gray-600 mb-3">{emp.domain}</p>

                  <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                    <span className="flex items-center">
                      {emp.traineeCount} Trainees
                    </span>
                    <span className={`flex items-center font-semibold ${getPerformanceColor(emp.performance)}`}>
                      {emp.performance}%
                    </span>
                  </div>

                  <div className={`bg-blue-50 rounded-lg p-3 text-left ${getPerformanceBgColor(emp.performance)}`}>
                    <p className="text-xs font-medium text-blue-800 mb-1">Batches:</p>
                    <p className="text-xs">{emp.batches}</p>
                  </div>
                </div>
              </div>
            ))}

            {filteredEmployees.length === 0 && (
              <div className="col-span-full text-center py-12 bg-white rounded-2xl shadow-md">
                <p className="text-gray-500">
                  {searchTerm || filterDomain !== "all"
                    ? "Try adjusting your search or filter criteria"
                    : "No employees available"}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Employee Detail View */}
      
{view === "detail" && selectedEmployee && (
  <div className="bg-white rounded-2xl shadow-md overflow-hidden p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
    {/* Left Column */}
    <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3">
      <img
        src={selectedEmployee.photo}
        alt={selectedEmployee.name}
        className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow-lg"
      />
      <h3 className="text-2xl font-bold">{selectedEmployee.name}</h3>
      <p className="text-gray-500">ID: {selectedEmployee.trainerId}</p>
      <p className="text-gray-500">Email: {selectedEmployee.email}</p>
      <p className="text-gray-500">Phone: {selectedEmployee.phone}</p>
      <p className="text-gray-500">Domain: {selectedEmployee.domain}</p>
      <p className="text-gray-500">Experience: {selectedEmployee.experience}</p>
      <p className="text-gray-500">Join Date: {selectedEmployee.joinDate}</p>
      <p className="text-gray-500">Batches: {selectedEmployee.batches}</p>
      <button
        className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        onClick={handleBackToList}
      >
        ← Back to List
      </button>
    </div>

    {/* Middle Column: Performance Metrics */}
    <div className="flex flex-col justify-center space-y-4 text-center md:text-left">
      <h4 className="text-lg font-semibold">Performance Metrics</h4>
      <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
        <p className="text-sm font-medium">Overall Score</p>
        <div className="w-full bg-gray-200 rounded-full h-4 mt-1">
          <div
            className="bg-blue-600 h-4 rounded-full"
            style={{ width: `${selectedEmployee.performance}%` }}
          ></div>
        </div>
        <p className="text-green-600 font-semibold mt-1">{selectedEmployee.performance}%</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-blue-50 p-4 rounded-xl text-center">
          <p className="font-semibold text-lg">{selectedEmployee.traineeCount}</p>
          <p className="text-sm text-gray-500">Trainees</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-xl text-center">
          <p className="font-semibold text-lg">{selectedEmployee.meetings.length}</p>
          <p className="text-sm text-gray-500">Sessions</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-xl text-center">
          <p className="font-semibold text-lg">112.0</p>
          <p className="text-sm text-gray-500">Avg. Hours/Day</p>
        </div>
        <div className="bg-green-50 p-4 rounded-xl text-center">
          <p className="font-semibold text-lg">9.2</p>
          <p className="text-sm text-gray-500">Satisfaction</p>
        </div>
      </div>
    </div>

    {/* Right Column: Recent Sessions */}
    <div className="flex flex-col justify-center space-y-3">
      <h4 className="text-lg font-semibold text-center md:text-left">Recent Sessions</h4>
      {selectedEmployee.meetings.map((meeting, idx) => (
        <div
          key={idx}
          className="bg-gray-50 p-4 rounded-xl shadow-sm flex justify-between items-center"
        >
          <div>
            <p className="font-medium">{meeting.topic}</p>
            <p className="text-sm text-gray-500">{meeting.date}</p>
          </div>
          <span className="text-sm text-blue-600 font-semibold">{meeting.duration}</span>
        </div>
      ))}
    </div>
  </div>
)}
      </div>
    </div>
  );
}