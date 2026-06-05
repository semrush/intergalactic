import { vi } from './vitest';

// JSDOM doesn't implement canvas text measuring.
// Some components create a text measurer on import, so setup imports this helper first
// to avoid noisy "getContext is not implemented" errors.
export const canvasContextMock = {
  clearRect: vi.fn(),
  measureText: vi.fn((text: string) => ({ width: text.length * 7 })),
  font: '',
};

Object.defineProperty(window.HTMLCanvasElement.prototype, 'getContext', {
  configurable: true,
  writable: true,
  value: vi.fn((contextId: string) => {
    if (contextId === '2d') return canvasContextMock;
    return null;
  }),
});
