import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TraineeCard from "./TraineeCard";
// import { Search, Users, GraduationCap, TrendingUp } from "lucide-react";
import { Search, Users, GraduationCap, TrendingUp, Filter, ChevronDown } from "lucide-react";

const ViewTrainees = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBatch, setFilterBatch] = useState("all");
  const [filterDomain, setFilterDomain] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const traineesData = [
    {
      name: "Alice Brown",
      empId: "T201",
      batch: "Python-01",
      email: "alice@company.com",
      phone: "1112223333",
      domain: "Python Development",
      assignedBatch: "Python-01",
      assignedTasks: 5,
      performance: 88,
      meetingAttendance: {
        totalMeetings: 15,
        attended: 14,
        attendancePercentage: 93
      },
      tasks: [
        {
          title: "Build REST API with Flask",
          description: "Create a complete REST API using Flask framework with authentication",
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
      meetingAttendance: {
        totalMeetings: 12,
        attended: 10,
        attendancePercentage: 83
      },
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
      meetingAttendance: {
        totalMeetings: 18,
        attended: 17,
        attendancePercentage: 94
      },
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
    }
  ];

  const filteredTrainees = traineesData.filter((trainee) => {
    const matchesSearch =
      trainee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainee.empId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBatch = filterBatch === "all" || trainee.batch === filterBatch;
    const matchesDomain = filterDomain === "all" || trainee.domain.includes(filterDomain);

    return matchesSearch && matchesBatch && matchesDomain;
  });

  const totalTrainees = traineesData.length;
  const avgAttendance = Math.round(
    traineesData.reduce((sum, t) => sum + t.meetingAttendance.attendancePercentage, 0) /
      totalTrainees
  );
  const avgPerformance = Math.round(
    traineesData.reduce((sum, t) => sum + t.performance, 0) / totalTrainees
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 p-5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent mb-2">
            Trainee Management System
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Monitor progress, track performance, and manage trainee development with our comprehensive dashboard
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-slate-700">Total Trainees</span>
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Users className="text-blue-500" size={20} />
              </div>
            </div>
            <div className="text-slate-800">
              <div className="text-3xl font-bold">{totalTrainees}</div>
              <div className="text-sm text-slate-500 mt-1">Across all batches</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-slate-700">Average Attendance</span>
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <GraduationCap className="text-green-500" size={20} />
              </div>
            </div>
            <div className="text-slate-800">
              <div className="text-3xl font-bold text-green-600">{avgAttendance}%</div>
              <div className="text-sm text-slate-500 mt-1">Meeting attendance rate</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-slate-700">Average Performance</span>
              <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                <TrendingUp className="text-amber-500" size={20} />
              </div>
            </div>
            <div className="text-slate-800">
              <div className="text-3xl font-bold text-amber-600">{avgPerformance}%</div>
              <div className="text-sm text-slate-500 mt-1">Overall performance score</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute top-3 left-3 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search trainees by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>
            
            {/* Filter Toggle for Mobile */}
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              <Filter size={18} />
              <span>Filters</span>
              <ChevronDown size={16} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Domain Filter */}
            <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
              <select
                value={filterDomain}
                onChange={(e) => setFilterDomain(e.target.value)}
                className="w-full md:w-auto px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              >
                <option value="all">All Domains</option>
                <option value="Python">Python Development</option>
                <option value="Java">Java Development</option>
                <option value="Frontend">Frontend Development</option>
              </select>
            </div>
            
            {/* Batch Filter */}
            <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
              <select
                value={filterBatch}
                onChange={(e) => setFilterBatch(e.target.value)}
                className="w-full md:w-auto px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              >
                <option value="all">All Batches</option>
                <option value="Python-01">Python-01</option>
                <option value="Java-02">Java-02</option>
                <option value="React-03">React-03</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-slate-800">
            Trainees <span className="text-slate-500">({filteredTrainees.length})</span>
          </h2>
          {(searchTerm || filterBatch !== "all" || filterDomain !== "all") && (
            <button 
              onClick={() => {
                setSearchTerm("");
                setFilterBatch("all");
                setFilterDomain("all");
              }}
              className="text-sm text-blue-500 hover:text-blue-700 font-medium"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Trainee Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrainees.map((trainee) => (
            <TraineeCard
              key={trainee.empId}
              trainee={trainee}
              onClick={() => navigate(`/trainee/${trainee.empId}`)}
            />
          ))}
        </div>

        {filteredTrainees.length === 0 && (
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <Search className="text-slate-400" size={32} />
            </div>
            <h3 className="text-lg font-medium text-slate-700 mb-2">No trainees found</h3>
            <p className="text-slate-500 max-w-md mx-auto">
              No trainees match your current filters. Try adjusting your search criteria or clear all filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewTrainees;

























