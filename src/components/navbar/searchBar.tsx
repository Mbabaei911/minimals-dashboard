

import { CgClose } from "react-icons/cg";
import { useRouter } from 'next/navigation';
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useUIStore } from "../../store/UiStore";

type Item = {
  title: string;
  path: string;
  badge: string | string[];
};

type SearchBarProps = {
  onClose: () => void;
};

const items: Item[] = [
  { title: "App", path: "/dashboard", badge: "Overview" },
  { title: "E-commerce", path: "/dashboard/E-commerce", badge: "Overview" },
  { title: "Analytics", path: "/dashboard/analytics", badge: "Overview" },
  { title: "Banking", path: "/dashboard/banking", badge: "Overview" },
  { title: "Booking", path: "/dashboard/booking", badge: "Overview" },
  { title: "Course", path: "/dashboard/Course", badge: "Overview" },
  { title: "User", path: "/dashboard/User", badge: "Overview" },
  { title: "Profile", path: "/dashboard/Profile", badge: ["User", "Management"] },
  { title: "Cards", path: "/dashboard/Cards", badge: ["User", "Management"] },
  { title: "List", path: "/dashboard/List", badge: ["User", "Management"] },
  { title: "Create", path: "/dashboard/Create", badge: ["User", "Management"] },
  { title: "details", path: "/dashboard/Details", badge: ["Product", "Management"] },
];

const SearchBar: React.FC<SearchBarProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const router = useRouter();
  const { darkMode } = useUIStore();

  const handleItemClick = (path: string) => {
    router.push(path);
    onClose();
  };

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.path.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setHasSearched(e.target.value.length > 0);
  };

  const renderBadge = (badgeContent: string) => {
    const badgeClass = darkMode
      ? "bg-gray-700 text-gray-300"
      : "bg-gray-200 text-gray-500";
    return (
      <span className={`text-xs font-semibold rounded-md px-2 py-1 select-none ${badgeClass}`}>
        {badgeContent}
      </span>
    );
  };

  const renderBadges = (badge: string | string[]) => {
    if (Array.isArray(badge)) {
      return (
        <div className="flex gap-1">
          {badge.map((b, index) => (
            <React.Fragment key={index}>{renderBadge(b)}</React.Fragment>
          ))}
        </div>
      );
    }
    return renderBadge(badge);
  };

  return (
    <div
      className={`fixed inset-0 z-50  bg-opacity-50 flex items-start justify-center pt-20 ${
        darkMode ? "dark" : ""
      }`}
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-md rounded-2xl shadow-xl ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search header */}
        <div className={`p-4 border-b ${
          darkMode ? "border-gray-700" : "border-gray-200"
        }`}>
          <div className="flex items-center space-x-3">
            <FaSearch className={`text-lg ${
              darkMode ? "text-gray-400" : "text-gray-400"
            }`} />
            <input
              type="text"
              placeholder="Search..."
              className={`flex-grow text-sm font-normal focus:outline-none placeholder:font-semibold placeholder:text-lg ${
                darkMode
                  ? "text-gray-300 placeholder-gray-500 bg-gray-800"
                  : "text-gray-500 placeholder-gray-400"
              }`}
              value={searchTerm}
              onChange={handleSearch}
              autoFocus
            />
            <button
              className={`p-1 rounded-md ${
                darkMode
                  ? "text-gray-400 hover:bg-gray-700"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
              onClick={onClose}
            >
              <CgClose className="text-xl" />
            </button>
          </div>
        </div>

        {/* Search results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {hasSearched && filteredItems.length === 0 ? (
            <div className="p-8 text-center">
              <p className={`font-medium ${
                darkMode ? "text-gray-300" : "text-gray-500"
              }`}>
                No results found
              </p>
              <p className={`text-xs mt-1 ${
                darkMode ? "text-gray-500" : "text-gray-400"
              }`}>
                Try different keywords
              </p>
            </div>
          ) : (
            <ul>
              {filteredItems.map(({ title, path, badge }) => (
                <li
                  key={`${title}-${path}`}
                  className={`border-b ${
                    darkMode ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <div
                    className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-colors ${
                      darkMode
                        ? "hover:bg-gray-700"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => handleItemClick(path)}
                  >
                    <div className="min-w-0">
                      <p className={`text-md font-bold truncate ${
                        darkMode ? "text-gray-200" : "text-gray-800"
                      }`}>
                        {title}
                      </p>
                      <p className={`text-xs mt-0.5 truncate ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}>
                        {path}
                      </p>
                    </div>
                    {renderBadges(badge)}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        <div className={`p-3 text-xs text-center ${
          darkMode ? "text-gray-500" : "text-gray-400"
        }`}>
          Press ESC to close
        </div>
      </div>
    </div>
  );
};

export default SearchBar;