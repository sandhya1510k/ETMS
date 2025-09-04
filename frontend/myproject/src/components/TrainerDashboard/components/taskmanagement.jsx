import { useState, useMemo, useEffect } from "react";
import { format } from "date-fns";
import {
  ClipboardList,
  Users,
  Calendar,
  Plus,
  Eye,
  MessageSquare,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  FileText,
  Filter,
  Download,
} from "lucide-react";

// Utility for combining Tailwind classes
const cn = (...classes) => classes.filter(Boolean).join(" ");

// Mock Data for Testing
const mockBatches = [
  {
    id: "batch-1",
    name: "React Development - Batch A",
    trainees: [
      { id: "1", name: "Alice Johnson", employeeId: "RD001" },
      { id: "2", name: "Bob Smith", employeeId: "RD002" },
      { id: "3", name: "Charlie Brown", employeeId: "RD003" },
      { id: "4", name: "Diana Prince", employeeId: "RD004" },
      { id: "5", name: "Edward Norton", employeeId: "RD005" },
    ],
  },
  {
    id: "batch-2",
    name: "Node.js Backend - Batch B",
    trainees: [
      { id: "6", name: "Frank Miller", employeeId: "NB001" },
      { id: "7", name: "Grace Lee", employeeId: "NB002" },
      { id: "8", name: "Henry Wilson", employeeId: "NB003" },
      { id: "9", name: "Ivy Chen", employeeId: "NB004" },
    ],
  },
  {
    id: "batch-3",
    name: "Full Stack - Batch C",
    trainees: [
      { id: "10", name: "Jack Ryan", employeeId: "FS001" },
      { id: "11", name: "Kate Adams", employeeId: "FS002" },
      { id: "12", name: "Leo Garcia", employeeId: "FS003" },
    ],
  },
];

const mockTasks = [
  {
    id: "task-1",
    title: "React Component Assignment",
    description: "Create a reusable component library with at least 5 components",
    dueDate: new Date(2025, 8, 25),
    assignedTo: "batch",
    batchId: "batch-1",
    createdAt: new Date(2025, 8, 10),
    attachmentUrl: null,
  },
  {
    id: "task-2",
    title: "Database Design Project",
    description: "Design and implement a database schema for an e-commerce application",
    dueDate: new Date(2025, 8, 30),
    assignedTo: "batch",
    batchId: "batch-2",
    createdAt: new Date(2025, 8, 12),
    attachmentUrl: "https://example.com/task2-spec.pdf",
  },
];

const mockSubmissions = [
  {
    id: "sub-1",
    taskId: "task-1",
    traineeId: "1",
    status: "completed",
    submittedAt: new Date(2025, 8, 20),
    reviewedAt: new Date(2025, 8, 21),
    submissionUrl: "https://example.com/alice-submission.zip",
  },
  {
    id: "sub-2",
    taskId: "task-1",
    traineeId: "2",
    status: "submitted",
    submittedAt: new Date(2025, 8, 22),
    submissionUrl: null,
  },
  {
    id: "sub-3",
    taskId: "task-1",
    traineeId: "3",
    status: "needs_correction",
    submittedAt: new Date(2025, 8, 19),
    reviewedAt: new Date(2025, 8, 20),
    feedback: "Please add more documentation",
    submissionUrl: "https://example.com/charlie-submission.zip",
  },
  {
    id: "sub-4",
    taskId: "task-1",
    traineeId: "4",
    status: "in_progress",
    submissionUrl: null,
  },
  {
    id: "sub-5",
    taskId: "task-1",
    traineeId: "5",
    status: "not_started",
    submissionUrl: null,
  },
  {
    id: "sub-6",
    taskId: "task-2",
    traineeId: "6",
    status: "submitted",
    submittedAt: new Date(2025, 8, 23),
    submissionUrl: "https://example.com/frank-submission.zip",
  },
  {
    id: "sub-7",
    taskId: "task-2",
    traineeId: "7",
    status: "in_progress",
    submissionUrl: null,
  },
  {
    id: "sub-8",
    taskId: "task-2",
    traineeId: "8",
    status: "not_started",
    submissionUrl: null,
  },
  {
    id: "sub-9",
    taskId: "task-2",
    traineeId: "9",
    status: "completed",
    submittedAt: new Date(2025, 8, 21),
    reviewedAt: new Date(2025, 8, 22),
    submissionUrl: "https://example.com/ivy-submission.zip",
  },
];

