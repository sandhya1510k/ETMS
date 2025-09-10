import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "../components/Modal"; 
import Toast from "../components/Toast";

export default function AddEmployee({ onAdd, onClose }) {
  const navigate = useNavigate();
  const defaultPhoto =
    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"; 

  const [form, setForm] = useState({
    name: "",
    trainerId: "",
    empId: "",
    personalEmail: "",
    phone: "",
    domain: "",
    role: "",
    password: "",
    experience: "",
    joinDate: ""
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(defaultPhoto); // ✅ default shown
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPhotoFile(null);
      setPhotoPreview(defaultPhoto); // reset to default
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (photoFile) {
      formData.append("photo", photoFile);
    }

    try {
      await axios.post("http://localhost:8000/api/trainers/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setToast({ type: "success", message: "Employee added successfully!" });
      navigate("/admin/trainermanagement");
    } catch (error) {
      setToast({ type: "error", message: "Error adding employee" });
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 to-green-50 relative">
      {/* ❌ Cross button */}
      <button
        onClick={() => navigate("/admin/employees")}
        className="absolute top-10 right-55 z-10 text-gray-500 hover:text-red-600 text-3xl font-bold"
        aria-label="Close"
      >
        &times;
      </button>

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 relative">
        <h2 className="text-2xl font-bold mb-4">Add Employee</h2>
        <form onSubmit={handleAddUser}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                required
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="Trainer">Trainer</option>
                <option value="Trainee">Trainee</option>
              </select>
            </div>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-2"
              required
            />
            <input
              type="text"
              name="trainerId"
              placeholder="Email ID"
              value={form.trainerId}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-2"
              required
            />
            <input
              type="text"
              name="empId"
              placeholder="Employee ID"
              value={form.empId}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-2"
              required
            />
            <input
              type="email"
              name="personalEmail"
              placeholder="Personal Email"
              value={form.personalEmail}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-2"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-2"
              required
            />
            <input
              type="text"
              name="domain"
              placeholder="Domain/Expertise"
              value={form.domain}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-2"
              required
            />
            <input
              type="text"
              name="experience"
              placeholder="Experience (e.g., 3 years)"
              value={form.experience}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-2"
            />
            <input
              type="date"
              name="joinDate"
              value={form.joinDate}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-2"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-2"
              required
            />

            {/* Upload & Preview */}
            <div className="md:col-span-2">
              <label className="block mb-1 font-medium">Upload Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="block  border-1 border-black"
              />
              {photoPreview && (
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="w-32 h-32 rounded-full mt-2 border"
                />
              )}
            </div>

            <button
              type="submit"
              className="md:col-span-2 bg-blue-600 text-white py-2 rounded-lg mt-4"
            >
              Add {form.role}
            </button>
          </div>
        </form>

        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </div>
  );
}
