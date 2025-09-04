// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   FiUsers,
//   FiUserCheck,
//   FiLayers,
//   FiClipboard,
//   FiMessageCircle,
//   FiCalendar,
// } from "react-icons/fi";
// import { Pie, Line } from "react-chartjs-2";
// import {
//   Chart,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
// } from "chart.js";
// import { motion } from "framer-motion";

// Chart.register(
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement
// );

// // Static chart and UI data
// const lineData = {
//   labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
//   datasets: [
//     {
//       label: "Performance %",
//       data: [75, 80, 78, 85, 90, 88, 92],
//       fill: false,
//       borderColor: "#6366f1",
//       backgroundColor: "#6366f1",
//       tension: 0.4,
//       pointBackgroundColor: "#fff",
//       pointBorderColor: "#6366f1",
//     },
//   ],
// };

// const pieData = {
//   labels: ["Java", "Python", "Power BI", "DevOps", "HR", "Testing"],
//   datasets: [
//     {
//       label: "Batches",
//       data: [2, 2, 1, 1, 1, 1],
//       backgroundColor: [
//         "#6366f1",
//         "#34d399",
//         "#fbbf24",
//         "#0ea5e9",
//         "#f472b6",
//         "#fb7185",
//       ],
//       borderWidth: 1,
//     },
//   ],
// };

// const recentActivity = [
//   { name: "Alice Brown", action: "Completed Assessment", status: "success" },
//   { name: "Bob Green", action: "Submitted Assignment", status: "info" },
//   { name: "Jane Smith", action: "Batch Started", status: "warning" },
//   { name: "John Doe", action: "Query Raised", status: "error" },
// ];

// const statusColors = {
//   success: "bg-green-500",
//   info: "bg-blue-500",
//   warning: "bg-orange-400",
//   error: "bg-pink-500",
// };


// const refreshAccessToken = async () => {
//   const refresh = localStorage.getItem("refresh");
//   try {
//     const res = await axios.post("http://localhost:8000/api/token/refresh/", {
//       refresh: refresh,
//     });
//     localStorage.setItem("token", res.data.access);
//     return res.data.access;
//   } catch (err) {
//     console.error("Refresh token failed:", err.response?.data || err.message);
//     return null;
//   }
// };

// const AdminDashboard = () => {
//   const [dateTime, setDateTime] = useState("");
//   const [traineeCount, setTraineeCount] = useState(0);
//   const [trainerCount, setTrainerCount] = useState(0);

//   // ----------------------------
//   // 📅 Date & Time Hook
//   // ----------------------------
//   useEffect(() => {
//     const updateDateTime = () => {
//       const now = new Date();
//       const date = now.toLocaleDateString(undefined, {
//         weekday: "long",
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//       });
//       const time = now.toLocaleTimeString(undefined, {
//         hour: "2-digit",
//         minute: "2-digit",
//       });
//       setDateTime(`${date} • ${time}`);
//     };

//     updateDateTime();
//     const timer = setInterval(updateDateTime, 60000);
//     return () => clearInterval(timer);
//   }, []);

//   // ----------------------------
//   // 📊 Fetch Counts
//   // ----------------------------
//   const fetchCounts = async () => {
//     let token = localStorage.getItem("token");

//     const makeRequest = async () => {
//       try {
//         const headers = {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         };

//         const [traineeRes, trainerRes] = await Promise.all([
//           axios.get("http://localhost:8000/api/trainee-count/", headers),
//           axios.get("http://localhost:8000/api/trainer-count/", headers),
//         ]);

//         setTraineeCount(traineeRes.data.count);
//         setTrainerCount(trainerRes.data.count);
//       } catch (err) {
//         // If token is expired, try refreshing
//         if (
//           err.response &&
//           err.response.status === 401 &&
//           err.response.data.code === "token_not_valid"
//         ) {
//           const newToken = await refreshAccessToken();
//           if (newToken) {
//             token = newToken;
//             await makeRequest(); // Retry with new token
//           } else {
//             console.error("Unable to refresh token.");
//           }
//         } else {
//           console.error("Error fetching counts:", err.response?.data || err.message);
//         }
//       }
//     };

