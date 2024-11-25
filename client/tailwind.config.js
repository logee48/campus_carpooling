/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Keep dark mode enabled using the 'class' strategy
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Add paths to your React files
  ],
  theme: {
    extend: {
      colors: {
        background: '#121212', // Dark background color
        textPrimary: '#E0E0E0', // Light text color
        textSecondary: '#B0B0B0', // Muted text color
        primary: '#4CAF50', // Accent color (green)
        secondary: '#FF9800', // Accent color (orange)
      },
    },
  },
  plugins: [],
};


