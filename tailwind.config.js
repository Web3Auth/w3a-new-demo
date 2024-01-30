const path = require('path')

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@toruslabs/vue-components/web3auth-base-preset')],
  content: [
    'index.html',
    'src/**/*.{ts,tsx,jsx,js,vue}',
    path.join(
      path.dirname(require.resolve('@toruslabs/vue-components')),
      '**/*.{ts,tsx,jsx,js,vue}'
    )
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        indigo: {
          900: 'var(--app-indigo-900)',
          800: 'var(--app-indigo-800)',
          700: 'var(--app-indigo-700)',
          600: 'var(--app-indigo-600)',
          500: 'var(--app-indigo-500)',
          400: 'var(--app-indigo-400)',
          300: 'var(--app-indigo-300)',
          200: 'var(--app-indigo-200)',
          100: 'var(--app-indigo-100)',
          50: 'var(--app-indigo-50)'
        }
      }
    }
  }
}
