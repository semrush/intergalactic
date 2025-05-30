import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import { defineConfig, globalIgnores } from 'eslint/config';
import stylistic from '@stylistic/eslint-plugin';

export default defineConfig([
  globalIgnores([
    '**/lib/',
    '**/dist/',
    '**/cache/',
    '**/node_modules/',
    '**/storybook-static',
    '**/test-results/',
    '**/allure-results/',
    '**/.cache/',
    'semcore/table/',
    'semcore/stylelint-plugin',
    'semcore/illustration/**/*.mjs',
    'semcore/illustration/**/*.js',
    'semcore/icon/**/*.mjs',
    'semcore/icon/**/*.js',
  ]),
  { files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'], plugins: { js }, extends: ['js/recommended'] },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },

  { files: ['**/*.{ts,mts,cts,tsx}'], extends: [tseslint.configs.recommended] },
  pluginReact.configs.flat.recommended,
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: true,
    commaDangle: 'always-multiline',
    arrowParens: 'always',
    braceStyle: '1tbs',
  }),
  {
    rules: {
      // REACT
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/display-name': 'off',
      'react/no-children-prop': 'off',
      'react/no-unescaped-entities': 'off',
      'react/no-find-dom-node': 'off',

      // TYPESCRIPT
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/semi': 'off', // because of stylistic.semi: true

      // stylistic
      '@stylistic/jsx-quotes': ['error', 'prefer-single'],
      '@stylistic/operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before' } }],

      // enable after migration
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-empty': 'off',
      'no-undef': 'off',
      'no-unused-vars': 'off',
      '@stylistic/no-mixed-operators': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      'no-prototype-builtins': 'off',
    },
  },
]);
