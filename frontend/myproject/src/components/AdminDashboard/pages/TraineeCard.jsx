import React from "react";
import { GraduationCap, Target, TrendingUp, BookOpen } from "lucide-react";

const TraineeCard = ({ trainee, onClick }) => {
  return (
    <div
      className="cursor-pointer transition-all duration-300 
        hover:shadow-xl hover:scale-[1.02] 
        bg-gradient-to-br from-white to-blue-50 rounded-2xl border border-blue-100 overflow-hidden"
      onClick={onClick}
    >
      <div className="p-6 text-slate-800">
        <div className="flex items-start space-x-4">
          {/* Avatar with gradient background */}
          <div className="h-14 w-14 flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold text-lg">
            {trainee.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>

          {/* Details */}
          <div className="flex-1 space-y-3">
            <div>
              <h3 className="font-bold text-lg text-slate-800">{trainee.name}</h3>
              <p className="text-sm text-slate-500">ID: {trainee.empId}</p>
            </div>

            {/* Batch & Domain */}
            <div className="flex items-center gap-2 text-slate-700">
              <GraduationCap className="h-4 w-4 text-cyan-500" />
              <span className="px-2 py-1 bg-cyan-100 text-cyan-700 rounded-full text-xs font-medium">
                {trainee.batch}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-600">{trainee.domain}</span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {/* Tasks */}
              <div className="text-center p-2 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-center gap-1">
                  <BookOpen className="h-4 w-4 text-cyan-500" />
                  <span className="text-sm font-bold text-slate-800">
                    {trainee.assignedTasks}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Tasks</p>
              </div>

              {/* Meetings Attendance */}
              <div className="text-center p-2 bg-slate-50 rounded-lg">
                <div
                  className={`text-xs font-bold px-2 py-1 rounded-full ${
                    trainee.meetingAttendance.attendancePercentage >= 90
                      ? "bg-green-100 text-green-700"
                      : trainee.meetingAttendance.attendancePercentage >= 75
                      ? "bg-amber-100 text-amber-700"
                      : "bg-rose-100 text-rose-700"
                  }`}
                >
                  {trainee.meetingAttendance.attendancePercentage}%
                </div>
                <p className="text-xs text-slate-500 mt-1">Attendance</p>
              </div>

              {/* Performance Score */}
              <div className="text-center p-2 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-center gap-1">
                  <TrendingUp className="h-4 w-4 text-cyan-500" />
                  <div
                    className={`text-xs font-bold px-2 py-1 rounded-full ${
                      trainee.performance >= 90
                        ? "bg-green-100 text-green-700"
                        : trainee.performance >= 75
                        ? "bg-amber-100 text-amber-700"
                        : "bg-rose-100 text-rose-700"
                    }`}
                  >
                    {trainee.performance}
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-1">Performance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Subtle colored bar at bottom */}
      <div className="h-1 bg-gradient-to-r from-cyan-400 to-blue-500 w-full"></div>
    </div>
  );
};

export default TraineeCard;
