import React, { useState } from "react";
import Image from "next/image";
import { useUIStore } from "../../store/UiStore";
import {
  FaHome,
  FaShoppingCart,
  FaChartBar,
  FaUniversity,
  FaCalendarCheck,
  FaFileAlt,
  FaGraduationCap,
  FaUser,
  FaBox,
  FaFileInvoice,
  FaBlog,
  FaBriefcase,
  FaUmbrellaBeach,
  FaShieldAlt,
  FaLayerGroup,
  FaBan,
  FaTag,
  FaQuoteLeft,
  FaQuestionCircle,
  FaCodeBranch,
  FaExternalLinkAlt,
  FaSquare,
  FaChevronRight,
  FaChevronDown,
  FaEnvelope,
  FaComments,
  FaCalendarAlt,
  FaColumns,
  FaMoon,
  FaSun,
} from "react-icons/fa";

type SectionKey =
  | "user"
  | "product"
  | "order"
  | "invoice"
  | "blog"
  | "job"
  | "tour"
  | "File manager"
  | "Mail"
  | "Chat"
  | "Calendar"
  | "Kanban";

interface NavItem {
  icon: React.ReactElement;
  label: string;
  active?: boolean;
  disabled?: boolean;
}

interface MiscItem {
  icon: React.ReactElement;
  label: string;
  disabled?: boolean;
  title?: string;
  hasChevron?: boolean;
  highlight?: boolean;
  badge?: string;
  isCaption?: boolean;
  external?: boolean;
}

interface SidebarState {
  openSections: Record<SectionKey, boolean>;
  isLevelOpen: boolean;
}

