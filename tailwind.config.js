/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Surface
        bg:        '#09101e',
        surface:   '#101828',
        surfaceHi: '#162032',
        border:    '#1e3050',
        borderHi:  '#2a4570',
        // Text
        text:      '#e8f0fe',
        textSub:   '#9ab0d4',
        textMuted: '#6a83a8',
        // Accents
        blue:      '#5aa0e8',
        blueDim:   '#1a3a6a',
        green:     '#52d09c',
        greenDim:  '#0d3525',
        amber:     '#dba94d',
        amberDim:  '#3a2810',
        red:       '#f06d6d',
        redDim:    '#3a1010',
        purple:    '#ad94f0',
        purpleDim: '#2a1a5a',
        teal:      '#45d0d0',
        tealDim:   '#0d3535',
        focus:     '#7fb8ff',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', '"Courier New"', 'monospace'],
      },
    },
  },
  plugins: [],
};
