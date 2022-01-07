module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  extends: [
    '@fonkel/eslint-config-fonkel',
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  rules: {
    'no-debugger': 0,
  },
};
