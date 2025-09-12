import React from "react";
import { GraduationCap, Mail } from "lucide-react";

const TraineeCard = ({ trainees, onRowClick }) => {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full text-sm text-left text-slate-600">
        {/* Table Header */}
        <thead className="bg-slate-100 text-slate-700 text-xs uppercase">
          <tr>
            <th scope="col" className="px-6 py-3">ID</th>
            <th scope="col" className="px-6 py-3">Name</th>
            <th scope="col" className="px-6 py-3">Email</th>
            <th scope="col" className="px-6 py-3">Batch</th>
            <th scope="col" className="px-6 py-3">Domain</th>
            <th scope="col" className="px-6 py-3 text-center">Performance</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {trainees.map((trainee, idx) => (
            <tr
              key={trainee.empId}
              onClick={() => onRowClick?.(trainee)}
              className={`cursor-pointer hover:bg-slate-50 transition-colors ${
                idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"
              }`}
            >
              {/* ID */}
              <td className="px-6 py-4 font-medium text-slate-800">
                {trainee.empId}
              </td>

              {/* Name */}
              <td className="px-6 py-4">{trainee.name}</td>

              {/* Email */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-slate-500" />
                  <span>{trainee.email}</span>
                </div>
              </td>

              {/* Batch */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-cyan-500" />
                  <span className="px-2 py-1 bg-cyan-100 text-cyan-700 rounded-full text-xs font-medium">
                    {trainee.batch}
                  </span>
                </div>
              </td>

              {/* Domain */}
              <td className="px-6 py-4">{trainee.domain}</td>

              {/* Performance */}
              <td className="px-6 py-4 text-center">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    trainee.performance >= 90
                      ? "bg-green-100 text-green-700"
                      : trainee.performance >= 75
                      ? "bg-amber-100 text-amber-700"
                      : "bg-rose-100 text-rose-700"
                  }`}
                >
                  {trainee.performance}%
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TraineeCard;
