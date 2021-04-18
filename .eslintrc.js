module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  settings: { react: { version: 'detect' } },
  env: {
    es6: true,
    browser: true,
    jest: true,
    node: true,
  },
  rules: {
    'react/prop-types': 'off',
    // No need to import React when using Next.js
    'react/react-in-jsx-scope': 'off',
    'react/display-name': 'off',
  },
}
