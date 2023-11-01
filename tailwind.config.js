/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        futura: ["var(--font-futura)"],  
        FuturaLight: ["FuturaLight","sans-serif"],
        FuturaHeavy: ["FuturaHeavy","sans-serif"],
        FuturaBold: ["FuturaBold","sans-serif"],
        FuturaMedium: ["FuturaMedium","sans-serif"]
      },
      boxShadow: {
        border: "inset  0 0 0 1px #fff",
        "link-underline": "0 1px 0 rgba(0,0,0, .6)",
      },
      backgroundImage: {
        "video-gradient": "linear-gradient(0deg, #000 0%, transparent 100%)",
      },
      animation: {
        moveRightToLeft: 'moveRightToLeft 70s infinite',
      },
      screens: {
        print: {raw: 'print'},
        screen: {raw: 'screen'},
      },
      colors: {
        customColor: '#e9e9e9',
      },
    },
  },
 
  plugins: [
    require('@headlessui/tailwindcss'),
  ],
}
