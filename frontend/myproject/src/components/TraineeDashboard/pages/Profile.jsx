import React, { useState, useEffect } from "react";
import {
  FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, 
  FaCalendarAlt, FaGraduationCap, FaBriefcase,
  FaEdit, FaSave, FaTimes, FaCamera, FaLinkedin,
  FaGithub, FaTwitter, FaGlobe, FaBuilding, FaCode
} from "react-icons/fa";
import { motion } from "framer-motion";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("professional");

  // Mock employee data
  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockUser = {
          id: 1,
          name: "Rayarapu Rakesh",
          email: "rakesh@camelq.in",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
          phone: "9876567898",
          location: "Hyderabad,India",
          bio: "Full-stack developer with expertise in modern JavaScript frameworks. Passionate about building scalable applications and solving complex problems.",
          dob: "2001-07-11",
          joiningDate: "2025-04-02",
          position: "Software Engineer I",
          department: "Product Engineering",
          experience: "5 months",
          skills: ["JavaScript", "React", "Node.js", "Python", "MongoDB", "AWS", "Git"],
          technologies: ["React", "Express.js", "MongoDB", "PostgreSQL", "Docker", "Jest"],
          socialLinks: {
            linkedin: "https://linkedin.com/in/alexjohnson",
            github: "https://github.com/alexjohnson",
            twitter: "https://twitter.com/alexjohnson",
            portfolio: "https://alexjohnson.dev"
          },
          stats: {
            projectsCompleted: 1,
            tasksCompleted: 42,
            codeReviews: 28,
            meetingsAttended: 32
          },
          education: {
            degree: "MCA",
            university: "Osmania University",
            graduationYear: "2024"
          }
        };
        
        setUser(mockUser);
        setEditedUser(mockUser);
      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setUser(editedUser);
    setIsEditing(false);
    // In a real app, you would send the updated data to an API here
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSocialLinkChange = (platform, value) => {
    setEditedUser(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value
      }
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (!user) {
    return <div>Error loading profile</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center">
          <FaUser className="text-teal-500 mr-3" />
          Employee Profile
        </h1>
        <p className="text-gray-600 mt-2">Manage your professional information and preferences</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
          >
            <div className="relative h-32 bg-gradient-to-r from-teal-500 to-indigo-600">
              <div className="absolute -bottom-16 left-6">
                <div className="relative">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-32 w-32 rounded-full border-4 border-white object-cover"
                  />
                  {isEditing && (
                    <label className="absolute bottom-2 right-2 bg-teal-500 text-white p-2 rounded-full cursor-pointer">
                      <FaCamera className="text-sm" />
                      <input type="file" className="hidden" />
                    </label>
                  )}
                </div>
              </div>
            </div>
            
            <div className="pt-20 px-6 pb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={editedUser.name}
                        onChange={handleChange}
                        className="w-full p-1 border border-gray-300 rounded"
                      />
                    ) : (
                      user.name
                    )}
                  </h2>
                  <p className="text-teal-600">
                    {isEditing ? (
                      <input
                        type="text"
                        name="position"
                        value={editedUser.position}
                        onChange={handleChange}
                        className="w-full p-1 border border-gray-300 rounded mt-1"
                      />
                    ) : (
                      user.position
                    )}
                  </p>
                </div>
                
                {isEditing ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSave}
                      className="p-2 bg-teal-500 text-white rounded-full hover:bg-teal-600"
                    >
                      <FaSave />
                    </button>
                    <button
                      onClick={handleCancel}
                      className="p-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleEdit}
                    className="p-2 bg-teal-500 text-white rounded-full hover:bg-teal-600"
                  >
                    <FaEdit />
                  </button>
                )}
              </div>
              
              <p className="text-gray-600 mb-4">
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={editedUser.bio}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    rows="3"
                  />
                ) : (
                  user.bio
                )}
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <FaEnvelope className="mr-3 text-teal-500" />
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={editedUser.email}
                      onChange={handleChange}
                      className="w-full p-1 border border-gray-300 rounded"
                    />
                  ) : (
                    <span>{user.email}</span>
                  )}
                </div>
                
                <div className="flex items-center text-gray-600">
                  <FaPhone className="mr-3 text-teal-500" />
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={editedUser.phone}
                      onChange={handleChange}
                      className="w-full p-1 border border-gray-300 rounded"
                    />
                  ) : (
                    <span>{user.phone}</span>
                  )}
                </div>
                
                <div className="flex items-center text-gray-600">
                  <FaMapMarkerAlt className="mr-3 text-teal-500" />
                  {isEditing ? (
                    <input
                      type="text"
                      name="location"
                      value={editedUser.location}
                      onChange={handleChange}
                      className="w-full p-1 border border-gray-300 rounded"
                    />
                  ) : (
                    <span>{user.location}</span>
                  )}
                </div>
                
                <div className="flex items-center text-gray-600">
                  <FaCalendarAlt className="mr-3 text-teal-500" />
                  {isEditing ? (
                    <input
                      type="date"
                      name="dob"
                      value={editedUser.dob}
                      onChange={handleChange}
                      className="w-full p-1 border border-gray-300 rounded"
                    />
                  ) : (
                    <span>Born {new Date(user.dob).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  )}
                </div>
                
                <div className="flex items-center text-gray-600">
                  <FaBuilding className="mr-3 text-teal-500" />
                  <span>Joined {new Date(user.joiningDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <FaBriefcase className="mr-3 text-teal-500" />
                  <span>{user.experience} experience</span>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Social Links</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center">
                    <FaLinkedin className="text-blue-700 mr-2" />
                    {isEditing ? (
                      <input
                        type="url"
                        value={editedUser.socialLinks.linkedin}
                        onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                        className="w-full p-1 border border-gray-300 rounded text-sm"
                        placeholder="LinkedIn URL"
                      />
                    ) : (
                      <a href={user.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-teal-600 hover:underline">
                        LinkedIn
                      </a>
                    )}
                  </div>
                  
                  <div className="flex items-center">
                    <FaGithub className="text-gray-800 mr-2" />
                    {isEditing ? (
                      <input
                        type="url"
                        value={editedUser.socialLinks.github}
                        onChange={(e) => handleSocialLinkChange('github', e.target.value)}
                        className="w-full p-1 border border-gray-300 rounded text-sm"
                        placeholder="GitHub URL"
                      />
                    ) : (
                      <a href={user.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-sm text-teal-600 hover:underline">
                        GitHub
                      </a>
                    )}
                  </div>
                  
                  <div className="flex items-center">
                    <FaTwitter className="text-blue-400 mr-2" />
                    {isEditing ? (
                      <input
                        type="url"
                        value={editedUser.socialLinks.twitter}
                        onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                        className="w-full p-1 border border-gray-300 rounded text-sm"
                        placeholder="Twitter URL"
                      />
                    ) : (
                      <a href={user.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-sm text-teal-600 hover:underline">
                        Twitter
                      </a>
                    )}
                  </div>
                  
                  <div className="flex items-center">
                    <FaGlobe className="text-teal-500 mr-2" />
                    {isEditing ? (
                      <input
                        type="url"
                        value={editedUser.socialLinks.portfolio}
                        onChange={(e) => handleSocialLinkChange('portfolio', e.target.value)}
                        className="w-full p-1 border border-gray-300 rounded text-sm"
                        placeholder="Portfolio URL"
                      />
                    ) : (
                      <a href={user.socialLinks.portfolio} target="_blank" rel="noopener noreferrer" className="text-sm text-teal-600 hover:underline">
                        Portfolio
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-2">
          {/* Stats Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">Projects Completed</p>
                  <p className="text-2xl font-bold mt-1 text-gray-800">{user.stats.projectsCompleted}</p>
                </div>
                <div className="p-2 rounded-lg bg-teal-100 text-teal-600">
                  <FaCode className="text-lg" />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">Tasks Completed</p>
                  <p className="text-2xl font-bold mt-1 text-gray-800">{user.stats.tasksCompleted}</p>
                </div>
                <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
                  <FaBriefcase className="text-lg" />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">Code Reviews</p>
                  <p className="text-2xl font-bold mt-1 text-gray-800">{user.stats.codeReviews}</p>
                </div>
                <div className="p-2 rounded-lg bg-green-100 text-green-600">
                  <FaUser className="text-lg" />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">Meetings Attended</p>
                  <p className="text-2xl font-bold mt-1 text-gray-800">{user.stats.meetingsAttended}</p>
                </div>
                <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
                  <FaCalendarAlt className="text-lg" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
          >
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab("professional")}
                  className={`py-4 px-6 text-center font-medium text-sm ${activeTab === "professional" ? "border-b-2 border-teal-500 text-teal-600" : "text-gray-500 hover:text-gray-700"}`}
                >
                  Professional Info
                </button>
                <button
                  onClick={() => setActiveTab("skills")}
                  className={`py-4 px-6 text-center font-medium text-sm ${activeTab === "skills" ? "border-b-2 border-teal-500 text-teal-600" : "text-gray-500 hover:text-gray-700"}`}
                >
                  Skills & Technologies
                </button>
                <button
                  onClick={() => setActiveTab("education")}
                  className={`py-4 px-6 text-center font-medium text-sm ${activeTab === "education" ? "border-b-2 border-teal-500 text-teal-600" : "text-gray-500 hover:text-gray-700"}`}
                >
                  Education
                </button>
              </nav>
            </div>
            
            <div className="p-6">
              {activeTab === "professional" && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Professional Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="name"
                          value={editedUser.name}
                          onChange={handleChange}
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      ) : (
                        <p className="p-2 bg-gray-50 rounded">{user.name}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          value={editedUser.email}
                          onChange={handleChange}
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      ) : (
                        <p className="p-2 bg-gray-50 rounded">{user.email}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="position"
                          value={editedUser.position}
                          onChange={handleChange}
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      ) : (
                        <p className="p-2 bg-gray-50 rounded">{user.position}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="department"
                          value={editedUser.department}
                          onChange={handleChange}
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      ) : (
                        <p className="p-2 bg-gray-50 rounded">{user.department}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                      <p className="p-2 bg-gray-50 rounded">{user.experience}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Joining Date</label>
                      <p className="p-2 bg-gray-50 rounded">{new Date(user.joiningDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === "skills" && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Skills & Technologies</h3>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Technical Skills</label>
                    <div className="flex flex-wrap gap-2">
                      {user.skills.map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-teal-100 text-teal-800 text-sm rounded-full">
                          {skill}
                        </span>
                      ))}
                      {isEditing && (
                        <button className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full hover:bg-gray-300">
                          + Add Skill
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Technologies</label>
                    <div className="flex flex-wrap gap-2">
                      {user.technologies.map((tech, index) => (
                        <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">
                          {tech}
                        </span>
                      ))}
                      {isEditing && (
                        <button className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full hover:bg-gray-300">
                          + Add Technology
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Professional Summary</label>
                    {isEditing ? (
                      <textarea
                        name="bio"
                        value={editedUser.bio}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded"
                        rows="4"
                      />
                    ) : (
                      <p className="p-3 bg-gray-50 rounded">{user.bio}</p>
                    )}
                  </div>
                </div>
              )}
              
              {activeTab === "education" && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Education Background</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-800">{user.education.degree}</h4>
                          <p className="text-teal-600">{user.education.university}</p>
                          <p className="text-sm text-gray-500">Graduated {user.education.graduationYear}</p>
                        </div>
                        <FaGraduationCap className="text-teal-500 text-xl" />
                      </div>
                    </div>
                    
                    {isEditing && (
                      <div className="mt-4 p-4 border border-dashed border-gray-300 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-2">Add Education</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                          <input type="text" placeholder="Degree" className="p-2 border border-gray-300 rounded" />
                          <input type="text" placeholder="University" className="p-2 border border-gray-300 rounded" />
                          <input type="text" placeholder="Graduation Year" className="p-2 border border-gray-300 rounded" />
                        </div>
                        <button className="px-4 py-2 bg-teal-500 text-white rounded-md text-sm">
                          Add Education
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="text-md font-medium text-gray-700 mb-2">Certifications</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-600">No certifications added yet.</p>
                      {isEditing && (
                        <button className="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md text-sm">
                          + Add Certification
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;