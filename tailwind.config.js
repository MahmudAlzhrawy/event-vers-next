/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        bgPrimary: '#F3C1F8',         // خلفية الموقع الرئيسية (وردي ناعم)
        btnPrimary: '#7F00FF',        // زر رئيسي بنفسجي ملكي
        btnHover: '#5E00B6',          // نفسجي غامق عند hover
        sectionBackground: '#D6B0FF', // خلفيات الأقسام
        cardBackground: '#FFFFFF',    // خلفيات البطاقات
        textHeading: '#5E00B6',       // لون عناوين النصوص
        textBody: '#333333',          // لون النصوص العادية
      },
    },
  },
  plugins: [],
}