//     await makeRequest();
//   };

//   // Run once on mount
//   useEffect(() => {
//     fetchCounts();
//   }, []);

//   const summary = [
//     {
//       title: "Total Trainees",
//       value: traineeCount,
//       icon: <FiUsers />,
//       color: "from-blue-500 to-purple-500",
//       link: "trainees",
//     },
//     {
//       title: "Active Trainers",
//       value: trainerCount,
//       icon: <FiUserCheck />,
//       color: "from-green-400 to-teal-400",
//       link: "employees",
//     },
//     {
//       title: "Ongoing Batches",
//       value: 6,
//       icon: <FiLayers />,
//       color: "from-orange-400 to-pink-400",
//       link: "batches",
//     },
//     {
//       title: "Pending Tasks",
//       value: 15,
//       icon: <FiClipboard />,
//       color: "from-pink-500 to-orange-400",
//       link: "tasks",
//     },
//     {
//       title: "Queries",
//       value: 5,
//       icon: <FiMessageCircle />,
//       color: "from-purple-500 to-blue-400",
//       link: "queries",
//     },
//   ];

//   return (
//     <div className="p-6 space-y-8">
//       {/* Hero Section */}
//       <motion.div
//         className="bg-gradient-to-r from-green-100 via-teal-50 to-blue-100 rounded-xl p-6 flex flex-col justify-center items-start shadow-sm border border-green-100"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <h1 className="text-3xl font-bold text-green-800">
//           Welcome to the ETMS Admin Panel
//         </h1>
//         <p className="text-gray-700 mt-2 flex items-center gap-2">
//           <FiCalendar /> {dateTime}
//         </p>
//       </motion.div>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//         {summary.map((item, idx) => (
//           <motion.a
//             key={item.title}
//             href={item.link}
//             className={`rounded-xl shadow-md p-6 flex items-center gap-4 transition-transform duration-200 hover:scale-105 hover:shadow-lg bg-gradient-to-br ${item.color}`}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: idx * 0.1 }}
//           >
//             <div className="text-4xl text-white drop-shadow-lg">
//               {item.icon}
//             </div>
//             <div>
//               <div className="text-md font-semibold text-white mb-1">
//                 {item.title}
//               </div>
//               <div className="text-3xl font-bold text-white">
//                 {item.value}
//               </div>
//             </div>
//           </motion.a>
//         ))}
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <motion.div
//           className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center min-h-[300px]"
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//         >
//           <span className="text-lg font-bold text-blue-600 mb-2">
//             Trainee Performance Trend
//           </span>
//           <div className="w-full h-56">
//             <Line
//               data={lineData}
//               options={{
//                 plugins: { legend: { display: false } },
//                 maintainAspectRatio: false,

//               }}
//             />
//           </div>
//         </motion.div>
//         <motion.div
//           className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center min-h-[300px]"
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//         >
//           <span className="text-lg font-bold text-teal-600 mb-2">
//             Batch Distribution by Domain
//           </span>
//           <div className="w-40 h-60">
//             <Pie
//               data={pieData}
//               options={{
//                 plugins: { legend: { position: "bottom" } },
//                 maintainAspectRatio: false,
//               }}
//             />
//           </div>
//         </motion.div>
//       </div>

//       {/* Recent Activity */}
//       <motion.div
//         className="bg-gradient-to-br from-blue-50 to-purple-100 rounded-xl shadow-md p-6"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//       >
//         <span className="text-lg font-bold text-purple-700 mb-4 block">
//           Recent Activity
//         </span>
//         <ul className="space-y-3">
//           {recentActivity.map((item, idx) => (
//             <motion.li
//               key={idx}
//               className="flex items-center justify-between"
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: idx * 0.1 }}
//             >
//               <div className="flex items-center gap-2">
//                 <span
//                   className={`inline-block w-2 h-2 rounded-full ${statusColors[item.status]}`}
//                 ></span>
//                 <span className="font-medium text-gray-700">
//                   {item.name}
//                 </span>
//                 <span className="text-gray-500 text-sm">
//                   {item.action}
//                 </span>
//               </div>
//               <span
//                 className={`px-2 py-1 rounded text-xs font-semibold text-white ${statusColors[item.status]}`}
//               >
//                 {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
//               </span>
//             </motion.li>
//           ))}
//         </ul>
//       </motion.div>
//     </div>
//   );
// };

