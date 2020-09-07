module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off', // not doing a lib here :)
    'react/react-in-jsx-scope': 'off', // NextJs page components don't need a React instance!
    'react/prop-types': 'off', // Who uses prop types on 2020???
    'react-hooks/exhaustive-deps': 'off', //sometimes need to ignore deps
    complexity: ['error', 5], // nice for humans reading code
  },
  ignorePatterns: [],
}
