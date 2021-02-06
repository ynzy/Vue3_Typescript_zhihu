module.exports = {
  eslintIntegration: true,
  stylelintIntegration: true,
  printWidth: 120,
  tabWidth: 2,
  singleQuote: true,
  semi: false,
  insertPragma: false,
  trailingComma: 'none',
  arrowParens: 'avoid',
  wrap_line_length: 120,
  wrap_attributes: 'auto',
  proseWrap: 'always',
  bracketSpacing: true,
  jsxBracketSameLine: true,
  useTabs: false,
  overrides: [
    {
      files: '.prettierrc',
      options: {
        parser: 'json'
      }
    }
  ],
  endOfLine: 'auto'
};
