import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import perfectionist from 'eslint-plugin-perfectionist';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';

import { rules as cleanup } from './.eslint/eslint-plugin-cleanup.js';
import { rules as mantineRules } from './.eslint/eslint-plugin-mantine.js';


const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  pluginPrefix: '',
});

export default defineConfig([
  globalIgnores(['dist', 'node_modules']),

  {
    extends: [js.configs.recommended],
    files: ['server/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.node,
      parserOptions: { sourceType: 'module' },
    },
    rules: {
      'no-undefined': 'off',
    },
  },

  {
    extends: [
      js.configs.recommended,
      ...compat.extends('plugin:react/recommended'),
      ...compat.extends('plugin:react/jsx-runtime'),
      reactHooks.configs['recommended-latest'],
    ],

    files: ['**/*.{js,jsx}', '!server/**/*.{js,jsx}'],

    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      sourceType: 'module',
    },

    plugins: {
      mantine: { rules: mantineRules },
      cleanup: { rules: cleanup },
      perfectionist,
      react,
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
    },

    rules: {
      'mantine/sort-breakpoints': 'warn',
      'cleanup/remove-junk': 'warn',
      'no-unused-vars': 'off',

      'perfectionist/sort-jsx-props': [
        'warn',
        { ignoreCase: true, order: 'asc', type: 'natural' },
      ],

      'perfectionist/sort-objects': [
        'warn',
        {
          ignoreCase: true,
          order: 'asc',
          type: 'natural',
          ignorePattern: '^\\s*<',
          ignoreJSX: true
        },
      ],
      'react/prop-types': 'off',

      'react/react-in-jsx-scope': 'off',

      'simple-import-sort/exports': 'warn',

      'simple-import-sort/imports': 'warn',

      'unused-imports/no-unused-imports': 'warn',

      'unused-imports/no-unused-vars': [
        'warn',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          vars: 'all',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
]);
