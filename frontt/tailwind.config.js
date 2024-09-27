module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'inter-bold': ['Inter-Bold', 'Helvetica'],
        'permanent-marker': ['Permanent Marker', 'Helvetica'],
      },
      colors: {
        'blue-400': '#66a4ff',
        'green-400': '#11c398',
      },
      backgroundImage: {
        'gradient-rak': 'linear-gradient(90deg, #66a4ff, #11c398)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
