/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Geist", "Manrope", "ui-sans-serif", "system-ui"],
        display: ["Manrope", "Geist", "ui-sans-serif"]
      },
      colors: {
        electric: "#0A66FF",
        violet: "#7C3AED",
        ink: "#070A12",
        success: "#16A34A",
        amber: "#F59E0B"
      },
      boxShadow: {
        glow: "0 24px 90px rgba(10, 102, 255, 0.22)",
        card: "0 18px 70px rgba(7, 10, 18, 0.10)"
      }
    }
  },
  plugins: []
};
