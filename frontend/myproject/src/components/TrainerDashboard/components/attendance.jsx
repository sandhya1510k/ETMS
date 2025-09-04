import React, { useState, useMemo, useEffect } from "react";
import { format } from "date-fns";
import {
  GraduationCap,
  Users,
  Calendar as CalendarIcon,
  Check,
  X,
  Clock,
  Check as CheckCheckIcon,
  RefreshCw,
  Save,
} from "lucide-react";

// Mock data (same as before)
const mockBatches = [
  {
    id: "batch-1",
    name: "React Development - Batch A",
    employee: [
      { id: "1", name: "Alice Johnson", empID: "RD001" },
      { id: "2", name: "Bob Smith", empID: "RD002" },
      { id: "3", name: "Charlie Brown", empID: "RD003" },
      { id: "4", name: "Diana Prince", empID: "RD004" },
      { id: "5", name: "Edward Norton", empID: "RD005" },
    ],
  },
  {
    id: "batch-2",
    name: "Node.js Backend - Batch B",
    employee: [
      { id: "6", name: "Frank Miller", empID: "NB001" },
      { id: "7", name: "Grace Lee", empID: "NB002" },
      { id: "8", name: "Henry Wilson", empID: "NB003" },
      { id: "9", name: "Ivy Chen", empID: "NB004" },
    ],
  },
  {
    id: "batch-3",
    name: "Full Stack - Batch C",
    employee: [
      { id: "10", name: "Jack Ryan", empID: "FS001" },
      { id: "11", name: "Kate Adams", empID: "FS002" },
      { id: "12", name: "Leo Garcia", empID: "FS003" },
    ],
  },
];

