/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    './.eslintrc-auto-import.json',
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'prettier/prettier': [
      'warn',
      {
        semi: false,
        tabWidth: 2,
        singleQuote: true,
        printWidth: 80,
        trailingComma: 'none',
        endOfLine: 'auto'
      }
    ]
  },
  env: {
    node: true
  }
}
