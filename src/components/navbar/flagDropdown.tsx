import { useState, useEffect, useRef } from "react";
import GB from "country-flag-icons/react/3x2/GB";
import FR from "country-flag-icons/react/3x2/FR";
import VN from "country-flag-icons/react/3x2/VN";
import CN from "country-flag-icons/react/3x2/CN";
import SA from "country-flag-icons/react/3x2/SA";
import { TiTick, TiTimes } from "react-icons/ti";
import { useUIStore } from "../../store/UiStore"; // Import your Zustand store

const FlagDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("GB");
  const [showAlert, setShowAlert] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Get dark mode state from your Zustand store
  const darkMode = useUIStore((state) => state.darkMode);

  const countries = [
    { code: "GB", name: "English" },
    { code: "FR", name: "French" },
    { code: "VN", name: "Vietnamese" },
    { code: "CN", name: "Chinese" },
    { code: "SA", name: "Arabic" },
  ];

  const getFlagComponent = (code: string) => {
    switch (code) {
      case "GB": return <GB className="w-7 rounded" />;
      case "FR": return <FR className="w-7 rounded" />;
      case "VN": return <VN className="w-7 rounded" />;
      case "CN": return <CN className="w-7 rounded" />;
      case "SA": return <SA className="w-7 rounded" />;
      default: return <GB className="w-7 rounded" />;
    }
  };

  const handleCountryChange = (code: string) => {
    setSelectedCountry(code);
    setIsOpen(false);
    setIsAnimating(true);
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setIsAnimating(false);
    setTimeout(() => setShowAlert(false), 300);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showAlert && isAnimating) {
      timer = setTimeout(() => {
        handleCloseAlert();
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [showAlert, isAnimating]);

  const dropdownRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Dark mode classes
  const buttonClasses = `flex items-center gap-2 p-2 text-sm font-medium rounded-full hover:bg-gray-700 cursor-pointer hover:scale-105 ${
    darkMode ? "text-gray-200 hover:bg-gray-700" : "text-gray-700"
  }`;

  const dropdownClasses = `absolute -right-10 z-10 w-36 mt-2 origin-top-right p-1 rounded-xl shadow-lg border focus:outline-none ${
    darkMode 
      ? "bg-gray-800 border-gray-700" 
      : "bg-white border-gray-200"
  }`;

  const menuItemClasses = (darkMode: boolean) => 
    `flex items-center w-full px-4 py-3 text-xs hover:cursor-pointer rounded-md ${
      darkMode 
        ? "text-gray-200 hover:bg-gray-700" 
        : "text-gray-700 hover:bg-gray-200/45 hover:text-gray-900"
    }`;

  const alertClasses = `fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-400 ease-in-out ${
    isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
  }`;

  const alertContentClasses = `flex items-center border text-sm px-4 py-3 rounded-md shadow-lg space-x-3 ${
    darkMode
      ? "bg-gray-800 border-gray-700 text-gray-200"
      : "bg-gray-100 border-gray-200 text-gray-800"
  }`;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Flag Dropdown */}
      <div className="relative inline-block text-left">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={buttonClasses}
          id="flag-menu"
          aria-expanded="true"
          aria-haspopup="true"
        >
          {getFlagComponent(selectedCountry)}
        </button>

        {isOpen && (
          <div
            className={dropdownClasses}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="flag-menu"
          >
            <div className={`py-1 ${darkMode ? "bg-gray-800" : "bg-white"}`} role="none">
              {countries.map((country) => (
                <button
                  key={country.code}
                  onClick={() => handleCountryChange(country.code)}
                  className={menuItemClasses(darkMode)}
                  role="menuitem"
                >
                  <div className="w-5 mr-4">
                    {getFlagComponent(country.code)}
                  </div>
                  {country.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Custom Alert Notification */}
      {showAlert && (
        <div className={alertClasses}>
          <div className={alertContentClasses}>
            <div className="p-[1px] rounded-full">
              <TiTick size={20} className="bg-green-500 rounded-full text-white" />
            </div>
            <span className="text-xs text-nowrap font-medium">Language has been changed!</span>
            <button
              onClick={handleCloseAlert}
              className={`${darkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-700"} ml-2`}
              aria-label="Close notification"
            >
              <TiTimes size={16} className="flex-shrink-0 cursor-pointer" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlagDropdown;