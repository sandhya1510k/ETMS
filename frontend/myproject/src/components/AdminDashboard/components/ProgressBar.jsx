import React from "react";

const ProgressBar = ({ percent }) => {
  return (
    <div className="w-full bg-green-100 rounded-full h-3">
      <div
        className="bg-green-500 h-3 rounded-full transition-all"
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