function Attendance() {
  const [selectedBatchId, setSelectedBatchId] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState({});

  // Overlay message state
  const [overlayMessage, setOverlayMessage] = useState("");
  const [showOverlay, setShowOverlay] = useState(false);

  // Show overlay message function
  const showOverlayMessage = (msg) => {
    setOverlayMessage(msg);
    setShowOverlay(true);
  };

  // Automatically hide overlay after 3 seconds
  useEffect(() => {
    if (showOverlay) {
      const timer = setTimeout(() => {
        setShowOverlay(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showOverlay]);

  const selectedBatch = useMemo(
    () => mockBatches.find((b) => b.id === selectedBatchId),
    [selectedBatchId]
  );

  const dateKey = format(selectedDate, "yyyy-MM-dd");

  const getKey = (studentId) => `${studentId}-${dateKey}`;
  const getStatus = (studentId) =>
    attendanceData[getKey(studentId)]?.status || "absent";

  const updateStatus = (studentId, status) => {
    const key = getKey(studentId);
    setAttendanceData((prev) => ({
      ...prev,
      [key]: { studentId, status, date: dateKey },
    }));
  };

  const markAllPresent = () => {
    if (!selectedBatch) return;
    selectedBatch.employee.forEach((s) => updateStatus(s.id, "present"));
    showOverlayMessage("✅ All employee marked present.");
  };

  const resetAll = () => {
    if (!selectedBatch) return;
    selectedBatch.employee.forEach((s) => updateStatus(s.id, "absent"));
    showOverlayMessage("🔄 Attendance reset. All marked absent.");
  };

  const saveAttendance = () => {
    showOverlayMessage(`💾 Attendance saved for ${format(selectedDate, "PPP")}.`);
  };

  const hasChanges =
    selectedBatch &&
    selectedBatch.employee.some(
      (s) => attendanceData[getKey(s.id)] !== undefined
    );

  const summary = selectedBatch
    ? selectedBatch.employee.reduce(
        (acc, s) => {
          acc[getStatus(s.id)]++;
          return acc;
        },
        { present: 0, absent: 0, late: 0 }
      )
    : { present: 0, absent: 0, late: 0 };

  const statusBadge = (status) => {
    const baseClass =
      "inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold transition-shadow duration-300 ";
    if (status === "present")
      return (
        <span
          className={`${baseClass} bg-green-100 text-green-900 shadow-md shadow-green-400/50`}
        >
          <Check className="h-4 w-4" /> Present
        </span>
      );
    if (status === "absent")
      return (
        <span
          className={`${baseClass} bg-red-100 text-red-900 shadow-md shadow-red-400/50`}
        >
          <X className="h-4 w-4" /> Absent
        </span>
      );
    return (
      <span
        className={`${baseClass} bg-yellow-100 text-yellow-900 shadow-md shadow-yellow-400/50`}
      >
        <Clock className="h-4 w-4" /> Late
      </span>
    );
  };

  return (
    <>
      {/* Overlay message */}
      {showOverlay && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50
                      backdrop-blur-sm transition-opacity duration-300"
          aria-live="assertive"
        >
          <div
            className="bg-white px-8 py-6 rounded-3xl shadow-2xl max-w-sm text-center
                       text-indigo-900 text-xl font-bold animate-fadeInScale"
          >
            {overlayMessage}
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 p-8 font-sans text-gray-800">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center">
            <GraduationCap className="mx-auto h-16 w-16 text-indigo-600 drop-shadow-lg" />
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-indigo-900 drop-shadow-md">
              Trainees Attendance
            </h1>
            <p className="mt-2 text-indigo-700 text-lg italic">
              Manage student attendance across batches with ease.
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-10">
            {/* Batch Selector */}
            <div className="flex-1 space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2 text-indigo-800">
                <Users className="h-5 w-5" /> Select Batch
              </label>
              <select
                className="w-full rounded-xl border border-indigo-300 px-4 py-3 text-indigo-900 font-medium
                           shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-400
                           transition duration-300 hover:ring-indigo-500"
                value={selectedBatchId}
                onChange={(e) => setSelectedBatchId(e.target.value)}
              >
                <option value="" disabled>
                  -- Choose a Batch --
                </option>
                {mockBatches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name} ({b.employee.length})
                  </option>
                ))}
              </select>
            </div>

            {/* Date Picker */}
            <div className="flex-1 space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2 text-indigo-800">
                <CalendarIcon className="h-5 w-5" /> Select Date
              </label>
              <input
                type="date"
                className="w-full rounded-xl border border-indigo-300 px-4 py-3 text-indigo-900 font-medium
                           shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-400
                           transition duration-300 hover:ring-indigo-500"
                value={dateKey}
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
              />
            </div>
          </div>

          {/* Summary & Actions */}
          {selectedBatch && (
            <div className="space-y-6 bg-white rounded-3xl shadow-xl p-8">
              <div className="grid grid-cols-3 text-center gap-6">
                {[
                  { label: "Present", count: summary.present, color: "green" },
                  { label: "Absent", count: summary.absent, color: "red" },
                  { label: "Late", count: summary.late, color: "yellow" },
                ].map(({ label, count, color }) => (
                  <div
                    key={label}
                    className={`p-4 rounded-2xl bg-${color}-50 shadow-inner`}
                  >
                    <div
                      className={`text-3xl font-extrabold text-${color}-700 drop-shadow-md`}
                    >
                      {count}
                    </div>
                    <div className={`text-md font-semibold text-${color}-600`}>
                      {label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={markAllPresent}
                  className="flex items-center gap-2 px-6 py-3 border-2 border-green-500 rounded-full
                             bg-green-50 text-green-700 font-semibold shadow-lg
                             hover:bg-green-500 hover:text-white transition duration-300
                             focus:outline-none focus:ring-4 focus:ring-green-300"
                >
                  <CheckCheckIcon className="h-5 w-5" /> Mark All Present
                </button>
                <button
                  onClick={resetAll}
                  className="flex items-center gap-2 px-6 py-3 border-2 border-red-500 rounded-full
                             bg-red-50 text-red-700 font-semibold shadow-lg
                             hover:bg-red-500 hover:text-white transition duration-300
                             focus:outline-none focus:ring-4 focus:ring-red-300"
                >
                  <RefreshCw className="h-5 w-5" /> Reset
                </button>
                <button
                  onClick={saveAttendance}
                  disabled={!hasChanges}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold shadow-lg
                            bg-indigo-600 text-white border-2 border-indigo-600
                            transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                            hover:bg-indigo-700 hover:border-indigo-700
                            focus:outline-none focus:ring-4 focus:ring-indigo-400`}
                >
                  <Save className="h-5 w-5" /> Save Attendance
                </button>
              </div>
            </div>
          )}

          {/* Student List */}
          {selectedBatch ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-indigo-900 tracking-wide">
                Student List
              </h2>
              <div className="grid gap-5">
                {selectedBatch.employee.map((s) => {
                  const status = getStatus(s.id);
                  return (
                    <div
                      key={s.id}
                      className="bg-white rounded-2xl shadow-lg p-5 flex flex-col md:flex-row items-center justify-between
                                 gap-4 transition-shadow duration-300 hover:shadow-2xl"
                    >
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="text-indigo-800 font-semibold text-lg truncate">
                          {s.name}
                        </div>
                        <div className="text-indigo-500 font-mono text-sm">
                          {s.empID}
                        </div>
                      </div>
                      <div className="flex gap-4 items-center flex-wrap">
                        {/* Buttons for attendance */}
                        <button
                          onClick={() => updateStatus(s.id, "present")}
                          className={`flex items-center gap-1 px-4 py-2 rounded-full font-semibold
                            transition-shadow duration-300
                            ${
                              status === "present"
                                ? "bg-green-600 text-white shadow-lg shadow-green-500/70"
                                : "bg-green-100 text-green-700 hover:bg-green-200"
                            }`}
                          aria-pressed={status === "present"}
                          title="Mark Present"
                        >
                          <Check className="h-4 w-4" />
                          Present
                        </button>
                        <button
                          onClick={() => updateStatus(s.id, "absent")}
                          className={`flex items-center gap-1 px-4 py-2 rounded-full font-semibold
                            transition-shadow duration-300
                            ${
                              status === "absent"
                                ? "bg-red-600 text-white shadow-lg shadow-red-500/70"
                                : "bg-red-100 text-red-700 hover:bg-red-200"
                            }`}
                          aria-pressed={status === "absent"}
                          title="Mark Absent"
                        >
                          <X className="h-4 w-4" />
                          Absent
                        </button>
                        <button
                          onClick={() => updateStatus(s.id, "late")}
                          className={`flex items-center gap-1 px-4 py-2 rounded-full font-semibold
                            transition-shadow duration-300
                            ${
                              status === "late"
                                ? "bg-yellow-600 text-white shadow-lg shadow-yellow-500/70"
                                : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                            }`}
                          aria-pressed={status === "late"}
                          title="Mark Late"
                        >
                          <Clock className="h-4 w-4" />
                          Late
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-center text-indigo-500 mt-16 text-lg font-medium">
              Please select a batch to manage attendance.
            </div>
          )}
        </div>
      </div>

      {/* Animations styles */}
      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInDown {
          animation: fadeInDown 0.4s ease forwards;
        }
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeInScale {
          animation: fadeInScale 0.3s ease forwards;
        }
      `}</style>
    </>
  );
}

export default Attendance;
