import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FlaskConical,
  Wrench,
  BarChart3,
  Users,
  FileText,
  Coffee,
  Database,
  Clock,
} from "lucide-react";

const batchesData = [
  { 
    batchId: "PY-01", 
    domain: "Python", 
    trainees: 20, 
    trainers: ["John Doe"], 
    start: "2025-08-01", 
    end: "2025-09-01",
    status: "Active",
    progress: 65
  },
  { 
    batchId: "JA-02", 
    domain: "Java", 
    trainees: 15, 
    trainers: ["Jane Smith"], 
    start: "2025-08-05", 
    end: "2025-09-05",
    status: "Upcoming",
    progress: 0
  },
  { 
    batchId: "DE-03", 
    domain: "DevOps", 
    trainees: 18, 
    trainers: ["Robert Johnson", "Sarah Wilson"], 
    start: "2025-07-15", 
    end: "2025-08-30",
    status: "Active",
    progress: 85
  },
  { 
    batchId: "TE-04", 
    domain: "Testing", 
    trainees: 12, 
    trainers: ["Michael Brown"], 
    start: "2025-06-10", 
    end: "2025-07-25",
    status: "Completed",
    progress: 100
  },
];

const domains = ["Python", "Java", "Testing", "DevOps", "Power BI", "SAP"];

const BatchManagement = () => {
  const [selectedDomain, setSelectedDomain] = useState(null);
  const navigate = useNavigate();

  const filteredBatches = selectedDomain 
    ? batchesData.filter(b => b.domain === selectedDomain) 
    : batchesData;

  const handleDomainSelect = (domain) => {
    setSelectedDomain(selectedDomain === domain ? null : domain);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Upcoming": return "bg-blue-100 text-blue-800";
      case "Completed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getProgressColor = (progress) => {
    if (progress < 30) return "bg-red-500";
    if (progress < 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  const renderDomainIcon = (domain) => {
    const iconStyle = "w-6 h-6 mb-2";
    
    switch(domain) {
      case "Python":
        return <Database className={`${iconStyle} text-blue-600`} />;
      case "Java":
        return <Coffee className={`${iconStyle} text-red-600`} />;
      case "Testing":
        return <FlaskConical className={`${iconStyle} text-green-600`} />;
      case "DevOps":
        return <Wrench className={`${iconStyle} text-yellow-600`} />;
      case "Power BI":
        return <BarChart3 className={`${iconStyle} text-yellow-500`} />;
      case "HR":
        return <Users className={`${iconStyle} text-purple-600`} />;
      default:
        return <FileText className={`${iconStyle} text-gray-600`} />;
    }
  };

  return (
    <div className="p-6 min-h-screen" style={{
      background: "linear-gradient(135deg, rgba(240, 249, 255, 0.9) 0%, rgba(224, 242, 254, 0.9) 100%)",
    }}>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-blue-800">Batch Management</h2>
      </div>

      {/* Domain Filter Cards */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Filter by Domain</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {domains.map((domain) => (
            <div 
              key={domain} 
              onClick={() => handleDomainSelect(domain)}
              className={`p-4 rounded-xl shadow-sm cursor-pointer transition-all duration-300 ${
                selectedDomain === domain 
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white" 
                  : "bg-white hover:bg-blue-50 text-gray-700"
              }`}
            >
              <div className="flex flex-col items-center justify-center">
                {renderDomainIcon(domain)}
                <span className="font-medium text-center">{domain}</span>
                <span className="text-sm mt-1">
                  {batchesData.filter(b => b.domain === domain).length} batches
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {selectedDomain && (
          <div className="mt-4 flex justify-end">
            <button 
              className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
              onClick={() => setSelectedDomain(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Clear Filter
            </button>
          </div>
        )}
      </div>

      {/* Batches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredBatches.map((batch) => (
          <div key={batch.batchId} className="bg-white rounded-2xl shadow-md overflow-hidden border-t-4 border-blue-400 transition-all duration-300 hover:shadow-lg">
            <div className="p-5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-blue-800">{batch.batchId}</h3>
                  <p className="text-sm text-gray-600">{batch.domain}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(batch.status)}`}>
                  {batch.status}
                </span>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between items-center text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{batch.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${getProgressColor(batch.progress)}`}
                    style={{ width: `${batch.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-blue-600" />
                  {batch.trainees} Trainees
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-blue-600" />
                  {batch.start} to {batch.end}
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-1">Trainers:</p>
                <p className="text-sm text-gray-600">{batch.trainers.join(", ")}</p>
              </div>
              
              <div className="flex gap-2">
                <button 
                  className="flex-1 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg text-sm hover:bg-blue-200 transition-colors"
                  onClick={() => navigate(`/batch/${batch.batchId}`)}
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredBatches.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl shadow-md">
          <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">No batches found</h3>
          <p className="text-gray-500">
            {selectedDomain 
              ? `No batches available for ${selectedDomain} domain` 
              : "No batches have been created yet"}
          </p>
        </div>
      )}
    </div>
  );
};

export default BatchManagement;
