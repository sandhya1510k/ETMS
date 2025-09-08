import React, { useState } from "react";
import {
  HelpCircle,
  Search,
  Phone,
  Mail,
  MessageCircle,
  ChevronDown,
  ChevronRight,
  Send,
  BookOpen,
  Video,
  FileText,
} from "lucide-react";

const Help = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openFAQ, setOpenFAQ] = useState(null);
  const [ticketForm, setTicketForm] = useState({
    subject: "",
    category: "",
    priority: "",
    description: "",
  });

  const faqs = [
    {
      id: 1,
      question: "How do I create a new batch?",
      answer:
        "To create a new batch, go to Batch Management > Create New Batch. Fill in the required details including batch name, course, schedule, and student capacity. Make sure to set the start and end dates appropriately.",
      category: "Batch Management",
    },
    {
      id: 2,
      question: "How can I track student progress?",
      answer:
        "Student progress can be tracked through the Batch Management section. Click on any active batch to view individual student progress, attendance records, and assignment submissions.",
      category: "Student Management",
    },
    {
      id: 3,
      question: "What should I do if a student is struggling?",
      answer:
        "If a student is struggling, you can schedule one-on-one sessions, provide additional resources, or create personalized learning plans. Document all interventions in the student's profile for future reference.",
      category: "Student Management",
    },
    {
      id: 4,
      question: "How do I submit grades for assignments?",
      answer:
        "Navigate to Task Management, find the specific assignment, and click on 'Grade Submissions'. You can provide individual feedback and scores for each student submission.",
      category: "Grading",
    },
    {
      id: 5,
      question: "Can I schedule makeup sessions?",
      answer:
        "Yes, you can schedule makeup sessions through the Batch Management interface. Create a new session entry and mark it as a makeup session for the affected students.",
      category: "Scheduling",
    },
    {
      id: 6,
      question: "How do I update my trainer profile?",
      answer:
        "Go to Trainer Profile > Edit Profile. You can update your bio, expertise areas, certifications, and contact information. Make sure to save changes after editing.",
      category: "Profile Management",
    },
    {
      id: 7,
      question: "What are the platform's technical requirements?",
      answer:
        "The platform works best with modern browsers (Chrome, Firefox, Safari, Edge). Ensure you have a stable internet connection and speakers/microphone for video sessions.",
      category: "Technical",
    },
    {
      id: 8,
      question: "How do I handle disruptive students?",
      answer:
        "Document incidents in the student's profile, follow the escalation protocol outlined in the trainer handbook, and contact your supervisor if the behavior persists.",
      category: "Classroom Management",
    },
  ];

  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = Array.from(new Set(faqs.map((faq) => faq.category)));

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  const handleSubmitTicket = (e) => {
    e.preventDefault();
    console.log("Ticket submitted:", ticketForm);
    setTicketForm({
      subject: "",
      category: "",
      priority: "",
      description: "",
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Help Center</h1>
        <p className="text-gray-600 mt-1">
          Find answers to common questions or get support from our team
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Documentation */}
        <div className="bg-white p-4 rounded-md shadow text-center">
          <div className="p-3 bg-blue-100 rounded-md inline-block mb-3">
            <BookOpen className="h-6 w-6 text-blue-600 mx-auto" />
          </div>
          <h3 className="font-semibold mb-2">Documentation</h3>
          <p className="text-sm text-gray-600 mb-3">
            Complete trainer handbook and guides
          </p>
          <button className="border border-blue-600 text-blue-600 px-3 py-1 rounded-md text-sm hover:bg-blue-50">
            View Docs
          </button>
        </div>

        {/* Video Tutorials */}
        <div className="bg-white p-4 rounded-md shadow text-center">
          <div className="p-3 bg-green-100 rounded-md inline-block mb-3">
            <Video className="h-6 w-6 text-green-600 mx-auto" />
          </div>
          <h3 className="font-semibold mb-2">Video Tutorials</h3>
          <p className="text-sm text-gray-600 mb-3">Step-by-step video guides</p>
          <button className="border border-green-600 text-green-600 px-3 py-1 rounded-md text-sm hover:bg-green-50">
            Watch Videos
          </button>
        </div>

        {/* Phone Support */}
        <div className="bg-white p-4 rounded-md shadow text-center">
          <div className="p-3 bg-yellow-100 rounded-md inline-block mb-3">
            <Phone className="h-6 w-6 text-yellow-600 mx-auto" />
          </div>
          <h3 className="font-semibold mb-2">Phone Support</h3>
          <p className="text-sm text-gray-600 mb-3">Call us at (555) 123-4567</p>
          <button className="border border-yellow-600 text-yellow-600 px-3 py-1 rounded-md text-sm hover:bg-yellow-50">
            Call Now
          </button>
        </div>

        {/* Live Chat */}
        <div className="bg-white p-4 rounded-md shadow text-center">
          <div className="p-3 bg-cyan-100 rounded-md inline-block mb-3">
            <MessageCircle className="h-6 w-6 text-cyan-600 mx-auto" />
          </div>
          <h3 className="font-semibold mb-2">Live Chat</h3>
          <p className="text-sm text-gray-600 mb-3">Chat with our support team</p>
          <button className="border border-cyan-600 text-cyan-600 px-3 py-1 rounded-md text-sm hover:bg-cyan-50">
            Start Chat
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* FAQ Section */}
        <div className="bg-white rounded-md shadow">
          <div className="flex items-center gap-2 p-4 border-b border-gray-200">
            <HelpCircle className="h-5 w-5 text-gray-700" />
            <h2 className="text-lg font-semibold">Frequently Asked Questions</h2>
          </div>
          <div className="p-4 space-y-4">
            {/* Search FAQ */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full border border-gray-300 rounded-md py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* FAQ List */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredFAQs.length > 0 ? (
                filteredFAQs.map((faq) => (
                  <div key={faq.id} className="border rounded-md">
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="flex items-center justify-between w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-md text-left"
                    >
                      <div>
                        <h4 className="font-medium text-sm">{faq.question}</h4>
                        <p className="text-xs text-gray-500">{faq.category}</p>
                      </div>
                      {openFAQ === faq.id ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                    {openFAQ === faq.id && (
                      <div className="p-3 bg-white border-t border-gray-200 rounded-b-md">
                        <p className="text-sm text-gray-600">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <HelpCircle className="h-12 w-12 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No results found</h3>
                  <p>Try different keywords or submit a support ticket</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Support Ticket Form */}
        <div className="bg-white rounded-md shadow">
          <div className="flex items-center gap-2 p-4 border-b border-gray-200">
            <FileText className="h-5 w-5 text-gray-700" />
            <h2 className="text-lg font-semibold">Submit Support Ticket</h2>
          </div>
          <div className="p-4">
            <form onSubmit={handleSubmitTicket} className="space-y-4">
              <div>
                <label htmlFor="subject" className="block mb-1 font-medium text-gray-700">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  placeholder="Brief description of your issue"
                  value={ticketForm.subject}
                  onChange={(e) =>
                    setTicketForm({ ...ticketForm, subject: e.target.value })
                  }
                  required
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="category" className="block mb-1 font-medium text-gray-700">
                  Category
                </label>
                <select
                  id="category"
                  value={ticketForm.category}
                  onChange={(e) =>
                    setTicketForm({ ...ticketForm, category: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="priority" className="block mb-1 font-medium text-gray-700">
                  Priority
                </label>
                <select
                  id="priority"
                  value={ticketForm.priority}
                  onChange={(e) =>
                    setTicketForm({ ...ticketForm, priority: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled>
                    Select priority level
                  </option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block mb-1 font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  placeholder="Please provide detailed information about your issue..."
                  value={ticketForm.description}
                  onChange={(e) =>
                    setTicketForm({ ...ticketForm, description: e.target.value })
                  }
                  required
                  className="w-full border border-gray-300 rounded-md py-2 px-3 min-h-[8rem] resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
              >
                <Send className="h-4 w-4" />
                Submit Ticket
              </button>
            </form>

            <div className="mt-6 p-4 bg-gray-100 rounded-md">
              <h4 className="font-semibold mb-2">Need immediate help?</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>Emergency: (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>support@trainerhub.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;