// export default AdminDashboard;




import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FiUsers,
  FiUserCheck,
  FiLayers,
  FiArrowRight,
  FiClock,
} from "react-icons/fi";
import { Pie, Line } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import { motion } from "framer-motion";

Chart.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
);

// Line chart data
const lineData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "Performance %",
      data: [75, 80, 78, 85, 90, 88, 92],
      fill: true,
      borderColor: "#0ea5e9",
      backgroundColor: "rgba(14, 165, 233, 0.1)",
      tension: 0.4,
      pointBackgroundColor: "#fff",
      pointBorderColor: "#0ea5e9",
      pointBorderWidth: 2,
    },
  ],
};

// Pie chart data
const pieData = {
  labels: ["Java", "Python", "Power BI", "DevOps", "HR", "Testing"],
  datasets: [
    {
      label: "Batches",
      data: [2, 2, 1, 1, 1, 1],
      backgroundColor: [
        "#0ea5e9",
        "#10b981",
        "#f59e0b",
        "#8b5cf6",
        "#ec4899",
        "#ef4444",
      ],
      borderWidth: 0,
      hoverOffset: 15,
    },
  ],
};

// Recent activity
const recentActivity = [
  {
    name: "Alice Brown",
    action: "Completed Assessment",
    status: "success",
    time: "10 mins ago",
  },
  {
    name: "Bob Green",
    action: "Submitted Assignment",
    status: "info",
    time: "25 mins ago",
  },
  {
    name: "Jane Smith",
    action: "Batch Started",
    status: "warning",
    time: "1 hour ago",
  },
  {
    name: "John Doe",
    action: "Query Raised",
    status: "error",
    time: "2 hours ago",
  },
];

// Status colors
const statusColors = {
  success: "bg-emerald-400",
  info: "bg-sky-400",
  warning: "bg-amber-400",
  error: "bg-rose-400",
};

