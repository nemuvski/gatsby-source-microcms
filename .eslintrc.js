module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:regexp/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'regexp'],
  rules: {
    'comma-dangle': ['error', 'only-multiline'],
    'multiline-ternary': ['error', 'always-multiline'],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/no-import-type-side-effects': 'error',
  },
  ignorePatterns: ['example/**/.cache/', 'example/**/public/', 'example/**/__generated__/'],
};
