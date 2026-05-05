import { expect, test, describe } from '@semcore/testing-utils/vitest';

import { theme } from '../src/theme';
import { processTokens } from '../src/utils';

const result = processTokens(theme, 'intergalactic');

describe('Token Processor - processTokens', () => {
  describe('Basic token processing', () => {
    test('Should process simple color tokens from base', () => {
      expect(result.values['--gray-white']).toBe('#ffffff');
      expect(result.values['--gray-50']).toBe('oklch(0.97 0.03 330)');
    });

    test('Should process tokens with references', () => {
      expect(result.values['--intergalactic-bg-primary-neutral']).toBe('oklch(1 0 0)');
    });

    test('Should process nested token references', () => {
      expect(result.values['--intergalactic-bg-primary-feature-highlight']).toBe('#ffffff');
    });

    test('Should process nested token references in the middle of the value string', () => {
      expect(result.values['--intergalactic-form-control-s']).toBe('calc(4px * 5)');
    });
  });

  describe('Descriptions and metadata', () => {
    test('Should preserve token descriptions', () => {
      expect(result.descriptions['--gray-50']).toBe(
        'Only suitable for backgrounds. Can be completely invisible to users with low-contrast monitor or poor vision.',
      );
    });
  });

  describe('Feature highlight tokens', () => {
    test('Should process feature highlight tokens separately', () => {
      expect(result.values['--intergalactic-bg-primary-feature-highlight']).toBe('#ffffff');
      expect(result.highlightsTokens.length).toBeGreaterThan(0);
      expect(result.highlightsTokens[0].name).toBe('--intergalactic-bg-primary-feature-highlight');
    });
  });

  // describe('Token categories', () => {
  //   test('Should categorize base tokens', () => {
  //     expect(result.basicTokens.has('gray-white')).toBe(true);
  //   });
  //
  //   test('Should distinguish between base, semantic, and highlight tokens', () => {
  //     expect(result.basicTokens.has('gray-white')).toBe(true);
  //     expect(result.basicTokens.has('bg-primary')).toBe(false);
  //     // Highlight tokens are stored in highlightsTokens array
  //     expect(result.highlightsTokens.length).toBeGreaterThan(0);
  //     expect(result.highlightsTokens[0].name).toBe('--intergalactic-highlight-feature');
  //   });
  // });

  describe('Real tokens validation', () => {
    // validate our tokens are ok
    test('Should process light theme tokens without errors', async () => {
      // no errors- validates all token references are correct
      expect(() => {
        const result = processTokens(theme, 'intergalactic');

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

    // test('Should process dark theme tokens without errors', async () => {
    //   const fs = await import('node:fs/promises');
    //   const { resolve } = await import('node:path');
    //
    //   const darkThemeContent = await fs.readFile(
    //     resolve(__dirname, '../src/dark.json'),
    //     'utf-8',
    //   );
    //   const { base, tokens, featureHighlight } = JSON.parse(darkThemeContent);
    //
    //   // no errors - validates all token references are correct
    //   expect(() => {
    //     const result = processTokens(base, tokens, featureHighlight, 'intergalactic');
    //
    //     // base sanity checks
    //     expect(Object.keys(result.values).length).toBeGreaterThan(0);
    //     expect(result.processedTokens.length).toBeGreaterThan(0);
    //
    //     // all values are resolved (no unresolved references like {xxx.xxx})
    //     for (const [tokenName, value] of Object.entries(result.values)) {
    //       expect(value).not.toMatch(/\{[^}]+\}/);
    //       expect(value).toBeTruthy();
    //     }
    //   }).not.toThrow();
    // });
  });
});
