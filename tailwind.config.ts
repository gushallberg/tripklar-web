import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';
import lineClamp from '@tailwindcss/line-clamp';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './stories/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: [forms, lineClamp]
};

export default config;
