import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./avatarModal.module.css";
import { useUIStore } from "../../store/UiStore"; // Import your Zustand store
import {
  FaTimes,
  FaHome,
  FaUser,
  FaClipboardList,
  FaDollarSign,
  FaShieldAlt,
  FaCog,
} from "react-icons/fa";

interface AvatarSidebarProps {
  onClose: () => void;
}

function AvatarSidebar({ onClose }: AvatarSidebarProps) {
  // Get UI state from the store
  const {
    darkMode,
    compactMode,
    fontSize,
    primaryColor,
    sizeMultiplier,
    rtl,
    fontFamily
  } = useUIStore();

  // Ref for the animated gradient border
  const gradientRef = useRef<HTMLDivElement>(null);

  // Animation effect for the gradient border
  useEffect(() => {
    let angle = 0;
    let animationFrameId: number;

    const animate = () => {
      angle = (angle + 1) % 360;
      if (gradientRef.current) {
        gradientRef.current.style.background = `conic-gradient(from ${angle}deg, white, green, white)`;
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Calculate dynamic styles based on UI preferences
  const sidebarStyle = {
    fontSize: `${fontSize * sizeMultiplier}px`,
    fontFamily: fontFamily,
    direction: rtl ? 'rtl' : 'ltr'
  } as React.CSSProperties;

  return (
    <div 
      className={`${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}
      style={sidebarStyle}
    >
      <div className={`w-full max-w-xs rounded-xl relative ${compactMode ? 'p-2' : 'p-6'}`}>
        {/* Close Button */}
        <button
          aria-label="Close"
          className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-700'} mb-6`}
          onClick={onClose}
        >
          <FaTimes className="text-lg cursor-pointer" />
        </button>

        {/* User Profile Section */}
        <div className="flex flex-col items-center">
          {/* Animated Avatar Border */}
          <div
            ref={gradientRef}
            className="p-[2px] rounded-full"
            style={{
              background: "conic-gradient(from 0deg,white,white,white, #8b5cf6, #ec4899, #f43f5e, #f59e0b, #3b82f6,white,white,white,white)",
            }}
          >
            <Image
              alt="User avatar"
              className={`rounded-full ${compactMode ? 'w-16 h-16' : 'w-24 h-24'} object-cover ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} p-1`}
              src="/images/navbar/avatar-25.webp"
              width={compactMode ? 64 : 96}
              height={compactMode ? 64 : 96}
              unoptimized
            />
          </div>

          {/* User Info */}
          <h2 className={`mt-4 font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} ${compactMode ? 'text-base' : 'text-lg'}`}>
            Jaydon Frankie
          </h2>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} ${compactMode ? 'text-xs' : 'text-sm'} mt-1`}>
            demo@minimals.cc
          </p>

          {/* Account Switcher */}
          <div className="flex items-center space-x-3 my-3">
            {['Martin', 'George', 'Loucas'].map((name, index) => (
              <div key={name} className="relative group inline-block cursor-pointer">
                <Image
                  alt={`${name}'s avatar`}
                  className={`rounded-full w-10 h-10 object-cover ${darkMode ? 'border-gray-600' : 'border-gray-200'} border`}
                  src={`https://storage.googleapis.com/a1aa/image/${index === 0 ? '69da15d9-02e8-4b29-12c2-34d09ff038a7' : 
                    index === 1 ? '85df2097-1c37-48dc-7fb8-1849772861d3' : '69da15d9-02e8-4b29-12c2-34d09ff038a7'}.jpg`}
                  width={40}
                  height={40}
                  unoptimized
                />
                {/* Tooltip */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-800'} text-white text-xs rounded py-1 px-2 whitespace-nowrap shadow-lg`}>
                    Switch to: {name}
                    <div className={`absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-0 border-b-4 border-l-transparent border-r-transparent ${darkMode ? 'border-b-gray-700' : 'border-b-gray-800'}`}></div>
                  </div>
                </div>
              </div>
            ))}

            {/* Add Account Button */}
            <div className="relative group inline-block cursor-pointer">
              <button
                aria-label="Add new avatar"
                className={`w-10 h-10 rounded-full border border-dashed ${darkMode ? 'border-gray-600 text-gray-400 hover:bg-gray-700' : 'border-gray-300 text-gray-600 hover:bg-gray-300'} flex items-center justify-center text-xl font-bold cursor-pointer ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}
              >
                +
              </button>
              {/* Tooltip */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-800'} text-white text-xs rounded py-1 px-2 whitespace-nowrap shadow-lg`}>
                  Add account
                  <div className={`absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-0 border-b-4 border-l-transparent border-r-transparent ${darkMode ? 'border-b-gray-700' : 'border-b-gray-800'}`}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className={`mt-1 border-y ${darkMode ? 'border-gray-700' : 'border-gray-300'} ${compactMode ? 'py-3' : 'py-5'} border-dashed`}>
          {[
            { icon: <FaHome className="text-lg w-5" />, text: "Home" },
            { icon: <FaUser className="text-lg w-5" />, text: "Profile" },
            { icon: <FaClipboardList className="text-lg w-5" />, text: "Projects", badge: 3 },
            { icon: <FaDollarSign className="text-lg w-5" />, text: "Subscription" },
            { icon: <FaShieldAlt className="text-lg w-5" />, text: "Security" },
            { icon: <FaCog className="text-lg w-5" />, text: "Account settings" },
          ].map((item) => (
            <Link
              key={item.text}
              href="/dashboard"
              className={`flex items-center space-x-3 ${darkMode ? 'text-gray-400 hover:bg-gray-700 hover:text-white' : 'text-gray-500 hover:bg-gray-300 hover:text-gray-700'} ${compactMode ? 'py-2 px-1' : 'py-4 px-2'} rounded-lg transition`}
            >
              {item.icon}
              <span className={`${compactMode ? 'text-xs' : 'text-sm'}`}>{item.text}</span>
              {item.badge && (
                <span className={`${darkMode ? 'bg-red-900 text-red-200' : 'bg-red-200 text-red-500'} text-xs font-semibold rounded-md px-2 py-1`}>
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Upgrade Banner */}
        <div
          className={`mx-2 mt-3 mb-3 rounded-2xl px-5 ${compactMode ? 'py-4' : 'py-7'} text-white relative overflow-hidden`}
          style={{
            backgroundImage: `
              linear-gradient(135deg, rgba(240, 138, 93, 0.9) 0%, rgba(184, 59, 94, 0.9) 50%, rgba(104, 44, 172, 0.9) 100%),
              url('/images/navbar/background-7.webp')
            `,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h3 className="font-bold leading-6" style={{ fontSize: `${fontSize * sizeMultiplier * 1.125}px` }}>
            35% OFF
          </h3>
          <p className="mt-1 font-semibold leading-5" style={{ fontSize: `${fontSize * sizeMultiplier * 0.875}px` }}>
            Power up Productivity!
          </p>
          <button 
            className={`mt-4 bg-yellow-400 hover:bg-yellow-600 text-black font-semibold rounded-md px-4 py-2 shadow-md transition-colors duration-300 cursor-pointer`}
            style={{ fontSize: `${fontSize * sizeMultiplier * 0.875}px` }}
          >
            Upgrade to Pro
          </button>
          <div className="absolute right-0 bottom-1 w-26 h-36">
            <Image
              alt="Rocket icon"
              className={`w-full h-full object-contain pointer-events-none select-none ${styles.animateFloat}`}
              src="/images/navbar/illustration-rocket-small.webp"
              width={95}
              height={95}
              unoptimized
            />
          </div>
        </div>

        {/* Logout Button */}
        <div className={`sticky bottom-0 ${compactMode ? 'py-2 px-4' : 'py-4 px-2'} w-full ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
          <button 
            className={`w-full py-3 font-semibold text-center rounded-md transition cursor-pointer ${darkMode ? 'bg-red-900 text-red-200 hover:bg-red-800' : 'bg-red-200 text-red-700 hover:bg-red-300'}`}
            style={{ fontSize: `${fontSize * sizeMultiplier * 0.875}px` }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default AvatarSidebar;