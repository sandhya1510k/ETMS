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
    </Router>
  );
};

export default App;
