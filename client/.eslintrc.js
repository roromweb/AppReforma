module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  overrides: [],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'prettier',
  ],
  ignorePatterns: ['.eslintrc.js'],
  plugins: ['@typescript-eslint', 'react-hooks'],
  root: true,
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'import/no-extraneous-dependencies': 'off',
    'no-console': 'off',
  },
};
