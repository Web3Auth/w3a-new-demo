import toruslabsVue from '@toruslabs/eslint-config-vue'

export default [
  ...toruslabsVue,
  {
    rules: {
      'tailwindcss/no-custom-classname': 'off',
      'vue/multi-word-component-names': 'off',
      'no-console': 'off',
      'prettier/prettier': [
        'error',
        { semi: false, tabWidth: 2, singleQuote: true, printWidth: 100, trailingComma: 'none' }
      ],
      camelcase: 0,
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never'
        }
      ]
    }
  }
]
