module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  "plugins": ["prettier"],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': 'off',
    "prettier/prettier": "error",
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/member-delimiter-style": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/ban-ts-ignore": "warn",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/camelcase": "warn",
    "@typescript-eslint/interface-name-prefix": "warn",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-unused-vars": "off"
  }
}
