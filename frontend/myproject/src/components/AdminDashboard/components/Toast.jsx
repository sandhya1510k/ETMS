import React, { useEffect } from "react";

const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-6 right-6 z-50 px-4 py-2 rounded-lg shadow-lg text-white font-semibold ${type === "success" ? "bg-green-500" : "bg-red-400"}`}>
      {message}
    </div>
  );
};

export default Toast;
