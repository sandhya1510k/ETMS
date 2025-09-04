import React from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-green-50 bg-opacity-30">
      <div className="bg-green-50 rounded-xl shadow-lg w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-green-600 text-xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-lg font-bold text-green-700 mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default Modal;
