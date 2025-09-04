import { useState, useMemo, useEffect } from "react";
import { format, isAfter, addMinutes } from "date-fns";
import {
  ClipboardCheck,
  Users,
  Calendar,
  Plus,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  FileText,
  Search,
  Download,
  BarChart2,
} from "lucide-react";
import { Toaster, toast } from "react-hot-toast";

// Mock Data
const mockBatches = [
  { id: "batch-1", name: "React Development - Batch A", trainees: [{ id: "1", name: "Alice Johnson", employeeId: "EMP001" }, { id: "2", name: "Bob Smith", employeeId: "EMP002" }, { id: "3", name: "Charlie Brown", employeeId: "EMP003" }, { id: "4", name: "Diana Prince", employeeId: "EMP004" }, { id: "5", name: "Edward Norton", employeeId: "EMP005" }] },
  { id: "batch-2", name: "Node.js Backend - Batch B", trainees: [{ id: "6", name: "Frank Miller", employeeId: "EMP006" }, { id: "7", name: "Grace Lee", employeeId: "EMP007" }, { id: "8", name: "Henry Wilson", employeeId: "EMP008" }, { id: "9", name: "Ivy Chen", employeeId: "EMP009" }] },
  { id: "batch-3", name: "Full Stack - Batch C", trainees: [{ id: "10", name: "Jack Ryan", employeeId: "EMP010" }, { id: "11", name: "Kate Adams", employeeId: "EMP011" }, { id: "12", name: "Leo Garcia", employeeId: "EMP012" }] },
];

const mockAssessments = [
  { id: "assess-1", title: "React Basics Weekly Test", description: "Test on React components and hooks", type: "weekly", startDate: new Date(2025, 7, 20), duration: 60, assignedTo: { type: "batch", batchId: "batch-1", individuals: [] }, createdAt: new Date(2025, 7, 10) },
  { id: "assess-2", title: "Node.js Grand Test", description: "Comprehensive test on backend development", type: "grand", startDate: new Date(2025, 7, 25), duration: 120, assignedTo: { type: "batch", batchId: "batch-2", individuals: [] }, createdAt: new Date(2025, 7, 15) },
];

const mockSubmissions = [
  { id: "sub-1", assessmentId: "assess-1", traineeId: "1", status: "completed", submittedAt: new Date(2025, 7, 21), score: 85, feedback: "Good work" },
  { id: "sub-2", assessmentId: "assess-1", traineeId: "2", status: "submitted", submittedAt: new Date(2025, 7, 22) },
  { id: "sub-3", assessmentId: "assess-1", traineeId: "3", status: "needs_correction", submittedAt: new Date(2025, 7, 19), score: 60, feedback: "Improve on hooks" },
  { id: "sub-4", assessmentId: "assess-1", traineeId: "4", status: "in_progress" },
  { id: "sub-5", assessmentId: "assess-1", traineeId: "5", status: "not_started" },
  { id: "sub-6", assessmentId: "assess-2", traineeId: "6", status: "submitted", submittedAt: new Date(2025, 7, 26) },
];

// Utility for combining Tailwind classes
const cn = (...classes) => classes.filter(Boolean).join(" ");

// Simple Calendar Component
const SimpleCalendar = ({ selected, onSelect }) => {
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-7 gap-1 p-2 bg-white border border-stone-300 rounded-lg shadow-sm">
      {days.map((day) => (
        <button
          key={day}
          className={cn(
            "p-2 text-center text-sm font-medium transition-all duration-200",
            selected?.getDate() === day ? "bg-emerald-700 text-white rounded-lg" : "text-stone-700 hover:bg-stone-200 hover:scale-105"
          )}
          onClick={() => onSelect(new Date(today.getFullYear(), today.getMonth(), day))}
          aria-label={`Select day ${day}`}
        >
          {day}
        </button>
      ))}
    </div>
  );
};

