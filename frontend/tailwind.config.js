module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-dark": "#1a1a1a",
        "brand-green": "#7fb069",
        "brand-brown": "#8b7355",
        "brand-light": "#f9fafb",
      },
      fontFamily: {
        sans: ["Inter", "Poppins", "Source Sans Pro", "sans-serif"],
      },
      spacing: {
        "safe-top": "max(env(safe-area-inset-top), 0.5rem)",
        "safe-bottom": "max(env(safe-area-inset-bottom), 0.5rem)",
      },
      borderRadius: {
        lg: "12px",
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};
