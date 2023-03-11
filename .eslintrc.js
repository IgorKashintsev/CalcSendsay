module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  // root: true,
  parser: "@typescript-eslint/parser",
  // plugin: [
    // "@typescript-eslint",
  //   'react',
  //   'react-hooks'
  // ],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    quotes: ['error', 'single'],
    indent: ['error', 2],
    semi: ['error', 'always'],
    'react/react-in-jsx-scope': 'off',
    'react/display-name': 'off'
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
}