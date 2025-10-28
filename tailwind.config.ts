import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms'
import lineClamp from '@tailwindcss/line-clamp'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './stories/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [forms, lineClamp],
}

export default config
