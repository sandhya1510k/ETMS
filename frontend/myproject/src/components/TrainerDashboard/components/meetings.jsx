import { useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaLink,
  FaStickyNote,
  FaExternalLinkAlt,
  FaPlus,
  FaTimes,
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

// Dummy data for batches and employees
const batchesData = {
  "Batch A": [
    { id: 101, name: "Alice" },
    { id: 102, name: "Bob" },
  ],
  "Batch B": [
    { id: 201, name: "Charlie" },
    { id: 202, name: "Dana" },
  ],
  "Batch C": [
    { id: 301, name: "Eve" },
    { id: 302, name: "Frank" },
  ],
};

function MeetingsDashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [meetLink, setMeetLink] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [meetings, setMeetings] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [viewingMeetingId, setViewingMeetingId] = useState(null);
  const [time, setTime] = useState(null);

  const [editingMeetingId, setEditingMeetingId] = useState(null);
  const [editTime, setEditTime] = useState(null);
  const [editLink, setEditLink] = useState("");

  // Initialize with dummy data on first render
  useEffect(() => {
    setMeetings([
      {
        id: 1,
        title: "Team Sync",
        description: "Weekly team meeting",
        link: "https://meet.google.com/team-sync",
        batch: "Batch A",
        time: new Date().toISOString(),
        participants: batchesData["Batch A"].map((p) => ({
          ...p,
          clicked: false,
        })),
      },
      {
        id: 2,
        title: "Project Kickoff",
        description: "Discuss project milestones",
        link: "https://meet.google.com/kickoff",
        batch: "Batch B",
        time: new Date().toISOString(),
        participants: batchesData["Batch B"].map((p) => ({
          ...p,
          clicked: false,
        })),
      },
    ]);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !meetLink || !selectedBatch) return;

    const newMeeting = {
      id: Date.now(),
      title,
      description,
      link: meetLink,
      batch: selectedBatch,
      time,
      participants: batchesData[selectedBatch].map((p) => ({
        ...p,
        clicked: false,
      })),
    };

    setMeetings([...meetings, newMeeting]);
    setTitle("");
    setDescription("");
    setMeetLink("");
    setSelectedBatch("");
    setShowForm(false);
    setTime(null);
    setSuccessMessage("Meeting created successfully!");
  };

  const handleJoinClick = (meetingId) => {
    const meeting = meetings.find((m) => m.id === meetingId);
    if (meeting) {
      window.open(meeting.link, "_blank");
      setMeetings(
        meetings.map((m) =>
          m.id === meetingId
            ? {
                ...m,
                participants: m.participants.map((p) =>
                  p.name === "Trainer" ? { ...p, clicked: true } : p
                ),
              }
            : m
        )
      );
    }
  };

  const handleEditClick = (meeting) => {
    setEditingMeetingId(meeting.id);
    setEditTime(meeting.time);
    setEditLink(meeting.link);
  };

  const handleSaveEdit = (id) => {
    setMeetings(
      meetings.map((m) =>
        m.id === id ? { ...m, time: editTime, link: editLink } : m
      )
    );
    setEditingMeetingId(null);
    setEditTime(null);
    setEditLink("");
  };

  const handleDeleteClick = (id) => {
    setMeetings(meetings.filter((m) => m.id !== id));
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const viewingMeeting = meetings.find((m) => m.id === viewingMeetingId);

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header and Create Button */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between transition-transform duration-300 transform hover:scale-[1.01]">
          <h2 className="text-3xl font-bold text-gray-800">Meetings Dashboard</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md"
          >
            {showForm ? <FaTimes /> : <FaPlus />}{" "}
            {showForm ? "Close" : "Create Meeting"}
          </button>
        </div>

        {/* Meeting Form Section */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-lg p-8 transition-all duration-500 ease-in-out">
            {successMessage && (
              <div className="mb-6 p-4 text-green-800 bg-green-100 rounded-lg text-sm font-medium">
                {successMessage}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">  
              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Title
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <FaCalendarAlt />
                  </span>
                  <input
                    id="title"
                    type="text"
                    placeholder="Enter meeting title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Description
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <FaStickyNote />
                  </span>
                  <input
                    id="description"
                    type="text"
                    placeholder="Enter meeting description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>
              </div>

              {/* Batch */}
              <div>
                <label
                  htmlFor="batch"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Batch
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <FaEye />
                  </span>
                  <select
                    id="batch"
                    value={selectedBatch}
                    onChange={(e) => setSelectedBatch(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition appearance-none"
                  >
                    <option value="" disabled>
                      Select a batch
                    </option>
                    {Object.keys(batchesData).map((batchName) => (
                      <option key={batchName} value={batchName}>
                        {batchName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Google Meet Link */}
              <div>
                <label
                  htmlFor="link"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Google Meet Link
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <FaLink />
                  </span>
                  <input
                    id="link"
                    type="text"
                    placeholder="Paste Google Meet link here"
                    value={meetLink}
                    onChange={(e) => setMeetLink(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>
              </div>

              {/* Meeting Time */}
              <div>
                <label
                  htmlFor="time"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Meeting Time
                </label>
                <input
                  id="time"
                  type="datetime-local"
                  value={time || ""}
                  onChange={(e) => setTime(e.target.value)}
                  min={new Date().toISOString().slice(0, 16)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md"
              >
                Save Meeting
              </button>
            </form>
          </div>
        )}

        {/* Meetings Display Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Scheduled Meetings
          </h3>
          <div className="grid gap-6 md:grid-cols-2">
            {meetings.length > 0 ? (
              meetings.map((meeting) => (
                <div
                  key={meeting.id}
                  className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-bold text-gray-800 mb-1">
                        {meeting.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Batch:</span>{" "}
                        {meeting.batch}
                      </p>
                    </div>

                    {/* Edit + Delete Icons */}
                    {editingMeetingId !== meeting.id && (
                      <div className="flex gap-3 text-gray-500">
                        <FaEdit
                          className="cursor-pointer hover:text-yellow-500"
                          onClick={() => handleEditClick(meeting)}
                          title="Edit"
                        />
                        <FaTrash
                          className="cursor-pointer hover:text-red-600"
                          onClick={() => handleDeleteClick(meeting.id)}
                          title="Delete"
                        />
                      </div>
                    )}
                  </div>

                  {/* Edit Mode */}
                  {editingMeetingId === meeting.id ? (
                    <div className="space-y-3 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Meeting Time
                        </label>
                        <input
                          type="datetime-local"
                          value={editTime || ""}
                          onChange={(e) => setEditTime(e.target.value)}
                          min={new Date().toISOString().slice(0, 16)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Google Meet Link
                        </label>
                        <input
                          type="url"
                          value={editLink}
                          onChange={(e) => setEditLink(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                      </div>
                      <div className="flex gap-3 mt-3">
                        <button
                          onClick={() => handleSaveEdit(meeting.id)}
                          className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingMeetingId(null)}
                          className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm text-gray-600 mt-3">
                        <span className="font-semibold">Time:</span>{" "}
                        {meeting.time
                          ? new Date(meeting.time).toLocaleString("en-US", {
                              dateStyle: "medium",
                              timeStyle: "short",
                            })
                          : "Not set"}
                      </p>
                      <p className="text-sm text-blue-600 truncate mt-2">
                        <a
                          href={meeting.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline flex items-center gap-1"
                        >
                          {meeting.link} <FaExternalLinkAlt size={12} />
                        </a>
                      </p>
                      <div className="flex gap-3 mt-4">
                        <button
                          onClick={() => handleJoinClick(meeting.id)}
                          className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300"
                        >
                          Join <FaExternalLinkAlt />
                        </button>
                        <button
                          onClick={() => setViewingMeetingId(meeting.id)}
                          className="flex items-center justify-center gap-2 bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-300"
                        >
                          View <FaEye />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center col-span-2 py-6">
                No meetings scheduled yet.
              </p>
            )}
          </div>
        </div>

        {/* Trainee Details View */}
        {viewingMeeting && (
          <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md transform scale-100 transition-transform duration-300">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-xl font-bold text-gray-800">
                  Trainee Status for "{viewingMeeting.title}"
                </h4>
                <button
                  onClick={() => setViewingMeetingId(null)}
                  className="text-gray-500 hover:text-gray-800 transition"
                >
                  <FaTimes size={24} />
                </button>
              </div>
              <p className="text-sm text-blue-600 mb-4 break-all">
                <a
                  href={viewingMeeting.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline flex items-center gap-1"
                >
                  {viewingMeeting.link} <FaExternalLinkAlt size={12} />
                </a>
              </p>
              <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                {viewingMeeting.participants.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-gray-50 shadow-sm border border-gray-200"
                  >
                    <span className="font-medium text-gray-700">{p.name}</span>
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        p.clicked
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {p.clicked ? "Opened" : "Not Opened"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MeetingsDashboard;
