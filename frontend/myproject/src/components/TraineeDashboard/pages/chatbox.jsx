import React from "react";

const ChatBox = () => {
  const openCompanyPortal = () => {
    window.open("https://camelq.in/", "_blank");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-indigo-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        <h2 className="text-2xl font-semibold text-teal-600 mb-4">Chat with Us</h2>
        <div className="border rounded p-4 h-64 overflow-y-auto bg-indigo-50">
          <p className="text-gray-700">Welcome! How can we help you today?</p>
        </div>
        <input
          type="text"
          placeholder="Type your message..."
          className="w-full border rounded px-3 py-2 mt-4 focus:outline-teal-500"
        />
        <button
          className="mt-4 w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 rounded"
        >
          Send
        </button>

        <button
          onClick={openCompanyPortal}
          className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded"
        >
          Open Company Portal
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
