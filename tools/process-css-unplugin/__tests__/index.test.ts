import { expect, test, describe } from '../../testing-utils/vitest';
import { processCssVitePlugin } from '../src/index';

// Helper to call transform hook
const callTransform = (plugin: any, code: string, id: string) => {
  return plugin.transform(code, id);
};

// Helper to call transformInclude
const callTransformInclude = (plugin: any, id: string) => {
  return plugin.transformInclude(id);
};

describe('process-css-unplugin', () => {
  describe('CSS extraction and transformation', () => {
    test('Verify CSS extraction from reshadow markers and virtual file creation', () => {
      const plugin = processCssVitePlugin({ virtualFilesPrefix: 'test' });

      const sourceCode = `import React from 'react';
/*!__reshadow-styles__:"./style/button.shadow.css"*/
const style = (/*__reshadow_css_start__*/_sstyled.insert(/*__inner_css_start__*/".button { color: red; }",/*__inner_css_end__*/"hash"),
/*__reshadow_css_end__*/
{});`;

      const id = '/node_modules/@semcore/button/lib/es6/Button.js';
      const result = callTransform(plugin, sourceCode, id);

      expect(result).toBeDefined();
      expect(result?.code).toContain('undefined');
      expect(result?.code).not.toContain('__reshadow_css_start__');
      expect(result?.code).toContain('test_');
      expect(result?.code).toContain('.css');
    });

    test('Verify CommonJS require syntax', () => {
      const plugin = processCssVitePlugin({});

      const sourceCode = `const React = require('react');
/*!__reshadow-styles__:"./style/button.shadow.css"*/
const style = (/*__reshadow_css_start__*/_sstyled.insert(/*__inner_css_start__*/".button { color: green; }",/*__inner_css_end__*/"hash"),
/*__reshadow_css_end__*/
{});
`;

      const id = '/node_modules/@semcore/button/lib/index.js';
      const result = callTransform(plugin, sourceCode, id);

      expect(result).toBeDefined();
      expect(result?.code).toContain('require');
    });

    test('Verify transformation of only files from @semcore/ packages', () => {
      const plugin = processCssVitePlugin({});

      // Non-semcore file
      const id = '/node_modules/other-lib/index.js';
      const shouldTransform = callTransformInclude(plugin, id);

      expect(shouldTransform).toBe(false);

      // Semcore file
      const semcoreId = '/node_modules/@semcore/button/index.js';
      const shouldTransformSemcore = callTransformInclude(plugin, semcoreId);

      expect(shouldTransformSemcore).toBe(true);
    });

    test('Verify handling of multiple CSS blocks in single file', () => {
      const plugin = processCssVitePlugin({});

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
      const result = callTransform(plugin, sourceCode, id);

      expect(result).toBeDefined();
      // Should have two imports
      const importMatches = result?.code.match(/import/g);
      expect(importMatches?.length).toBeGreaterThanOrEqual(2);
    });

    test('Verify correct CSS content extraction from nested quotes', () => {
      const isolationSuffix = '__my-team-suffix__';
      const plugin = processCssVitePlugin({
        isolationSuffix,
      });

      const sourceCode = `
        /*!__reshadow-styles__:"./button.shadow.css"*/
        var style = (
          /*__reshadow_css_start__*/
          (sstyled.insert(
            /*__inner_css_start__*/
            '.___SButton_gw5o3_gg_{position:relative;display:inline-block;align-items:center;justify-content:center;padding:0;margin:0;white-space:nowrap;font-family:inherit;line-height:normal;-webkit-text-decoration:none;text-decoration:none;text-align:center;vertical-align:middle;border:1px solid transparent;box-shadow:none;cursor:pointer;box-sizing:border-box;overflow:visible;-webkit-user-select:none;-moz-user-select:none;user-select:none;touch-action:manipulation;-webkit-tap-highlight-color:transparent;font-weight:var(--intergalactic-medium, 500);color:var(--intergalactic-text-secondary, #6c6e79);min-width:-moz-fit-content;min-width:fit-content}.___SButton_gw5o3_gg_::-moz-focus-inner{padding:0;border:0}.___SButton_gw5o3_gg_:active{-webkit-text-decoration:none;text-decoration:none}@media (hover:hover){.___SButton_gw5o3_gg_:hover{-webkit-text-decoration:none;text-decoration:none}}.___SButton_gw5o3_gg_.__disabled_gw5o3_gg_{opacity:var(--intergalactic-disabled-opacity, 0.3);cursor:default;pointer-events:none;box-shadow:none;z-index:0}.___SButton_gw5o3_gg_._size_s_gw5o3_gg_{width:var(--intergalactic-form-control-s, 20px);height:var(--intergalactic-form-control-s, 20px);border-radius:var(--intergalactic-addon-rounded, 4px)}.___SButton_gw5o3_gg_._size_m_gw5o3_gg_{height:var(--intergalactic-form-control-m, 28px);border-radius:var(--intergalactic-control-rounded, 6px);font-size:var(--intergalactic-fs-200, 14px)}.___SButton_gw5o3_gg_._size_l_gw5o3_gg_{height:var(--intergalactic-form-control-l, 40px);border-radius:var(--intergalactic-control-rounded, 6px);font-size:var(--intergalactic-fs-300, 16px)}.___SButton_gw5o3_gg_._theme_primary-info_gw5o3_gg_{color:var(--intergalactic-text-primary-invert, #ffffff);background-color:var(--intergalactic-control-primary-info, #008ff8)}@media (hover:hover){.___SButton_gw5o3_gg_._theme_primary-info_gw5o3_gg_:hover{color:var(--intergalactic-text-primary-invert, #ffffff);background-color:var(--intergalactic-control-primary-info-hover, #006dca)}}.___SButton_gw5o3_gg_._theme_primary-info_gw5o3_gg_.__active_gw5o3_gg_,.___SButton_gw5o3_gg_._theme_primary-info_gw5o3_gg_:active{color:var(--intergalactic-text-primary-invert, #ffffff);background-color:var(--intergalactic-control-primary-info-active, #044792)}.___SButton_gw5o3_gg_._theme_primary-success_gw5o3_gg_{color:var(--intergalactic-text-primary-invert, #ffffff);background-color:var(--intergalactic-control-primary-success, #009f81)}@media (hover:hover){.___SButton_gw5o3_gg_._theme_primary-success_gw5o3_gg_:hover{color:var(--intergalactic-text-primary-invert, #ffffff);background-color:var(--intergalactic-control-primary-success-hover, #007c65)}}.___SButton_gw5o3_gg_._theme_primary-success_gw5o3_gg_.__active_gw5o3_gg_,.___SButton_gw5o3_gg_._theme_primary-success_gw5o3_gg_:active{color:var(--intergalactic-text-primary-invert, #ffffff);background-color:var(--intergalactic-control-primary-success-active, #055345)}.___SButton_gw5o3_gg_._theme_primary-brand_gw5o3_gg_,.___SButton_gw5o3_gg_._theme_primary-warning_gw5o3_gg_{color:var(--intergalactic-text-primary-invert, #ffffff);background-color:var(--intergalactic-control-primary-brand, #ff642d)}@media (hover:hover){.___SButton_gw5o3_gg_._theme_primary-brand_gw5o3_gg_:hover{color:var(--intergalactic-text-primary-invert, #ffffff);background-color:var(--intergalactic-control-primary-brand-hover, #c33909)}}.___SButton_gw5o3_gg_._theme_primary-brand_gw5o3_gg_.__active_gw5o3_gg_,.___SButton_gw5o3_gg_._theme_primary-brand_gw5o3_gg_:active{color:var(--intergalactic-text-primary-invert, #ffffff);background-color:var(--intergalactic-control-primary-brand-active, #8b1500)}@media (hover:hover){.___SButton_gw5o3_gg_._theme_primary-warning_gw5o3_gg_:hover{color:var(--intergalactic-text-primary-invert, #ffffff);background-color:var(--intergalactic-control-primary-brand-hover, #c33909)}}.___SButton_gw5o3_gg_._theme_primary-warning_gw5o3_gg_.__active_gw5o3_gg_,.___SButton_gw5o3_gg_._theme_primary-warning_gw5o3_gg_:active{color:var(--intergalactic-text-primary-invert, #ffffff);background-color:var(--intergalactic-control-primary-brand-active, #8b1500)}.___SButton_gw5o3_gg_._theme_primary-danger_gw5o3_gg_{color:var(--intergalactic-text-primary-invert, #ffffff);background-color:var(--intergalactic-control-primary-critical, #ff4953)}@media (hover:hover){.___SButton_gw5o3_gg_._theme_primary-danger_gw5o3_gg_:hover{color:var(--intergalactic-text-primary-invert, #ffffff);background-color:var(--intergalactic-control-primary-critical-hover, #d1002f)}}.___SButton_gw5o3_gg_._theme_primary-danger_gw5o3_gg_.__active_gw5o3_gg_,.___SButton_gw5o3_gg_._theme_primary-danger_gw5o3_gg_:active{color:var(--intergalactic-text-primary-invert, #ffffff);background-color:var(--intergalactic-control-primary-critical-active, #8e0016)}.___SButton_gw5o3_gg_._theme_primary-invert_gw5o3_gg_{color:var(--intergalactic-text-primary, #191b23);background-color:var(--intergalactic-control-primary-invert, #ffffff)}@media (hover:hover){.___SButton_gw5o3_gg_._theme_primary-invert_gw5o3_gg_:hover{color:var(--intergalactic-text-primary, #191b23);background-color:var(--intergalactic-control-primary-invert-hover, #f4f5f9)}}.___SButton_gw5o3_gg_._theme_primary-invert_gw5o3_gg_.__active_gw5o3_gg_,.___SButton_gw5o3_gg_._theme_primary-invert_gw5o3_gg_:active{color:var(--intergalactic-text-primary, #191b23);background-color:var(--intergalactic-control-primary-invert-active, #e0e1e9)}.___SButton_gw5o3_gg_._theme_secondary-muted_gw5o3_gg_{color:var(--intergalactic-text-secondary, #6c6e79);border-color:var(--intergalactic-border-primary, #c4c7cf);background-color:var(--intergalactic-control-secondary-neutral, rgba(138, 142, 155, 0.1))}@media (hover:hover){.___SButton_gw5o3_gg_._theme_secondary-muted_gw5o3_gg_:hover{background-color:var(--intergalactic-control-secondary-neutral-hover,\n    rgba(138, 142, 155, 0.2));color:var(--intergalactic-text-primary, #191b23)}}.___SButton_gw5o3_gg_._theme_secondary-muted_gw5o3_gg_.__active_gw5o3_gg_,.___SButton_gw5o3_gg_._theme_secondary-muted_gw5o3_gg_:active{background-color:var(--intergalactic-control-secondary-neutral-active,\n    rgba(138, 142, 155, 0.3));color:var(--intergalactic-text-primary, #191b23)}.___SButton_gw5o3_gg_._theme_secondary-info_gw5o3_gg_{background-color:var(--intergalactic-control-secondary-info, rgba(0, 143, 248, 0.1));color:var(--intergalactic-text-link, #006dca);border-color:var(--intergalactic-control-primary-info, #008ff8)}@media (hover:hover){.___SButton_gw5o3_gg_._theme_secondary-info_gw5o3_gg_:hover{color:var(--intergalactic-text-link, #006dca);background-color:var(--intergalactic-control-secondary-info-hover, rgba(0, 143, 248, 0.2))}}.___SButton_gw5o3_gg_._theme_secondary-info_gw5o3_gg_.__active_gw5o3_gg_,.___SButton_gw5o3_gg_._theme_secondary-info_gw5o3_gg_:active{color:var(--intergalactic-text-link, #006dca);background-color:var(--intergalactic-control-secondary-info-active, rgba(0, 143, 248, 0.3))}.___SButton_gw5o3_gg_._theme_secondary-invert_gw5o3_gg_{color:var(--intergalactic-text-primary-invert, #ffffff);border-color:var(--intergalactic-border-primary-invert, #ffffff);background-color:var(--intergalactic-control-secondary-invert, rgba(255, 255, 255, 0.05))}@media (hover:hover){.___SButton_gw5o3_gg_._theme_secondary-invert_gw5o3_gg_:hover{color:var(--intergalactic-text-primary-invert, #ffffff);background-color:var(--intergalactic-control-secondary-invert-hover, rgba(255, 255, 255, 0.1))}}.___SButton_gw5o3_gg_._theme_secondary-invert_gw5o3_gg_.__active_gw5o3_gg_,.___SButton_gw5o3_gg_._theme_secondary-invert_gw5o3_gg_:active{color:var(--intergalactic-text-primary-invert, #ffffff);background-color:var(--intergalactic-control-secondary-invert-active,\n    rgba(255, 255, 255, 0.3))}.___SButton_gw5o3_gg_._theme_tertiary-info_gw5o3_gg_{color:var(--intergalactic-text-link, #006dca);background-color:var(--intergalactic-control-tertiary-info, rgba(0, 143, 248, 0))}@media (hover:hover){.___SButton_gw5o3_gg_._theme_tertiary-info_gw5o3_gg_:hover{color:var(--intergalactic-text-link, #006dca);background-color:var(--intergalactic-control-tertiary-info-hover, rgba(0, 143, 248, 0.2))}}.___SButton_gw5o3_gg_._theme_tertiary-info_gw5o3_gg_.__active_gw5o3_gg_,.___SButton_gw5o3_gg_._theme_tertiary-info_gw5o3_gg_:active{color:var(--intergalactic-text-link, #006dca);background-color:var(--intergalactic-control-tertiary-info-active, rgba(0, 143, 248, 0.3))}.___SButton_gw5o3_gg_._theme_tertiary-muted_gw5o3_gg_{color:var(--intergalactic-text-secondary, #6c6e79);background-color:var(--intergalactic-control-tertiary-neutral, rgba(138, 142, 155, 0))}@media (hover:hover){.___SButton_gw5o3_gg_._theme_tertiary-muted_gw5o3_gg_:hover{background-color:var(--intergalactic-control-tertiary-neutral-hover, rgba(138, 142, 155, 0.2));color:var(--intergalactic-text-primary, #191b23)}}.___SButton_gw5o3_gg_._theme_tertiary-muted_gw5o3_gg_.__active_gw5o3_gg_,.___SButton_gw5o3_gg_._theme_tertiary-muted_gw5o3_gg_:active{background-color:var(--intergalactic-control-tertiary-neutral-active,\n    rgba(138, 142, 155, 0.3));color:var(--intergalactic-text-primary, #191b23)}.___SButton_gw5o3_gg_._theme_tertiary-invert_gw5o3_gg_{color:var(--intergalactic-text-primary-invert, #ffffff);background-color:var(--intergalactic-control-tertiary-invert, rgba(255, 255, 255, 0))}@media (hover:hover){.___SButton_gw5o3_gg_._theme_tertiary-invert_gw5o3_gg_:hover{color:var(--intergalactic-text-primary-invert, #ffffff);background-color:var(--intergalactic-control-tertiary-invert-hover, rgba(255, 255, 255, 0.1))}}.___SButton_gw5o3_gg_._theme_tertiary-invert_gw5o3_gg_.__active_gw5o3_gg_,.___SButton_gw5o3_gg_._theme_tertiary-invert_gw5o3_gg_:active{color:var(--intergalactic-text-primary-invert, #ffffff);background-color:var(--intergalactic-control-tertiary-invert-active, rgba(255, 255, 255, 0.3))}.___SButton_gw5o3_gg_._neighborLocation_right_gw5o3_gg_{border-top-right-radius:0;border-bottom-right-radius:0}.___SButton_gw5o3_gg_._neighborLocation_both_gw5o3_gg_{border-radius:0;margin-left:-1px}.___SButton_gw5o3_gg_._neighborLocation_left_gw5o3_gg_{border-top-left-radius:0;border-bottom-left-radius:0;margin-left:-1px}.___SButton_gw5o3_gg_._neighborLocation_both_gw5o3_gg_,.___SButton_gw5o3_gg_._neighborLocation_left_gw5o3_gg_{position:relative}.___SButton_gw5o3_gg_._neighborLocation_both_gw5o3_gg_:after,.___SButton_gw5o3_gg_._neighborLocation_left_gw5o3_gg_:after{background-color:var(--intergalactic-border-primary-invert, #ffffff)}.___SButton_gw5o3_gg_._neighborLocation_both_gw5o3_gg_._theme_secondary-muted_gw5o3_gg_:after,.___SButton_gw5o3_gg_._neighborLocation_left_gw5o3_gg_._theme_secondary-muted_gw5o3_gg_:after{background-color:var(--intergalactic-border-primary, #c4c7cf)}.___SButton_gw5o3_gg_+.___SButton_gw5o3_gg_._neighborLocation_both_gw5o3_gg_:after,.___SButton_gw5o3_gg_+.___SButton_gw5o3_gg_._neighborLocation_left_gw5o3_gg_:after{content:"";position:absolute;top:-1px;left:-1px;width:1px;height:calc(100% + 2px)}.___SSpin_gw5o3_gg_{position:absolute;top:0;left:0;width:100%;height:100%;display:flex}.___SInner_gw5o3_gg_{display:inline-flex;align-items:center;justify-content:center;height:100%;width:100%}.___SInner_gw5o3_gg_.__loading_gw5o3_gg_{visibility:hidden}.___SText_gw5o3_gg_{display:inline-flex}.___SText_gw5o3_gg_._size_l_gw5o3_gg_,.___SText_gw5o3_gg_._size_m_gw5o3_gg_{margin-left:var(--intergalactic-spacing-2x, 8px);margin-right:var(--intergalactic-spacing-2x, 8px)}.___SText_gw5o3_gg_._size_m_gw5o3_gg_{line-height:var(--intergalactic-lh-200, 142%)}.___SText_gw5o3_gg_._size_l_gw5o3_gg_{line-height:var(--intergalactic-lh-300, 150%)}.___SText_gw5o3_gg_._size_l_gw5o3_gg_:only-child{margin-left:var(--intergalactic-spacing-3x, 12px);margin-right:var(--intergalactic-spacing-3x, 12px)}.___SText_gw5o3_gg_._size_l_gw5o3_gg_:first-child{margin-left:var(--intergalactic-spacing-3x, 12px)}.___SText_gw5o3_gg_._size_l_gw5o3_gg_:last-child{margin-right:var(--intergalactic-spacing-3x, 12px)}.___SAddon_gw5o3_gg_{display:inline-flex;align-items:center;justify-content:center;pointer-events:none}.___SAddon_gw5o3_gg_._size_m_gw5o3_gg_:not(:only-child):first-child{margin-left:calc(var(--intergalactic-spacing-2x, 8px) - 1px)}.___SAddon_gw5o3_gg_._size_m_gw5o3_gg_:not(:only-child):last-child{margin-right:calc(var(--intergalactic-spacing-2x, 8px) - 1px)}.___SAddon_gw5o3_gg_._size_m_gw5o3_gg_:only-child{margin-left:calc(1.5*var(--intergalactic-spacing-1x, 4px) - 1px);margin-right:calc(1.5*var(--intergalactic-spacing-1x, 4px) - 1px)}.___SAddon_gw5o3_gg_._size_l_gw5o3_gg_:not(:only-child):first-child{margin-left:calc(var(--intergalactic-spacing-3x, 12px) - 1px)}.___SAddon_gw5o3_gg_._size_l_gw5o3_gg_:not(:only-child):last-child{margin-right:calc(var(--intergalactic-spacing-3x, 12px) - 1px)}.___SAddon_gw5o3_gg_._size_l_gw5o3_gg_:only-child{margin-left:calc(3*var(--intergalactic-spacing-1x, 4px) - 1px);margin-right:calc(3*var(--intergalactic-spacing-1x, 4px) - 1px)}',
            /*__inner_css_end__*/
            "gw5o3_gg_"
          ), /*__reshadow_css_end__*/
          {
            "__SButton": "___SButton_gw5o3_gg_",
            "_disabled": "__disabled_gw5o3_gg_",
            "_size_s": "_size_s_gw5o3_gg_",
            "_size_m": "_size_m_gw5o3_gg_",
            "_size_l": "_size_l_gw5o3_gg_",
            "_neighborLocation_right": "_neighborLocation_right_gw5o3_gg_",
            "_neighborLocation_both": "_neighborLocation_both_gw5o3_gg_",
            "_neighborLocation_left": "_neighborLocation_left_gw5o3_gg_",
            "__SSpin": "___SSpin_gw5o3_gg_",
            "__SInner": "___SInner_gw5o3_gg_",
            "_loading": "__loading_gw5o3_gg_",
            "__SText": "___SText_gw5o3_gg_",
            "__SAddon": "___SAddon_gw5o3_gg_",
            "_theme_primary-info": "_theme_primary-info_gw5o3_gg_",
            "_active": "__active_gw5o3_gg_",
            "_theme_primary-success": "_theme_primary-success_gw5o3_gg_",
            "_theme_primary-brand": "_theme_primary-brand_gw5o3_gg_",
            "_theme_primary-warning": "_theme_primary-warning_gw5o3_gg_",
            "_theme_primary-danger": "_theme_primary-danger_gw5o3_gg_",
            "_theme_primary-invert": "_theme_primary-invert_gw5o3_gg_",
            "_theme_secondary-muted": "_theme_secondary-muted_gw5o3_gg_",
            "_theme_secondary-info": "_theme_secondary-info_gw5o3_gg_",
            "_theme_secondary-invert": "_theme_secondary-invert_gw5o3_gg_",
            "_theme_tertiary-info": "_theme_tertiary-info_gw5o3_gg_",
            "_theme_tertiary-muted": "_theme_tertiary-muted_gw5o3_gg_",
            "_theme_tertiary-invert": "_theme_tertiary-invert_gw5o3_gg_"
          })
        );
      `;

      const id = '/node_modules/@semcore/button/lib/index.js';
      const result = callTransform(plugin, sourceCode, id);

      expect(result).toBeDefined();
      expect(result?.code).toContain(isolationSuffix);
    });

    test('Verify isolationSuffix works correctly', () => {
      const plugin = processCssVitePlugin({});

      const cssContent = '.button { content: "Hello"; }';
      const sourceCode = `import React from 'react';
/*!__reshadow-styles__:"./style/button.shadow.css"*/
const style = (/*__reshadow_css_start__*/_sstyled.insert(/*__inner_css_start__*/"${cssContent}",/*__inner_css_end__*/"hash"),
/*__reshadow_css_end__*/
{});
`;

      const id = '/node_modules/@semcore/button/lib/index.js';
      const result = callTransform(plugin, sourceCode, id);

      expect(result).toBeDefined();
      expect(result?.code).not.toContain('__inner_css_start__');
    });
  });

  describe('Virtual file handling', () => {
    test('Verify creation and loading of virtual CSS files', () => {
      const plugin = processCssVitePlugin({});

      const cssContent = '.test { color: red; }';
      const sourceCode = `import React from 'react';
/*!__reshadow-styles__:"./style/test.shadow.css"*/
const style = (/*__reshadow_css_start__*/_sstyled.insert(/*__inner_css_start__*/"${cssContent}",/*__inner_css_end__*/"hash"),
/*__reshadow_css_end__*/
{});
`;

      const id = '/node_modules/@semcore/test/lib/index.js';

      // First transform to create virtual files
      callTransform(plugin, sourceCode, id);

      // Then check if the plugin has the necessary hooks
      expect((plugin as any).resolveId).toBeDefined();
      expect((plugin as any).load).toBeDefined();
      expect((plugin as any).loadInclude).toBeDefined();
    });
  });

  describe('CSS file generation', () => {
    test('Verify generation of different virtual files for different content', () => {
      const plugin = processCssVitePlugin({});

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
      const result1 = callTransform(plugin, sourceCode1, id);
      const result2 = callTransform(plugin, sourceCode2, id);

      expect(result1?.code).toBeDefined();
      expect(result2?.code).toBeDefined();
      // Different CSS content should result in different import paths
      expect(result1?.code).not.toBe(result2?.code);
    });

    test('Verify generation of consistent results for same content', () => {
      const plugin = processCssVitePlugin({});

      const sourceCode = `import React from 'react';
/*!__reshadow-styles__:"./style/button.shadow.css"*/
const style = (/*__reshadow_css_start__*/_sstyled.insert(/*__inner_css_start__*/".button { color: red; }",/*__inner_css_end__*/"hash"),
/*__reshadow_css_end__*/
{});
`;

      const id = '/node_modules/@semcore/button/lib/index.js';
      const result1 = callTransform(plugin, sourceCode, id);
      const result2 = callTransform(plugin, sourceCode, id);

      expect(result1?.code).toBe(result2?.code);
    });
  });

  describe('Edge cases', () => {
    test('Verify handling of @semcore/flags package specifically', () => {
      const plugin = processCssVitePlugin({});

      const sourceCode = `const React = require('react');
/*!__reshadow-styles__:"./style/flag.shadow.css"*/
const style = (/*__reshadow_css_start__*/_sstyled.insert(/*__inner_css_start__*/".flag { color: red; }",/*__inner_css_end__*/"hash"),
/*__reshadow_css_end__*/
{});
`;

      const id = '/node_modules/@semcore/flags/lib/index.js';
      const result = callTransform(plugin, sourceCode, id);

      expect(result).toBeDefined();
      // @semcore/flags should use different replacement logic
      expect(result?.code).toContain('undefined');
    });

    test('Verify preservation of code that is not CSS-related', () => {
      const plugin = processCssVitePlugin({});

      const sourceCode = `import React from 'react';
const Button = () => <button>Click</button>;
export default Button;
`;

      const id = '/node_modules/@semcore/button/lib/index.js';
      const result = callTransform(plugin, sourceCode, id);

      expect(result).toBeDefined();
      expect(result?.code).toContain('const Button');
      expect(result?.code).toContain('export default Button');
    });
  });

  describe('Plugin configuration', () => {
    test('Verify plugin works without options and has correct metadata', () => {
      const plugin = processCssVitePlugin({});
      expect(plugin).toBeDefined();
      expect((plugin as any).name).toBe('semcore-process-css-unplugin');
      expect((plugin as any).enforce).toBe('pre');
    });
  });
});