const mockQueries = [
  {
    id: "query-1",
    taskId: "task-1",
    traineeId: "3",
    query: "How to implement the component?",
    date: new Date(2025, 8, 20),
    resolved: false,
  },
  {
    id: "query-2",
    taskId: "task-1",
    traineeId: "3",
    query: "Need help with props.",
    date: new Date(2025, 8, 21),
    resolved: true,
  },
  {
    id: "query-3",
    taskId: "task-2",
    traineeId: "6",
    query: "Schema design clarification.",
    date: new Date(2025, 8, 22),
    resolved: false,
  },
];

// Tailwind-based styles
const styles = {
  card: "bg-white shadow-lg rounded-2xl p-6 transition-all hover:shadow-xl",
  cardHeader: "p-4 border-b border-gray-200",
  cardContent: "p-4",
  badge: "inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full",
  button: "px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all flex items-center gap-2",
  buttonOutline: "px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all flex items-center gap-2",
  buttonDestructive: "px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-all flex items-center gap-2",
  buttonSuccess: "px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-all flex items-center gap-2",
  input: "w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all",
  textarea: "w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all",
  select: "w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all",
  dialog: "fixed inset-0 bg-black/50 flex items-center justify-center p-4",
  dialogContent: "bg-white p-6 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl",
  popover: "absolute z-20 bg-white border border-gray-200 rounded-lg shadow-xl p-4",
  toast: "fixed bottom-6 right-6 p-4 rounded-lg shadow-xl text-white max-w-sm",
  toastDestructive: "bg-red-600",
  toastSuccess: "bg-green-600",
};

