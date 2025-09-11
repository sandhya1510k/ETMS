import React from "react";
import { Route } from "react-router-dom";
import Layout from "./components/layout"; // Adjust path if needed

// Trainee Pages
import TraineeDashboard from "./pages/traineeDashboard";
import Tasks from "./pages/tasks";
import Attendance from "./pages/attendance";
import Meetings from "./pages/meetings";
import Profile from "./pages/profile";
import ChatBox from "./pages/chatbox";
import Settings from "./pages/settings";
import Assessments from "./pages/assessments"
import Notification from "./pages/notification";

const TraineeRoutes = () => (
  <Route path="/trainee" element={<Layout />}>
    <Route index element={<TraineeDashboard />} />           {/* /trainee */}
    <Route path="dashboard" element={<TraineeDashboard />} /> {/* /trainee/dashboard */}
    <Route path="tasks" element={<Tasks />} />         {/* /trainee/tasks */}
    <Route path="assessments" element={<Assessments />} />
    <Route path="attendance" element={<Attendance />} />
    <Route path="meetings" element={<Meetings />} />
    <Route path="chat" element={<ChatBox />} />
    <Route path="notifications" element={<Notification />} />
    <Route path="profile" element={<Profile />} />
    <Route path="settings" element={<Settings />} />
  </Route>
);

export default TraineeRoutes;
