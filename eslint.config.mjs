import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import { defineConfig, globalIgnores } from 'eslint/config';
import pluginImport from 'eslint-plugin-import';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';
import tseslint from 'typescript-eslint';

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
    '**/__fixtures__/**',
    'semcore/table/',
    'semcore/stylelint-plugin',
    'semcore/illustration/**/*.mjs',
    'semcore/illustration/**/*.js',
    'semcore/illustration/**/*.d.ts',
    'semcore/icon/**/*.mjs',
    'semcore/icon/**/*.js',
    'semcore/icon/**/*.d.ts',
    'semcore/ui/**/*.{cjs,mjs,js,d.ts}',
  ]),
  { files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'], plugins: { js }, extends: ['js/recommended'] },
  pluginReact.configs.flat.recommended,
  tseslint.configs.recommended,
  pluginImport.flatConfigs.recommended,
  // { files: ['**/*.{ts,mts,cts,tsx}'], extends: [tseslint.configs.recommended] },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    languageOptions: { globals: { ...globals.browser, ...globals.node }, ecmaVersion: 'latest', sourceType: 'module' },
  },
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

      // IMPORTS
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'vitest',
              message: 'Please use @semcore/testing-utils/vitest instead of importing from vitest directly.',
            },
          ],
        },
      ],

      // TYPESCRIPT
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/semi': 'off', // because of stylistic.semi: true

      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-this-alias': 'off',

      // stylistic
      '@stylistic/jsx-quotes': ['error', 'prefer-single'],
      '@stylistic/operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before' } }],
      '@stylistic/jsx-one-expression-per-line': ['error', { allow: 'single-line' }],
      'import/order': [
        'error',
        {
          'groups': ['builtin', 'external', 'internal'],
          'newlines-between': 'always',
          'alphabetize': { order: 'asc', caseInsensitive: true },
        },
      ],
      'import/namespace': 'off',
      'import/no-unresolved': 'off',
      'import/named': 'off',
      'import/no-named-as-default': 'off',

      'no-console': 'error',

      '@typescript-eslint/no-namespace': [
        'error',
        {
          allowDeclarations: true,
        },
      ],

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
  {
    files: ['tools/**/*', 'website/**/*', 'stories/**/*', '.ci/**/*', 'semcore/**/__tests__/**/*'],
    rules: {
      'no-console': 'off',
    },
  },
]);
