// import React, { children } from 'react'
// import { BrowserRouter, Routes, Route } from 'react-router-dom'  
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import TrainerLayout from './pages/trainerlayout';
// import Dashboard from './components/dashboard';
// import AssessmentDashboard from "./components/assessments";
// import MeetingsDashboard from './components/meetings';
// import Notifications from './components/notifications';
// import TrainerProfile from './components/trainerprofile';
// import TaskManagement from './components/taskmanagement';
// import BatchManagement from './components/batchmanagement';
// import Attendance from './components/attendance';
// import Help from './components/help';
// import TrainerChatBox from './components/chatbox';
// import NotFound from './pages/notfound';





// const TooltipProvider = ({ children}) => <> {children}  </> ;
// const Toaster = () => null ;
// const Sonner = () => null ;

// const queryClient = new QueryClient();

// const App = () => {
//   return (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//      <Toaster/>
//      <Sonner/>
//      <BrowserRouter>
//        <Routes>
//           <Route path="/trainer" element={<TrainerLayout />}>
//             <Route index element={<Dashboard />} />
//             <Route path="profile" element={<TrainerProfile />} />
//             <Route path="tasks" element={<TaskManagement />} />
//             <Route path="batches" element={<BatchManagement />} />
//             <Route path="notifications" element={<Notifications />} />
//             <Route path="attendance" element={<Attendance />} />
//             <Route path="help" element={<Help />} />
//             <Route path="assessments" element={<AssessmentDashboard />} />
//             <Route path="chat" element={<TrainerChatBox />} />
//             <Route path="meetings" element={<MeetingsDashboard />} />
//           </Route>
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//      </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
//   )
// }

// export default App; 


import React from "react";
import { Route } from "react-router-dom";
import TrainerLayout from "../TrainerDashboard/pages/trainerlayout";

// Trainer Pages
import Dashboard from "../TrainerDashboard/components/dashboard";
import AssessmentDashboard from "../TrainerDashboard/components/assessments";
import MeetingsDashboard from "../TrainerDashboard/components/meetings";
import Notifications from "../TrainerDashboard/components/notifications";
import TrainerProfile from "../TrainerDashboard/components/trainerprofile";
import TaskManagement from "../TrainerDashboard/components/taskmanagement";
import BatchManagement from "../TrainerDashboard/components/batchmanagement";
import Attendance from "../TrainerDashboard/components/attendance";
import Help from "../TrainerDashboard/components/help";
import TrainerChatBox from "../TrainerDashboard/components/chatbox";

const TrainerRoutes = () => (
  <Route path="/trainer" element={<TrainerLayout />}>
    <Route index element={<Dashboard />} />
    <Route path="dashboard" element={<Dashboard />} />        {/* /trainer/dashboard */}
    <Route path="profile" element={<TrainerProfile />} />    {/* /trainer/profile */}
    <Route path="tasks" element={<TaskManagement />} />      {/* /trainer/tasks */}
    <Route path="batches" element={<BatchManagement />} />   {/* /trainer/batches */}
    <Route path="notifications" element={<Notifications />} /> {/* /trainer/notifications */}
    <Route path="attendance" element={<Attendance />} />     {/* /trainer/attendance */}
    <Route path="help" element={<Help />} />                 {/* /trainer/help */}
    <Route path="assessments" element={<AssessmentDashboard />} /> {/* /trainer/assessments */}
    <Route path="chat" element={<TrainerChatBox />} />        {/* /trainer/chat */}
    <Route path="meetings" element={<MeetingsDashboard />} /> {/* /trainer/meetings */}
  </Route>
);

export default TrainerRoutes;
