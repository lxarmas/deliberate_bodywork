// tailwind.config.js
// ─────────────────────────────────────────────────────────────
// Custom color palette pulled from the flyer:
//   sage    → earthy greens from the jacket / foliage
//   stone   → warm off-white of the brick wall
//   bark    → dark header/footer background
// Custom font: "Playfair Display" (headlines) + "DM Sans" (body)
// ─────────────────────────────────────────────────────────────
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50:  '#f4f7f0',
          100: '#e6edd9',
          200: '#ccdbb4',
          300: '#aac385',
          400: '#8aab5d',
          500: '#6d9040',   // primary brand green
          600: '#537230',
          700: '#415924',
          800: '#354820',
          900: '#2d3d1d',
        },
        stone: {
          50:  '#fafaf8',
          100: '#f2f1ec',
          200: '#e5e2d8',
          300: '#d0ccbf',
          400: '#b8b2a0',
          500: '#9e9783',
        },
        bark: '#1c1f18',    // near-black for header/footer
      },
      fontFamily: {
        // Loaded via Google Fonts in layout.js
        display: ['Playfair Display', 'Georgia', 'serif'],
        body:    ['DM Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
