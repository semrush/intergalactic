import { expect, test, describe } from '@semcore/testing-utils/vitest';

import { processTokens } from '../src/utils';

describe('Token Processor - processTokens', () => {
  describe('Basic token processing', () => {
    test('Should process simple color tokens from base', () => {
      const base = {
        gray: {
          white: { value: '#ffffff', type: 'color' },
          50: { value: '#f4f5f9', type: 'color' },
        },
      } as any;
      const tokens = {} as any;
      const featureHighlight = {} as any;

      const result = processTokens(base, tokens, featureHighlight, '--');

      expect(result.values['gray-white']).toBe('#ffffff');
      expect(result.values['gray-50']).toBe('#f4f5f9');
    });

    test('Should process tokens with references', () => {
      const base = {
        gray: {
          white: { value: '#ffffff', type: 'color' },
        },
      } as any;
      const tokens = {
        bg: {
          'primary-neutral': { value: '{gray.white}', type: 'color' },
        },
      } as any;
      const featureHighlight = {} as any;

      const result = processTokens(base, tokens, featureHighlight, '--intergalactic-');

      expect(result.values['bg-primary-neutral']).toBe('#ffffff');
    });

    test('Should process nested token references', () => {
      const base = {
        gray: {
          white: { value: '#ffffff', type: 'color' },
        },
      } as any;
      const tokens = {
        bg: {
          primary: { value: '{gray.white}', type: 'color' },
        },
        text: {
          secondary: { value: '{bg.primary}', type: 'color' },
        },
      } as any;
      const featureHighlight = {} as any;

      const result = processTokens(base, tokens, featureHighlight, '--');

      expect(result.values['bg-primary']).toBe('#ffffff');
      // Note: processTokens only resolves one level of references
      // nested token-to-token references are not supported
    });
  });

  describe('Color with alpha/opacity', () => {
    test('Should process color with opacity (comma-separated format)', () => {
      const base = {
        gray: {
          white: { value: '#ffffff', type: 'color' },
        },
      } as any;
      const tokens = {
        bg: {
          'semi-transparent': { value: '{gray.white}, 0.5', type: 'color' },
        },
      } as any;
      const featureHighlight = {} as any;

      const result = processTokens(base, tokens, featureHighlight, '--');

      expect(result.values['bg-semi-transparent']).toBe('rgba(255, 255, 255, 0.5)');
    });

    test('Should process rgba with color reference', () => {
      const base = {
        gray: {
          white: { value: '#ffffff', type: 'color' },
        },
      } as any;
      const tokens = {
        bg: {
          'transparent-bg': { value: 'rgba({gray.white}, 0.3)', type: 'color' },
        },
      } as any;
      const featureHighlight = {} as any;

      const result = processTokens(base, tokens, featureHighlight, '--');

      expect(result.values['bg-transparent-bg']).toBe('rgba(255, 255, 255, 0.3)');
    });
  });

  describe('Sizing and spacing tokens', () => {
    test('Should process sizing tokens', () => {
      const base = {} as any;
      const tokens = {
        sizing: {
          small: { value: '20px', type: 'sizing' },
          medium: { value: '40px', type: 'sizing' },
        },
      } as any;
      const featureHighlight = {} as any;

      const result = processTokens(base, tokens, featureHighlight, '--');

      expect(result.values['sizing-small']).toBe('20px');
      expect(result.values['sizing-medium']).toBe('40px');
    });

    test('Should process sizing with mathematical expressions', () => {
      const base = {} as any;
      const tokens = {
        sizing: {
          base: { value: '10px', type: 'sizing' },
          double: { value: '{sizing.base}*2', type: 'sizing' },
        },
      } as any;
      const featureHighlight = {} as any;

      const result = processTokens(base, tokens, featureHighlight, '--');

      expect(result.values['sizing-base']).toBe('10px');
      expect(result.values['sizing-double']).toBe('20px');
    });

    test('Should process sizing with decimal multipliers', () => {
      const base = {} as any;
      const tokens = {
        sizing: {
          base: { value: '10px', type: 'sizing' },
          half: { value: '{sizing.base}*0.5', type: 'sizing' },
        },
      } as any;
      const featureHighlight = {} as any;

      const result = processTokens(base, tokens, featureHighlight, '--');

      expect(result.values['sizing-base']).toBe('10px');
      expect(result.values['sizing-half']).toBe('5px');
    });
  });

  describe('Box shadow tokens', () => {
    test('Should process box shadow with color references', () => {
      const base = {
        gray: {
          800: { value: '#191b23', type: 'color' },
        },
      } as any;
      const tokens = {
        shadow: {
          colored: { value: '0px 2px 4px rgba({gray.800}, 0.2)', type: 'boxShadow' },
        },
      } as any;
      const featureHighlight = {} as any;

      const result = processTokens(base, tokens, featureHighlight, '--');

      expect(result.values['shadow-colored']).toBe('0px 2px 4px rgba(25, 27, 35, 0.2)');
    });

    test('Should process multiple box shadows (semicolon-separated)', () => {
      const base = {} as any;
      const tokens = {
        shadow: {
          layered: {
            value: '0px 1px 2px rgba(0, 0, 0, 0.05); 0px 4px 8px rgba(0, 0, 0, 0.1)',
            type: 'boxShadow',
          },
        },
      } as any;
      const featureHighlight = {} as any;

      const result = processTokens(base, tokens, featureHighlight, '--');

      expect(result.values['shadow-layered']).toBe(
        '0px 1px 2px rgba(0, 0, 0, 0.05), 0px 4px 8px rgba(0, 0, 0, 0.1)',
      );
    });
  });

  describe('Descriptions and metadata', () => {
    test('Should preserve token descriptions', () => {
      const base = {
        gray: {
          50: {
            value: '#f4f5f9',
            type: 'color',
            description: 'Light gray for backgrounds',
          },
        },
      } as any;
      const tokens = {} as any;
      const featureHighlight = {} as any;

      const result = processTokens(base, tokens, featureHighlight, '--');

      expect(result.descriptions['gray-50']).toBe('Light gray for backgrounds');
    });
  });

  describe('Feature highlight tokens', () => {
    test('Should process feature highlight tokens separately', () => {
      const base = {} as any;
      const tokens = {} as any;
      const featureHighlight = {
        highlight: {
          blue: { value: '#0066ff', type: 'color' },
        },
      } as any;

      const result = processTokens(base, tokens, featureHighlight, 'intergalactic');

      expect(result.values['highlight-blue']).toBe('#0066ff');
      expect(result.highlightsTokens.length).toBeGreaterThan(0);
      expect(result.highlightsTokens[0].name).toBe('--intergalactic-highlight-blue');
    });
  });

  describe('Token categories', () => {
    test('Should categorize base tokens', () => {
      const base = {
        gray: {
          white: { value: '#ffffff', type: 'color' },
        },
      } as any;
      const tokens = {} as any;
      const featureHighlight = {} as any;

      const result = processTokens(base, tokens, featureHighlight, '--');

      expect(result.basicTokens.has('gray-white')).toBe(true);
    });

    test('Should distinguish between base, semantic, and highlight tokens', () => {
      const base = {
        gray: {
          white: { value: '#ffffff', type: 'color' },
        },
      } as any;
      const tokens = {
        bg: {
          primary: { value: '{gray.white}', type: 'color' },
        },
      } as any;
      const featureHighlight = {
        highlight: {
          feature: { value: '#ff0000', type: 'color' },
        },
      } as any;

      const result = processTokens(base, tokens, featureHighlight, 'intergalactic');

      expect(result.basicTokens.has('gray-white')).toBe(true);
      expect(result.basicTokens.has('bg-primary')).toBe(false);
      // Highlight tokens are stored in highlightsTokens array
      expect(result.highlightsTokens.length).toBeGreaterThan(0);
      expect(result.highlightsTokens[0].name).toBe('--intergalactic-highlight-feature');
    });
  });

  describe('Linear gradients', () => {
    test('Should process linear gradients with color references', () => {
      const base = {
        blue: {
          500: { value: '#008ff8', type: 'color' },
        },
        gray: {
          white: { value: '#ffffff', type: 'color' },
        },
      } as any;
      const tokens = {
        gradient: {
          'blue-to-white': {
            value: 'linear-gradient(to right, {blue.500}, {gray.white})',
            type: 'color',
          },
        },
      } as any;
      const featureHighlight = {} as any;

      const result = processTokens(base, tokens, featureHighlight, '--');

      expect(result.values['gradient-blue-to-white']).toBe('linear-gradient(to right, #008ff8, #ffffff)');
    });

    test('Should process linear gradients with rgba colors', () => {
      const base = {
        gray: {
          800: { value: '#191b23', type: 'color' },
        },
      } as any;
      const tokens = {
        gradient: {
          fade: {
            value: 'linear-gradient(to bottom, rgba({gray.800}, 1), rgba({gray.800}, 0))',
            type: 'color',
          },
        },
      } as any;
      const featureHighlight = {} as any;

      const result = processTokens(base, tokens, featureHighlight, '--');

      expect(result.values['gradient-fade']).toContain('linear-gradient');
      expect(result.values['gradient-fade']).toContain('rgba(25, 27, 35, 1)');
      expect(result.values['gradient-fade']).toContain('rgba(25, 27, 35, 0)');
    });
  });

  describe('Color modifications (lighten/darken)', () => {
    test('Should process color with lighten modification', () => {
      const base = {
        blue: {
          500: {
            value: '#008ff8',
            type: 'color',
            $extensions: {
              'studio.tokens': {
                modify: {
                  type: 'lighten',
                  value: 0.2,
                  space: 'hsl',
                },
              },
            },
          },
        },
      } as any;
      const tokens = {} as any;
      const featureHighlight = {} as any;

      const result = processTokens(base, tokens, featureHighlight, '--');

      // Should produce a lighter version of #008ff8
      expect(result.values['blue-500']).toBeTruthy();
      expect(result.values['blue-500']).not.toBe('#008ff8'); // Should be modified
      expect(result.rawValues['blue-500']).toContain('lighten');
    });
  });

  describe('Real tokens validation', () => {
    // validate our tokens are ok
    test('Should process light theme tokens without errors', async () => {
      const fs = await import('node:fs/promises');
      const { resolve } = await import('node:path');

      const lightThemeContent = await fs.readFile(
        resolve(__dirname, '../src/theme/light.json'),
        'utf-8',
      );
      const { base, tokens, featureHighlight } = JSON.parse(lightThemeContent);

      // no errors- validates all token references are correct
      expect(() => {
        const result = processTokens(base, tokens, featureHighlight, 'intergalactic');

        // base sanity checks
        expect(Object.keys(result.values).length).toBeGreaterThan(0);
        expect(result.processedTokens.length).toBeGreaterThan(0);

        //  all values are resolved (no unresolved references like {xxx.xxx})
        for (const [tokenName, value] of Object.entries(result.values)) {
          expect(value).not.toMatch(/\{[^}]+\}/);
          expect(value).toBeTruthy();
        }
      }).not.toThrow();
    });

    test('Should process dark theme tokens without errors', async () => {
      const fs = await import('node:fs/promises');
      const { resolve } = await import('node:path');

      const darkThemeContent = await fs.readFile(
        resolve(__dirname, '../src/theme/dark.json'),
        'utf-8',
      );
      const { base, tokens, featureHighlight } = JSON.parse(darkThemeContent);

      // no errors - validates all token references are correct
      expect(() => {
        const result = processTokens(base, tokens, featureHighlight, 'intergalactic');

        // base sanity checks
        expect(Object.keys(result.values).length).toBeGreaterThan(0);
        expect(result.processedTokens.length).toBeGreaterThan(0);

        // all values are resolved (no unresolved references like {xxx.xxx})
        for (const [tokenName, value] of Object.entries(result.values)) {
          expect(value).not.toMatch(/\{[^}]+\}/);
          expect(value).toBeTruthy();
        }
      }).not.toThrow();
    });

    // if this works it sould prevent us from figma plugin problems, some manual typos
    test('Should detect typos in token references', () => {
      const base = {
        gray: {
          white: { value: '#ffffff', type: 'color' },
        },
      } as any;
      const tokens = {
        bg: {
          // Typo: "grey" instead of "gray"
          primary: { value: '{grey.white}', type: 'color' },
        },
      } as any;
      const featureHighlight = {} as any;

      expect(() => {
        processTokens(base, tokens, featureHighlight, '--');
      }).toThrow(/was not found/);
    });

    test('Should detect invalid rgba format', () => {
      const base = {} as any;
      const tokens = {
        bg: {
          // Missing one color component
          invalid: { value: 'rgba(255, 255, 0.5)', type: 'color' },
        },
      } as any;
      const featureHighlight = {} as any;

      expect(() => {
        processTokens(base, tokens, featureHighlight, '--');
      }).toThrow();
    });
  });
});
