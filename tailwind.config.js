/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",         // ✅ Folder app
    "./pages/**/*.{js,ts,jsx,tsx}",       // ✅ Folder pages (penting!)
    "./components/**/*.{js,ts,jsx,tsx}",  // ✅ Folder components
  ],
  theme: {
    extend: {
      animation: {
        glow: 'glow 2.5s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-down': 'slideDown 0.7s ease-out forwards',
      },
      keyframes: {
        glow: {
          '0%, 100%': {
            textShadow: '0 0 6px #fff, 0 0 10px #fff',
          },
          '50%': {
            textShadow: '0 0 12px #fff, 0 0 16px #fff',
          },
        },
        slideDown: {
          '0%': { transform: 'translateY(-40px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
