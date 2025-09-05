

// src/components/AdminDashboard/AdminRoutes.jsx
import React from "react";
import { Route } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./pages/AdminDashboard";
import EmployeeManagement from "./pages/EmployeeManagement";
import AddEmployee from "./pages/AddEmployee";
import ViewTrainees from "./pages/ViewTrainees";
import TraineeDetails from "./pages/TraineeDetails";
import BatchManagement from "./pages/BatchManagement";
import Notifications from "./pages/Notifications";
import BatchDetails from "./pages/BatchDetails";

const AdminRoutes = () => (
  <Route path="/admin/" element={<Layout />}>
    <Route index element={<Dashboard />} />
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="employees" element={<EmployeeManagement />} />
    <Route path="add-employee" element={<AddEmployee/>} />
    <Route path="trainees" element={<ViewTrainees />} />
    <Route path="trainee/:empId" element={<TraineeDetails />} />
    <Route path="batches" element={<BatchManagement />} />
    <Route path="batch/:batchId" element={<BatchDetails />} />
    <Route path="notification" element={<Notifications />} />
  </Route>
);

export default AdminRoutes;
