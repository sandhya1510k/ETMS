import React from "react";
import { Route } from "react-router-dom";
import Layout from "../TraineeDashboard/components/Layout"; // Adjust path if needed

// Trainee Pages
import TraineeDashboard from "./pages/TraineeDashboard";
import Tasks from "./pages/Tasks";
import Attendance from "./pages/Attendance";
import Meetings from "./pages/Meetings";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Assignments from "./pages/Assignments";
import Notification from "./pages/Notification";

const TraineeRoutes = () => (
  <Route path="/trainee" element={<Layout />}>
    <Route index element={<TraineeDashboard />} />           {/* /trainee */}
    <Route path="dashboard" element={<TraineeDashboard />} /> {/* /trainee/dashboard */}
    <Route path="tasks" element={<Tasks />} />         {/* /trainee/tasks */}
    <Route path="assignments" element={<Assignments />} />
    <Route path="attendance" element={<Attendance />} />
    <Route path="meetings" element={<Meetings />} />
    <Route path="notifications" element={<Notification />} />
    <Route path="profile" element={<Profile />} />
    <Route path="settings" element={<Settings />} />
  </Route>
);

export default TraineeRoutes;
