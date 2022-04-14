module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [require("daisyui"), require('@tailwindcss/typography')],
    daisyui: {
      themes: [
        // {
        //   mytheme: {
        //     "primary": "#1083C1",
        //     "secondary": "#FF8235",
        //     "accent": "#4DD0E1",
        //     "neutral": "#191D24",
        //     "base-100": "#2A303C",
        //     "info": "#AB47BC",
        //     "success": "#4CAF50",
        //     "warning": "#FFC107",
        //     "error": "#f44336",
        //   },
        // },
				"dark"
      ],
    }
  }// scroll down and hover on the place holder image
  
  // i officially love tailwind