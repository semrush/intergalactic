import React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import Ellipsis from '../src';
import { Box } from '@semcore/flex-box';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import { render, cleanup, fireEvent, act } from '@semcore/testing-utils/testing-library';
import { axe } from '@semcore/testing-utils/axe';
// @ts-ignore
import Link from '@semcore/link';

import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';

describe('ellipsis Dependency imports', () => {
  runDependencyCheckTests('ellipsis');
});

function fakeTemporaryBlock(rect: any) {
  const originalCreateElement = global.document.createElement;

  global.document.createElement = (tag: any, ...other: any[]) => {
    if (tag === 'temporary-block') {
      const temporaryBlock = originalCreateElement.call(document, tag, ...other);
      fakeBoundingClientRect(rect)(temporaryBlock);
      return temporaryBlock;
    }
    return originalCreateElement.call(document, tag, ...other);
  };

  return () => {
    global.document.createElement = originalCreateElement;
  };
}

function fakeBoundingClientRect(rect: any) {
  return (node: any) => {
    if (!node) return;
    node.getBoundingClientRect = () => ({
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      ...rect,
    });
  };
}

const mockResizeObserver = (rect: { width?: number; height?: number }) => {
  const originalResizeObserver = global.ResizeObserver;
  const unFakeTemporaryBlock = fakeTemporaryBlock({ width: 10 });

  class ResizeObserver {
    private cb: any;

    constructor(cb: any) {
      this.cb = cb;
    }

    observe() {
      this.cb([{ contentRect: rect }]);
    }
    unobserve() {}
    disconnect() {}
  }

  global.ResizeObserver = ResizeObserver;

  return () => {
    unFakeTemporaryBlock();
    global.ResizeObserver = originalResizeObserver;
  };
};

describe('Ellipsis', () => {
  beforeEach(cleanup);

  test('Renders correctly', async ({ task }) => {
    const component = (
      <Box w={200}>
        <Ellipsis>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores atque autem commodi,
          doloribus ex harum inventore modi praesentium quam ratione reprehenderit rerum tempore
          voluptas. Aliquam eos expedita illo quasi unde!
        </Ellipsis>
      </Box>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test('Renders correctly with multiline', async ({ task }) => {
    const component = (
      <Box w={200}>
        <Ellipsis maxLine={3}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores atque autem commodi,
          doloribus ex harum inventore modi praesentium quam ratione reprehenderit rerum tempore
          voluptas. Aliquam eos expedita illo quasi unde!
        </Ellipsis>
      </Box>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test('Renders correctly with multiline and very long words', async ({ task }) => {
    const component = (
      <Box w={200}>
        <Ellipsis maxLine={3}>
          Lorem ipsum dolor sit,
          veryLongWordVeryLongWordVeryLongWordVeryLongWordVeryLongWordVeryLongWordVeryLongWordVeryLongWord
          consectetur adipisicing elit. Asperiores atque autem commodi, doloribus ex harum inventore
          modi praesentium quam ratione reprehenderit rerum tempore voluptas. Aliquam eos expedita
          illo quasi unde!
        </Ellipsis>
      </Box>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test('Renders correctly with trim in the middle', async ({ task }) => {
    const unfakeResizeObserver = mockResizeObserver({ width: 200 });
    const component = (
      <Box w={200}>
        <Ellipsis trim='middle'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores atque autem commodi,
          doloribus ex harum inventore modi praesentium quam ratione reprehenderit rerum tempore
          voluptas. Aliquam eos expedita illo quasi unde!
        </Ellipsis>
      </Box>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
    unfakeResizeObserver();
  });

  describe('Renders correctly with link', () => {
    test('Link tag={Ellipsis} at least displayed', async ({ task }) => {
      const unfakeResizeObserver = mockResizeObserver({ width: 200 });
      const component = (
        <Box w={200}>
          <Link tag={Ellipsis} trim='middle' href='https://developer.semrush.com/intergalactic/'>
            https://developer.semrush.com/intergalactic/
          </Link>
        </Box>
      );
      await expect(await snapshot(component)).toMatchImageSnapshot(task);
      unfakeResizeObserver();
    });
    test('Ellipsis tag={Link.Text}', async ({ task }) => {
      const unfakeResizeObserver = mockResizeObserver({ width: 200 });
      const component = (
        <Box w={200}>
          <Link inline href='https://developer.semrush.com/intergalactic/'>
            <Ellipsis tag={Link.Text} trim='middle'>
              https://developer.semrush.com/intergalactic/
            </Ellipsis>
          </Link>
        </Box>
      );
      await expect(await snapshot(component)).toMatchImageSnapshot(task);
      unfakeResizeObserver();
    });
    test('Link.Text tag={Ellipsis}', async ({ task }) => {
      const unfakeResizeObserver = mockResizeObserver({ width: 200 });
      const component = (
        <Box w={200}>
          <Link inline href='https://developer.semrush.com/intergalactic/'>
            <Link.Text tag={Ellipsis} trim='middle'>
              https://developer.semrush.com/intergalactic/
            </Link.Text>
          </Link>
        </Box>
      );
      await expect(await snapshot(component)).toMatchImageSnapshot(task);
      unfakeResizeObserver();
    });
  });

  test.skip('Show tooltip', async () => {
    vi.useFakeTimers();

    const unFake = fakeTemporaryBlock({ width: 400 });

    const { getByTestId, baseElement } = render(
      <Box w={200}>
        <Ellipsis data-testid='text' ref={fakeBoundingClientRect({ width: 200 })}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores atque autem commodi,
          doloribus ex harum inventore modi praesentium quam ratione reprehenderit rerum tempore
          voluptas. Aliquam eos expedita illo quasi unde!
        </Ellipsis>
      </Box>,
    );

    const text = getByTestId('text');
    act(() => {
      fireEvent.mouseEnter(text);
    });
    act(() => {
      vi.runAllTimers();
    });

    vi.useRealTimers();

    expect(baseElement.querySelector('[data-ui-name="Tooltip.Popper"]')).toBeFalsy();
    unFake();
  });

  test('Dont show tooltip', async () => {
    vi.useFakeTimers();

    const unFake = fakeTemporaryBlock({ width: 100 });

    const { getByTestId, baseElement } = render(
      <Box w={200}>
        <Ellipsis data-testid='text' ref={fakeBoundingClientRect({ width: 100 })}>
          Lorem ipsum dolor sit amet
        </Ellipsis>
      </Box>,
    );

    const text = getByTestId('text');
    fireEvent.mouseEnter(text);
    act(() => {
      vi.runAllTimers();
    });

    expect(baseElement.querySelector('[data-ui-name="Tooltip.Popper"]')).toBe(null);

    vi.useRealTimers();
    unFake();
  });

  test('a11y', async () => {
    const { container, unmount } = render(
      <Ellipsis>Lorem ipsum dolor sit amet, consectetur adipisicing elit. </Ellipsis>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    unmount();
  });
});
