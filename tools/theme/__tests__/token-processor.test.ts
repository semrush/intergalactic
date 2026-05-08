import { expect, test, describe } from '@semcore/testing-utils/vitest';

import { theme } from '../src/theme';
import { processTokens, type Token } from '../src/utils';

const result = processTokens(theme, 'intergalactic');
const allTokens: Token[] = [...result.baseTokens, ...result.semanticTokens, ...result.highlightsTokens];
const byName: Record<string, Token> = Object.fromEntries(allTokens.map((t) => [t.name, t]));

describe('Token Processor - processTokens', () => {
  describe('Basic token processing', () => {
    test('Should process simple color tokens from base', () => {
      expect(byName['--gray-white'].value).toBe('#ffffff');
      expect(byName['--gray-50'].value).toBe('oklch(0.97 0.001 180)');
    });

    test('Should process tokens with references', () => {
      expect(byName['--intergalactic-bg-primary-neutral'].value).toBe('oklch(1 0 0)');
    });

    test('Should process nested token references', () => {
      expect(byName['--intergalactic-bg-primary-feature-highlight'].value).toBe('#ffffff');
    });

    test('Should process nested token references in the middle of the value string', () => {
      // processor pre-computes literal calc(4px * 5) → 20px, accept either form
      expect(byName['--intergalactic-form-control-s'].value).toMatch(/^(\d+px|calc\([^{}]+\))$/);
    });
  });

  describe('Descriptions and metadata', () => {
    test('Should preserve token descriptions', () => {
      expect(byName['--gray-50'].description).toBe('Only suitable for backgrounds. Can be completely invisible to users with low-contrast monitor or poor vision.');
    });
  });

  describe('Feature highlight tokens', () => {
    test('Should process feature highlight tokens separately', () => {
      expect(result.highlightsTokens.length).toBeGreaterThan(0);
      expect(byName['--intergalactic-bg-primary-feature-highlight'].value).toBe('#ffffff');
      expect(result.highlightsTokens[0].name).toBe('--intergalactic-bg-primary-feature-highlight');
    });
  });

  describe('Real tokens validation', () => {
    test('Should process light theme tokens without errors', () => {
      expect(() => {
        const fresh = processTokens(theme, 'intergalactic');
        const flat = [...fresh.baseTokens, ...fresh.semanticTokens, ...fresh.highlightsTokens];

        expect(flat.length).toBeGreaterThan(0);

        for (const token of flat) {
          expect(token.value, `Token ${token.name} has unresolved reference`).not.toMatch(/\{[^}]+\}/);
          expect(token.value, `Token ${token.name} has empty value`).toBeTruthy();
        }
      }).not.toThrow();
    });
  });
});
