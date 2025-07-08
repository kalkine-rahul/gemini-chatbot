// tailwind.config.js
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}', // ✅ ensures Tailwind picks up all classes
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
