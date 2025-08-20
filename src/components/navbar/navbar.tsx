
import { AiFillSetting, AiFillBell } from "react-icons/ai";
import { MdGroup } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { BiSearch } from "react-icons/bi";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ReactNode } from "react";
import FlagDropdown from "./flagDropdown";
import SearchBar from "./searchBar";
import LogoWithArrows from "./logoWithDropdown";
import AvatarSidebar from "./avatarModal";
import styles from "./navbar.module.css";
import HamburgerSidebar from "./hamburgerSidebar";
import SettingSidebar from "./settingSidebarModal";
import ContactModal from "./contactsModal";
import { useUIStore } from "../../store/UiStore";


/**
 * Props interface for Sidebar component
 */
interface SidebarProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}

/**
 * Props interface for SettingsPanel (currently unused but kept for future use)
 */
interface SettingsPanel {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}

/**
 * Reusable Sidebar component that can slide in from left or right
 */
const Sidebar: React.FC<SidebarProps> = ({
  title,
  isOpen,
  onClose,
  children,
}) => {
  const isMenuSidebar = title === "Menu";
  const { darkMode } = useUIStore();

  return (
    <div
      className={`fixed top-0 h-full w-80 shadow-lg transform transition-transform duration-300 ease-in-out z-50 overflow-y-auto  ${
        isMenuSidebar ? "left-0" : "right-0"
      } ${
        isOpen
          ? "translate-x-0"
          : isMenuSidebar
          ? "-translate-x-full"
          : "translate-x-full"
      } ${darkMode ? "bg-gray-800" : "bg-white"}`}
      style={
        {
          scrollbarColor: darkMode ? "#475569 #1e293b" : "#cbd5e1 #f1f5f9",
          "--scrollbar-thumb": darkMode ? "#475569" : "#cbd5e1",
          "--scrollbar-track": darkMode ? "#1e293b" : "#f1f5f9",
          "--scrollbar-thumb-hover": darkMode ? "#64748b" : "#94a3b8",
        } as React.CSSProperties
      }
    >
      <div
        className={` space-y-3 ${darkMode ? "text-gray-200" : "text-gray-700"}`}
      >
        {children || (
          <>
            {["Dashboard", "Profile", "Settings", "Logout"].map((item) => (
              <a
                key={item}
                href="#"
                className={`block hover:text-purple-600 ${
                  darkMode ? "hover:text-purple-400" : ""
                }`}
                onClick={onClose}
              >
                {item}
              </a>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

/**
 * Reusable IconButton component for consistent icon buttons
 */
const IconButton: React.FC<{
  icon: ReactNode;
  ariaLabel: string;
  onClick?: () => void;
  className?: string;
}> = ({ icon, ariaLabel, onClick, className = "" }) => (
  <button
    aria-label={ariaLabel}
    onClick={onClick}
    className={`p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-200 transition-colors ${className} cursor-pointer`}
    type="button"
  >
    <span className="flex items-center justify-center">{icon}</span>
  </button>
);

/**
 * Props interface for UserAvatar component
 */
interface UserAvatarProps {
  onClick: () => void;
}

/**
 * Animated UserAvatar component with rotating gradient border
 */
const UserAvatar: React.FC<UserAvatarProps> = ({ onClick }) => {
  const gradientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let angle = 0;
    let animationFrameId: number;

    const animate = () => {
      angle = (angle + 1) % 360;
      if (gradientRef.current) {
        gradientRef.current.style.background = `conic-gradient(from ${angle}deg, white, white, white, #8b5cf6, #ec4899, #f43f5e, #f59e0b, #3b82f6, white, white, white, white)`;
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div
      onClick={onClick}
      ref={gradientRef}
      className="p-[1px] rounded-full cursor-pointer"
      aria-label="User profile"
    >
      <Image
        alt="User avatar"
        className="rounded-full w-9 h-9 object-cover bg-gray-200 p-1"
        src="/images/navbar/avatar-25.webp"
        width={96}
        height={96}
        unoptimized
      />
    </div>
  );
};

/**
 * Main Header component containing navigation and user controls
 */
const Header: React.FC = () => {
  // State for controlling sidebar visibility
  const [hamburgerSidebar, setHamburgerSidebar] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationSidebar, setNotificationSidebar] = useState(false);
  const [avatarSidebar, setAvatarSidebar] = useState(false);
  const [settingsSidebar, setSettingsSidebar] = useState(false);
  const [contactSidebar, setContactSidebar] = useState(false);

  // Close all sidebars and modals
  const closeAll = () => {
    setHamburgerSidebar(false);
    setSearchOpen(false);
    setNotificationSidebar(false);
    setAvatarSidebar(false);
    setSettingsSidebar(false);
    setContactSidebar(false);
  };

  // Toggle functions for each sidebar
  const toggleSidebar = () => setHamburgerSidebar(!hamburgerSidebar);
  const toggleSearch = () => setSearchOpen(!searchOpen);
  const toggleNotificationSidebar = () =>
    setNotificationSidebar(!notificationSidebar);
  const toggleAvatarSidebar = () => setAvatarSidebar(!avatarSidebar);
  const toggleSettingsSidebar = () => setSettingsSidebar(!settingsSidebar);
  const toggleContactSidebar = () => setContactSidebar(!contactSidebar);

  // Check if any sidebar is open
  const isAnySidebarOpen =
    hamburgerSidebar ||
    searchOpen ||
    notificationSidebar ||
    avatarSidebar ||
    settingsSidebar ||
    contactSidebar;

    const { darkMode } = useUIStore();
  return (
    <>
      {/* Left Sidebar - Menu */}
      <Sidebar title="Menu" isOpen={hamburgerSidebar} onClose={closeAll}>
        <HamburgerSidebar />
      </Sidebar>

      {/* Right Sidebar - Profile */}
      <Sidebar title="Profile" isOpen={avatarSidebar} onClose={closeAll}>
        <AvatarSidebar onClose={closeAll} />
      </Sidebar>

      {/* Right Sidebar - Settings */}
      <Sidebar title="Settings" isOpen={settingsSidebar} onClose={closeAll}>
        <SettingSidebar onClose={closeAll} />
      </Sidebar>

      {/* Search Modal */}
      {searchOpen && <SearchBar onClose={closeAll} />}
      {/* Overlay when any sidebar is open */}
      {isAnySidebarOpen && (
        <div
        onClick={closeAll}
        className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
        aria-hidden="true"
        />
      )}
      {/* contact modal */}
      {contactSidebar && <ContactModal onClose={closeAll} />}

    {/* Main Header - Improved with better dark mode handling */}
    <header className={`flex items-center justify-between gap-4 px-4 py-2 ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      } relative z-30 shadow-sm transition-colors duration-200`}>
        {/* Left side controls */}
        <div className="flex items-center justify-center space-x-5">
          <IconButton
            icon={<RxHamburgerMenu />}
            ariaLabel="Menu"
            onClick={toggleSidebar}
            className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-2xl`}
          />
          <LogoWithArrows />
        </div>

        {/* Right side controls */}
        <div className="flex items-center justify-center space-x-3">
          <IconButton
            icon={<BiSearch />}
            ariaLabel="Search"
            onClick={toggleSearch}
            className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-xl ml-2`}
          />

          <FlagDropdown />

          <IconButton
            icon={<MdGroup size={25} />}
            ariaLabel="Contacts"
            onClick={toggleContactSidebar}
            className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-xl`}
          />

          <IconButton
            icon={<AiFillSetting size={25} />}
            ariaLabel="Settings"
            onClick={toggleSettingsSidebar}
            className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} ${styles.animateSpinSlow}`}
          />

          <UserAvatar onClick={toggleAvatarSidebar} />
        </div>
      </header>
      

      {/* Contact Modal - Render only when needed */}
    </>
  );
};

export default Header;
