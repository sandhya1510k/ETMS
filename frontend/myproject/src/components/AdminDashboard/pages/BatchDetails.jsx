import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

// Dummy trainers data
const trainers = [
  {
    name: "John Doe",
    trainerId: "T101",
    batches: "PY-01, PY-02",
    traineeCount: 35,
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    domain: "Python, Data Science",
    performance: 92,
    experience: "5 years"
  },
  {
    name: "Jane Smith",
    trainerId: "T102",
    batches: "JA-02, JA-03",
    traineeCount: 20,
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    email: "jane.smith@example.com",
    phone: "+1 (555) 987-6543",
    domain: "Java, Spring Framework",
    performance: 87,
    experience: "4 years"
  },
];

const batches = [
  { 
    batchId: "PY-01", 
    domain: "Python", 
    trainees: 20, 
    trainers: ["John Doe"], 
    start: "2025-08-01", 
    end: "2025-09-01",
    status: "Active",
    progress: 65,
    description: "Full Stack Python Development with Django and React"
  },
  { 
    batchId: "JA-02", 
    domain: "Java", 
    trainees: 15, 
    trainers: ["Jane Smith"], 
    start: "2025-08-05", 
    end: "2025-09-05",
    status: "Active",
    progress: 45,
    description: "Enterprise Java Development with Spring Boot"
  },
];

// Dummy trainees data
const trainees = [
  {
    name: "Alice Brown",
    empId: "T201",
    batch: "PY-01",
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
    email: "alice@company.com",
    phone: "1112223333",
    domain: "Python Development",
    performance: 88,
    attendance: 93,
    completedModules: 7,
    totalModules: 10,
    joinDate: "2025-08-01"
  },
  {
    name: "Bob Green",
    empId: "T202",
    batch: "JA-02",
    photo: "https://randomuser.me/api/portraits/men/66.jpg",
    email: "bob@company.com",
    phone: "4445556666",
    domain: "Java Development",
    performance: 80,
    attendance: 83,
    completedModules: 5,
    totalModules: 12,
    joinDate: "2025-08-05"
  },
   {
    name: "Bob Green",
    empId: "T202",
    batch: "JA-02",
    photo: "https://randomuser.me/api/portraits/men/66.jpg",
    email: "bob@company.com",
    phone: "4445556666",
    domain: "Java Development",
    performance: 80,
    attendance: 83,
    completedModules: 5,
    totalModules: 12,
    joinDate: "2025-08-05"
  },
  {
    name: "Carol White",
    empId: "T203",
    batch: "PY-01",
    photo: "https://randomuser.me/api/portraits/women/67.jpg",
    email: "carol@company.com",
    phone: "7778889999",
    domain: "Python Development",
    performance: 94,
    attendance: 94,
    completedModules: 9,
    totalModules: 10,
    joinDate: "2025-08-01"
  },
  {
    name: "David Black",
    empId: "T204",
    batch: "JA-02",
    photo: "https://randomuser.me/api/portraits/men/68.jpg",
    email: "david@company.com",
    phone: "0001112222",
    domain: "Java Development",
    performance: 75,
    attendance: 78,
    completedModules: 4,
    totalModules: 12,
    joinDate: "2025-08-05"
  }
];

// Dummy schedule data
const schedule = [
  { date: "2025-08-15", time: "09:00 - 11:00", topic: "Python Fundamentals", trainer: "John Doe", type: "Lecture" },
  { date: "2025-08-16", time: "10:00 - 12:00", topic: "Object-Oriented Programming", trainer: "John Doe", type: "Workshop" },
  { date: "2025-08-17", time: "14:00 - 16:00", topic: "Django Framework", trainer: "John Doe", type: "Hands-on" },
  { date: "2025-08-18", time: "11:00 - 13:00", topic: "Database Integration", trainer: "John Doe", type: "Lecture" },
  { date: "2025-08-19", time: "09:00 - 12:00", topic: "REST APIs", trainer: "John Doe", type: "Workshop" },
];

