const expoConfig = require('eslint-config-expo/flat');
const eslintPluginPrettier = require('eslint-plugin-prettier/recommended');

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  ...expoConfig,
  eslintPluginPrettier,
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    rules: {
      'prettier/prettier': 'error',
    },
  },
];
