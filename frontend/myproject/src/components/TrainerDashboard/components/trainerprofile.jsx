import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const TrainerProfile = () => {
  const [profile, setProfile] = useState({
    name: "Sumanth Reddy",
    email: "sumanth@example.com",
    phone: "+91 98765 43210",
    specialization: "Full Stack Development",
    experience: "5 Years",
    EmployeeId: "Cmlq1234",
    certifications: ["AWS Certified Solutions Architect", "ReactJS Advanced"],
    stats: {
      totalBatches: 12,
      ongoingBatches: 3,
      completedSessions: 350,
      
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(profile);

  // Handle input changes
  const handleChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  // Save changes
  const handleSave = () => {
    setProfile(editForm);
    setIsEditing(false);
  };

  return (
    <div className="h-full w-full bg-gray-100 p-6">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-teal-700 mb-6">
        {profile.name}
      </h1>

      {/* Main Layout - Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Profile Card */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <img
            src="/placeholder-trainer.jpg"
            alt="Trainer"
            className="w-28 h-28 rounded-full border-4 border-teal-500 object-cover mb-4"
          />
          
          <p className="text-teal-600">{profile.specialization}</p>
          <p className="text-gray-500">{profile.experience} Experience</p>
          <p className="mt-1 font-medium text-gray-700">
            Emp Id: {profile.EmployeeId}
          </p>

          <button
            onClick={() => {
              setEditForm(profile);
              setIsEditing(true);
            }}
            className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-lg shadow hover:bg-teal-600 transition"
          >
            Edit Profile
          </button>
        </div>

        {/* Right Column: Contact Info & Certifications */}
        <div className="lg:col-span-2 space-y-6 ">
          {/* Contact Info */}
          <div className="flex flex-col items-center bg-white rounded-xl shadow p-6 ">
            <h2 className="text-lg font-semibold mb-4 text-teal-700">
              Contact Information
            </h2>
            <p className="text-gray-700">
              <strong>Email:</strong> {profile.email}
            </p>
            <p className="text-gray-700">
              <strong>Phone:</strong> {profile.phone}
            </p>
          </div>

          {/* Certifications */}
          <div className="flex flex-col items-center bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4 text-teal-700">
              Certifications
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {profile.certifications.map((cert, index) => (
                <li key={index}>{cert}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
{/* Stats Section - Full Width Band */}
<div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-6">
  <div className="bg-green-100 text-green-800 rounded-lg shadow p-4 text-center">
    <p className="text-2xl font-bold">{profile.stats.totalBatches}</p>
    <p>Total Batches</p>
  </div>
  <div className="bg-yellow-100 text-yellow-800 rounded-lg shadow p-4 text-center">
    <p className="text-2xl font-bold">{profile.stats.ongoingBatches}</p>
    <p>Ongoing Batches</p>
  </div>
  <div className="bg-blue-100 text-blue-800 rounded-lg shadow p-4 text-center">
    <p className="text-2xl font-bold">{profile.stats.completedSessions}</p>
    <p>Completed Sessions</p>
  </div>
</div>

      {/* EDIT PROFILE DIALOG */}
      {isEditing && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    {/* Background Overlay */}
    <div className="absolute inset-0 backdrop-blur-sm"></div>

    {/* Dialog */}
    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 relative z-10">
      {/* Close Button */}
      <button
        onClick={() => setIsEditing(false)}
        className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
      >
        <FaTimes size={20} />
      </button>

      <h2 className="text-xl font-semibold mb-4 text-teal-700">Edit Profile</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          value={editForm.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="phone"
          value={editForm.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="specialization"
          value={editForm.specialization}
          onChange={handleChange}
          placeholder="Specialization"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="experience"
          value={editForm.experience}
          onChange={handleChange}
          placeholder="Experience"
          className="border p-2 rounded"
        />
      </div>
      <div className="mt-4 flex gap-3 justify-end">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Save
        </button>
        <button
          onClick={() => setIsEditing(false)}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default TrainerProfile;
