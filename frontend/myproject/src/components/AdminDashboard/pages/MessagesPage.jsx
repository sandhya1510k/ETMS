import React, { useState } from "react";
import {
  FiSearch,
  FiPlus,
  FiMoreVertical,
  FiPaperclip,
  FiSmile,
  FiSend,
  FiVideo,
  FiPhone,
  FiInfo,
  FiCheckCircle,
  FiX,
  FiMic,
  FiMicOff,
  FiVideoOff,
  FiUser
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const MessagesPage = () => {
  const [activeConversation, setActiveConversation] = useState(1);
  const [messageInput, setMessageInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [callStatus, setCallStatus] = useState({ active: false, type: null }); // 'voice' or 'video'
  const [userInfoModal, setUserInfoModal] = useState(false);
  const [muted, setMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);

  // Sample data
  const conversations = [
    {
      id: 1,
      name: "Michael Chen",
      role: "Java Trainer",
      avatar: "MC",
      lastMessage: "Great job on the assignment!",
      time: "10:30 AM",
      unread: 2,
      online: true,
      email: "michael.chen@example.com",
      phone: "+1 (555) 123-4567",
      department: "Technical Training",
      specialization: "Java, Spring Framework, Microservices"
    },
    {
      id: 2,
      name: "Alice Johnson",
      role: "Trainee - Java Track",
      avatar: "AJ",
      lastMessage: "I have a question about the Spring framework...",
      time: "Yesterday",
      unread: 0,
      online: false,
      email: "alice.johnson@example.com",
      phone: "+1 (555) 987-6543",
      joinDate: "2023-01-15",
      progress: "78%"
    },
    // ... other conversations
  ];

  const messages = {
    1: [
      { id: 1, text: "Hi there! How can I help you with your training?", sender: "Michael Chen", time: "10:15 AM", isMe: false },
      { id: 2, text: "Hello! I'm having trouble with the Hibernate assignment.", sender: "You", time: "10:18 AM", isMe: true },
      // ... more messages
    ],
    // ... other message threads
  };

  const activeConvData = conversations.find(conv => conv.id === activeConversation);
  const activeMessages = messages[activeConversation] || [];

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // In a real app, this would be an API call
      const newMessage = {
        id: Date.now(),
        text: messageInput,
        sender: "You",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: true
      };
      
      messages[activeConversation].push(newMessage);
      setMessageInput("");
    }
  };

  // Voice call functionality
  const initiateVoiceCall = () => {
    setCallStatus({ active: true, type: 'voice' });
    // In a real app, this would initiate a WebRTC voice call
    console.log(`Initiating voice call with ${activeConvData.name}`);
  };

  // Video call functionality
  const initiateVideoCall = () => {
    setCallStatus({ active: true, type: 'video' });
    // In a real app, this would initiate a WebRTC video call
    console.log(`Initiating video call with ${activeConvData.name}`);
  };

  // End call functionality
  const endCall = () => {
    setCallStatus({ active: false, type: null });
    setMuted(false);
    setVideoOff(false);
    // In a real app, this would terminate the active call
    console.log("Call ended");
  };

  // Toggle microphone
  const toggleMicrophone = () => {
    setMuted(!muted);
    // In a real app, this would mute/unmute the local audio stream
    console.log(muted ? "Microphone unmuted" : "Microphone muted");
  };

  // Toggle video
  const toggleVideo = () => {
    setVideoOff(!videoOff);
    // In a real app, this would enable/disable the local video stream
    console.log(videoOff ? "Video enabled" : "Video disabled");
  };

  // User information functionality
  const showUserInfo = () => {
    setUserInfoModal(true);
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Conversations Sidebar */}
      <div className="w-80 bg-white border-r border-slate-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-slate-800">Messages</h1>
            <button className="p-2 rounded-lg bg-indigo-100 text-indigo-600 hover:bg-indigo-200">
              <FiPlus size={18} />
            </button>
          </div>
          <div className="relative">
            <FiSearch className="absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 bg-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map(conversation => (
            <div
              key={conversation.id}
              className={`flex items-center p-4 border-b border-slate-100 cursor-pointer transition-colors ${
                activeConversation === conversation.id 
                  ? 'bg-indigo-50' 
                  : 'hover:bg-slate-50'
              }`}
              onClick={() => setActiveConversation(conversation.id)}
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-medium">
                  {conversation.avatar}
                </div>
                {conversation.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-slate-800 truncate">{conversation.name}</h3>
                  <span className="text-xs text-slate-500">{conversation.time}</span>
                </div>
                <p className="text-sm text-slate-600 truncate">{conversation.lastMessage}</p>
              </div>
              {conversation.unread > 0 && (
                <div className="ml-2 bg-indigo-600 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
                  {conversation.unread}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        {activeConvData && (
          <div className="bg-white border-b border-slate-200 p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-medium">
                  {activeConvData.avatar}
                </div>
                {activeConvData.online && (
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="ml-3">
                <h2 className="font-medium text-slate-800">{activeConvData.name}</h2>
                <p className="text-sm text-slate-600">{activeConvData.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-indigo-600 transition-colors"
                onClick={initiateVoiceCall}
                title="Voice Call"
              >
                <FiPhone size={18} />
              </button>
              <button 
                className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-indigo-600 transition-colors"
                onClick={initiateVideoCall}
                title="Video Call"
              >
                <FiVideo size={18} />
              </button>
              <button 
                className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-indigo-600 transition-colors"
                onClick={showUserInfo}
                title="User Information"
              >
                <FiInfo size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 bg-slate-50">
          <AnimatePresence>
            {activeMessages.map(message => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex mb-4 ${message.isMe ? 'justify-end' : 'justify-start'}`}
              >
                {!message.isMe && (
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-medium mr-2 flex-shrink-0">
                    {activeConvData?.avatar.charAt(0)}
                  </div>
                )}
                <div className={`max-w-xs lg:max-w-md xl:max-w-lg ${message.isMe ? 'ml-10' : 'mr-10'}`}>
                  {!message.isMe && (
                    <span className="text-xs text-slate-600 font-medium block mb-1">{message.sender}</span>
                  )}
                  <div
                    className={`rounded-2xl px-4 py-2 ${
                      message.isMe
                        ? 'bg-indigo-600 text-white rounded-br-md'
                        : 'bg-white border border-slate-200 rounded-bl-md'
                    }`}
                  >
                    <p>{message.text}</p>
                  </div>
                  <div className={`flex items-center mt-1 text-xs ${message.isMe ? 'justify-end' : 'justify-start'}`}>
                    <span className="text-slate-500">{message.time}</span>
                    {message.isMe && (
                      <FiCheckCircle className="ml-1 text-slate-500" size={12} />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-slate-200 p-4">
          <div className="flex items-center">
            <button className="p-2 text-slate-500 hover:text-indigo-600">
              <FiPaperclip size={20} />
            </button>
            <button className="p-2 text-slate-500 hover:text-indigo-600">
              <FiSmile size={20} />
            </button>
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 mx-2 px-4 py-2 bg-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button 
              className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              onClick={handleSendMessage}
            >
              <FiSend size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Call Interface Modal */}
      <AnimatePresence>
        {callStatus.active && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white rounded-2xl p-6 w-96"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-2xl mx-auto mb-4">
                  {activeConvData?.avatar}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-1">
                  {callStatus.type === 'voice' ? 'Voice Call' : 'Video Call'}
                </h3>
                <p className="text-slate-600 mb-2">Calling {activeConvData?.name}</p>
                <p className="text-slate-400 text-sm">Ringing...</p>
                
                <div className="flex justify-center space-x-4 mt-6">
                  <button 
                    className={`p-3 rounded-full ${muted ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-600'} hover:opacity-80`}
                    onClick={toggleMicrophone}
                  >
                    {muted ? <FiMicOff size={20} /> : <FiMic size={20} />}
                  </button>
                  
                  {callStatus.type === 'video' && (
                    <button 
                      className={`p-3 rounded-full ${videoOff ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-600'} hover:opacity-80`}
                      onClick={toggleVideo}
                    >
                      {videoOff ? <FiVideoOff size={20} /> : <FiVideo size={20} />}
                    </button>
                  )}
                  
                  <button 
                    className="p-3 rounded-full bg-rose-100 text-rose-600 hover:bg-rose-200"
                    onClick={endCall}
                  >
                    <FiPhone size={20} className="transform rotate-135" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* User Information Modal */}
      <AnimatePresence>
        {userInfoModal && activeConvData && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white rounded-2xl p-6 w-96"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-slate-800">User Information</h3>
                <button 
                  className="p-1 rounded-full hover:bg-slate-100"
                  onClick={() => setUserInfoModal(false)}
                >
                  <FiX size={20} />
                </button>
              </div>
              
              <div className="text-center mb-6">
                <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-2xl mx-auto mb-3">
                  {activeConvData.avatar}
                </div>
                <h4 className="text-lg font-medium text-slate-800">{activeConvData.name}</h4>
                <p className="text-slate-600">{activeConvData.role}</p>
                <div className={`inline-flex items-center mt-2 px-2 py-1 rounded-full text-xs ${activeConvData.online ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                  <div className={`w-2 h-2 rounded-full mr-1 ${activeConvData.online ? 'bg-emerald-500' : 'bg-slate-400'}`}></div>
                  {activeConvData.online ? 'Online' : 'Offline'}
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                    <FiUser size={16} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Email</p>
                    <p className="text-slate-800">{activeConvData.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                    <FiPhone size={16} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Phone</p>
                    <p className="text-slate-800">{activeConvData.phone}</p>
                  </div>
                </div>
                
                {activeConvData.department && (
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                      <FiInfo size={16} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Department</p>
                      <p className="text-slate-800">{activeConvData.department}</p>
                    </div>
                  </div>
                )}
                
                {activeConvData.specialization && (
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                      <FiInfo size={16} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Specialization</p>
                      <p className="text-slate-800">{activeConvData.specialization}</p>
                    </div>
                  </div>
                )}
                
                {activeConvData.progress && (
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                      <FiInfo size={16} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Training Progress</p>
                      <p className="text-slate-800">{activeConvData.progress}</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-6 flex justify-center">
                <button 
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  onClick={() => setUserInfoModal(false)}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MessagesPage;