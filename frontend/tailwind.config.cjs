const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: true,
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./mails/*.html"],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-6deg)" },
          "50%": { transform: "rotate(6deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
      },
      colors: {
        white: "#EEEEEE",
        transparent: "transparent",
        current: "currentColor",
        black: colors.black,
        emerald: colors.emerald,
        indigo: colors.indigo,
        yellow: {
          DEFAULT: "#FFD369",
          50: "#FFFFFF",
          100: "#FFFFFF",
          200: "#FFF7E3",
          300: "#FFEBBB",
          400: "#FFDF92",
          500: "#FFD369",
          600: "#FFC331",
          700: "#F8AF00",
          800: "#C08700",
          900: "#886000",
        },
        gray: {
          DEFAULT: "#4B525C",
          50: "#A8AEB8",
          100: "#9CA3AF",
          200: "#868F9C",
          300: "#707A89",
          400: "#5E6673",
          500: "#4B525C",
          600: "#393E46",
          700: "#202327",
          800: "#070708",
          900: "#0B0D10",
        },
        green: {
          DEFAULT: "#7BBB47",
          50: "#DBEDCD",
          100: "#D0E7BE",
          200: "#BBDCA0",
          300: "#A6D183",
          400: "#90C665",
          500: "#7BBB47",
          600: "#609336",
          700: "#456A27",
          800: "#2B4118",
          900: "#101909",
        },
        red: {
          DEFAULT: "#BC4647",
          50: "#EDCDCD",
          100: "#E7BEBE",
          200: "#DDA0A0",
          300: "#D28283",
          400: "#C76465",
          500: "#BC4647",
          600: "#943636",
          700: "#6B2727",
          800: "#421818",
          900: "#190909",
        },
        blue: {
          DEFAULT: "#317FAB",
          50: "#ACD2E7",
          100: "#9CC9E3",
          200: "#7DB8DA",
          300: "#5DA7D1",
          400: "#3D96C7",
          500: "#317FAB",
          600: "#255F7F",
          700: "#183E54",
          800: "#0C1E28",
          900: "#000000",
        },
        goldenrod: {
          DEFAULT: "#E3A100",
          50: "#FFE29C",
          100: "#FFDC87",
          200: "#FFD05E",
          300: "#FFC436",
          400: "#FFB90D",
          500: "#E3A100",
          600: "#AB7900",
          700: "#735100",
          800: "#3B2A00",
          900: "#030200",
        },
      },
    },
  },
  plugins: [require("@headlessui/tailwindcss"), require("@tailwindcss/forms")],
};