export default function HamburgerSidebar() {
  const {
    darkMode,
    toggleDarkMode,
    rtl,
    compactMode,
    fontFamily,
    fontSize,
    primaryColor,
  } = useUIStore();

  const [sidebarState, setSidebarState] = useState<SidebarState>({
    openSections: {
      user: false,
      product: false,
      order: false,
      invoice: false,
      blog: false,
      job: false,
      tour: false,
      "File manager": false,
      Mail: false,
      Chat: false,
      Calendar: false,
      Kanban: false,
    },
    isLevelOpen: false,
  });

  const toggleSection = (section: SectionKey) => {
    setSidebarState((prev) => ({
      ...prev,
      openSections: {
        ...prev.openSections,
        [section]: !prev.openSections[section],
      },
    }));
  };

  const toggleLevelDropdown = () => {
    setSidebarState((prev) => ({
      ...prev,
      isLevelOpen: !prev.isLevelOpen,
    }));
  };

  const renderIcon = (icon: React.ReactElement, className: string) => {
    return React.cloneElement(icon, { className });
  };

  const sections = [
    {
      key: "user",
      icon: <FaUser size={20} />,
      items: ["Profile", "Cards", "List", "Create", "Edit", "Account"],
    },
    {
      key: "product",
      icon: <FaBox size={20} />,
      items: ["List", "Details", "Create", "Edit"],
    },
    {
      key: "order",
      icon: <FaShoppingCart size={20} />,
      items: ["List", "Details"],
    },
    {
      key: "invoice",
      icon: <FaFileInvoice size={20} />,
      items: ["List", "Details", "Create", "Edit"],
    },
    {
      key: "blog",
      icon: <FaBlog size={20} />,
      items: ["List", "Details", "Create", "Edit"],
    },
    {
      key: "job",
      icon: <FaBriefcase size={20} />,
      items: ["List", "Details", "Create", "Edit"],
    },
    {
      key: "tour",
      icon: <FaUmbrellaBeach size={20} />,
      items: ["List", "Details", "Create", "Edit"],
    },
    {
      key: "File manager",
      icon: <FaFileAlt size={20} />,
      items: ["All files", "Recent", "Shared", "Starred", "Trash"],
    },
    {
      key: "Mail",
      icon: <FaEnvelope size={20} />,
      items: ["Inbox", "Sent", "Drafts", "Spam", "Trash"],
    },
    {
      key: "Chat",
      icon: <FaComments size={20} />,
      items: ["Contacts", "Rooms", "Groups", "Archived"],
    },
    {
      key: "Calendar",
      icon: <FaCalendarAlt size={20} />,
      items: ["Month", "Week", "Day", "Agenda"],
    },
    {
      key: "Kanban",
      icon: <FaColumns size={20} />,
      items: ["Board", "Tasks", "Backlog", "Completed"],
    },
  ];

  const navItems: NavItem[] = [
    { icon: <FaHome size={20} />, label: "App", active: true },
    { icon: <FaShoppingCart size={20} />, label: "E-commerce" },
    { icon: <FaChartBar size={20} />, label: "Analytics" },
    { icon: <FaUniversity size={20} />, label: "Banking" },
    { icon: <FaCalendarCheck size={20} />, label: "Booking" },
    { icon: <FaFileAlt size={20} />, label: "File" },
    { icon: <FaGraduationCap size={20} />, label: "Course" },
  ];

  const miscItems: MiscItem[] = [
    {
      icon: <FaShieldAlt size={20} />,
      label: "Permission",
      title: "Only admin can see this item",
    },
    { icon: <FaLayerGroup size={20} />, label: "Level", hasChevron: true },
    { icon: <FaBan size={20} />, label: "Disabled", disabled: true },
    {
      icon: <FaTag size={20} />,
      label: "Label",
      highlight: true,
      badge: "NEW",
    },
    { icon: <FaQuoteLeft size={20} />, label: "Caption", isCaption: true },
    { icon: <FaQuestionCircle size={20} />, label: "Params" },
    { icon: <FaCodeBranch size={20} />, label: "Subpaths" },
    {
      icon: <FaExternalLinkAlt size={20} />,
      label: "External link",
      external: true,
    },
    { icon: <FaSquare size={20} />, label: "Blank" },
    {
      icon: darkMode ? <FaSun size={20} /> : <FaMoon size={20} />,
      label: darkMode ? "Light Mode" : "Dark Mode",
      hasChevron: false,
    },
  ];

  return (
    <div
      className={`min-h-screen flex flex-col justify-between border-r px-6 py-8 transition-colors duration-300 ${
        darkMode
          ? "bg-gray-900 border-gray-700 text-gray-100"
          : "bg-white border-gray-200 text-gray-800"
      }`}
      style={{
        fontFamily: fontFamily,
        fontSize: `${fontSize}px`,
        // @ts-ignore
        "--primary-color": primaryColor,
      }}
    >
      {/* Main content area */}
      <div 
  className={`mb-3 overflow-y-auto pr-2 scrollbar-container ${
    darkMode ? 'scrollbar-dark' : 'scrollbar-light'
  }`}
  style={{
    scrollbarColor: darkMode ? '#475569 #1e293b' : '#cbd5e1 #f1f5f9',
    // @ts-ignore
    '--scrollbar-thumb': darkMode ? '#475569' : '#cbd5e1',
    '--scrollbar-track': darkMode ? '#1e293b' : '#f1f5f9',
    '--scrollbar-thumb-hover': darkMode ? '#64748b' : '#94a3b8',
  } as React.CSSProperties}
>
        {/* Logo */}
        <div className="mb-10">
          <Image
            src={`/images/navbar/${
              darkMode ? "logo-M-dark.png" : "logo-M.png"
            }`}
            alt="Logo"
            className="w-10 h-8 object-contain cursor-pointer"
            width={40}
            height={32}
            unoptimized
          />
        </div>

        {/* Navigation sections */}
        <nav className="space-y-6 text-sm font-semibold">
          {/* Overview section */}
          <div>
            <p
              className={`uppercase text-xs mb-3 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Overview
            </p>
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href="#"
                    className={`flex items-center gap-3 rounded-md px-3 py-2.5 transition-colors ${
                      item.active
                        ? darkMode
                          ? "bg-gray-700 text-white"
                          : "bg-emerald-50 text-gray-600"
                        : item.disabled
                        ? "text-gray-400 cursor-not-allowed"
                        : darkMode
                        ? "hover:bg-gray-700 hover:text-white"
                        : "hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    {renderIcon(
                      item.icon,
                      `text-base ${
                        item.active
                          ? "text-primary"
                          : item.disabled
                          ? "text-gray-400"
                          : darkMode
                          ? "text-gray-400"
                          : "text-gray-400"
                      }`
                    )}
                    <span
                      className={`font-medium ml-1 ${
                        darkMode ? "text-gray-200" : "text-gray-500"
                      }`}
                    >
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Management section */}
          <div>
            <p
              className={`uppercase text-xs mb-3 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Management
            </p>
            <div className="space-y-2">
              {sections.map(({ key, icon, items }) => (
                <div key={key} className="relative">
                  <button
                    onClick={() => toggleSection(key as SectionKey)}
                    className={`flex items-center justify-between w-full rounded-md px-3 py-2.5 cursor-pointer transition-all duration-75 ease-in-out ${
                      darkMode
                        ? "hover:bg-gray-700 text-gray-200"
                        : "hover:bg-gray-100 text-gray-500"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {renderIcon(
                        icon,
                        `transition-colors duration-300 ${
                          darkMode ? "text-gray-400" : "text-gray-400"
                        }`
                      )}
                      <span className="ml-1 font-medium">{key}</span>
                      {key === "Mail" && (
                        <span
                          className={`text-xs font-semibold px-1.5 py-0.5 rounded-md ml-2 ${
                            darkMode
                              ? "bg-yellow-800 text-yellow-200"
                              : "bg-[#FFE9D5] text-red-900"
                          }`}
                        >
                          +32
                        </span>
                      )}
                    </div>
                    <div className="transition-transform duration-300 ease-in-out">
                      {sidebarState.openSections[key as SectionKey] ? (
                        <FaChevronDown
                          className={`text-xs ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        />
                      ) : (
                        <FaChevronRight
                          className={`text-xs ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        />
                      )}
                    </div>
                  </button>

                  {/* Collapsible section content */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      sidebarState.openSections[key as SectionKey]
                        ? "max-h-96"
                        : "max-h-0"
                    }`}
                  >
                    <ul
                      className={`ml-5 space-y-1 text-sm mt-1 ${
                        sidebarState.openSections[key as SectionKey]
                          ? `before:absolute before:top-12 before:left-5 before:w-[2px] before:content-[''] before:transition-all before:duration-300 before:ease-in-out before:delay-100 before:bottom-4 ${
                              darkMode
                                ? "before:bg-white"
                                : "before:bg-gray-200"
                            }`
                          : "before:hidden"
                      }`}
                    >
                      {items.map((item, index) => (
                        <li
                          key={item}
                          className="transition-all duration-300 ease-in-out relative cursor-pointer"
                          style={{
                            transitionDelay: sidebarState.openSections[
                              key as SectionKey
                            ]
                              ? `${index * 50}ms`
                              : "0ms",
                            opacity: sidebarState.openSections[
                              key as SectionKey
                            ]
                              ? 1
                              : 0,
                            transform: sidebarState.openSections[
                              key as SectionKey
                            ]
                              ? "translateY(0)"
                              : "translateY(-10px)",
                            backgroundImage:
                              "url('/images/navbar/listMakeup.svg')",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "0px",
                          }}
                        >
                          <div
                            className={`ml-3 py-1.5 rounded-md transition-colors ${
                              darkMode
                                ? "hover:bg-gray-700 hover:text-white"
                                : "hover:bg-gray-50 hover:text-gray-800"
                            }`}
                          >
                            <span
                              className={`font-medium ml-2.5 transition-colors duration-300 z-10 ${
                                darkMode ? "text-gray-300" : "text-gray-500"
                              }`}
                            >
                              {item}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Misc section */}
          <div>
            <p
              className={`uppercase text-xs mb-3 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Misc
            </p>
            <ul className="space-y-1">
              {miscItems.map((item) => (
                <li key={item.label} className="relative cursor-pointer">
                  {item.isCaption ? (
                    <div className="flex flex-col gap-0.5 px-3 py-2">
                      <div
                        className={`flex items-center gap-3 ${
                          darkMode ? "text-gray-400" : "text-gray-400"
                        }`}
                      >
                        {item.icon}
                        <span className="text-xs font-semibold">
                          {item.label}
                        </span>
                        {item.label === "Permission" && (
                          <span
                            className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                              darkMode
                                ? "bg-red-900 text-red-200"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            only admins can see that
                          </span>
                        )}
                      </div>
                      <p
                        className={`text-xs leading-tight truncate font-medium ml-8 mt-1 ${
                          darkMode ? "text-gray-500" : "text-gray-400"
                        }`}
                      >
                        Quisque malesuada placerat nisl, eu mattis nisl
                        hendrerit nec.
                      </p>
                    </div>
                  ) : (
                    <div className="relative">
                      <button
                        onClick={() => {
                          if (item.label === "Level") {
                            toggleLevelDropdown();
                          } else if (
                            item.label === "Dark Mode" ||
                            item.label === "Light Mode"
                          ) {
                            toggleDarkMode();
                          }
                        }}
                        className={`w-full flex items-center gap-3 rounded-md px-3 py-2 cursor-pointer transition-colors ${
                          item.disabled
                            ? "text-gray-500 cursor-default"
                            : item.highlight
                            ? darkMode
                              ? "bg-teal-900 text-teal-200 hover:bg-teal-800"
                              : "bg-teal-100 text-teal-600 hover:bg-teal-200"
                            : darkMode
                            ? "hover:bg-gray-700 text-gray-200"
                            : "hover:bg-gray-50 text-gray-500"
                        }`}
                        disabled={item.disabled && item.label !== "Permission"}
                      >
                        {React.cloneElement(item.icon, {
                          className: `text-base ${
                            item.disabled
                              ? "text-gray-500"
                              : item.highlight
                              ? darkMode
                                ? "text-teal-300"
                                : "text-teal-600"
                              : darkMode
                              ? "text-gray-400"
                              : "text-gray-400"
                          }`,
                        })}
                        <span className="font-medium">{item.label}</span>

                        {item.label === "Level" && (
                          <div className="ml-auto flex items-center">
                            <FaChevronRight
                              className={`text-xs transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                                sidebarState.isLevelOpen
                                  ? darkMode
                                    ? "rotate-90 text-gray-300 scale-110"
                                    : "rotate-90 text-gray-700 scale-110"
                                  : darkMode
                                  ? "text-gray-500"
                                  : "text-gray-400"
                              }`}
                            />
                          </div>
                        )}

                        {item.badge && (
                          <span
                            className={`ml-auto text-xs font-semibold rounded px-1.5 ${
                              darkMode
                                ? "bg-teal-800 text-teal-200"
                                : "bg-teal-200 text-teal-600"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                        {item.hasChevron && item.label !== "Level" && (
                          <FaChevronDown
                            className={`ml-auto text-xs ${
                              darkMode ? "text-gray-500" : "text-gray-300"
                            }`}
                          />
                        )}
                        {item.external && (
                          <FaExternalLinkAlt
                            className={`ml-auto text-xs ${
                              darkMode ? "text-gray-500" : "text-gray-300"
                            }`}
                          />
                        )}
                      </button>

                      {/* Level dropdown content */}
                      {item.label === "Level" && sidebarState.isLevelOpen && (
                        <div className="ml-8 mt-1 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
                          <ul className="space-y-1 text-sm">
                            {["Level 1", "Level 2"].map((level, index) => (
                              <li
                                key={level}
                                className="transition-all duration-300 ease-in-out relative"
                                style={{
                                  transitionDelay: `${index * 50}ms`,
                                  opacity: sidebarState.isLevelOpen ? 1 : 0,
                                  transform: sidebarState.isLevelOpen
                                    ? "translateY(0)"
                                    : "translateY(-10px)",
                                }}
                              >
                                <div
                                  className={`ml-3 py-1.5 rounded-md transition-colors ${
                                    darkMode
                                      ? "hover:bg-gray-700 hover:text-white"
                                      : "hover:bg-gray-50 hover:text-gray-800"
                                  }`}
                                >
                                  <span
                                    className={`font-medium ml-2.5 transition-colors duration-300 z-10 ${
                                      darkMode
                                        ? "text-gray-300"
                                        : "text-gray-500"
                                    }`}
                                  >
                                    {level}
                                  </span>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>

      {/* User profile footer */}
      <div
        className={`pt-6 border-t ${
          darkMode ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <div className="flex flex-col items-center gap-2 relative">
          <Image
            src="/images/navbar/avatar-25.webp"
            alt="User avatar"
            className="w-12 h-12 rounded-full object-cover relative"
            width={48}
            height={48}
            unoptimized
          />
          <div
            className={`absolute right-[80px] -top-[8px] flex items-center gap-2 text-xs font-semibold rounded-md rounded-bl-none px-2 py-0.5 ${
              darkMode
                ? "bg-emerald-800 text-emerald-100"
                : "bg-emerald-500 text-white"
            }`}
          >
            <span>Pro</span>
          </div>
          <p
            className={`text-sm font-medium ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Jaydon Frankie
          </p>
          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            demo@minimals.cc
          </p>
          <button
            type="button"
            className={`mt-3 text-sm font-semibold rounded-md py-2 transition-colors cursor-pointer px-4 ${
              darkMode
                ? "bg-gray-700 text-white hover:bg-gray-600"
                : "bg-gray-900 text-white hover:bg-gray-700"
            }`}
          >
            Upgrade to Pro
          </button>
        </div>
      </div>
    </div>
  );
}
