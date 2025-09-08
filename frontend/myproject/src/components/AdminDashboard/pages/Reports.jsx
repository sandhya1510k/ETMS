import React, { useState, useEffect } from "react";
import {
  FiPieChart,
  FiBarChart2,
  FiFilter,
  FiDownload,
  FiCalendar,
  FiUsers,
  FiBookOpen,
  FiTrendingUp,
  FiClock
} from "react-icons/fi";
import { Pie, Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title
} from "chart.js";
import { motion } from "framer-motion";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title
);

const Reports = () => {
  const [activeReport, setActiveReport] = useState("performance");
  const [dateRange, setDateRange] = useState("last30");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Performance report data
  const performanceData = {
    labels: ["Java", "Python", "DevOps", "Testing", "HR", "Power BI"],
    datasets: [
      {
        label: "Average Score (%)",
        data: [85, 92, 78, 82, 88, 75],
        backgroundColor: [
          "#0ea5e9",
          "#10b981",
          "#f59e0b",
          "#8b5cf6",
          "#ec4899",
          "#ef4444"
        ],
        borderWidth: 0
      }
    ]
  };

  // Completion rate data
  const completionData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Completion Rate (%)",
        data: [75, 80, 78, 85, 90, 88, 92],
        fill: true,
        borderColor: "#0ea5e9",
        backgroundColor: "rgba(14, 165, 233, 0.1)",
        tension: 0.4
      }
    ]
  };

  // Trainee progress data
  const progressData = {
    labels: ["Not Started", "In Progress", "Completed", "Behind Schedule"],
    datasets: [
      {
        label: "Trainees",
        data: [15, 42, 48, 15],
        backgroundColor: [
          "#94a3b8",
          "#f59e0b",
          "#10b981",
          "#ef4444"
        ],
        borderWidth: 0
      }
    ]
  };

  // Training hours data
  const hoursData = {
    labels: ["Java", "Python", "DevOps", "Testing", "HR", "Power BI"],
    datasets: [
      {
        label: "Training Hours",
        data: [120, 95, 80, 65, 50, 40],
        backgroundColor: "#0ea5e9",
        borderRadius: 6
      }
    ]
  };

  // Report data table
  const reportData = [
    { id: 1, name: "Java Fundamentals", trainees: 25, completion: 92, avgScore: 85, status: "Completed" },
    { id: 2, name: "Python for Data Science", trainees: 18, completion: 88, avgScore: 92, status: "Completed" },
    { id: 3, name: "DevOps Essentials", trainees: 15, completion: 78, avgScore: 78, status: "In Progress" },
    { id: 4, name: "Software Testing", trainees: 12, completion: 65, avgScore: 82, status: "In Progress" },
    { id: 5, name: "HR Compliance", trainees: 10, completion: 95, avgScore: 88, status: "Completed" },
    { id: 6, name: "Power BI Training", trainees: 8, completion: 60, avgScore: 75, status: "Behind Schedule" }
  ];

  // Report types
  const reportTypes = [
    { id: "performance", name: "Performance", icon: <FiTrendingUp /> },
    { id: "completion", name: "Completion", icon: <FiBookOpen /> },
    { id: "progress", name: "Progress", icon: <FiUsers /> },
    { id: "hours", name: "Training Hours", icon: <FiClock /> }
  ];

  // Date range options
  const dateOptions = [
    { id: "last7", name: "Last 7 Days" },
    { id: "last30", name: "Last 30 Days" },
    { id: "last90", name: "Last 90 Days" },
    { id: "custom", name: "Custom Range" }
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-100 text-emerald-800";
      case "In Progress":
        return "bg-amber-100 text-amber-800";
      case "Behind Schedule":
        return "bg-rose-100 text-rose-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Training Reports</h1>
          <p className="text-slate-600">Analyze training performance and progress</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-slate-200 hover:bg-slate-50">
            <FiDownload size={16} />
            <span>Export</span>
          </button>
          <button 
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-slate-200 hover:bg-slate-50"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <FiFilter size={16} />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      {isFilterOpen && (
        <motion.div 
          className="bg-white rounded-xl p-4 shadow-sm border border-slate-200"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Date Range</label>
              <div className="flex flex-wrap gap-2">
                {dateOptions.map(option => (
                  <button
                    key={option.id}
                    className={`px-3 py-1.5 text-sm rounded-lg ${dateRange === option.id ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                    onClick={() => setDateRange(option.id)}
                  >
                    {option.name}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Training Program</label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                <option value="">All Programs</option>
                <option value="java">Java Fundamentals</option>
                <option value="python">Python for Data Science</option>
                <option value="devops">DevOps Essentials</option>
                <option value="testing">Software Testing</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                <option value="">All Status</option>
                <option value="completed">Completed</option>
                <option value="inprogress">In Progress</option>
                <option value="behind">Behind Schedule</option>
              </select>
            </div>
          </div>
        </motion.div>
      )}

      {/* Report Type Selector */}
      <div className="bg-white rounded-xl p-2 shadow-sm border border-slate-200">
        <div className="flex flex-wrap gap-2">
          {reportTypes.map(report => (
            <button
              key={report.id}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg ${activeReport === report.id ? 'bg-indigo-100 text-indigo-700' : 'text-slate-700 hover:bg-slate-100'}`}
              onClick={() => setActiveReport(report.id)}
            >
              {report.icon}
              <span>{report.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">Total Trainees</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">120</h3>
            </div>
            <div className="p-3 bg-indigo-100 rounded-lg text-indigo-600">
              <FiUsers size={20} />
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-3">+12% from last month</p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">Avg. Completion</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">82%</h3>
            </div>
            <div className="p-3 bg-emerald-100 rounded-lg text-emerald-600">
              <FiBookOpen size={20} />
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-3">+5% from last month</p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">Avg. Score</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">86%</h3>
            </div>
            <div className="p-3 bg-amber-100 rounded-lg text-amber-600">
              <FiTrendingUp size={20} />
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-3">+3% from last month</p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">Training Hours</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">450</h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
              <FiClock size={20} />
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-3">+22% from last month</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Performance by Training Program</h3>
          <div className="h-80">
            <Bar 
              data={performanceData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                      color: 'rgba(0,0,0,0.05)'
                    }
                  },
                  x: {
                    grid: {
                      display: false
                    }
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Completion Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Completion Rate Trend</h3>
          <div className="h-80">
            <Line 
              data={completionData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                      color: 'rgba(0,0,0,0.05)'
                    }
                  },
                  x: {
                    grid: {
                      display: false
                    }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Additional Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Trainee Progress Overview</h3>
          <div className="h-80">
            <Pie 
              data={progressData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom'
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Hours Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Training Hours by Program</h3>
          <div className="h-80">
            <Bar 
              data={hoursData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: 'rgba(0,0,0,0.05)'
                    }
                  },
                  x: {
                    grid: {
                      display: false
                    }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Report Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800">Training Program Details</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left py-3 px-6 text-slate-600 font-medium">Training Program</th>
                <th className="text-left py-3 px-6 text-slate-600 font-medium">Trainees</th>
                <th className="text-left py-3 px-6 text-slate-600 font-medium">Completion</th>
                <th className="text-left py-3 px-6 text-slate-600 font-medium">Avg. Score</th>
                <th className="text-left py-3 px-6 text-slate-600 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {reportData.map(item => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="py-4 px-6 text-slate-800">{item.name}</td>
                  <td className="py-4 px-6 text-slate-800">{item.trainees}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="w-16 bg-slate-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-indigo-600 h-2 rounded-full" 
                          style={{ width: `${item.completion}%` }}
                        ></div>
                      </div>
                      <span>{item.completion}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-800">{item.avgScore}%</td>
                  <td className="py-4 px-6">
                    <span className={`text-xs font-medium py-1 px-3 rounded-full ${getStatusClass(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;