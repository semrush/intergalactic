import { expect, test, describe } from '@semcore/testing-utils/vitest';

// Import the plugin from built lib
import { processCssVitePlugin } from '../lib/es6/index';

describe('process-css-unplugin', () => {
  describe('CSS extraction and transformation', () => {
    test('Should extract CSS from reshadow markers and create virtual file', () => {
      const plugin = processCssVitePlugin({ prefix: 'test' });

      const sourceCode = `
        /*__reshadow_css_start__*/
        __inner_css_start__*/".button { color: red; }",
        /*__inner_css_end__*/
        /*__reshadow_css_end__*/
        /*!__reshadow-styles__:"virtual-file.css"*/
      `;

      const id = '/test/component.js';
      const result = plugin.transform?.(sourceCode, id);

      expect(result).toBeDefined();
      expect(result?.code).toContain('undefined');
      expect(result?.code).not.toContain('__reshadow_css_start__');
    });

    test('Should handle ES6 import syntax', () => {
      const plugin = processCssVitePlugin();

      const sourceCode = `
        import React from 'react';
        /*__reshadow_css_start__*/
        __inner_css_start__*/".button { color: blue; }",
        /*__inner_css_end__*/
        /*__reshadow_css_end__*/
        /*!__reshadow-styles__:"virtual.css"*/
      `;

      const id = '/node_modules/@semcore/button/lib/index.js';
      const result = plugin.transform?.(sourceCode, id);

      expect(result).toBeDefined();
      expect(result?.code).toContain('import');
    });

    test('Should handle CommonJS require syntax', () => {
      const plugin = processCssVitePlugin();

      const sourceCode = `
        const React = require('react');
        /*__reshadow_css_start__*/
        __inner_css_start__*/".button { color: green; }",
        /*__inner_css_end__*/
        /*__reshadow_css_end__*/
        /*!__reshadow-styles__:"virtual.css"*/
      `;

      const id = '/node_modules/@semcore/button/lib/index.js';
      const result = plugin.transform?.(sourceCode, id);

      expect(result).toBeDefined();
      expect(result?.code).toContain('require');
    });

    test('Should support custom prefix for generated CSS files', () => {
      const plugin = processCssVitePlugin({ prefix: 'myprefix' });

      const sourceCode = `
        import React from 'react';
        /*__reshadow_css_start__*/
        __inner_css_start__*/".component { margin: 10px; }",
        /*__inner_css_end__*/
        /*__reshadow_css_end__*/
        /*!__reshadow-styles__:"file.css"*/
      `;

      const id = '/node_modules/@semcore/component/lib/index.js';
      const result = plugin.transform?.(sourceCode, id);

      expect(result).toBeDefined();
      expect(result?.code).toContain('myprefix');
    });

    test('Should only transform files from @semcore/ packages', () => {
      const plugin = processCssVitePlugin();

      const sourceCode = `
        /*__reshadow_css_start__*/
        __inner_css_start__*/".button { color: red; }",
        /*__inner_css_end__*/
        /*__reshadow_css_end__*/
      `;

      // Non-semcore file
      const id = '/node_modules/other-lib/index.js';
      const shouldTransform = plugin.transformInclude?.(id);

      expect(shouldTransform).toBe(false);

      // Semcore file
      const semcoreId = '/node_modules/@semcore/button/index.js';
      const shouldTransformSemcore = plugin.transformInclude?.(semcoreId);

      expect(shouldTransformSemcore).toBe(true);
    });

    test('Should handle multiple CSS blocks in single file', () => {
      const plugin = processCssVitePlugin();

      const sourceCode = `
        import React from 'react';
        /*__reshadow_css_start__*/
        __inner_css_start__*/".button { color: red; }",
        /*__inner_css_end__*/
        /*__reshadow_css_end__*/
        /*!__reshadow-styles__:"file1.css"*/

        /*__reshadow_css_start__*/
        __inner_css_start__*/".input { color: blue; }",
        /*__inner_css_end__*/
        /*__reshadow_css_end__*/
        /*!__reshadow-styles__:"file2.css"*/
      `;

      const id = '/node_modules/@semcore/component/lib/index.js';
      const result = plugin.transform?.(sourceCode, id);

      expect(result).toBeDefined();
      // Should have two imports
      const importMatches = result?.code.match(/import/g);
      expect(importMatches?.length).toBeGreaterThanOrEqual(2);
    });

    test('Should extract CSS content correctly from nested quotes', () => {
      const plugin = processCssVitePlugin();

      const cssContent = '.button { content: "Hello"; }';
      const sourceCode = `
        /*__reshadow_css_start__*/
        __inner_css_start__*/"${cssContent}",
        /*__inner_css_end__*/
        /*__reshadow_css_end__*/
        /*!__reshadow-styles__:"file.css"*/
      `;

      const id = '/node_modules/@semcore/button/lib/index.js';
      const result = plugin.transform?.(sourceCode, id);

      expect(result).toBeDefined();
      expect(result?.code).not.toContain('__inner_css_start__');
    });

    test('Should handle empty CSS content', () => {
      const plugin = processCssVitePlugin();

      const sourceCode = `
        /*__reshadow_css_start__*/
        __inner_css_start__*/"",
        /*__inner_css_end__*/
        /*__reshadow_css_end__*/
        /*!__reshadow-styles__:"file.css"*/
      `;

      const id = '/node_modules/@semcore/component/lib/index.js';
      const result = plugin.transform?.(sourceCode, id);

      expect(result).toBeDefined();
      expect(result?.code).toBeDefined();
    });

    test('Should replace reshadow styles marker with import statement', () => {
      const plugin = processCssVitePlugin();

      const sourceCode = `
        import React from 'react';
        /*__reshadow_css_start__*/
        __inner_css_start__*/".button { color: red; }",
        /*__inner_css_end__*/
        /*__reshadow_css_end__*/
        /*!__reshadow-styles__:"marker"*/
        export default Button;
      `;

      const id = '/node_modules/@semcore/button/lib/index.js';
      const result = plugin.transform?.(sourceCode, id);

      expect(result).toBeDefined();
      expect(result?.code).not.toContain('/*!__reshadow-styles__:');
      expect(result?.code).toContain('import');
      expect(result?.code).toContain('.css');
    });
  });

  describe('Virtual file handling', () => {
    test('Should create and load virtual CSS files', () => {
      const plugin = processCssVitePlugin();

      const cssContent = '.test { color: red; }';
      const sourceCode = `
        import React from 'react';
        /*__reshadow_css_start__*/
        __inner_css_start__*/"${cssContent}",
        /*__inner_css_end__*/
        /*__reshadow_css_end__*/
        /*!__reshadow-styles__:"file.css"*/
      `;

      const id = '/node_modules/@semcore/test/lib/index.js';

      // First transform to create virtual files
      plugin.transform?.(sourceCode, id);

      // Then check if resolveId recognizes virtual files
      // Note: We can't directly test the Map since it's private,
      // but we can test the behavior through the plugin interface
      expect(plugin.resolveId).toBeDefined();
      expect(plugin.load).toBeDefined();
      expect(plugin.loadInclude).toBeDefined();
    });

    test('Should resolve virtual CSS file IDs', () => {
      const plugin = processCssVitePlugin();

      const cssContent = '.button { padding: 10px; }';
      const sourceCode = `
        /*__reshadow_css_start__*/
        __inner_css_start__*/"${cssContent}",
        /*__inner_css_end__*/
        /*__reshadow_css_end__*/
        /*!__reshadow-styles__:"file.css"*/
      `;

      const id = '/node_modules/@semcore/button/lib/index.js';
      plugin.transform?.(sourceCode, id);

      // The resolveId should return the id for virtual files
      expect(plugin.resolveId).toBeDefined();
    });
  });

  describe('CSS file generation', () => {
    test('Should generate different virtual files for different content', () => {
      const plugin = processCssVitePlugin();

      const sourceCode1 = `
        import React from 'react';
        /*__reshadow_css_start__*/
        __inner_css_start__*/".button { color: red; }",
        /*__inner_css_end__*/
        /*__reshadow_css_end__*/
        /*!__reshadow-styles__:"file.css"*/
      `;

      const sourceCode2 = `
        import React from 'react';
        /*__reshadow_css_start__*/
        __inner_css_start__*/".button { color: blue; }",
        /*__inner_css_end__*/
        /*__reshadow_css_end__*/
        /*!__reshadow-styles__:"file.css"*/
      `;

      const id = '/node_modules/@semcore/button/lib/index.js';
      const result1 = plugin.transform?.(sourceCode1, id);
      const result2 = plugin.transform?.(sourceCode2, id);

      expect(result1?.code).toBeDefined();
      expect(result2?.code).toBeDefined();
      // Different CSS content should result in different import paths
      expect(result1?.code).not.toBe(result2?.code);
    });

    test('Should generate consistent results for same content', () => {
      const plugin = processCssVitePlugin();

      const sourceCode = `
        import React from 'react';
        /*__reshadow_css_start__*/
        __inner_css_start__*/".button { color: red; }",
        /*__inner_css_end__*/
        /*__reshadow_css_end__*/
        /*!__reshadow-styles__:"file.css"*/
      `;

      const id = '/node_modules/@semcore/button/lib/index.js';
      const result1 = plugin.transform?.(sourceCode, id);
      const result2 = plugin.transform?.(sourceCode, id);

      expect(result1?.code).toBe(result2?.code);
    });
  });

  describe('Edge cases', () => {
    test('Should handle special characters in CSS', () => {
      const plugin = processCssVitePlugin();

      const cssContent = '.button::before { content: "→"; }';
      const sourceCode = `
        /*__reshadow_css_start__*/
        __inner_css_start__*/"${cssContent}",
        /*__inner_css_end__*/
        /*__reshadow_css_end__*/
        /*!__reshadow-styles__:"file.css"*/
      `;

      const id = '/node_modules/@semcore/button/lib/index.js';
      const result = plugin.transform?.(sourceCode, id);

      expect(result).toBeDefined();
    });

    test('Should handle multiline CSS', () => {
      const plugin = processCssVitePlugin();

      const cssContent = `.button {
        color: red;
        padding: 10px;
        margin: 5px;
      }`;
      const sourceCode = `
        /*__reshadow_css_start__*/
        __inner_css_start__*/"${cssContent}",
        /*__inner_css_end__*/
        /*__reshadow_css_end__*/
        /*!__reshadow-styles__:"file.css"*/
      `;

      const id = '/node_modules/@semcore/button/lib/index.js';
      const result = plugin.transform?.(sourceCode, id);

      expect(result).toBeDefined();
    });

    test('Should handle @semcore/flags package specifically', () => {
      const plugin = processCssVitePlugin();

      const sourceCode = `
        /*__reshadow_css_start__*/
        __inner_css_start__*/".flag { color: red; }",
        /*__inner_css_end__*/
        /*__reshadow_css_end__*/
        /*!__reshadow-styles__:"file.css"*/
      `;

      const id = '/node_modules/@semcore/flags/lib/index.js';
      const result = plugin.transform?.(sourceCode, id);

      expect(result).toBeDefined();
      // @semcore/flags should use different replacement logic
      expect(result?.code).toContain('undefined');
    });

    test('Should preserve code that is not CSS-related', () => {
      const plugin = processCssVitePlugin();

      const sourceCode = `
        import React from 'react';
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
    test('Should work without options', () => {
      const plugin = processCssVitePlugin();
      expect(plugin).toBeDefined();
      expect(plugin.name).toBe('semcore-process-css-unplugin');
    });

    test('Should work with empty options', () => {
      const plugin = processCssVitePlugin({});
      expect(plugin).toBeDefined();
      expect(plugin.name).toBe('semcore-process-css-unplugin');
    });

    test('Should accept prefix option', () => {
      const plugin = processCssVitePlugin({ prefix: 'custom' });
      expect(plugin).toBeDefined();
    });

    test('Should have correct plugin metadata', () => {
      const plugin = processCssVitePlugin();
      expect(plugin.name).toBe('semcore-process-css-unplugin');
      expect(plugin.enforce).toBe('pre');
    });
  });
});
