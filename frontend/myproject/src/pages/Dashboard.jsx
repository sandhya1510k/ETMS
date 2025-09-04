// import React from "react";
// import AdminDashboard from "../components/AdminDashboard/pages/AdminDashboard";
// import TrainerDashboard from "../components/TrainerDashboard/TrainerDashboard";
// import TraineeDashboard from "../components/TraineeDashboard/TraineeDashboard";
// import Layout from "../components/AdminDashboard/Layout";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";


// export default function Dashboard() {
//   const role = localStorage.getItem("role");
//   const email = localStorage.getItem("email");

//   const getNameFromEmail = (email) => {
//     if (!email) return "";
//     return email.split("@")[0];
//   };

//   if (!role) return <h1>Unauthorized Access</h1>;

//   if (role === "admin") {
//     // Admin ke liye layout ke andar
//     return (
//       <Layout>
//         <AdminDashboard />
//       </Layout>
//     );
//   }

//   if (role === "trainer") {
//     // Trainer ke liye bina layout
//     return <TrainerDashboard username={getNameFromEmail(email)} />;
//   }

//   if (role === "trainee") {
//     // Trainee ke liye bina layout
//     return <TraineeDashboard username={getNameFromEmail(email)} />;
//   }

//   return <h1>Role not recognized</h1>;
// }







// // // src/pages/Dashboard.jsx
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const role = localStorage.getItem("role");
//   const email = localStorage.getItem("email");

//   useEffect(() => {
//     if (!role) {
//       navigate("/");
//     } else if (role === "admin") {
//       navigate("/admin/dashboard");
//     } else if (role === "trainer") {
//       navigate("/trainer");
//     } else if (role === "trainee") {
//       navigate("/trainee");
//     }
//   }, [navigate, role]);

//   return null;
// }




// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import TrainerDashboard from "../components/TrainerDashboard/TrainerDashboard";
// import TraineeDashboard from "../components/TraineeDashboard/TraineeDashboard";

// export default function Dashboard() {
//   const role = localStorage.getItem("role");
//   const email = localStorage.getItem("email");
//   const navigate = useNavigate();

//   const getNameFromEmail = (email) => {
//     if (!email) return "";
//     return email.split("@")[0];
//   };

//   useEffect(() => {
//     if (!role) {
//       // No role means not logged in
//       navigate("/");
//     } else if (role === "admin") {
//       // Admin uses nested routing under /admin
//       navigate("/admin/dashboard");
//     }
//     // Do NOT navigate for trainer/trainee – render their dashboards below
//   }, [role, navigate]);

//   if (!role) {
//     return <h1>Unauthorized Access</h1>;
//   }

//   if (role === "trainer") {
//     return <TrainerDashboard username={getNameFromEmail(email)} />;
//   }

//   if (role === "trainee") {
//     return <TraineeDashboard username={getNameFromEmail(email)} />;
//   }

//   return <h1>Role not recognized</h1>;
// }




import React from "react";

export default function Dashboard() {
  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email");

  const getNameFromEmail = (email) => {
    if (!email) return "";
    return email.split("@")[0];
  };

  if (!role) {
    return <h1>Unauthorized Access</h1>;
  }

  if (role === "trainer") {
    return <Dashboard username={getNameFromEmail(email)} />;
  }

  if (role === "trainee") {
    return <TraineeDashboard username={getNameFromEmail(email)} />;
  }

  return <h1>Role not recognized</h1>;
}
