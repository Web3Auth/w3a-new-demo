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
    variables: {
      DEFAULT: {
        app: {
          primary: {
            900: '#25207E',
            800: '#342EA4',
            700: '#453EC9',
            600: '#5850ec',
            500: '#6E67F1',
            400: '#847EF5',
            300: '#9B96F9',
            200: '#B3AFFB',
            100: '#CBC8FD',
            50: '#E4E2FE'
          }
        }
      }
    }
  },
  /** install and import this package to extend css variables without having to use a css file */
  plugins: [require('@mertasan/tailwindcss-variables')]
}
