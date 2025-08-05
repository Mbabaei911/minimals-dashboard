import React, { useState } from "react";
import { useUIStore } from "../../store/UiStore";

type Contact = {
  id: number;
  name: string;
  avatar: string;
  role?: string;
  online: boolean;
  lastSeen?: string;
  email: string;
};

interface ContactModalProps {
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ onClose }) => {
  // Get UI state from the store
  const { darkMode, compactMode, fontSize, primaryColor, sizeMultiplier } =
    useUIStore();

  // Complete contact data
  const contacts: Contact[] = [
    {
      id: 1,
      name: "Alex Johnson",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      role: "Frontend Developer",
      online: true,
      email: "alex.johnson@example.com",
    },
    {
      id: 2,
      name: "Sarah Williams",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      role: "UX Designer",
      online: false,
      lastSeen: "2 days ago",
      email: "sarah.w@example.com",
    },
    {
      id: 3,
      name: "Michael Chen",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      role: "Backend Engineer",
      online: true,
      email: "michael.c@example.com",
    },
    {
      id: 4,
      name: "Emily Rodriguez",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      role: "Product Manager",
      online: false,
      lastSeen: "1 hour ago",
      email: "emily.r@example.com",
    },
    {
      id: 5,
      name: "David Kim",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      role: "DevOps Specialist",
      online: true,
      email: "david.k@example.com",
    },
    {
      id: 6,
      name: "Jessica Lee",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      role: "QA Engineer",
      online: false,
      lastSeen: "3 days ago",
      email: "jessica.l@example.com",
    },
    {
      id: 7,
      name: "Ryan Park",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      role: "Mobile Developer",
      online: true,
      email: "ryan.p@example.com",
    },
    {
      id: 8,
      name: "Olivia Martinez",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
      role: "Data Scientist",
      online: false,
      lastSeen: "just now",
      email: "olivia.m@example.com",
    },
    {
      id: 9,
      name: "Daniel Wilson",
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
      role: "Team Lead",
      online: true,
      email: "daniel.w@example.com",
    },
    {
      id: 10,
      name: "Sophia Garcia",
      avatar: "https://randomuser.me/api/portraits/women/5.jpg",
      role: "Content Writer",
      online: false,
      lastSeen: "5 days ago",
      email: "sophia.g@example.com",
    },
    {
      id: 11,
      name: "James Brown",
      avatar: "https://randomuser.me/api/portraits/men/6.jpg",
      role: "UI Designer",
      online: true,
      email: "james.b@example.com",
    },
    {
      id: 12,
      name: "Emma Davis",
      avatar: "https://randomuser.me/api/portraits/women/6.jpg",
      role: "Marketing Specialist",
      online: false,
      lastSeen: "1 week ago",
      email: "emma.d@example.com",
    },
    {
      id: 13,
      name: "Matthew Taylor",
      avatar: "https://randomuser.me/api/portraits/men/7.jpg",
      role: "Fullstack Developer",
      online: true,
      email: "matthew.t@example.com",
    },
    {
      id: 14,
      name: "Ava Anderson",
      avatar: "https://randomuser.me/api/portraits/women/7.jpg",
      role: "HR Manager",
      online: false,
      lastSeen: "yesterday",
      email: "ava.a@example.com",
    },
    {
      id: 15,
      name: "Christopher Thomas",
      avatar: "https://randomuser.me/api/portraits/men/8.jpg",
      role: "System Architect",
      online: true,
      email: "chris.t@example.com",
    },
    {
      id: 16,
      name: "Mia Hernandez",
      avatar: "https://randomuser.me/api/portraits/women/8.jpg",
      role: "Customer Support",
      online: false,
      lastSeen: "4 days ago",
      email: "mia.h@example.com",
    },
    {
      id: 17,
      name: "Andrew White",
      avatar: "https://randomuser.me/api/portraits/men/9.jpg",
      role: "Database Admin",
      online: true,
      email: "andrew.w@example.com",
    },
    {
      id: 18,
      name: "Isabella Lopez",
      avatar: "https://randomuser.me/api/portraits/women/9.jpg",
      role: "Sales Executive",
      online: false,
      lastSeen: "2 weeks ago",
      email: "isabella.l@example.com",
    },
    {
      id: 19,
      name: "Joshua Gonzalez",
      avatar: "https://randomuser.me/api/portraits/men/10.jpg",
      role: "Security Specialist",
      online: true,
      email: "josh.g@example.com",
    },
    {
      id: 20,
      name: "Charlotte Perez",
      avatar: "https://randomuser.me/api/portraits/women/10.jpg",
      role: "Business Analyst",
      online: false,
      lastSeen: "1 month ago",
      email: "charlotte.p@example.com",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Filter contacts based on search term
  const filteredContacts = searchTerm
    ? contacts.filter(
        (contact) =>
          contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (contact.role &&
            contact.role.toLowerCase().includes(searchTerm.toLowerCase())) ||
          contact.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : contacts;

  // Calculate dynamic styles
  const modalStyle = {
    fontSize: `${fontSize * sizeMultiplier}px`,
    "--primary-color": primaryColor,
  } as React.CSSProperties;

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4  bg-opacity-50 ${
        darkMode ? "dark" : ""
      }`}
    >
      <div
        onClick={handleModalContentClick}
        style={modalStyle}
        className={`w-full max-w-md overflow-hidden rounded-xl shadow-xl transition-all
          ${darkMode ? "bg-gray-800" : "bg-white"}
          ${compactMode ? "p-2" : "p-4"}`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between ${
            compactMode ? "p-2" : "p-4"
          } border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}
        >
          <h3
            className={`text-xl font-semibold ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Team Contacts
          </h3>
          <div className="flex items-center space-x-2">
            <span
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {filteredContacts.filter((c) => c.online).length} online
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className={`p-1 rounded-full ${
                darkMode
                  ? "text-gray-400 hover:bg-gray-700 hover:text-gray-300"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-600"
              }`}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Search */}
        <div
          className={`${compactMode ? "p-2" : "p-4"} border-b ${
            darkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search contacts..."
              className={`w-full ${
                compactMode ? "p-1 pl-8" : "p-2 pl-10"
              } text-sm border rounded-lg focus:ring-2 focus:ring-[--primary-color] focus:border-transparent
                ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-gray-50 border-gray-200 text-gray-800"
                }`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                fontSize: "inherit",
              }}
            />
            <svg
              className={`absolute ${
                compactMode
                  ? "w-4 h-4 left-2 top-1.5"
                  : "w-5 h-5 left-3 top-2.5"
              } text-gray-400`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Contacts List */}
        <div
          className={`overflow-y-auto ${
            compactMode ? "h-[300px]" : "h-[400px]"
          }`}
        >
          {filteredContacts.length > 0 ? (
            filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className={`flex items-center ${
                  compactMode ? "p-2" : "p-4"
                } border-b transition-colors cursor-pointer
                  ${
                    darkMode
                      ? "border-gray-700 hover:bg-gray-700"
                      : "border-gray-100 hover:bg-gray-50"
                  }`}
              >
                {/* Avatar with Status */}
                <div className="relative flex-shrink-0 mr-3">
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    className={`${
                      compactMode ? "w-8 h-8" : "w-12 h-12"
                    } rounded-full object-cover`}
                  />
                  <span
                    className={`absolute bottom-0 right-0 ${
                      compactMode ? "w-2.5 h-2.5" : "w-3.5 h-3.5"
                    } rounded-full border-2 ${
                      darkMode ? "border-gray-800" : "border-white"
                    } ${contact.online ? "bg-green-500" : "bg-gray-400"}`}
                  />
                </div>

                {/* Contact Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4
                      className={`text-sm font-semibold truncate ${
                        darkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {contact.name}
                    </h4>
                    {!contact.online && contact.lastSeen && (
                      <span
                        className={`text-xs ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {contact.lastSeen}
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-sm truncate ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {contact.role}
                  </p>
                  <p
                    className={`text-xs truncate ${
                      darkMode ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    {contact.email}
                  </p>
                </div>

                {/* Online Status Indicator */}
                {contact.online && (
                  <div className="ml-2">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        darkMode
                          ? "bg-green-900 text-green-200"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      Online
                    </span>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div
              className={`h-full flex items-center justify-center p-4 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              No contacts found matching "{searchTerm}"
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className={`${compactMode ? "p-2" : "p-4"} text-center ${
            darkMode ? "bg-gray-700" : "bg-gray-50"
          }`}
        >
          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Showing {filteredContacts.length} of {contacts.length} team members
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
