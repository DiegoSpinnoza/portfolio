/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      colors: {
        ink: "#111111",
        paper: "#ffffff",
        mist: "#f6f6f3",
        line: "rgba(17, 17, 17, 0.1)",
        cobalt: "#2563eb",
      },
      boxShadow: {
        soft: "0 18px 60px rgba(17, 17, 17, 0.08)",
      },
    },
  },
  plugins: [],
};
