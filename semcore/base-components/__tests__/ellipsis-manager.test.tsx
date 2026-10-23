import { afterEach, beforeEach, describe, expect, test, vi } from '@semcore/testing-utils/vitest';

import { Ellipsis } from '../src/components/ellipsis';

beforeEach(() => {
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

describe('EllipsisManager', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('Verify ellipsis instance registration and cleanup', () => {
    const element = document.createElement('div');
    element.textContent = 'Test text';
    document.body.appendChild(element);

    const ellipsis = new Ellipsis(element, {});

    expect(() => ellipsis.cleanUp()).not.toThrow();
  });

  test('Verify multiple ellipsis instances handling', () => {
    const elements = Array.from({ length: 3 }, (_, i) => {
      const el = document.createElement('div');
      el.textContent = `Text ${i + 1}`;
      document.body.appendChild(el);
      return el;
    });

    const instances = elements.map((el) => new Ellipsis(el, {}));

    expect(() => {
      instances.forEach((e) => e.cleanUp());
    }).not.toThrow();
  });

  test('Verify ellipsis instances grouping by shared container', () => {
    const container = document.createElement('div');
    container.style.width = '300px';

    const elements = Array.from({ length: 3 }, (_, i) => {
      const el = document.createElement('div');
      el.textContent = `Text ${i + 1}`;
      container.appendChild(el);
      return el;
    });

    document.body.appendChild(container);

    const instances = elements.map((el) => new Ellipsis(el, { containerElement: container }));

    // All should share same container
    instances.forEach((instance) => {
      expect(instance.containerElement).toBe(container);
    });

    instances.forEach((e) => e.cleanUp());
  });

  test('Verify container mapping cleanup when all instances removed', () => {
    const container = document.createElement('div');
    container.style.width = '300px';

    const el1 = document.createElement('div');
    const el2 = document.createElement('div');
    el1.textContent = 'Text 1';
    el2.textContent = 'Text 2';
    container.appendChild(el1);
    container.appendChild(el2);
    document.body.appendChild(container);

    const ellipsis1 = new Ellipsis(el1, { containerElement: container });
    const ellipsis2 = new Ellipsis(el2, { containerElement: container });

    ellipsis1.cleanUp();
    ellipsis2.cleanUp();

    // Should be able to create new instance without errors
    const el3 = document.createElement('div');
    el3.textContent = 'Text 3';
    container.appendChild(el3);

    expect(() => {
      const ellipsis3 = new Ellipsis(el3, { containerElement: container });
      ellipsis3.cleanUp();
    }).not.toThrow();
  });

  test('Verify ResizeObserver handling for container', async () => {
    const container = document.createElement('div');
    container.style.width = '300px';

    const element = document.createElement('div');
    element.textContent = 'Long text that should be truncated';
    container.appendChild(element);
    document.body.appendChild(container);

    const ellipsis = new Ellipsis(element, { containerElement: container });

    await new Promise((resolve) => setTimeout(resolve, 200));

    container.style.width = '500px';

    await new Promise((resolve) => setTimeout(resolve, 200));

    ellipsis.cleanUp();
  });

  test('Verify IntersectionObserver handling for viewport detection', async () => {
    const element = document.createElement('div');
    element.textContent = 'Test text';
    element.style.position = 'absolute';
    element.style.top = '10000px';
    document.body.appendChild(element);

    const ellipsis = new Ellipsis(element, {});

    await new Promise((resolve) => setTimeout(resolve, 200));

    ellipsis.cleanUp();
  });

  test('Verify MutationObserver handling when observeChildrenMutations enabled', async () => {
    const element = document.createElement('div');
    const textNode = document.createTextNode('Initial text');
    element.appendChild(textNode);
    element.style.width = '100px';
    document.body.appendChild(element);

    const ellipsis = new Ellipsis(element, {
      observeChildrenMutations: true,
      cropPosition: 'middle',
    });

    await new Promise((resolve) => setTimeout(resolve, 200));

    textNode.textContent = 'Updated text content';

    await new Promise((resolve) => setTimeout(resolve, 200));

    expect(ellipsis.textContent).toBe('Updated text content');
    ellipsis.cleanUp();
  });

  test('Verify full text preservation for copy functionality', async () => {
    const element = document.createElement('div');
    element.textContent = 'Full text content that is truncated';
    element.style.width = '50px';
    document.body.appendChild(element);

    const ellipsis = new Ellipsis(element, { cropPosition: 'middle' });

    await new Promise((resolve) => setTimeout(resolve, 200));

    // Verify full text is preserved in ellipsis instance
    expect(ellipsis.textContent).toBe('Full text content that is truncated');

    ellipsis.cleanUp();
  });

  test('Verify middle crop handling with shared container', async () => {
    const container = document.createElement('div');
    container.style.width = '200px';

    const elements = Array.from({ length: 2 }, (_, i) => {
      const el = document.createElement('div');
      el.textContent = `Long text ${i + 1} that needs truncation`;
      container.appendChild(el);
      return el;
    });

    document.body.appendChild(container);

    const instances = elements.map((el) =>
      new Ellipsis(el, {
        cropPosition: 'middle',
        containerElement: container,
      }),
    );

    await new Promise((resolve) => setTimeout(resolve, 300));

    //  instances should  created successfully
    expect(instances).toHaveLength(2);
    instances.forEach((instance) => {
      expect(instance.cropPosition).toBe('middle');
    });

    instances.forEach((e) => e.cleanUp());
  });

  test('Verify batched updates for shared container on resize', async () => {
    const container = document.createElement('div');
    container.style.width = '300px';

    const elements = Array.from({ length: 5 }, () => {
      const el = document.createElement('div');
      el.textContent = 'Text that needs ellipsis';
      container.appendChild(el);
      return el;
    });

    document.body.appendChild(container);

    const instances = elements.map((el) => new Ellipsis(el, { containerElement: container }));

    await new Promise((resolve) => setTimeout(resolve, 200));

    container.style.width = '400px';

    await new Promise((resolve) => setTimeout(resolve, 300));

    expect(() => {
      instances.forEach((e) => e.cleanUp());
    }).not.toThrow();
  });

  test('Verify MutationObserver cleanup', () => {
    const element = document.createElement('div');
    element.textContent = 'Test text';
    document.body.appendChild(element);

    const ellipsis = new Ellipsis(element, {
      observeChildrenMutations: true,
      cropPosition: 'middle',
    });

    expect(() => ellipsis.cleanUp()).not.toThrow();

    element.textContent = 'Changed text';
  });

  test('Verify batched updates for shared container on resize', async () => {
    const container = document.createElement('div');
    container.style.width = '300px';

    const elements = Array.from({ length: 5 }, () => {
      const el = document.createElement('div');
      el.textContent = 'Text that needs ellipsis';
      container.appendChild(el);
      return el;
    });

    document.body.appendChild(container);

    const instances = elements.map((el) => new Ellipsis(el, { containerElement: container }));

    await new Promise((resolve) => setTimeout(resolve, 200));

    container.style.width = '400px';

    await new Promise((resolve) => setTimeout(resolve, 300));

    expect(() => {
      instances.forEach((e) => e.cleanUp());
    }).not.toThrow();
  });
});
