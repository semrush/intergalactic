import { afterEach, beforeEach, describe, expect, test, vi } from '@semcore/testing-utils/vitest';

import { Ellipsis } from '../src/components/ellipsis/Ellipsis';

// Mock canvas context for JSDOM
const mockContext = {
  clearRect: vi.fn(),
  measureText: vi.fn((text: string) => ({ width: text.length * 7 })),
  font: '',
};

beforeEach(() => {
  HTMLCanvasElement.prototype.getContext = vi.fn(() => mockContext as any);
  // Mock getBoundingClientRect for JSDOM
  Element.prototype.getBoundingClientRect = vi.fn(() => ({
    width: 100,
    height: 20,
    top: 0,
    left: 0,
    bottom: 20,
    right: 100,
    x: 0,
    y: 0,
    toJSON: () => {},
  }));
});

describe('Ellipsis class', () => {
  let element: HTMLDivElement;

  beforeEach(() => {
    element = document.createElement('div');
    element.textContent = 'Long text that should be truncated when container is narrow';
    element.style.width = '100px';
    element.style.fontSize = '14px';
    element.style.fontFamily = 'Arial';
    document.body.appendChild(element);
  });

  afterEach(() => {
    if (element.parentNode) {
      document.body.removeChild(element);
    }
  });

  test('Should initialize with default settings', () => {
    const ellipsis = new Ellipsis(element, {});

    expect(ellipsis.element).toBe(element);
    expect(ellipsis.textContent).toBe('Long text that should be truncated when container is narrow');
    expect(ellipsis.cropPosition).toBe('end');
    expect(ellipsis.maxLine).toBe(1);

    ellipsis.cleanUp();
  });

  test('Should initialize with cropPosition middle', () => {
    const ellipsis = new Ellipsis(element, { cropPosition: 'middle' });

    expect(ellipsis.cropPosition).toBe('middle');

    ellipsis.cleanUp();
  });

  test('Should initialize with custom maxLine', () => {
    const ellipsis = new Ellipsis(element, { maxLine: 3 });

    expect(ellipsis.maxLine).toBe(3);

    ellipsis.cleanUp();
  });

  test('Should calculate truncate size', () => {
    const ellipsis = new Ellipsis(element, { cropPosition: 'middle' });

    const [from, to] = ellipsis.getTruncateSize();

    expect(from).toBeGreaterThanOrEqual(0);
    expect(to).toBeGreaterThanOrEqual(0);

    ellipsis.cleanUp();
  });

  test('Should handle custom truncate options', () => {
    const ellipsis = new Ellipsis(element, {});

    const [from, to] = ellipsis.getTruncateSize({
      text: 'Custom text',
      containerWidth: 50,
    });

    expect(from).toBeGreaterThanOrEqual(0);
    expect(to).toBeGreaterThanOrEqual(0);

    ellipsis.cleanUp();
  });

  test('Should set isEllipsized property', () => {
    const ellipsis = new Ellipsis(element, {});

    ellipsis.isEllipsized = true;

    expect(ellipsis.isEllipsized).toBe(true);

    ellipsis.cleanUp();
  });

  test('Should cleanup properly', async () => {
    const ellipsis = new Ellipsis(element, { cropPosition: 'middle' });
    const originalText = ellipsis.textContent;

    await new Promise((resolve) => setTimeout(resolve, 50));

    ellipsis.cleanUp();

    expect(element.textContent).toBe(originalText);
    expect(ellipsis.isEllipsized).toBe(false);
  });

  test('Should handle lastRequiredSymbols', async () => {
    element.textContent = 'very-long-filename.txt';
    element.style.width = '100px';

    const ellipsis = new Ellipsis(element, {
      cropPosition: 'middle',
      lastRequiredSymbols: 4,
    });

    await new Promise((resolve) => setTimeout(resolve, 100));

    ellipsis.handleChanges();
    const text = element.textContent!;

    expect(text.includes('.txt')).toBe(true);

    ellipsis.cleanUp();
  });

  test('Should handle containerElement option', () => {
    const container = document.createElement('div');
    container.style.width = '200px';
    document.body.appendChild(container);

    const ellipsis = new Ellipsis(element, { containerElement: container });

    expect(ellipsis.containerElement).toBe(container);

    ellipsis.cleanUp();
    document.body.removeChild(container);
  });

  test('Should handle empty text', () => {
    element.textContent = '';

    const ellipsis = new Ellipsis(element, {});

    expect(ellipsis.textContent).toBe('');

    ellipsis.cleanUp();
  });

  test('Should handle special characters', () => {
    element.textContent = 'Text with émojis 🎉 and spëcial çhars';

    const ellipsis = new Ellipsis(element, {});

    expect(ellipsis.textContent).toBe('Text with émojis 🎉 and spëcial çhars');

    ellipsis.cleanUp();
  });

  test('Should handle observeChildrenMutations option', () => {
    const ellipsis = new Ellipsis(element, {
      observeChildrenMutations: true,
      cropPosition: 'middle',
    });

    expect(ellipsis.observeChildrenMutations).toBe(true);

    ellipsis.cleanUp();
  });

  test('Should use recalculateContainerWidth callback', () => {
    const container = document.createElement('div');
    container.style.width = '200px';
    container.style.padding = '10px';
    document.body.appendChild(container);

    // Remove element from body before appending to container
    document.body.removeChild(element);
    container.appendChild(element);

    const recalculate = (width: number) => {
      return width * 0.8;
    };

    const ellipsis = new Ellipsis(element, {
      containerElement: container,
      recalculateContainerWidth: recalculate,
    });

    expect(ellipsis.containerElement).toBe(container);

    ellipsis.cleanUp();
    container.removeChild(element);
    document.body.removeChild(container);
    document.body.appendChild(element);
  });

  test('Should handle text with only whitespace', () => {
    element.textContent = '     ';
    const ellipsis = new Ellipsis(element, {});

    expect(ellipsis.textContent).toBe('     ');

    ellipsis.cleanUp();
  });

  test('Should handle very long single word without spaces', () => {
    element.textContent = 'a'.repeat(1000);
    element.style.width = '100px';

    const ellipsis = new Ellipsis(element, { cropPosition: 'middle' });

    expect(ellipsis.textContent.length).toBe(1000);

    ellipsis.cleanUp();
  });

  test('Should handle zero-width container', () => {
    element.textContent = 'Text';

    const ellipsis = new Ellipsis(element, {});
    const [from, to] = ellipsis.getTruncateSize({ text: 'Text', containerWidth: 0 });

    expect(from).toBe(0);
    expect(to).toBe(0);

    ellipsis.cleanUp();
  });

  test('Should handle null textContent', () => {
    const emptyElement = document.createElement('div');
    document.body.appendChild(emptyElement);

    const ellipsis = new Ellipsis(emptyElement, {});

    expect(ellipsis.textContent).toBe('');

    ellipsis.cleanUp();
    document.body.removeChild(emptyElement);
  });

  test('Should emit isEllipsized event when setter is called', () => {
    const ellipsis = new Ellipsis(element, {});
    const handler = vi.fn();

    ellipsis.on('isEllipsized', handler);
    ellipsis.isEllipsized = true;

    expect(handler).toHaveBeenCalledWith(true);

    ellipsis.isEllipsized = false;
    expect(handler).toHaveBeenCalledWith(false);

    ellipsis.cleanUp();
  });

  test('Should setRequiredIndexes and trigger handleChanges', () => {
    element.textContent = 'path/to/some/very-long-filename.txt';

    const ellipsis = new Ellipsis(element, { cropPosition: 'middle' });
    const spy = vi.spyOn(ellipsis, 'handleChanges');

    ellipsis.setRequiredIndexes([20, 35]);

    expect(spy).toHaveBeenCalled();

    ellipsis.cleanUp();
  });

  test('Should setRequiredIndexes with styles', () => {
    element.textContent = 'path/to/some/very-long-filename.txt';

    const ellipsis = new Ellipsis(element, { cropPosition: 'middle' });

    expect(() => {
      ellipsis.setRequiredIndexes([20, 35], { color: 'red', fontWeight: 'bold' });
    }).not.toThrow();

    ellipsis.cleanUp();
  });

  test('Should setRequiredIndexes with CSS class name', () => {
    element.textContent = 'path/to/some/very-long-filename.txt';

    const ellipsis = new Ellipsis(element, { cropPosition: 'middle' });

    expect(() => {
      ellipsis.setRequiredIndexes([20, 35], 'highlight-class');
    }).not.toThrow();

    ellipsis.cleanUp();
  });

  test('Should render hidden full text span for copy functionality after handleChanges', () => {
    // Make text overflow: text.length * 7 > containerWidth (100)
    element.textContent = 'Long overflowing text content here'; // 35 chars * 7 = 245 > 100

    const ellipsis = new Ellipsis(element, { cropPosition: 'middle' });
    ellipsis.handleChanges();

    if (ellipsis.isEllipsized) {
      // Should have cropped span (aria-hidden) + hidden full text span
      const spans = element.querySelectorAll('span');
      expect(spans.length).toBeGreaterThanOrEqual(2);

      const hiddenSpan = Array.from(spans).find(
        (s) => s.style.position === 'absolute' && s.style.overflow === 'hidden',
      );
      expect(hiddenSpan).toBeDefined();
      expect(hiddenSpan?.textContent).toBe('Long overflowing text content here');
    }

    ellipsis.cleanUp();
  });
});