const AssessmentDashboard = () => {
  const [assessments, setAssessments] = useState(mockAssessments);
  const [submissions, setSubmissions] = useState(mockSubmissions);
  const [selectedAssessmentId, setSelectedAssessmentId] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [reviewScore, setReviewScore] = useState(0);
  const [reviewFeedback, setReviewFeedback] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [batchFilter, setBatchFilter] = useState("");
  const [traineeSearch, setTraineeSearch] = useState("");
  const [newAssessment, setNewAssessment] = useState({
    title: "",
    description: "",
    type: "weekly",
    startDate: new Date(),
    duration: 60,
    assignedTo: { type: "batch", batchId: "", individuals: [] },
  });
  const [elapsedTime, setElapsedTime] = useState(0);

  // Timer for active assessment (stops when ended or not started)
  useEffect(() => {
    if (!showViewDialog || !selectedAssessmentId) return;
    const assessment = assessments.find((a) => a.id === selectedAssessmentId);
    if (
      !assessment ||
      isAfter(new Date(), addMinutes(assessment.startDate, assessment.duration)) ||
      assessment.startDate > new Date()
    ) {
      setElapsedTime(0);
      return;
    }
    const startTime = assessment.startDate.getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      setElapsedTime(Math.floor((now - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [showViewDialog, selectedAssessmentId, assessments]);

  // Memoized trainees with batch info
  const allTrainees = useMemo(
    () =>
      mockBatches.flatMap((batch) =>
        batch.trainees.map((t) => ({ ...t, batchName: batch.name, batchId: batch.id }))
      ),
    []
  );

  // Optimized trainee list for individual assignments
  const filteredTrainees = useMemo(() => {
    let filtered = allTrainees;
    if (batchFilter) filtered = filtered.filter((t) => t.batchId === batchFilter);
    if (traineeSearch)
      filtered = filtered.filter(
        (t) =>
          t.name.toLowerCase().includes(traineeSearch.toLowerCase()) ||
          t.employeeId.toLowerCase().includes(traineeSearch.toLowerCase())
      );
    return filtered;
  }, [batchFilter, traineeSearch]);

  const selectedAssessment = useMemo(
    () => assessments.find((assess) => assess.id === selectedAssessmentId),
    [assessments, selectedAssessmentId]
  );

  const getAssignedTrainees = (assessment) => {
    if (!assessment) return [];
    if (assessment.assignedTo.type === "batch") {
      const batch = mockBatches.find((b) => b.id === assessment.assignedTo.batchId);
      return batch ? batch.trainees : [];
    }
    return allTrainees.filter((trainee) => assessment.assignedTo.individuals.includes(trainee.id));
  };

  const getProgressSummary = (assessment) => {
    if (!assessment) return { not_started: 0, in_progress: 0, submitted: 0, needs_correction: 0, completed: 0 };
    const trainees = getAssignedTrainees(assessment);
    const summary = { not_started: 0, in_progress: 0, submitted: 0, needs_correction: 0, completed: 0 };
    trainees.forEach((trainee) => {
      const submission =
        submissions.find((sub) => sub.assessmentId === assessment.id && sub.traineeId === trainee.id) ||
        { status: "not_started" };
      summary[submission.status]++;
    });
    return summary;
  };

  const filteredAssessments = useMemo(() => {
    let filtered = assessments;
    if (typeFilter !== "all") filtered = filtered.filter((assess) => assess.type === typeFilter);
    if (searchQuery) filtered = filtered.filter((assess) => assess.title.toLowerCase().includes(searchQuery.toLowerCase()));
    filtered.sort((a, b) => {
      const order = sortOrder === "asc" ? 1 : -1;
      if (sortBy === "date") return order * (a.startDate - b.startDate);
      return order * a.title.localeCompare(b.title);
    });
    return filtered;
  }, [assessments, typeFilter, searchQuery, sortBy, sortOrder]);

  const getSubmissionForTrainee = (assessmentId, traineeId) => {
    return (
      submissions.find((sub) => sub.assessmentId === assessmentId && sub.traineeId === traineeId) || {
        status: "not_started",
      }
    );
  };

  const filteredTraineesForSubmissions = useMemo(() => {
    if (!selectedAssessment) return [];
    const assignedTrainees = getAssignedTrainees(selectedAssessment);
    const traineesWithSubs = assignedTrainees.map((trainee) => ({
      trainee,
      submission: getSubmissionForTrainee(selectedAssessment.id, trainee.id),
    }));
    if (statusFilter === "all") return traineesWithSubs;
    return traineesWithSubs.filter(({ submission }) => submission.status === statusFilter);
  }, [selectedAssessment, submissions, statusFilter]);

  const overview = useMemo(() => {
    const total = assessments.length;
    const upcoming = assessments.filter((assess) => isAfter(assess.startDate, new Date())).length;
    const scores = submissions.filter((sub) => sub.score !== undefined).map((sub) => sub.score);
    const averageScore = scores.length ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : 0;
    const pendingReviews = submissions.filter((sub) => sub.status === "submitted").length;
    return { total, upcoming, averageScore, pendingReviews };
  }, [assessments, submissions]);

  const trends = useMemo(() => {
    const types = ["weekly", "unscheduled", "grand", "custom"];
    return types.map((type) => {
      const typeSubs = submissions.filter(
        (sub) => assessments.find((assess) => assess.id === sub.assessmentId)?.type === type && sub.score !== undefined
      );
      const avg = typeSubs.length ? (typeSubs.reduce((a, b) => a + b.score, 0) / typeSubs.length).toFixed(1) : 0;
      return { type, avg };
    });
  }, [assessments, submissions]);

  const createAssessment = () => {
    if (!newAssessment.title || !newAssessment.description) {
      toast.error("Please fill all fields.", {
        className: "bg-red-600 text-white font-semibold",
      });
      return;
    }
    if (newAssessment.assignedTo.type === "batch" && !newAssessment.assignedTo.batchId) {
      toast.error("Please select a batch.", {
        className: "bg-red-600 text-white font-semibold",
      });
      return;
    }
    if (newAssessment.assignedTo.type === "individual" && !newAssessment.assignedTo.individuals.length) {
      toast.error("Please select at least one trainee.", {
        className: "bg-red-600 text-white font-semibold",
      });
      return;
    }
    const id = `assess-${Date.now()}`;
    setAssessments([...assessments, { ...newAssessment, id, createdAt: new Date() }]);
    // Simulate sending alerts
    const assignedTrainees =
      newAssessment.assignedTo.type === "batch"
        ? mockBatches.find((b) => b.id === newAssessment.assignedTo.batchId)?.trainees.map((t) => t.id) || []
        : newAssessment.assignedTo.individuals;
    console.log(`Notifying trainees: ${assignedTrainees.join(", ")} for assessment ${id}`);
    setNewAssessment({
      title: "",
      description: "",
      type: "weekly",
      startDate: new Date(),
      duration: 60,
      assignedTo: { type: "batch", batchId: "", individuals: [] },
    });
    setBatchFilter("");
    setTraineeSearch("");
    setShowCreateDialog(false);
    toast.success("Assessment created and trainees notified.", {
      className: "bg-emerald-700 text-white font-semibold",
      icon: <CheckCircle className="h-5 w-5" />,
    });
  };

  const openReview = (submission) => {
    setSelectedSubmission(submission);
    setReviewScore(submission.score || 0);
    setReviewFeedback(submission.feedback || "");
    setShowReviewDialog(true);
  };

  const approve = () => {
    const updatedSubs = submissions.map((sub) =>
      sub.id === selectedSubmission.id
        ? { ...sub, status: "completed", score: reviewScore, feedback: reviewFeedback, submittedAt: new Date() }
        : sub
    );
    setSubmissions(updatedSubs);
    setShowReviewDialog(false);
    toast.success("Submission approved successfully.", {
      className: "bg-emerald-700 text-white font-semibold",
      icon: <CheckCircle className="h-5 w-5" />,
    });
  };

  const requestCorrection = () => {
    const updatedSubs = submissions.map((sub) =>
      sub.id === selectedSubmission.id
        ? { ...sub, status: "needs_correction", feedback: reviewFeedback, submittedAt: new Date() }
        : sub
    );
    setSubmissions(updatedSubs);
    setShowReviewDialog(false);
    toast.error("Correction requested.", {
      className: "bg-red-600 text-white font-semibold",
      icon: <XCircle className="h-5 w-5" />,
    });
  };

  const exportCSV = () => {
    const csv =
      "Assessment,Trainee,Employee ID,Status,Score\n" +
      submissions
        .map((sub) => {
          const assess = assessments.find((a) => a.id === sub.assessmentId);
          const trainee = allTrainees.find((t) => t.id === sub.traineeId);
          return `${assess?.title || "Unknown"},${trainee?.name || "Unknown"},${trainee?.employeeId || "N/A"},${sub.status},${sub.score ?? "N/A"}`;
        })
        .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "assessments.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Assessment report exported as CSV.", {
      className: "bg-emerald-700 text-white font-semibold",
      icon: <CheckCircle className="h-5 w-5" />,
    });
  };

  const getStatusBadge = (status) => {
    const badgeStyles = {
      not_started: "bg-stone-200 text-stone-600",
      in_progress: "border border-yellow-500 text-yellow-500",
      submitted: "border border-emerald-500 text-emerald-500",
      needs_correction: "bg-red-600 text-white",
      completed: "bg-emerald-700 text-white",
    };
    const icons = {
      not_started: Clock,
      in_progress: AlertCircle,
      submitted: FileText,
      needs_correction: XCircle,
      completed: CheckCircle,
    };
    const Icon = icons[status];
    return (
      <span className={cn("inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-lg", badgeStyles[status])}>
        <Icon className="h-3 w-3" />
        {status.replace("_", " ")}
      </span>
    );
  };

  const formatElapsedTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-stone-100 p-4 sm:p-6 font-sans text-stone-800">
      <Toaster position="bottom-right" toastOptions={{ duration: 4000 }} />
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white shadow-sm rounded-lg p-6 flex flex-col sm:flex-row justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-emerald-800 tracking-tight flex items-center gap-2">
            <ClipboardCheck className="h-8 w-8 text-emerald-500" />
            Assessment Control Panel
          </h1>
          <button
            type="button"
            className="mt-4 sm:mt-0 px-4 py-2 bg-emerald-700 text-white rounded-lg shadow-sm hover:bg-emerald-800 transition-all duration-200 flex items-center gap-2"
            onClick={() => setShowCreateDialog(true)}
            aria-label="Create new assessment"
          >
            <Plus className="h-4 w-4" />
            Create Assessment
          </button>
        </div>

        {/* Overview Widgets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: "Total Assessments", value: overview.total, icon: ClipboardCheck },
            { title: "Upcoming", value: overview.upcoming, icon: Calendar },
            { title: "Average Score", value: `${overview.averageScore}%`, icon: BarChart2 },
            { title: "Pending Reviews", value: overview.pendingReviews, icon: AlertCircle },
          ].map(({ title, value, icon: Icon }) => (
            <div
              key={title}
              className="bg-white shadow-sm rounded-lg p-4 transition-all duration-200 hover:shadow-md hover:scale-105 relative"
            >
              <h3 className="font-semibold text-stone-500 text-sm">{title}</h3>
              <p className="text-2xl font-bold text-emerald-700">{value}</p>
              <Icon className="h-6 w-6 text-emerald-500 absolute top-4 right-4 opacity-50" />
            </div>
          ))}
        </div>

        {/* Performance Trends */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-xl font-semibold text-emerald-800 flex items-center gap-2">
            <BarChart2 className="h-5 w-5 text-emerald-500" />
            Performance Trends
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {trends.map((trend) => (
              <div key={trend.type} className="text-center">
                <p className="capitalize text-stone-500 font-medium">{trend.type}</p>
                <p className="text-lg font-bold text-emerald-700">{trend.avg}%</p>
              </div>
            ))}
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="flex items-center gap-2 flex-1 bg-white rounded-lg shadow-sm p-2">
            <Search className="h-4 w-4 text-stone-500" />
            <input
              className="w-full p-2 border-none bg-transparent focus:outline-none focus:ring-0 text-stone-800 placeholder-stone-500"
              placeholder="Search by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search assessments by title"
            />
          </div>
          <select
            className="w-full sm:w-auto p-2 bg-white text-stone-800 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            aria-label="Filter by assessment type"
          >
            <option value="all" className="bg-white">All Types</option>
            <option value="weekly" className="bg-white">Weekly</option>
            <option value="unscheduled" className="bg-white">Unscheduled</option>
            <option value="grand" className="bg-white">Grand</option>
            <option value="custom" className="bg-white">Custom</option>
          </select>
          <select
            className="w-full sm:w-auto p-2 bg-white text-stone-800 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort assessments by"
          >
            <option value="title" className="bg-white">Sort by Title</option>
            <option value="date" className="bg-white">Sort by Date</option>
          </select>
          <select
            className="w-full sm:w-auto p-2 bg-white text-stone-800 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            aria-label="Sort order"
          >
            <option value="asc" className="bg-white">Ascending</option>
            <option value="desc" className="bg-white">Descending</option>
          </select>
          <button
            type="button"
            className="px-4 py-2 bg-emerald-700 text-white rounded-lg shadow-sm hover:bg-emerald-800 transition-all duration-200 flex items-center gap-2"
            onClick={exportCSV}
            aria-label="Export assessments as CSV"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>
        </div>

        {/* Assessment List */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-xl font-semibold text-emerald-800 mb-4">Assessments</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-stone-100">
                  <th className="border-b border-stone-200 p-3 text-left text-sm font-semibold text-emerald-800">Title</th>
                  <th className="border-b border-stone-200 p-3 text-left text-sm font-semibold text-emerald-800">Type</th>
                  <th className="border-b border-stone-200 p-3 text-left text-sm font-semibold text-emerald-800">Start Date</th>
                  <th className="border-b border-stone-200 p-3 text-left text-sm font-semibold text-emerald-800">Duration</th>
                  <th className="border-b border-stone-200 p-3 text-left text-sm font-semibold text-emerald-800">Assigned</th>
                  <th className="border-b border-stone-200 p-3 text-left text-sm font-semibold text-emerald-800">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssessments.map((assess) => (
                  <tr key={assess.id} className="odd:bg-white hover:bg-stone-50 transition-colors duration-200">
                    <td className="border-b border-stone-200 p-3 text-stone-800">{assess.title}</td>
                    <td className="border-b border-stone-200 p-3 capitalize text-stone-800">{assess.type}</td>
                    <td className="border-b border-stone-200 p-3 text-stone-800">{format(assess.startDate, "PPP p")}</td>
                    <td className="border-b border-stone-200 p-3 text-stone-800">{assess.duration} min</td>
                    <td className="border-b border-stone-200 p-3 text-stone-800">
                      {assess.assignedTo.type === "batch"
                        ? `Batch: ${mockBatches.find(b => b.id === assess.assignedTo.batchId)?.name || "None"}`
                        : `Individuals: ${assess.assignedTo.individuals.length}`}
                    </td>
                    <td className="border-b border-stone-200 p-3">
                      <button
                        type="button"
                        className="px-3 py-1 bg-emerald-700 text-white rounded-lg shadow-sm hover:bg-emerald-800 transition-all duration-200 flex items-center gap-2"
                        onClick={() => {
                          setSelectedAssessmentId(assess.id);
                          setShowViewDialog(true);
                        }}
                        aria-label={`View assessment ${assess.title}`}
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Trainee Submissions for Selected Assessment */}
        {selectedAssessment && (
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h2 className="text-xl font-semibold text-emerald-800 mb-4">Submissions for {selectedAssessment.title}</h2>
            <select
              className="w-full sm:w-auto p-2 bg-white text-stone-800 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-4"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label="Filter submissions by status"
            >
              <option value="all" className="bg-white">All Statuses</option>
              <option value="not_started" className="bg-white">Not Started</option>
              <option value="in_progress" className="bg-white">In Progress</option>
              <option value="submitted" className="bg-white">Submitted</option>
              <option value="needs_correction" className="bg-white">Needs Correction</option>
              <option value="completed" className="bg-white">Completed</option>
            </select>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-stone-100">
                    <th className="border-b border-stone-200 p-3 text-left text-sm font-semibold text-emerald-800">Trainee</th>
                    <th className="border-b border-stone-200 p-3 text-left text-sm font-semibold text-emerald-800">Employee ID</th>
                    <th className="border-b border-stone-200 p-3 text-left text-sm font-semibold text-emerald-800">Status</th>
                    <th className="border-b border-stone-200 p-3 text-left text-sm font-semibold text-emerald-800">Score</th>
                    <th className="border-b border-stone-200 p-3 text-left text-sm font-semibold text-emerald-800">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTraineesForSubmissions.map(({ trainee, submission }) => (
                    <tr key={trainee.id} className="odd:bg-white hover:bg-stone-50 transition-colors duration-200">
                      <td className="border-b border-stone-200 p-3 text-stone-800">{trainee.name}</td>
                      <td className="border-b border-stone-200 p-3 text-stone-800">{trainee.employeeId}</td>
                      <td className="border-b border-stone-200 p-3">{getStatusBadge(submission.status)}</td>
                      <td className="border-b border-stone-200 p-3 text-stone-800">{submission.score ?? "N/A"}</td>
                      <td className="border-b border-stone-200 p-3">
                        {(submission.status === "submitted" || submission.status === "needs_correction") && (
                          <button
                            type="button"
                            className="px-3 py-1 bg-emerald-700 text-white rounded-lg shadow-sm hover:bg-emerald-800 transition-all duration-200 flex items-center gap-2"
                            onClick={() => openReview(submission)}
                            aria-label={`Review submission for ${trainee.name}`}
                          >
                            <Eye className="h-4 w-4" />
                            Review
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Create Assessment Dialog */}
        {showCreateDialog && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 sm:p-0">
            <div className="bg-white rounded-lg max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-xl transition-all duration-200">
              <div className="bg-emerald-700 text-white p-4 rounded-t-lg">
                <h2 className="text-lg font-semibold">Create New Assessment</h2>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="text-sm font-medium text-emerald-800">Title</label>
                  <input
                    className="w-full p-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-stone-800 placeholder-stone-400"
                    placeholder="Enter assessment title"
                    value={newAssessment.title}
                    onChange={(e) => setNewAssessment({ ...newAssessment, title: e.target.value })}
                    aria-label="Assessment title"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-emerald-800">Description</label>
                  <textarea
                    className="w-full p-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-stone-800 placeholder-stone-400"
                    placeholder="Enter assessment description"
                    value={newAssessment.description}
                    onChange={(e) => setNewAssessment({ ...newAssessment, description: e.target.value })}
                    rows={3}
                    aria-label="Assessment description"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-emerald-800">Type</label>
                  <select
                    className="w-full p-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-stone-800"
                    value={newAssessment.type}
                    onChange={(e) => setNewAssessment({ ...newAssessment, type: e.target.value })}
                    aria-label="Assessment type"
                  >
                    <option value="weekly">Weekly</option>
                    <option value="unscheduled">Unscheduled</option>
                    <option value="grand">Grand</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-emerald-800">Start Date</label>
                  <button
                    type="button"
                    className="w-full p-2 border border-stone-300 rounded-lg hover:bg-stone-50 text-left flex items-center gap-2 text-stone-800"
                    onClick={() => setShowCalendar(!showCalendar)}
                    aria-label="Select start date"
                  >
                    <Calendar className="h-4 w-4 text-emerald-700" />
                    {format(newAssessment.startDate, "PPP")}
                  </button>
                  {showCalendar && (
                    <div className="absolute z-10 mt-2">
                      <SimpleCalendar
                        selected={newAssessment.startDate}
                        onSelect={(date) => {
                          setNewAssessment({ ...newAssessment, startDate: date });
                          setShowCalendar(false);
                        }}
                      />
                    </div>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-emerald-800">Duration (minutes)</label>
                  <input
                    type="number"
                    className="w-full p-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-stone-800"
                    value={newAssessment.duration}
                    onChange={(e) => setNewAssessment({ ...newAssessment, duration: parseInt(e.target.value) || 60 })}
                    aria-label="Assessment duration"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-emerald-800">Assign To</label>
                  <select
                    className="w-full p-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-stone-800"
                    value={newAssessment.assignedTo.type}
                    onChange={(e) =>
                      setNewAssessment({
                        ...newAssessment,
                        assignedTo: { type: e.target.value, batchId: "", individuals: [] },
                      })
                    }
                    aria-label="Assignment type"
                  >
                    <option value="batch">Batch</option>
                    <option value="individual">Individual</option>
                  </select>
                </div>
                {newAssessment.assignedTo.type === "batch" && (
                  <div>
                    <label className="text-sm font-medium text-emerald-800">Select Batch</label>
                    <select
                      className="w-full p-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-stone-800"
                      value={newAssessment.assignedTo.batchId}
                      onChange={(e) =>
                        setNewAssessment({
                          ...newAssessment,
                          assignedTo: { ...newAssessment.assignedTo, batchId: e.target.value },
                        })
                      }
                      aria-label="Select batch"
                    >
                      <option value="">Choose a batch</option>
                      {mockBatches.map((batch) => (
                        <option key={batch.id} value={batch.id}>
                          {batch.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {newAssessment.assignedTo.type === "individual" && (
                  <div>
                    <label className="text-sm font-medium text-emerald-800">Select Trainees</label>
                    <div className="space-y-2 mt-2">
                      <div className="flex gap-2">
                        <select
                          className="w-1/2 p-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-stone-800"
                          value={batchFilter}
                          onChange={(e) => setBatchFilter(e.target.value)}
                          aria-label="Filter trainees by batch"
                        >
                          <option value="">All Batches</option>
                          {mockBatches.map((batch) => (
                            <option key={batch.id} value={batch.id}>
                              {batch.name}
                            </option>
                          ))}
                        </select>
                        <input
                          className="w-1/2 p-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-stone-800 placeholder-stone-400"
                          placeholder="Search trainee..."
                          value={traineeSearch}
                          onChange={(e) => setTraineeSearch(e.target.value)}
                          aria-label="Search trainees"
                        />
                      </div>
                      <div className="max-h-40 overflow-y-auto border border-stone-300 rounded-lg bg-stone-50">
                        {filteredTrainees.length ? (
                          filteredTrainees.map((trainee) => (
                            <label key={trainee.id} className="flex items-center gap-2 p-2 hover:bg-stone-100">
                              <input
                                type="checkbox"
                                checked={newAssessment.assignedTo.individuals.includes(trainee.id)}
                                onChange={(e) => {
                                  const updatedIndividuals = e.target.checked
                                    ? [...newAssessment.assignedTo.individuals, trainee.id]
                                    : newAssessment.assignedTo.individuals.filter((id) => id !== trainee.id);
                                  setNewAssessment({
                                    ...newAssessment,
                                    assignedTo: { ...newAssessment.assignedTo, individuals: updatedIndividuals },
                                  });
                                }}
                                aria-label={`Assign to trainee ${trainee.name}`}
                              />
                              <span className="text-stone-800">
                                {trainee.name} ({trainee.employeeId}) - {trainee.batchName}
                              </span>
                            </label>
                          ))
                        ) : (
                          <p className="p-2 text-stone-500 text-sm">No trainees found</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex gap-3">
                  <button
                    type="button"
                    className="flex-1 px-4 py-2 bg-stone-200 text-stone-800 rounded-lg hover:bg-stone-300 transition-all duration-200"
                    onClick={() => setShowCreateDialog(false)}
                    aria-label="Cancel assessment creation"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="flex-1 px-4 py-2 bg-emerald-700 text-white rounded-lg shadow-sm hover:bg-emerald-800 transition-all duration-200"
                    onClick={createAssessment}
                    aria-label="Create assessment"
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Review Submission Dialog */}
        {showReviewDialog && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 sm:p-0">
            <div className="bg-white rounded-lg max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-xl transition-all duration-200">
              <div className="bg-emerald-700 text-white p-4 rounded-t-lg">
                <h2 className="text-lg font-semibold">Review Submission</h2>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="text-sm font-medium text-emerald-800">Score (0-100)</label>
                  <input
                    type="number"
                    className="w-full p-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-stone-800"
                    value={reviewScore}
                    onChange={(e) => setReviewScore(parseInt(e.target.value) || 0)}
                    min="0"
                    max="100"
                    aria-label="Submission score"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-emerald-800">Feedback</label>
                  <textarea
                    className="w-full p-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-stone-800 placeholder-stone-400"
                    placeholder="Enter feedback..."
                    value={reviewFeedback}
                    onChange={(e) => setReviewFeedback(e.target.value)}
                    rows={3}
                    aria-label="Submission feedback"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    className="flex-1 px-4 py-2 bg-stone-200 text-stone-800 rounded-lg hover:bg-stone-300 transition-all duration-200"
                    onClick={() => setShowReviewDialog(false)}
                    aria-label="Cancel review"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg shadow-sm hover:bg-red-700 transition-all duration-200 flex items-center gap-2"
                    onClick={requestCorrection}
                    aria-label="Request correction"
                  >
                    <XCircle className="h-4 w-4" />
                    Request Correction
                  </button>
                  <button
                    type="button"
                    className="flex-1 px-4 py-2 bg-emerald-700 text-white rounded-lg shadow-sm hover:bg-emerald-800 transition-all duration-200 flex items-center gap-2"
                    onClick={approve}
                    aria-label="Approve submission"
                  >
                    <CheckCircle className="h-4 w-4" />
                    Approve
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssessmentDashboard;