// // src/routes/AdminRoutes.jsx
// import React from "react";
// import { Routes, Route } from "react-router-dom";

// // Admin Pages
// import EmployeeManagement from "./pages/EmployeeManagement";
// import ViewTrainees from "./pages/ViewTrainees";
// import BatchManagement from "./pages/BatchManagement";
// import Layout from "./Layout";
// import Dashboard from "./pages/Dashboard";

// const AdminRoutes = () => {
//   return (
//     <Routes>
//       {/* All Admin pages wrapped in Layout */}
//       <Route path="/admin" element={<Layout />}>
//       <Route path="/dashboard" element={<Dashboard/>}/>
//         <Route path="employees" element={<EmployeeManagement />} />
//         <Route path="trainees" element={<ViewTrainees />} />
//         <Route path="batches" element={<BatchManagement />} />
//         <Route path="/reports" element={<Reports />} />
//         {/* Add more admin child routes here */}
//       </Route>
//     </Routes>
//   );
// };

// export default AdminRoutes;


// src/routes/AdminRoutes.jsx
// src/components/AdminDashboard/AdminRoutes.jsx




// import React from "react";
// import { Route } from "react-router-dom";

// // Admin Pages
// import EmployeeManagement from "./pages/EmployeeManagement";
// import ViewTrainees from "./pages/ViewTrainees";
// import BatchManagement from "./pages/BatchManagement";
// import Reports from "./pages/Reports";
// import Dashboard from "./pages/Dashboard";

// // Admin Layout
// import Layout from "./Layout";

// const AdminRoutes = () => {
//   return (
//     <Route path="/admin" element={<Layout />}>
//       <Route index element={<Dashboard />} /> {/* /admin */}
//       <Route path="dashboard" element={<Dashboard />} /> {/* /admin/dashboard */}
//       <Route path="employees" element={<EmployeeManagement />} /> {/* /admin/employees */}
//       <Route path="trainees" element={<ViewTrainees />} />
//       <Route path="batches" element={<BatchManagement />} />
//       <Route path="reports" element={<Reports />} />
//     </Route>
//   );
// };

// export default AdminRoutes;

// components/AdminDashboard/AdminRoutes.jsx
// import React from "react";
// import { Route } from "react-router-dom";

// // Pages
// import Dashboard from "./pages/AdminDashboard";
// import EmployeeManagement from "./pages/EmployeeManagement";
// import ViewTrainees from "./pages/ViewTrainees";
// import BatchManagement from "./pages/BatchManagement";
// import Reports from "./pages/Reports";
// import Layout from "./Layout";

// const AdminRoutes = () => {
//   return (
//     <Route path="/admin" element={<Layout />}>
//       <Route index element={<Dashboard />} /> {/* /admin */}
//       <Route path="dashboard" element={<Dashboard />} /> {/* /admin/dashboard */}
//       <Route path="employees" element={<EmployeeManagement />} />
//       <Route path="trainees" element={<ViewTrainees />} />
//       <Route path="batches" element={<BatchManagement />} />
//       <Route path="reports" element={<Reports />} />
//     </Route>
//   );
// };

// export default AdminRoutes;


// src/components/AdminDashboard/AdminRoutes.jsx
import React from "react";
import { Route } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./pages/AdminDashboard";
import EmployeeManagement from "./pages/EmployeeManagement";
import ViewTrainees from "./pages/ViewTrainees";
import BatchManagement from "./pages/BatchManagement";
import Reports from "./pages/Reports";

const AdminRoutes = () => (
  <Route path="/admin" element={<Layout />}>
    <Route index element={<Dashboard />} />
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="employees" element={<EmployeeManagement />} />
    <Route path="trainees" element={<ViewTrainees />} />
    <Route path="batches" element={<BatchManagement />} />
    <Route path="reports" element={<Reports />} />
  </Route>
);

export default AdminRoutes;
