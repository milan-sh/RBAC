/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4A90E2", // Main action buttons, highlights
        secondary: "#50E3C2", // Supporting elements
        background: "#F5F7FA", // Overall background
        card: "#FFFFFF", // Card backgrounds
        textPrimary: "#242424", // Main text
        textSecondary: "#4b5563", // Subtext
        border: "#E0E0E0", // Borders and dividers
        success: "#7ED321", // Success alerts
        error: "#D0021B", // Error alerts
        warning: "#F5A623", // Warnings
      },
      fontFamily: {
        poppins: "Poppins, serif", //heading and titles
        roboto: "Roboto, sans-serif", //body text and content
      },
    },
  },
  plugins: [],
};
