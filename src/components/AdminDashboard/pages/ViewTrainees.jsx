import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TraineeCard from "./TraineeCard";
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
      meetingAttendance: { totalMeetings: 15, attended: 14, attendancePercentage: 93 },
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
      meetingAttendance: { totalMeetings: 12, attended: 10, attendancePercentage: 83 },
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
      meetingAttendance: { totalMeetings: 18, attended: 17, attendancePercentage: 94 },
    },
    {
      name: "Sandhya",
      empId: "T204",
      batch: "Python-02",
      email: "sandhya@company.com",
      phone: "1112223344",
      domain: "Python Development",
      assignedBatch: "Python-02",
      assignedTasks: 5,
      performance: 88,
      meetingAttendance: { totalMeetings: 15, attended: 14, attendancePercentage: 93 },
    },
  ];

  useEffect(() => {
    setFilterBatch("all");
  }, [filterDomain]);

  const availableBatches = [
    ...new Set(
      traineesData
        .filter((t) => filterDomain === "all" || t.domain === filterDomain)
        .map((t) => t.batch)
    ),
  ];

  const filteredTrainees = traineesData.filter((trainee) => {
    const matchesSearch =
      trainee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainee.empId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBatch = filterBatch === "all" || trainee.batch === filterBatch;
    const matchesDomain = filterDomain === "all" || trainee.domain === filterDomain;
    return matchesSearch && matchesBatch && matchesDomain;
  });

  const totalTrainees = traineesData.length;
  const avgAttendance = Math.round(
    traineesData.reduce((sum, t) => sum + t.meetingAttendance.attendancePercentage, 0) / totalTrainees
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
              <ChevronDown size={16} className={`transition-transform ${showFilters ? "rotate-180" : ""}`} />
            </button>

            {/* Domain Filter */}
            <div className={`${showFilters ? "block" : "hidden"} md:block`}>
              <select
                value={filterDomain}
                onChange={(e) => setFilterDomain(e.target.value)}
                className="w-full md:w-auto px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              >
                <option value="all">All Domains</option>
                <option value="Python Development">Python Development</option>
                <option value="Java Development">Java Development</option>
                <option value="Frontend Development">Frontend Development</option>
              </select>
            </div>

            {/* Batch Filter */}
            <div className={`${showFilters ? "block" : "hidden"} md:block`}>
              <select
                value={filterBatch}
                onChange={(e) => setFilterBatch(e.target.value)}
                className="w-full md:w-auto px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              >
                <option value="all">All Batches</option>
                {availableBatches.map((batch) => (
                  <option key={batch} value={batch}>
                    {batch}
                  </option>
                ))}
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
        <TraineeCard
          trainees={filteredTrainees}
          onRowClick={(trainee) => navigate(`/admin/trainee/${trainee.empId}`)}
        />


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
