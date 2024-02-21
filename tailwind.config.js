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
  /** install and import this package to extend css variables without having to use a css file */
  plugins: [require('@mertasan/tailwindcss-variables')]
}
