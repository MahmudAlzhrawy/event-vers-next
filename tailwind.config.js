/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,css}", // ✅ يشمل كل الملفات داخل src
    "./src/app/**/*.{js,ts,jsx,tsx,css}", // ✅ App Router
    "./src/components/**/*.{js,ts,jsx,tsx}", // ✅ Components
  ],
  theme: {
 extend: {
  colors: {
    primary: {
      light: '#E6CCFF',   // خلفيات خفيفة جدًا
      DEFAULT: '#9B51E0', // اللون الرئيسي البنفسجي
      dark: '#6A0DAD',    // ظل داكن للأزرار أو الهوفر
    },
    secondary: {
      light: '#D6B0FF',   // ثانوي فاتح (لأقسام أو خلفيات)
      DEFAULT: '#B57DFF', // ثانوي متوسط
      dark: '#7E57C2',    // ثانوي داكن
    },
    neutral: {
      background: '#F9F5FF',   // لون خلفية الموقع الكامل
      card: '#FFFFFF',         // كروت أو مربعات
      section: '#F3E8FF',      // أقسام الصفحة
      border: '#E0D4F7',       // حدود ناعمة
    },
    text: {
      heading: '#5E00B6',      // لعناوين الصفحة
      body: '#333333',         // للنصوص العادية
      muted: '#7F7F7F',        // نصوص ثانوية
      link: '#7F00FF',         // روابط أو تفاعلات
    },
    button: {
      primary: '#7F00FF',       // زر رئيسي
      hover: '#5E00B6',         // Hover للزر
      disabled: '#C9A7FF',      // زر معطل
    },
  },
 },
},

  plugins: [],
};
