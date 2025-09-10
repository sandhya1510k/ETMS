// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import AdminRoutes from "./components/AdminDashboard/AdminRoutes";

// export default function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         {AdminRoutes()}
//       </Routes>
//     </Router>
//   );
// }




import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Login from "./pages/Login";  

// Admin / Trainer / Trainee Routes
import AdminRoutes from "./components/AdminDashboard/AdminRoutes";
import TrainerRoutes from "./components/TrainerDashboard/TrainerRoutes";
import TraineeRoutes from "./components/TraineeDashboard/TraineeRoutes";
import { Train } from "lucide-react";
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default login page */}
        <Route path="/" element={<Login />} />

        {AdminRoutes()}
        {TraineeRoutes()}
        {TrainerRoutes()}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
      <div
  className="fixed inset-0 flex items-center justify-center pointer-events-none"
  style={{
    backgroundImage: "url('/camellogo.jpg')", // Make sure camellogo.jpg is in your public folder
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "900px",
    opacity: 0.03,
    zIndex: 0,
    width: "100vw",
    height: "100vh",
  }}
></div>
    </Router>
  );
};

export default App;