const AdminDashboard = () => {
  const [dateTime, setDateTime] = useState("");
  const [traineeCount, setTraineeCount] = useState(0);
  const [trainerCount, setTrainerCount] = useState(0);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const date = now.toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const time = now.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      });
      setDateTime(`${date} • ${time}`);
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    let token = localStorage.getItem("token");
    const makeRequest = async () => {
      try {
        const headers = { headers: { Authorization: `Bearer ${token}` } };
        const [traineeRes, trainerRes] = await Promise.all([
          axios.get("http://localhost:8000/api/trainee-count/", headers),
          axios.get("http://localhost:8000/api/trainer-count/", headers),
        ]);
        setTraineeCount(traineeRes.data.count);
        setTrainerCount(trainerRes.data.count);
      } catch (err) {
        if (
          err.response?.status === 401 &&
          err.response.data?.code === "token_not_valid"
        ) {
          const newToken = await refreshAccessToken();
          if (newToken) {
            token = newToken;
            await makeRequest();
          } else {
            console.error("Unable to refresh token.");
          }
        } else {
          console.error("Error fetching counts:", err.response?.data || err.message);
        }
      }
    };
    await makeRequest();
  };

  const refreshAccessToken = async () => {
    const refresh = localStorage.getItem("refresh");
    try {
      const res = await axios.post("http://localhost:8000/api/token/refresh/", { refresh });
      localStorage.setItem("token", res.data.access);
      return res.data.access;
    } catch (err) {
      console.error("Refresh token failed:", err.response?.data || err.message);
      return null;
    }
  };

  const summary = [
    {
      title: "Total Trainees",
      value: traineeCount,
      icon: <FiUsers />,
      color: "from-cyan-500 to-blue-600",
      link: "/trainees",
    },
    {
      title: "Active Trainers",
      value: trainerCount,
      icon: <FiUserCheck />,
      color: "from-emerald-500 to-teal-600",
      link: "/employees",
    },
    {
      title: "Ongoing Batches",
      value: 6,
      icon: <FiLayers />,
      color: "from-amber-500 to-orange-500",
      link: "/batches",
    },
  ];

  return (
    <div className="p-6 space-y-8 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      {/* Hero Section */}
      <motion.div
        className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl p-6 flex flex-col justify-center items-start shadow-lg border-0 relative overflow-hidden"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="absolute -right-4 -top-4 w-28 h-28 rounded-full bg-white/10"></div>
        <div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full bg-white/10"></div>
        <h1 className="text-3xl font-bold text-white relative z-10">Welcome to Admin</h1>
        <p className="text-blue-100 mt-2 flex items-center gap-2 relative z-10">
          <FiClock className="text-sm" /> {dateTime}
        </p>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {summary.map((item, idx) => (
          <motion.div
            key={idx}
            className="relative group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <a
              href={item.link}
              className="block rounded-2xl bg-white p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-slate-200 group-hover:bg-slate-50"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-slate-500">{item.title}</div>
                  <div className="text-3xl font-bold text-slate-800 mt-1">{item.value}</div>
                </div>
                <div
                  className={`p-4 rounded-xl bg-gradient-to-br ${item.color} text-white text-2xl shadow-md`}
                >
                  {item.icon}
                </div>
              </div>
              <div className="flex items-center text-sm text-slate-400 mt-5 group-hover:text-blue-500 transition-colors">
                View details <FiArrowRight className="ml-1" />
              </div>
            </a>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        <motion.div
          className="lg:col-span-4 bg-white rounded-2xl shadow-sm p-6 border border-slate-200"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="flex items-center justify-between mb-6">
            <span className="text-lg font-semibold text-slate-800">Trainee Performance Trend</span>
            <div className="text-xs px-3 py-1 bg-sky-100 text-sky-800 rounded-full">Last 7 months</div>
          </div>
          <div className="h-72">
            <Line
              data={lineData}
              options={{
                plugins: { legend: { display: false } },
                maintainAspectRatio: false,
                scales: {
                  y: {
                    grid: { color: "rgba(0,0,0,0.05)" },
                    suggestedMin: 70, suggestedMax: 100,
                  },
                  x: { grid: { display: false } }
                }
              }}
            />
          </div>
        </motion.div>

        <motion.div
          className="lg:col-span-3 bg-white rounded-2xl shadow-sm p-6 border border-slate-200 flex flex-col"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-lg font-semibold text-slate-800 mb-6">Batch Distribution</span>
          <div className="flex-1 flex items-center justify-center">
            <div className="w-56 h-56">
              <Pie
                data={pieData}
                options={{
                  plugins: {
                    legend: { position: "bottom", labels: { usePointStyle: true, padding: 20 } }
                  },
                  maintainAspectRatio: false,
                  cutout: "40%"
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <motion.div
          className="lg:col-span-2 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl shadow-lg p-6 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-lg font-semibold mb-4 block">System Status</span>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl">
              <span>Server Uptime</span>
              <span className="font-mono">99.98%</span>
            </div>
          <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl">
              <span>Active Sessions</span>
              <span className="font-mono">42</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl">
              <span>Storage Usage</span>
              <span className="font-mono">65%</span>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="lg:col-span-3 bg-white rounded-2xl shadow-sm p-6 border border-slate-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-6">
            <span className="text-lg font-semibold text-slate-800">Recent Activity</span>
            <a href="#" className="text-sm text-blue-500 hover:text-blue-700 flex items-center">View all <FiArrowRight className="ml-1"/></a>
          </div>
          <ul className="space-y-4">
            {recentActivity.map((item, idx) => (
              <motion.li
                key={idx}
                className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`inline-block w-3 h-3 rounded-full ${statusColors[item.status]}`}></span>
                    <div>
                      <span className="font-medium text-slate-800 block">{item.name}</span>
                      <span className="text-slate-500 text-sm">{item.action}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded text-xs font-semibold text-white ${statusColors[item.status]}`}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                    <div className="text-xs text-slate-400 mt-1">{item.time}</div>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
