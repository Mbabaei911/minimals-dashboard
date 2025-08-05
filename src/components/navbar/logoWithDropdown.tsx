import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { BiChevronUp, BiChevronDown } from "react-icons/bi";
import { useUIStore } from "../../store/UiStore"; // Adjust the import path as needed

const LogoWithArrows: React.FC = () => {
  const { darkMode } = useUIStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex items-center gap-1 select-none cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image
          alt="Logo with purple and pink gradient shapes"
          className="w-6 h-6"
          src="/images/navbar/logo-1.webp"
          width={24}
          height={24}
          unoptimized
        />
        <div className={`flex flex-col -space-y-2 ${
          darkMode ? "text-gray-400" : "text-[#6b6b6b]"
        }`}>
          <BiChevronUp size={15} />
          <BiChevronDown size={15} />
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className={`absolute left-0 top-full mt-2 w-72 rounded-xl shadow-md overflow-hidden font-sans z-50 ${
          darkMode ? "bg-gray-800 border border-gray-700" : "bg-white"
        }`}>
          <div className="flex flex-col space-y-1 p-2">
            {/* Team 1 */}
            <div className={`flex items-center justify-between rounded-lg px-3 py-2 hover:bg-gradient-to-br cursor-pointer ${
              darkMode 
                ? "bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500" 
                : "bg-gradient-to-r from-[#c9d7e9] to-[#f1f5f9] hover:bg-gradient-to-br"
            }`}>
              <div className="flex items-center space-x-3">
                <Image
                  alt="Team 1 logo with purple and pink gradient shapes"
                  className="w-6 h-6"
                  height={24}
                  src="/images/navbar/logo-1.webp"
                  width={24}
                  unoptimized
                />
                <span className={`text-sm font-normal select-none ${
                  darkMode ? "text-gray-200" : "text-gray-800"
                }`}>
                  Team 1
                </span>
              </div>
              <span className={`text-xs font-semibold rounded-md px-2 py-0.5 select-none ${
                darkMode 
                  ? "text-gray-200 bg-gray-600" 
                  : "text-[#64748b] bg-[#cbd5e1]"
              }`}>
                Free
              </span>
            </div>

            {/* Team 2 */}
            <div className={`flex items-center justify-between rounded-lg px-3 py-2 cursor-pointer ${
              darkMode 
                ? "hover:bg-gray-700" 
                : "bg-[#f1f5f9] hover:bg-gray-200"
            }`}>
              <div className="flex items-center space-x-3">
                <Image
                  alt="Team 2 logo with colorful star shape"
                  className="w-6 h-6"
                  height={24}
                  src="/images/navbar/logo-2.webp"
                  width={24}
                  unoptimized
                />
                <span className={`text-sm font-normal select-none ${
                  darkMode ? "text-gray-200" : "text-gray-800"
                }`}>
                  Team 2
                </span>
              </div>
              <span className={`text-xs font-semibold rounded-md px-2 py-0.5 select-none ${
                darkMode 
                  ? "text-blue-200 bg-blue-900" 
                  : "text-[#0f172a] bg-[#bae6fd]"
              }`}>
                Pro
              </span>
            </div>

            {/* Team 3 */}
            <div className={`flex items-center justify-between rounded-lg px-3 py-2 cursor-pointer ${
              darkMode 
                ? "hover:bg-gray-700" 
                : "bg-[#f1f5f9] hover:bg-gray-200"
            }`}>
              <div className="flex items-center space-x-3">
                <Image
                  alt="Team 3 logo with orange Reddit style icon"
                  className="w-6 h-6"
                  height={24}
                  src="/images/navbar/logo-3.webp"
                  width={24}
                  unoptimized
                />
                <span className={`text-sm font-normal select-none ${
                  darkMode ? "text-gray-200" : "text-gray-800"
                }`}>
                  Team 3
                </span>
              </div>
              <span className={`text-xs font-semibold rounded-md px-2 py-0.5 select-none ${
                darkMode 
                  ? "text-blue-200 bg-blue-900" 
                  : "text-[#0f172a] bg-[#bae6fd]"
              }`}>
                Pro
              </span>
            </div>

            {/* Create workspace */}
            <div className={`w-full border-t mt-1 ${
              darkMode ? "border-gray-700" : "border-gray-100"
            } border-dashed`}>
              <button
                type="button"
                className={`flex items-center space-x-3 px-3 py-2 transition select-none cursor-pointer w-full rounded-xl mt-1 ${
                  darkMode 
                    ? "text-gray-300 hover:bg-gray-700" 
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="text-lg">+</span>
                <span className="text-sm font-normal">Create workspace</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoWithArrows;