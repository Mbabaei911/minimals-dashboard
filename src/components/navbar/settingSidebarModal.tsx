import { TbAlphabetLatin } from "react-icons/tb";
import { MdViewCompact } from "react-icons/md";
import { BsTextRight } from "react-icons/bs";
import { ImBrightnessContrast } from "react-icons/im";
import { VscColorMode } from "react-icons/vsc";
import { GrPowerReset } from "react-icons/gr";
import { AiOutlineClose } from "react-icons/ai";
import { BiFullscreen } from "react-icons/bi";
import { useUIStore } from "../../store/UiStore";

interface SettingsPanel {
  onClose: () => void;
}

export default function SettingsPanel({ onClose }: SettingsPanel): JSX.Element {
  const {
    darkMode,
    toggleDarkMode,
    rtl,
    toggleRTL,
    compactMode,
    toggleCompactMode,
    highContrast,
    fontFamily,
    setFontFamily,
    fontSize,
    setFontSize,
    resetSettings,
    toggleHighContrast,
  } = useUIStore();

  const fonts = [
    { name: "Public Sans", value: "Public Sans" },
    { name: "Intro", value: "Intro" },
    { name: "DM Sans", value: "DM Sans" },
    { name: "Nunito Sans", value: "Nunito Sans" },
  ];

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div className={`w-80 h-screen shadow-xl rounded-l-2xl p-4 space-y-6 ${
      darkMode ? 'bg-gray-800 text-gray-100' : 'bg-gray-50 text-gray-800'
    }`}>
      {/* Header */}
      <div className={`flex justify-between items-center ${
        darkMode ? 'text-gray-300' : 'text-gray-400'
      } mt-1`}>
        <h2 className="text-lg font-medium">Settings</h2>
        <div className="flex items-center justify-center space-x-1">
          <div
            className={`relative p-2 rounded-full cursor-pointer transition-all duration-100 ${
              darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
            onClick={toggleFullScreen}
          >
            <BiFullscreen size={20} className="peer" />
            <span className={`${
              darkMode ? 'bg-gray-700' : 'bg-gray-800'
            } text-white peer-hover:block hidden absolute text-xs rounded-md text-nowrap px-2 py-1 -left-6 top-10 transition-all duration-100`}>
              Full Screen
            </span>
          </div>
          <div
            className={`relative p-2 rounded-full cursor-pointer transition-all duration-100 ${
              darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
            onClick={resetSettings}
          >
            <GrPowerReset size={20} className="peer" />
            <span className={`${
              darkMode ? 'bg-gray-700' : 'bg-gray-800'
            } text-white peer-hover:block hidden absolute text-xs rounded-md text-nowrap px-2 py-1 -left-4 top-10 transition-all duration-100`}>
              Reset All
            </span>
          </div>
          <div
            className={`relative p-2 rounded-full cursor-pointer transition-all duration-100 ${
              darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
            onClick={onClose}
          >
            <AiOutlineClose size={20} className="peer" />
            <span className={`${
              darkMode ? 'bg-gray-700' : 'bg-gray-800'
            } text-white peer-hover:block hidden absolute text-xs rounded-md text-nowrap px-2 py-1 -left-2 top-10 transition-all duration-100`}>
              Close
            </span>
          </div>
        </div>
      </div>

      {/* Toggles */}
      <div className="grid grid-cols-2 gap-4">
        {/* Dark Mode Toggle */}
        <div className={`border rounded-2xl p-4 grid grid-cols-2 gap-6 shadow cursor-pointer ${
          darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-100 hover:bg-gray-100'
        }`}>
          <VscColorMode size={25} />
          <button
            onClick={toggleDarkMode}
            className={`ml-auto relative inline-flex h-[15px] w-[28px] py-2 items-center rounded-full transition-colors focus:outline-none mt-1 cursor-pointer ${
              darkMode ? "bg-blue-500" : "bg-gray-300"
            }`}
            aria-pressed={darkMode}
          >
            <span
              className={`inline-block h-[10px] w-[10px] transform rounded-full bg-white transition-transform ${
                darkMode
                  ? rtl
                    ? "-translate-x-1"
                    : "translate-x-4"
                  : rtl
                  ? "-translate-x-4"
                  : "translate-x-1"
              }`}
            />
          </button>
          <span className="font-semibold text-sm text-nowrap">Dark Mode</span>
        </div>

        {/* High Contrast Toggle */}
        <div className={`border rounded-2xl p-4 grid grid-cols-2 gap-6 shadow cursor-pointer ${
          darkMode ? 'border-gray-700 bg-gray-700' : 'border-gray-100 bg-gray-100'
        }`}>
          <ImBrightnessContrast size={25} />
          <button
            onClick={toggleHighContrast}
            className={`ml-auto relative inline-flex h-[15px] w-[28px] py-2 items-center rounded-full transition-colors focus:outline-none mt-1 cursor-pointer ${
              highContrast ? "bg-blue-500" : "bg-gray-300"
            }`}
            aria-pressed={highContrast}
          >
            <span
              className={`inline-block h-[10px] w-[10px] transform rounded-full bg-white transition-transform ${
                highContrast
                  ? rtl
                    ? "-translate-x-1"
                    : "translate-x-4"
                  : rtl
                  ? "-translate-x-4"
                  : "translate-x-1"
              }`}
            />
          </button>
          <span className="font-semibold text-sm text-nowrap">
            High Contrast
          </span>
        </div>

        {/* RTL Toggle */}
        <div className={`border rounded-2xl p-4 grid grid-cols-2 gap-6 shadow cursor-pointer ${
          darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-100 hover:bg-gray-100'
        }`}>
          <BsTextRight
            size={25}
            className={rtl ? "transform rotate-180" : ""}
          />
          <button
            onClick={toggleRTL}
            className={`ml-auto relative inline-flex h-[15px] w-[28px] py-2 items-center rounded-full transition-colors focus:outline-none mt-1 cursor-pointer ${
              rtl ? "bg-blue-500" : "bg-gray-300"
            }`}
            aria-pressed={rtl}
          >
            <span
              className={`inline-block h-[10px] w-[10px] transform rounded-full bg-white transition-transform ${
                rtl
                  ? rtl
                    ? "-translate-x-1"
                    : "translate-x-4"
                  : rtl
                  ? "-translate-x-4"
                  : "translate-x-1"
              }`}
            />
          </button>
          <span className="font-semibold text-sm text-nowrap">
            Right to Left
          </span>
        </div>

        {/* Compact Mode Toggle */}
        <div className={`border rounded-2xl p-4 grid grid-cols-2 gap-6 shadow cursor-pointer ${
          darkMode ? 'border-gray-700 bg-gray-700' : 'border-gray-100 bg-gray-100'
        }`}>
          <MdViewCompact size={25} />
          <button
            onClick={toggleCompactMode}
            className={`ml-auto relative inline-flex h-[15px] w-[28px] py-2 items-center rounded-full transition-colors focus:outline-none mt-1 cursor-pointer ${
              compactMode ? "bg-blue-500" : "bg-gray-300"
            }`}
            aria-pressed={compactMode}
          >
            <span
              className={`inline-block h-[10px] w-[10px] transform rounded-full bg-white transition-transform ${
                compactMode
                  ? rtl
                    ? "-translate-x-1"
                    : "translate-x-4"
                  : rtl
                  ? "-translate-x-4"
                  : "translate-x-1"
              }`}
            />
          </button>
          <span className="font-semibold text-sm text-nowrap">
            Compact Mode
          </span>
        </div>
      </div>

      {/* Font Settings Section */}
      <div className={`border p-4 rounded-2xl space-y-4 relative mt-10 ${
        darkMode ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <div className={`absolute -top-[9px] px-3 text-sm rounded-full ${
          darkMode ? 'bg-gray-700 text-gray-100' : 'bg-black text-white'
        }`}>
          Font
        </div>

        {/* Font Family Selection */}
        <div>
          <div className="grid grid-cols-2 pt-4 gap-2">
            {fonts.map((font) => (
              <div
                key={font.value}
                className={`flex flex-col items-center shadow rounded-xl p-3 cursor-pointer transition-all ${
                  fontFamily === font.value
                    ? darkMode
                      ? "bg-gray-700 ring-2 ring-blue-500"
                      : "bg-white ring-2 ring-green-500"
                    : darkMode
                    ? "hover:bg-gray-700"
                    : "hover:bg-white hover:shadow-md"
                }`}
                onClick={() => {
                  setFontFamily(font.value);
                  document.documentElement.style.fontFamily = `${font.value}, sans-serif`;
                }}
              >
                <TbAlphabetLatin
                  size={30}
                  className="text-green-600 font-semibold"
                />
                <p
                  className="mt-1"
                  style={{
                    fontFamily: `${font.value}, -apple-system, BlinkMacSystemFont, sans-serif`,
                  }}
                >
                  {font.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Font Size Slider */}
        <div className="mt-7">
          <p className={`text-xs font-semibold mb-2 ${
            darkMode ? 'text-gray-300' : 'text-gray-500'
          }`}>Size</p>
          <div className="relative h-8 mt-4">
            {/* Track background */}
            <div className={`absolute top-1/2 left-0 w-full h-2 -translate-y-1/2 rounded-full ${
              darkMode ? 'bg-gray-700' : 'bg-gray-200'
            }`}></div>

            {/* Colored progress track */}
            <div
              className="absolute top-1/2 left-0 h-2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#52D995] to-[#07806B]"
              style={{
                width: `${((fontSize - 12) / (20 - 12)) * 100}%`,
              }}
            ></div>

            {/* Step indicators */}
            <div className="absolute top-1/2 left-0 w-full h-2 -translate-y-1/2 flex justify-between items-center pointer-events-none">
              {Array.from({ length: 20 - 12 + 1 }).map((_, i) => (
                <div key={i} className={`w-px h-[60%] ${
                  darkMode ? 'bg-gray-600' : 'bg-white'
                }`}></div>
              ))}
            </div>

            {/* Hidden input slider */}
            <input
              type="range"
              min={12}
              max={20}
              step={1}
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="absolute top-0 left-0 w-full h-full opacity-0 z-20 cursor-pointer"
            />

            {/* Thumb with badge */}
            <div
              className="absolute top-1/2 -translate-y-1/2 z-10"
              style={{
                left: `calc(${((fontSize - 12) / (20 - 12)) * 100}% - 8px)`,
              }}
            >
              <div className={`h-4 w-4 rounded-full border-2 border-[#07806B] shadow-sm ${
                darkMode ? 'bg-gray-600' : 'bg-white'
              }`}></div>
              <div className={`absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-medium px-2 py-1 rounded-md whitespace-nowrap ${
                darkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-800 text-white'
              }`}>
                {fontSize}px
                <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 w-2 h-2 rotate-45 ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-800'
                }`}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}