// Calendar Component
const SimpleCalendar = ({ selected, onSelect }) => {
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-7 gap-1 p-3 bg-gray-50 rounded-lg">
      {days.map((day) => (
        <button
          key={day}
          className={cn(
            "p-2 text-center text-sm rounded-full",
            selected?.getDate() === day ? "bg-blue-600 text-white" : "hover:bg-gray-200"
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

function TaskManagement() {
  const [tasks, setTasks] = useState(mockTasks);
  const [submissions, setSubmissions] = useState(mockSubmissions);
  const [queries, setQueries] = useState(mockQueries);
  const [selectedBatchId, setSelectedBatchId] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [showQueryDialog, setShowQueryDialog] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [reviewFeedback, setReviewFeedback] = useState("");
  const [selectedQueries, setSelectedQueries] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: new Date(),
    assignedTo: "batch",
    batchId: "",
    traineeId: "",
    attachment: null,
  });
  const [showCalendar, setShowCalendar] = useState(false);
  const [toast, setToast] = useState(null);

  // Auto-hide toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Simulate backend fetches
  useEffect(() => {
    // TODO: Fetch batches, tasks, submissions, queries from backend
    // e.g., fetch('/api/batches').then(res => res.json()).then(setBatches)
    // e.g., fetch(`/api/tasks?batchId=${selectedBatchId}`).then(res => res.json()).then(setTasks)
    // e.g., fetch(`/api/tasks/${selectedTaskId}/submissions`).then(res => res.json()).then(setSubmissions)
    // e.g., fetch(`/api/tasks/${selectedTaskId}/queries`).then(res => res.json()).then(setQueries)
  }, [selectedBatchId, selectedTaskId]);

  const selectedBatch = useMemo(
    () => mockBatches.find((batch) => batch.id === selectedBatchId),
    [selectedBatchId]
  );

  const selectedTask = useMemo(
    () => tasks.find((task) => task.id === selectedTaskId),
    [tasks, selectedTaskId]
  );

  const batchTasks = useMemo(
    () => tasks.filter((task) => task.batchId === selectedBatchId),
    [tasks, selectedBatchId]
  );

  const getSubmissionForTrainee = (taskId, traineeId) => {
    return (
      submissions.find((sub) => sub.taskId === taskId && sub.traineeId === traineeId) || {
        id: "",
        taskId,
        traineeId,
        status: "not_started",
        submissionUrl: null,
      }
    );
  };

  const getQueriesForTrainee = (taskId, traineeId) => {
    return queries.filter((q) => q.taskId === taskId && q.traineeId === traineeId);
  };

  const filteredTrainees = useMemo(() => {
    if (!selectedBatch || !selectedTask) return [];
    const trainees = selectedBatch.trainees.map((trainee) => {
      const submission = getSubmissionForTrainee(selectedTask.id, trainee.id);
      const traineeQueries = getQueriesForTrainee(selectedTask.id, trainee.id);
      return { ...trainee, submission, queries: traineeQueries };
    });
    if (statusFilter === "all") return trainees;
    return trainees.filter((trainee) => trainee.submission.status === statusFilter);
  }, [selectedBatch, selectedTask, submissions, statusFilter, queries]);

  const getStatusBadge = (status) => {
    const badgeStyles = {
      not_started: "bg-gray-100 text-gray-700",
      in_progress: "bg-yellow-100 text-yellow-700 border border-yellow-300",
      submitted: "bg-blue-100 text-blue-700 border border-blue-300",
      needs_correction: "bg-red-100 text-red-700",
      completed: "bg-green-100 text-green-700",
    };
    return (
      <span className={cn(styles.badge, badgeStyles[status])}>
        {status === "not_started" && <Clock className="h-3 w-3" />}
        {status === "in_progress" && <AlertCircle className="h-3 w-3" />}
        {status === "submitted" && <FileText className="h-3 w-3" />}
        {status === "needs_correction" && <XCircle className="h-3 w-3" />}
        {status === "completed" && <CheckCircle className="h-3 w-3" />}
        {status.replace("_", " ")}
      </span>
    );
  };

  const getStatusSummary = () => {
    if (!selectedBatch || !selectedTask) return {};
    const summary = {
      not_started: 0,
      in_progress: 0,
      submitted: 0,
      needs_correction: 0,
      completed: 0,
    };
    selectedBatch.trainees.forEach((trainee) => {
      const submission = getSubmissionForTrainee(selectedTask.id, trainee.id);
      summary[submission.status]++;
    });
    return summary;
  };

  const createTask = () => {
    if (!newTask.title || !newTask.description || (newTask.assignedTo === "batch" && !newTask.batchId) || (newTask.assignedTo === "individual" && !newTask.traineeId)) {
      setToast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    const task = {
      id: `task-${Date.now()}`,
      title: newTask.title,
      description: newTask.description,
      dueDate: newTask.dueDate,
      assignedTo: newTask.assignedTo,
      batchId: newTask.assignedTo === "batch" ? newTask.batchId : undefined,
      traineeId: newTask.assignedTo === "individual" ? newTask.traineeId : undefined,
      createdAt: new Date(),
      attachmentUrl: newTask.attachment ? URL.createObjectURL(newTask.attachment) : null,
    };
    // TODO: Send task to backend (POST /api/tasks) with multipart/form-data for attachment
    // e.g., const formData = new FormData(); formData.append('file', newTask.attachment); ...
    setTasks([...tasks, task]);
    // Simulate backend update for trainee panel
    if (task.assignedTo === "batch") {
      const batch = mockBatches.find((b) => b.id === task.batchId);
      if (batch) {
        batch.trainees.forEach((trainee) => {
          setSubmissions((prev) => [
            ...prev,
            {
              id: `sub-${Date.now()}-${trainee.id}`,
              taskId: task.id,
              traineeId: trainee.id,
              status: "not_started",
              submissionUrl: null,
            },
          ]);
        });
      }
    } else {
      setSubmissions((prev) => [
        ...prev,
        {
          id: `sub-${Date.now()}-${task.traineeId}`,
          taskId: task.id,
          traineeId: task.traineeId,
          status: "not_started",
          submissionUrl: null,
        },
      ]);
    }
    setNewTask({
      title: "",
      description: "",
      dueDate: new Date(),
      assignedTo: "batch",
      batchId: "",
      traineeId: "",
      attachment: null,
    });
    setShowCreateDialog(false);
    setToast({
      title: "Task Created",
      description: `"${task.title}" has been assigned successfully.`,
      variant: "success",
    });
  };

  const openReviewDialog = (submission) => {
    setSelectedSubmission(submission);
    setReviewFeedback(submission.feedback || "");
    setShowReviewDialog(true);
  };

  const approveTask = () => {
    if (!selectedSubmission) return;
    // TODO: Update submission status (PUT /api/submissions/:id)
    const updatedSubmissions = submissions.map((sub) =>
      sub.id === selectedSubmission.id
        ? {
            ...sub,
            status: "completed",
            reviewedAt: new Date(),
            feedback: reviewFeedback,
          }
        : sub
    );
    setSubmissions(updatedSubmissions);
    setShowReviewDialog(false);
    setSelectedSubmission(null);
    setReviewFeedback("");
    setToast({
      title: "Task Approved",
      description: "Task has been marked as completed.",
      variant: "success",
    });
  };

  const requestCorrection = () => {
    if (!selectedSubmission) return;
    // TODO: Update submission status (PUT /api/submissions/:id)
    const updatedSubmissions = submissions.map((sub) =>
      sub.id === selectedSubmission.id
        ? {
            ...sub,
            status: "needs_correction",
            reviewedAt: new Date(),
            feedback: reviewFeedback,
          }
        : sub
    );
    setSubmissions(updatedSubmissions);
    setShowReviewDialog(false);
    setSelectedSubmission(null);
    setReviewFeedback("");
    setToast({
      title: "Correction Requested",
      description: "Trainee has been notified to make corrections.",
      variant: "destructive",
    });
  };

  const exportReport = () => {
    if (!selectedBatch || !selectedTask) return;
    // TODO: Implement report export (GET /api/reports)
    setToast({
      title: "Report Exported",
      description: "Task completion report has been generated.",
      variant: "success",
    });
  };

  const openQueryDialog = (traineeQueries) => {
    setSelectedQueries(traineeQueries);
    setShowQueryDialog(true);
  };

  const markQueryResolved = (queryId) => {
    // TODO: Mark query as resolved (PUT /api/queries/:id)
    setQueries(queries.map((q) => (q.id === queryId ? { ...q, resolved: true } : q)));
    setToast({
      title: "Query Resolved",
      description: "Query has been marked as resolved.",
      variant: "success",
    });
  };

  const handleResponseChange = (queryId, value) => {
    setSelectedQueries((prev) =>
      prev.map((q) => (q.id === queryId ? { ...q, newResponse: value } : q))
    );
  };

  const submitTrainerResponse = (queryId) => {
    setSelectedQueries((prev) =>
      prev.map((q) =>
        q.id === queryId
          ? {
              ...q,
              responses: [
                ...(q.responses || []),
                { sender: "trainer", message: q.newResponse, date: new Date() },
              ],
              newResponse: "",
            }
          : q
      )
    );

    // 🔄 Here you can also send the response to backend
    // so trainee panel updates in real time
  };

  // ✅ helpful memo for showing trainee’s name in Review dialog (no UI change)
  const selectedTrainee = useMemo(() => {
    if (!selectedSubmission || !selectedBatch) return null;
    return selectedBatch.trainees.find((t) => t.id === selectedSubmission.traineeId) || null;
  }, [selectedSubmission, selectedBatch]);

  const summary = getStatusSummary();
 const [isScoreDialogOpen, setIsScoreDialogOpen] = useState(false);
const [score, setScore] = useState("");

 // Open dialog (just set score and open)
const openScoreDialog = () => {
  setScore(selectedSubmission?.score || "");
  setIsScoreDialogOpen(true);
};

const closeScoreDialog = () => {
  setIsScoreDialogOpen(false);
  setScore("");
};

// Save score
const saveScore = () => {
  if (!selectedTrainee) return;

  // 🔹 Replace with API call later
  setToast({
    title: "Score Saved",
    description: `Score ${score} saved for ${selectedTrainee.name}`,
    variant: "success",
  });

  // Example: update trainee submission locally
  // (depends on how you store trainees)
  updateSubmissionScore(selectedTrainee.id, Number(score));

  closeScoreDialog();
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Toast Notification */}
        {toast && (
          <div
            className={cn(
              styles.toast,
              toast.variant === "destructive" ? styles.toastDestructive : styles.toastSuccess
            )}
          >
            <h3 className="font-semibold">{toast.title}</h3>
            <p className="text-sm">{toast.description}</p>
          </div>
        )}

        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-4">
            <ClipboardList className="h-10 w-10 text-blue-600" />
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Trainees Task Management</h1>
          </div>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Seamlessly assign, monitor, and review trainee tasks across batches with real-time updates
          </p>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Batch Selection */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className="text-lg font-semibold text-gray-900">Select Batch</h2>
              <p className="text-sm text-gray-500">Choose a batch to manage tasks</p>
            </div>
            <div className={styles.cardContent}>
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2" htmlFor="batch-select">
                <Users className="h-4 w-4" />
                Batch
              </label>
              <select
                id="batch-select"
                className={styles.select}
                value={selectedBatchId}
                onChange={(e) => setSelectedBatchId(e.target.value)}
                aria-label="Select batch"
              >
                <option value="">Select a batch</option>
                {mockBatches.map((batch) => (
                  <option key={batch.id} value={batch.id}>
                    {batch.name} ({batch.trainees.length} trainees)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Task Selection */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className="text-lg font-semibold text-gray-900">Select Task</h2>
              <p className="text-sm text-gray-500">Choose a task to view details</p>
            </div>
            <div className={styles.cardContent}>
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2" htmlFor="task-select">
                <ClipboardList className="h-4 w-4" />
                Task
              </label>
              <select
                id="task-select"
                className={styles.select}
                value={selectedTaskId}
                onChange={(e) => setSelectedTaskId(e.target.value)}
                disabled={!selectedBatchId}
                aria-label="Select task"
              >
                <option value="">Select a task</option>
                {batchTasks.map((task) => (
                  <option key={task.id} value={task.id}>
                    {task.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className="text-lg font-semibold text-gray-900">Actions</h2>
              <p className="text-sm text-gray-500">Manage tasks and reports</p>
            </div>
            <div className={styles.cardContent + " space-y-3"}>
              <button
                className={cn(styles.button, "w-full bg-green-600 hover:bg-green-700")}
                onClick={() => setShowCreateDialog(true)}
                aria-label="Create new task"
              >
                <Plus className="h-4 w-4" />
                Create New Task
              </button>
              {selectedBatch && selectedTask && (
                <button
                  className={cn(styles.buttonOutline, "w-full")}
                  onClick={exportReport}
                  aria-label="Export report"
                >
                  <Download className="h-4 w-4" />
                  Export Report
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Create Task Dialog */}
        {showCreateDialog && (
          <div className={styles.dialog}>
            <div className={styles.dialogContent}>
              <h2 className="text-xl font-semibold text-gray-900">Create New Task</h2>
              <p className="text-sm text-gray-600">Assign a task to a batch or individual trainee</p>
              <div className="space-y-4 mt-4">
                <div>
                  <label className="text-sm font-medium text-gray-700" htmlFor="task-title">Title</label>
                  <input
                    id="task-title"
                    className={styles.input}
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    placeholder="Enter task title"
                    aria-required="true"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700" htmlFor="task-description">Description</label>
                  <textarea
                    id="task-description"
                    className={styles.textarea}
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    placeholder="Enter task description"
                    rows={4}
                    aria-required="true"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700" htmlFor="task-due-date">Due Date</label>
                  <button
                    className={cn(styles.buttonOutline, "w-full text-left")}
                    onClick={() => setShowCalendar(!showCalendar)}
                    aria-label="Select due date"
                  >
                    <Calendar className="h-4 w-4" />
                    {newTask.dueDate ? format(newTask.dueDate, "PPP") : "Pick a date"}
                  </button>
                  {showCalendar && (
                    <div className={styles.popover}>
                      <SimpleCalendar
                        selected={newTask.dueDate}
                        onSelect={(date) => {
                          setNewTask({ ...newTask, dueDate: date });
                          setShowCalendar(false);
                        }}
                      />
                    </div>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700" htmlFor="task-attachment">Attachment (Optional)</label>
                  <input
                    id="task-attachment"
                    type="file"
                    className={styles.input}
                    accept=".pdf,.docx,.zip"
                    onChange={(e) => setNewTask({ ...newTask, attachment: e.target.files[0] })}
                    aria-label="Upload task attachment"
                  />
                  {newTask.attachment && (
                    <p className="text-xs text-gray-500 mt-1">{newTask.attachment.name}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700" htmlFor="assign-to">Assign To</label>
                  <select
                    id="assign-to"
                    className={styles.select}
                    value={newTask.assignedTo}
                    onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                    aria-label="Assign to batch or individual"
                  >
                    <option value="batch">Entire Batch</option>
                    <option value="individual">Individual Trainee</option>
                  </select>
                </div>
                {newTask.assignedTo === "batch" && (
                  <div>
                    <label className="text-sm font-medium text-gray-700" htmlFor="batch-select-create">Select Batch</label>
                    <select
                      id="batch-select-create"
                      className={styles.select}
                      value={newTask.batchId}
                      onChange={(e) => setNewTask({ ...newTask, batchId: e.target.value })}
                      aria-required="true"
                    >
                      <option value="">Choose batch</option>
                      {mockBatches.map((batch) => (
                        <option key={batch.id} value={batch.id}>
                          {batch.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {newTask.assignedTo === "individual" && (
                  <div>
                    <label className="text-sm font-medium text-gray-700" htmlFor="trainee-select">Select Trainee</label>
                    <select
                      id="trainee-select"
                      className={styles.select}
                      value={newTask.traineeId}
                      onChange={(e) => setNewTask({ ...newTask, traineeId: e.target.value })}
                      aria-required="true"
                    >
                      <option value="">Choose trainee</option>
                      {mockBatches.flatMap((batch) => batch.trainees).map((trainee) => (
                        <option key={trainee.id} value={trainee.id}>
                          {trainee.name} ({trainee.employeeId})
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <div className="flex gap-3 pt-4">
                  <button
                    className={cn(styles.buttonOutline, "flex-1")}
                    onClick={() => setShowCreateDialog(false)}
                    aria-label="Cancel task creation"
                  >
                    Cancel
                  </button>
                  <button
                    className={cn(styles.button, "flex-1 bg-green-600 hover:bg-green-700")}
                    onClick={createTask}
                    aria-label="Create task"
                  >
                    Create Task
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Task Overview */}
        {selectedBatch && selectedTask && (
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className="text-xl font-semibold text-gray-900">{selectedTask.title}</h2>
              <p className="text-sm text-gray-600">
                {selectedTask.description} • Due: {format(selectedTask.dueDate, "PPP")} •{" "}
                {selectedBatch.trainees.length} trainees
              </p>
              {selectedTask.attachmentUrl && (
                <a
                  href={selectedTask.attachmentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline flex items-center gap-2 mt-2"
                  aria-label="View task attachment"
                >
                  <FileText className="h-4 w-4" />
                  View Task Attachment
                </a>
              )}
            </div>
            <div className={styles.cardContent}>
              <div className="flex flex-wrap gap-4 sm:gap-6 mb-6 justify-center sm:justify-start">
                {["completed", "submitted", "in_progress", "needs_correction", "not_started"].map((status) => (
                  <div key={status} className="text-center">
                    <div
                      className={cn(
                        "text-2xl font-bold",
                        status === "completed" && "text-green-600",
                        status === "submitted" && "text-blue-600",
                        status === "in_progress" && "text-yellow-600",
                        status === "needs_correction" && "text-red-600",
                        status === "not_started" && "text-gray-600"
                      )}
                    >
                      {summary[status] || 0}
                    </div>
                    <div className="text-sm text-gray-600 capitalize">
                      {status.replace("_", " ")}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <Filter className="h-4 w-4 text-gray-500" />
                <select
                  className={styles.select}
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  aria-label="Filter by submission status"
                >
                  <option value="all">All Statuses</option>
                  <option value="not_started">Not Started</option>
                  <option value="in_progress">In Progress</option>
                  <option value="submitted">Submitted</option>
                  <option value="needs_correction">Needs Correction</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </div>
        )}
{/* Trainee Submissions */}
 {selectedBatch && selectedTask && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Trainee Submissions</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTrainees.map((trainee) => {
              const submission = trainee.submission;
              return (
                <div
                  key={trainee.id}
                  className={cn(styles.card, "p-4 hover:shadow-xl transition-all")}
                >
                  {/* Trainee Info */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                        {trainee.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 flex items-center gap-2">
                          {trainee.name}
                          {getStatusBadge(submission.status)}
                        </h3>
                        <p className="text-sm text-gray-600">Employee ID: {trainee.employeeId}</p>
                        {submission.submittedAt && (
                          <p className="text-xs text-gray-500">
                            Submitted: {format(submission.submittedAt, "PPP p")}
                          </p>
                        )}
                        {submission.score && (
                          <p className="text-sm text-green-600 font-medium mt-1">
                            Score: {submission.score}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {submission.submissionUrl && (
                      <a
                        href={submission.submissionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(styles.buttonOutline, "text-sm")}
                        aria-label={`View submission for ${trainee.name}`}
                      >
                        <FileText className="h-4 w-4" />
                        View Submission
                      </a>
                    )}
                    {(submission.status === "submitted" ||
                      submission.status === "needs_correction") && (
                      <button
                        className={cn(styles.buttonOutline, "text-sm")}
                        onClick={() => openReviewDialog(submission)}
                        aria-label={`Review submission for ${trainee.name}`}
                      >
                        <Eye className="h-4 w-4" />
                        Review
                      </button>
                    )}
                    <button
                      className={cn(styles.buttonOutline, "text-sm bg-blue-50 text-blue-600 hover:bg-blue-100")}
                      onClick={() => openQueryDialog(trainee.queries)}
                      aria-label={`View queries for ${trainee.name}`}
                    >
                      <MessageSquare className="h-4 w-4" />
                      Queries ({trainee.queries.length})
                    </button>
                    {/* Scoring Button */}
                    <button
                      className={cn(styles.buttonOutline, "text-sm bg-green-50 text-green-600 hover:bg-green-100")}
                      onClick={() => openScoreDialog(trainee)}
                      aria-label={`Give score to ${trainee.name}`}
                    >
                      🎯 Give Score
                    </button>
                  </div>

                  {/* Feedback */}
                  {submission.feedback && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <MessageSquare className="h-4 w-4 text-gray-500" />
                        <span className="text-xs font-medium text-gray-600">Feedback</span>
                      </div>
                      <p className="text-sm text-gray-600">{submission.feedback}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Scoring Dialog */}
      {isScoreDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Give Score to {selectedTrainee?.name}
            </h3>
            <input
              type="number"
              min="0"
              max="100"
              placeholder="0 - 100"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={closeScoreDialog}
                className="px-4 py-2 rounded-md border text-sm text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={saveScore}
                className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700"
              >
                Save Score
              </button>
            </div>
          </div>
        </div>
      )}

        {/* ✅ Review Dialog (dynamic, per trainee) */}
        {showReviewDialog && selectedSubmission && (
          <div className={styles.dialog} role="dialog" aria-modal="true" aria-label="Review submission dialog">
            <div className={styles.dialogContent}>
              <h2 className="text-xl font-semibold text-gray-900">Review Submission</h2>
              <p className="text-sm text-gray-600">
                {selectedTrainee ? `${selectedTrainee.name} • ` : ""}
                {selectedTask ? `Task: ${selectedTask.title}` : ""}
              </p>

              <div className="space-y-4 mt-4">
                {/* Submission meta */}
                <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gray-500" />
                    <span>Status: </span>
                    <span className="font-medium capitalize">{selectedSubmission.status.replace("_", " ")}</span>
                  </div>
                  {selectedSubmission.submittedAt && (
                    <p className="mt-1 text-xs text-gray-500">
                      Submitted: {format(selectedSubmission.submittedAt, "PPP p")}
                    </p>
                  )}
                  {selectedSubmission.submissionUrl ? (
                    <a
                      href={selectedSubmission.submissionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600 hover:underline mt-2"
                    >
                      <FileText className="h-4 w-4" />
                      Open Submitted File
                    </a>
                  ) : (
                    <p className="mt-2 text-xs text-red-600">No submission file provided.</p>
                  )}
                </div>

                {/* Feedback input */}
                <div>
                  <label className="text-sm font-medium text-gray-700" htmlFor="review-feedback">
                    Feedback
                  </label>
                  <textarea
                    id="review-feedback"
                    className={styles.textarea}
                    rows={4}
                    placeholder="Write feedback for the trainee…"
                    value={reviewFeedback}
                    onChange={(e) => setReviewFeedback(e.target.value)}
                  />
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    className={cn(styles.buttonSuccess, "flex-1")}
                    onClick={approveTask}
                    aria-label="Approve task"
                  >
                    <CheckCircle className="h-4 w-4" />
                    Approve & Mark Completed
                  </button>
                  <button
                    className={cn(styles.buttonDestructive, "flex-1")}
                    onClick={requestCorrection}
                    aria-label="Request correction"
                  >
                    <XCircle className="h-4 w-4" />
                    Request Correction
                  </button>
                </div>

                <button
                  className={cn(styles.buttonOutline, "w-full")}
                  onClick={() => {
                    setShowReviewDialog(false);
                    setSelectedSubmission(null);
                    setReviewFeedback("");
                  }}
                  aria-label="Close review dialog"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Query Dialog */}
        {showQueryDialog && (
          <div className={styles.dialog}>
            <div className={`${styles.dialogContent} max-w-xl`}>
              <h2 className="text-xl font-semibold text-gray-900">Trainee Queries</h2>
              <p className="text-sm text-gray-600">View and resolve trainee queries</p>

              <div className="space-y-4 mt-4">
                {selectedQueries.length === 0 ? (
                  <p className="text-sm text-gray-600">No queries available</p>
                ) : (
                  selectedQueries.map((query) => (
                    <div key={query.id} className="p-4 bg-gray-50 rounded-lg space-y-3">
                      {/* Query header with status dot */}
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-700 font-medium">{query.query}</p>
                        <span
                          className={`h-3 w-3 rounded-full ${
                            query.resolved ? "bg-green-500" : "bg-red-500"
                          }`}
                          aria-label={`Status: ${query.resolved ? "Resolved" : "Unresolved"}`}
                        />
                      </div>

                      {/* Query metadata */}
                      <p className="text-xs text-gray-500">
                        Date: {format(query.date, "PPP p")}
                      </p>

                      {/* Chat-like responses */}
                      <div className="space-y-2">
                        {query.responses?.map((resp, idx) => (
                          <div
                            key={idx}
                            className={`p-2 rounded-lg text-sm ${
                              resp.sender === "trainer"
                                ? "bg-blue-100 text-blue-900 text-right"
                                : "bg-gray-200 text-gray-800 text-left"
                            }`}
                          >
                            <p>{resp.message}</p>
                            <p className="text-xs text-gray-500">{format(resp.date, "p")}</p>
                          </div>
                        ))}
                      </div>

                      {/* Response input for trainer */}
                      {!query.resolved && (
                        <div className="flex gap-2 items-start">
                          <textarea
                            className={`${styles.textarea} flex-1 text-sm`}
                            rows={2}
                            placeholder="Type your response..."
                            value={query.newResponse || ""}
                            onChange={(e) => handleResponseChange(query.id, e.target.value)}
                          />
                          <button
                            className={`${styles.buttonSuccess} text-sm`}
                            onClick={() => submitTrainerResponse(query.id)}
                          >
                            Send
                          </button>
                        </div>
                      )}

                      {/* Mark resolved */}
                      {!query.resolved && (
                        <button
                          className={`${styles.buttonSuccess} mt-2 text-sm`}
                          onClick={() => markQueryResolved(query.id)}
                          aria-label={`Mark query ${query.id} as resolved`}
                        >
                          Mark Resolved
                        </button>
                      )}
                    </div>
                  ))
                )}

                {/* Close button */}
                <button
                  className={styles.buttonOutline}
                  onClick={() => setShowQueryDialog(false)}
                  aria-label="Close query dialog"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Placeholder */}
        {!selectedBatch && (
          <div className={styles.card}>
            <div className={cn(styles.cardContent, "flex items-center justify-center py-12")}>
              <div className="text-center space-y-3">
                <ClipboardList className="h-16 w-16 text-gray-400 mx-auto" />
                <p className="text-gray-600 text-sm sm:text-base">
                  Select a batch to begin managing tasks
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskManagement;
