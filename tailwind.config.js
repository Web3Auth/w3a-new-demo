const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'public/index.html',
    'src/**/*.{ts,tsx,jsx,js,vue}',
    'node_modules/\\@toruslabs/**/*.{ts,tsx,jsx,js,vue}'
  ],
  darkMode: 'class',
  theme: {
    screens: {
      smb: '380px',
      xs: '440px',
      ...defaultTheme.screens
    },
    extend: {
      fontFamily: {
        header: ['Inter'],
        body: ['Inter']
      },
      fontSize: {
        xxs: '0.625rem'
      },
      colors: {
        app: {
          primary: {
            900: 'var(--app-primary-900)',
            800: 'var(--app-primary-800)',
            700: 'var(--app-primary-700)',
            600: 'var(--app-primary-600)',
            500: 'var(--app-primary-500)',
            400: 'var(--app-primary-400)',
            300: 'var(--app-primary-300)',
            200: 'var(--app-primary-200)',
            100: 'var(--app-primary-100)',
            50: 'var(--app-primary-50)'
          },
          gray: {
            900: 'var(--app-gray-900)',
            800: 'var(--app-gray-800)',
            700: 'var(--app-gray-700)',
            600: 'var(--app-gray-600)',
            500: 'var(--app-gray-500)',
            400: 'var(--app-gray-400)',
            300: 'var(--app-gray-300)',
            200: 'var(--app-gray-200)',
            100: 'var(--app-gray-100)',
            50: 'var(--app-gray-50)'
          },
          red: {
            900: 'var(--app-red-900)',
            800: 'var(--app-red-800)',
            700: 'var(--app-red-700)',
            600: 'var(--app-red-600)',
            500: 'var(--app-red-500)',
            400: 'var(--app-red-400)',
            300: 'var(--app-red-300)',
            200: 'var(--app-red-200)',
            100: 'var(--app-red-100)',
            50: 'var(--app-red-50)'
          },
          green: {
            900: 'var(--app-green-900)',
            800: 'var(--app-green-800)',
            700: 'var(--app-green-700)',
            600: 'var(--app-green-600)',
            500: 'var(--app-green-500)',
            400: 'var(--app-green-400)',
            300: 'var(--app-green-300)',
            200: 'var(--app-green-200)',
            100: 'var(--app-green-100)',
            50: 'var(--app-green-50)'
          },
          yellow: {
            900: 'var(--app-yellow-900)',
            800: 'var(--app-yellow-800)',
            700: 'var(--app-yellow-700)',
            600: 'var(--app-yellow-600)',
            500: 'var(--app-yellow-500)',
            400: 'var(--app-yellow-400)',
            300: 'var(--app-yellow-300)',
            200: 'var(--app-yellow-200)',
            100: 'var(--app-yellow-100)',
            50: 'var(--app-yellow-50)'
          },
          teal: {
            900: 'var(--app-teal-900)',
            800: 'var(--app-teal-800)',
            700: 'var(--app-teal-700)',
            600: 'var(--app-teal-600)',
            500: 'var(--app-teal-500)',
            400: 'var(--app-teal-400)',
            300: 'var(--app-teal-300)',
            200: 'var(--app-teal-200)',
            100: 'var(--app-teal-100)',
            50: 'var(--app-teal-50)'
          },
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
          },
          purple: {
            900: 'var(--app-purple-900)',
            800: 'var(--app-purple-800)',
            700: 'var(--app-purple-700)',
            600: 'var(--app-purple-600)',
            500: 'var(--app-purple-500)',
            400: 'var(--app-purple-400)',
            300: 'var(--app-purple-300)',
            200: 'var(--app-purple-200)',
            100: 'var(--app-purple-100)',
            50: 'var(--app-purple-50)'
          },
          pink: {
            900: 'var(--app-pink-900)',
            800: 'var(--app-pink-800)',
            700: 'var(--app-pink-700)',
            600: 'var(--app-pink-600)',
            500: 'var(--app-pink-500)',
            400: 'var(--app-pink-400)',
            300: 'var(--app-pink-300)',
            200: 'var(--app-pink-200)',
            100: 'var(--app-pink-100)',
            50: 'var(--app-pink-50)'
          },
          secondary: '#47B2FD',
          secondary2: '#DAF0FF',
          text: {
            400: '#A2A5B5',
            500: '#5C6C7F',
            600: '#0F1222',
            dark: {
              400: '#EEF2F4',
              500: '#D3D3D4',
              600: '#B3C0CE'
            }
          },
          success: 'var(--app-success)',
          warning: 'var(--app-warning)',
          error: 'var(--app-error)',
          info: 'var(--app-info)',
          white: 'var(--app-white)'
        }
      }
    }
  },
  plugins: []
}
