const { RuleTester } = require('eslint');
const rule = require('../rules/no-src-import');
const tester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
});

tester.run('no-src-import', rule, {
  valid: [
    {
      code: 'import Something from "@semcore/something"',
    },
    {
      code: 'import Something from "@semcore/utils/lib/Icon/xs"',
    },
  ],

  invalid: [
    {
      code: 'import Something from "@semcore/something/src"',
      errors: [{ message: `Invalid import from @semcore component's src directory.` }],
    },
    {
      code: 'import Something from "@semcore/utils/src/Icon/xs"',
      errors: [{ message: `Invalid import from @semcore component's src directory.` }],
    },
  ],
});
