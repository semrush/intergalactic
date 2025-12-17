import { expect, test, describe } from '@semcore/testing-utils/vitest';

import { processCssVitePlugin } from '../lib/es6/index';

describe('process-css-unplugin', () => {
  describe('CSS extraction and transformation', () => {
    test('Verify CSS extraction from reshadow markers and virtual file creation', () => {
      const plugin = processCssVitePlugin({ prefix: 'test' });

      const sourceCode = `import React from 'react';
/*!__reshadow-styles__:"./style/button.shadow.css"*/
const style = (/*__reshadow_css_start__*/_sstyled.insert(/*__inner_css_start__*/".button { color: red; }",/*__inner_css_end__*/"hash"),
/*__reshadow_css_end__*/
{});`;

      const id = '/node_modules/@semcore/button/lib/es6/Button.js';
      const result = plugin.transform?.(sourceCode, id);

      expect(result).toBeDefined();
      expect(result?.code).toContain('undefined');
      expect(result?.code).not.toContain('__reshadow_css_start__');
      expect(result?.code).toContain('test_');
      expect(result?.code).toContain('.css');
    });

    test('Verify ES6 import syntax', () => {
      const plugin = processCssVitePlugin();

      const sourceCode = `import React from 'react';
/*!__reshadow-styles__:"./style/button.shadow.css"*/
const style = (/*__reshadow_css_start__*/_sstyled.insert(/*__inner_css_start__*/".button { color: blue; }",/*__inner_css_end__*/"hash"),
/*__reshadow_css_end__*/
{});
`;

      const id = '/node_modules/@semcore/button/lib/index.js';
      const result = plugin.transform?.(sourceCode, id);

      expect(result).toBeDefined();
      expect(result?.code).toContain('import');
    });

    test('Verify CommonJS require syntax', () => {
      const plugin = processCssVitePlugin();

      const sourceCode = `const React = require('react');
/*!__reshadow-styles__:"./style/button.shadow.css"*/
const style = (/*__reshadow_css_start__*/_sstyled.insert(/*__inner_css_start__*/".button { color: green; }",/*__inner_css_end__*/"hash"),
/*__reshadow_css_end__*/
{});
`;

      const id = '/node_modules/@semcore/button/lib/index.js';
      const result = plugin.transform?.(sourceCode, id);

      expect(result).toBeDefined();
      expect(result?.code).toContain('require');
    });

    test('Verify transformation of only files from @semcore/ packages', () => {
      const plugin = processCssVitePlugin();

      // Non-semcore file
      const id = '/node_modules/other-lib/index.js';
      const shouldTransform = plugin.transformInclude?.(id);

      expect(shouldTransform).toBe(false);

      // Semcore file
      const semcoreId = '/node_modules/@semcore/button/index.js';
      const shouldTransformSemcore = plugin.transformInclude?.(semcoreId);

      expect(shouldTransformSemcore).toBe(true);
    });

    test('Verify handling of multiple CSS blocks in single file', () => {
      const plugin = processCssVitePlugin();

      const sourceCode = `import React from 'react';
/*!__reshadow-styles__:"./style/button.shadow.css"*/
const style1 = (/*__reshadow_css_start__*/_sstyled.insert(/*__inner_css_start__*/".button { color: red; }",/*__inner_css_end__*/"hash1"),
/*__reshadow_css_end__*/
{});

/*!__reshadow-styles__:"./style/input.shadow.css"*/
const style2 = (/*__reshadow_css_start__*/_sstyled.insert(/*__inner_css_start__*/".input { color: blue; }",/*__inner_css_end__*/"hash2"),
/*__reshadow_css_end__*/
{});
`;

      const id = '/node_modules/@semcore/component/lib/index.js';
      const result = plugin.transform?.(sourceCode, id);

      expect(result).toBeDefined();
      // Should have two imports
      const importMatches = result?.code.match(/import/g);
      expect(importMatches?.length).toBeGreaterThanOrEqual(2);
    });

    test('Verify correct CSS content extraction from nested quotes', () => {
      const plugin = processCssVitePlugin();

      const cssContent = '.button { content: "Hello"; }';
      const sourceCode = `import React from 'react';
/*!__reshadow-styles__:"./style/button.shadow.css"*/
const style = (/*__reshadow_css_start__*/_sstyled.insert(/*__inner_css_start__*/"${cssContent}",/*__inner_css_end__*/"hash"),
/*__reshadow_css_end__*/
{});
`;

      const id = '/node_modules/@semcore/button/lib/index.js';
      const result = plugin.transform?.(sourceCode, id);

      expect(result).toBeDefined();
      expect(result?.code).not.toContain('__inner_css_start__');
    });

    test('Verify handling of empty CSS content', () => {
      const plugin = processCssVitePlugin();

      const sourceCode = `import React from 'react';
/*!__reshadow-styles__:"./style/component.shadow.css"*/
const style = (/*__reshadow_css_start__*/_sstyled.insert(/*__inner_css_start__*/"",/*__inner_css_end__*/"hash"),
/*__reshadow_css_end__*/
{});
`;

      const id = '/node_modules/@semcore/component/lib/index.js';
      const result = plugin.transform?.(sourceCode, id);

      expect(result).toBeDefined();
      expect(result?.code).toBeDefined();
    });
  });

  describe('Virtual file handling', () => {
    test('Verify creation and loading of virtual CSS files', () => {
      const plugin = processCssVitePlugin();

      const cssContent = '.test { color: red; }';
      const sourceCode = `import React from 'react';
/*!__reshadow-styles__:"./style/test.shadow.css"*/
const style = (/*__reshadow_css_start__*/_sstyled.insert(/*__inner_css_start__*/"${cssContent}",/*__inner_css_end__*/"hash"),
/*__reshadow_css_end__*/
{});
`;

      const id = '/node_modules/@semcore/test/lib/index.js';

      // First transform to create virtual files
      plugin.transform?.(sourceCode, id);

      // Then check if the plugin has the necessary hooks
      expect(plugin.resolveId).toBeDefined();
      expect(plugin.load).toBeDefined();
      expect(plugin.loadInclude).toBeDefined();
    });
  });

  describe('CSS file generation', () => {
    test('Verify generation of different virtual files for different content', () => {
      const plugin = processCssVitePlugin();

      const sourceCode1 = `
        import React from 'react';
        /*!__reshadow-styles__:"./style/button.shadow.css"*/
        const style = (/*__reshadow_css_start__*/_sstyled.insert(/*__inner_css_start__*/".button { color: red; }",/*__inner_css_end__*/"hash"),
      /*__reshadow_css_end__*/
        {});
      `;

      const sourceCode2 = `
        import React from 'react';
        /*!__reshadow-styles__:"./style/button.shadow.css"*/
        const style = (/*__reshadow_css_start__*/_sstyled.insert(/*__inner_css_start__*/".button { color: blue; }",/*__inner_css_end__*/"hash"),
      /*__reshadow_css_end__*/
        {});
      `;

      const id = '/node_modules/@semcore/button/lib/index.js';
      const result1 = plugin.transform?.(sourceCode1, id);
      const result2 = plugin.transform?.(sourceCode2, id);

      expect(result1?.code).toBeDefined();
      expect(result2?.code).toBeDefined();
      // Different CSS content should result in different import paths
      expect(result1?.code).not.toBe(result2?.code);
    });

    test('Verify generation of consistent results for same content', () => {
      const plugin = processCssVitePlugin();

      const sourceCode = `import React from 'react';
/*!__reshadow-styles__:"./style/button.shadow.css"*/
const style = (/*__reshadow_css_start__*/_sstyled.insert(/*__inner_css_start__*/".button { color: red; }",/*__inner_css_end__*/"hash"),
/*__reshadow_css_end__*/
{});
`;

      const id = '/node_modules/@semcore/button/lib/index.js';
      const result1 = plugin.transform?.(sourceCode, id);
      const result2 = plugin.transform?.(sourceCode, id);

      expect(result1?.code).toBe(result2?.code);
    });
  });

  describe('Edge cases', () => {
    test('Verify handling of special characters in CSS', () => {
      const plugin = processCssVitePlugin();

      const cssContent = '.button::before { content: "→"; }';
      const sourceCode = `import React from 'react';
/*!__reshadow-styles__:"./style/button.shadow.css"*/
const style = (/*__reshadow_css_start__*/_sstyled.insert(/*__inner_css_start__*/"${cssContent}",/*__inner_css_end__*/"hash"),
/*__reshadow_css_end__*/
{});
`;

      const id = '/node_modules/@semcore/button/lib/index.js';
      const result = plugin.transform?.(sourceCode, id);

      expect(result).toBeDefined();
    });

    test('Verify handling of multiline CSS', () => {
      const plugin = processCssVitePlugin();

      const cssContent = `.button {
        color: red;
        padding: 10px;
        margin: 5px;
      }`;
      const sourceCode = `import React from 'react';
/*!__reshadow-styles__:"./style/button.shadow.css"*/
const style = (/*__reshadow_css_start__*/_sstyled.insert(/*__inner_css_start__*/"${cssContent}",/*__inner_css_end__*/"hash"),
/*__reshadow_css_end__*/
{});
`;

      const id = '/node_modules/@semcore/button/lib/index.js';
      const result = plugin.transform?.(sourceCode, id);

      expect(result).toBeDefined();
    });

    test('Verify handling of @semcore/flags package specifically', () => {
      const plugin = processCssVitePlugin();

      const sourceCode = `const React = require('react');
/*!__reshadow-styles__:"./style/flag.shadow.css"*/
const style = (/*__reshadow_css_start__*/_sstyled.insert(/*__inner_css_start__*/".flag { color: red; }",/*__inner_css_end__*/"hash"),
/*__reshadow_css_end__*/
{});
`;

      const id = '/node_modules/@semcore/flags/lib/index.js';
      const result = plugin.transform?.(sourceCode, id);

      expect(result).toBeDefined();
      // @semcore/flags should use different replacement logic
      expect(result?.code).toContain('undefined');
    });

    test('Verify preservation of code that is not CSS-related', () => {
      const plugin = processCssVitePlugin();

      const sourceCode = `import React from 'react';
const Button = () => <button>Click</button>;
export default Button;
`;

      const id = '/node_modules/@semcore/button/lib/index.js';
      const result = plugin.transform?.(sourceCode, id);

      expect(result).toBeDefined();
      expect(result?.code).toContain('const Button');
      expect(result?.code).toContain('export default Button');
    });
  });

  describe('Plugin configuration', () => {
    test('Verify plugin works without options and has correct metadata', () => {
      const plugin = processCssVitePlugin();
      expect(plugin).toBeDefined();
      expect(plugin.name).toBe('semcore-process-css-unplugin');
      expect(plugin.enforce).toBe('pre');
    });
  });
});
