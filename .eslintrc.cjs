module.exports = {
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:prettier/recommended',
    'plugin:perfectionist/recommended-natural'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  plugins: ['perfectionist'],
  root: true,
  rules: {
    'perfectionist/sort-vue-attributes': 'off'
  }
}
