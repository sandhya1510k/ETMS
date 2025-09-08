import React from "react";

const Card = ({ icon, title, value, color = "green" }) => {
  // Map title to link
  let link = "#";
  if (title === "Total Trainees") link = "/trainees";
  if (title === "Active Trainers") link = "/employees";
  if (title === "Ongoing Batches") link = "/batches";
  if (title === "Pending Tasks") link = "/tasks";
  if (title === "Queries") link = "/queries";

  return (
    <a href={link} className={`bg-green-50 shadow-md rounded-xl p-6 flex items-center gap-4 hover:shadow-lg transition-shadow border-t-4 border-${color}-400`}>
      <div className={`text-3xl text-${color}-400`}>{icon}</div>
      <div>
        <div className="text-sm text-gray-600 font-medium">{title}</div>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
      </div>
    </a>
  );
};

export default Card;
