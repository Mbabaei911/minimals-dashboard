// tailwind.config.js (for IntelliSense only)
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,html}", // Adjust to match your project
    "./src/**/**/*.{js,ts,jsx,tsx,html}", // Adjust to match your project
  ],
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        danger: "#ef4444", // Your custom red
      },
    },
  },
  safelist: [
    'scrollbar-container',
    'scrollbar-light',
    'scrollbar-dark',
    { pattern: /scrollbar-/ },
  ]
};