const BatchDetails = () => {
  const { batchId } = useParams();
  const batch = batches.find(b => b.batchId === batchId);
  const [activeTab, setActiveTab] = useState("trainees");
  const batchTrainers = batch ? batch.trainers.map(name => trainers.find(t => t.name === name)).filter(Boolean) : [];

  if (!batch) {
    return (
      <div className="p-8 text-center min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
        <div>
          <h2 className="text-2xl font-bold text-red-600 mb-4">Batch not found</h2>
          <Link to="/batches" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Batch Management
          </Link>
        </div>
      </div>
    );
  }

  // Filter trainees for this batch
  const batchTrainees = trainees.filter(t => t.batch === batch.batchId);

  // Calculate batch statistics
  const avgPerformance = batchTrainees.length > 0 
    ? Math.round(batchTrainees.reduce((sum, t) => sum + t.performance, 0) / batchTrainees.length) 
    : 0;
  
  const avgAttendance = batchTrainees.length > 0 
    ? Math.round(batchTrainees.reduce((sum, t) => sum + t.attendance, 0) / batchTrainees.length) 
    : 0;

  const getProgressColor = (progress) => {
    if (progress < 30) return "bg-red-500";
    if (progress < 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getPerformanceColor = (score) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-yellow-600";
    if (score >= 70) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-7xl mx-auto">
        {/* Header with back button */}
        <div className="mb-6">
          <Link 
            to="/admin/batches" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Batch Management
          </Link>
        </div>

        {/* Batch header */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6 border-l-4 border-blue-500">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                {batch.batchId} - {batch.domain}
              </h1>
              <p className="text-gray-600 mb-4">{batch.description}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">Start:</span> {batch.start}
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">End:</span> {batch.end}
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="font-medium">Trainees:</span> {batchTrainees.length} / {batch.trainees}
                </div>
                <div className="flex items-center">
                  <span className="font-medium">Status:</span>
                  <span className={`ml-1 px-2 py-1 rounded-full text-xs font-medium ${
                    batch.status === "Active" ? "bg-green-100 text-green-800" :
                    batch.status === "Upcoming" ? "bg-blue-100 text-blue-800" :
                    "bg-gray-100 text-gray-800"
                  }`}>
                    {batch.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="text-sm font-medium text-gray-700 mb-1">Batch Progress</div>
              <div className="w-48 bg-gray-200 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${getProgressColor(batch.progress)}`}
                  style={{ width: `${batch.progress}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-600 mt-1">{batch.progress}% Complete</div>
            </div>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-2xl shadow-md p-5 border-t-4 border-blue-400">
            <div className="flex items-center">
              <div className="rounded-lg bg-blue-100 p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Average Performance</p>
                <p className={`text-2xl font-bold ${getPerformanceColor(avgPerformance)}`}>
                  {avgPerformance}%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5 border-t-4 border-green-400">
            <div className="flex items-center">
              <div className="rounded-lg bg-green-100 p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Average Attendance</p>
                <p className="text-2xl font-bold text-green-600">
                  {avgAttendance}%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5 border-t-4 border-purple-400">
            <div className="flex items-center">
              <div className="rounded-lg bg-purple-100 p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Days Remaining</p>
                <p className="text-2xl font-bold text-purple-600">
                  {Math.ceil((new Date(batch.end) - new Date()) / (1000 * 60 * 60 * 24))}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="bg-white rounded-2xl shadow-md mb-6 overflow-hidden">
          <div className="border-b">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab("trainees")}
                className={`py-4 px-6 text-center font-medium text-sm border-b-2 ${
                  activeTab === "trainees"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Trainees
              </button>
              <button
                onClick={() => setActiveTab("trainers")}
                className={`py-4 px-6 text-center font-medium text-sm border-b-2 ${
                  activeTab === "trainers"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Trainers
              </button>
              <button
                onClick={() => setActiveTab("schedule")}
                className={`py-4 px-6 text-center font-medium text-sm border-b-2 ${
                  activeTab === "schedule"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Schedule
              </button>
            </nav>
          </div>

          {/* Tab content */}
          <div className="p-6">
            {activeTab === "trainees" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Trainees ({batchTrainees.length})</h3>
                {batchTrainees.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p>No trainees enrolled in this batch yet.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {batchTrainees.map(trainee => (
                      <div key={trainee.empId} className="bg-gray-50 rounded-xl p-5 hover:shadow-md transition-shadow">
                        <div className="flex items-center mb-4">
                          <img src={trainee.photo} alt={trainee.name} className="w-16 h-16 rounded-full object-cover border-2 border-white shadow" />
                          <div className="ml-4">
                            <h4 className="font-bold text-gray-800">{trainee.name}</h4>
                            <p className="text-sm text-gray-600">ID: {trainee.empId}</p>
                            <p className="text-xs text-gray-500">Joined: {trainee.joinDate}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                          <div>
                            <p className="text-gray-600">Performance</p>
                            <p className={`font-semibold ${getPerformanceColor(trainee.performance)}`}>
                              {trainee.performance}%
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Attendance</p>
                            <p className="font-semibold text-green-600">{trainee.attendance}%</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Progress</p>
                            <p className="font-semibold">
                              {trainee.completedModules}/{trainee.totalModules}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Domain</p>
                            <p className="font-semibold truncate">{trainee.domain}</p>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <button className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors">
                            View Profile
                          </button>
                          <button className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full hover:bg-green-200 transition-colors">
                            Contact
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "trainers" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Trainers ({batchTrainers.length})</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {batchTrainers.map(trainer => (
                    <div key={trainer.trainerId} className="bg-gray-50 rounded-xl p-5 flex items-start">
                      <img src={trainer.photo} alt={trainer.name} className="w-20 h-20 rounded-full object-cover border-2 border-white shadow" />
                      <div className="ml-5 flex-1">
                        <h4 className="font-bold text-gray-800 text-lg">{trainer.name}</h4>
                        <p className="text-sm text-gray-600">ID: {trainer.trainerId}</p>
                        <p className="text-sm text-gray-600">{trainer.domain}</p>
                        <p className="text-sm text-gray-600">{trainer.experience} experience</p>
                        
                        <div className="mt-3 flex items-center">
                          <span className="text-sm text-gray-600 mr-2">Performance:</span>
                          <span className={`font-semibold ${getPerformanceColor(trainer.performance)}`}>
                            {trainer.performance}%
                          </span>
                        </div>
                        
                        <div className="mt-3 flex space-x-2">
                          <button className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors">
                            Message
                          </button>
                          <button className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full hover:bg-green-200 transition-colors">
                            Schedule
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "schedule" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Training Schedule</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Topic</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trainer</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {schedule.map((session, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{session.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{session.time}</td>
                          <td className="px-6 py-4 text-sm text-gray-800">{session.topic}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{session.trainer}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                              {session.type}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchDetails;