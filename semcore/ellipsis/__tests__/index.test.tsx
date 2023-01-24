import React from 'react';
import { snapshot, testing } from '@semcore/jest-preset-ui';
import Ellipsis from '../src';
import { Box } from '@semcore/flex-box';

const { render, axe, cleanup, fireEvent, act } = testing;

describe('Ellipsis', () => {
  afterEach(cleanup);

  test('Renders correctly', async () => {
    const component = (
      <Box w={200}>
        <Ellipsis>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores atque autem commodi,
          doloribus ex harum inventore modi praesentium quam ratione reprehenderit rerum tempore
          voluptas. Aliquam eos expedita illo quasi unde!
        </Ellipsis>
      </Box>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Renders correctly with multiline', async () => {
    const component = (
      <Box w={200}>
        <Ellipsis maxLine={3}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores atque autem commodi,
          doloribus ex harum inventore modi praesentium quam ratione reprehenderit rerum tempore
          voluptas. Aliquam eos expedita illo quasi unde!
        </Ellipsis>
      </Box>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Renders correctly with trim in the middle', async () => {
    const initialCreateElement = document.createElement;

    global.document.createElement = (tag, ...other) => {
      if (tag === 'temporary-block') {
        const temporaryBlock = initialCreateElement.call(document, tag, ...other);
        temporaryBlock.getBoundingClientRect = () => ({
          width: 10,
          height: 10,
          top: 0,
          left: 0,
          right: 10,
          bottom: 10,
        });
        return temporaryBlock;
      }
      return initialCreateElement.call(document, tag, ...other);
    };

    class ResizeObserver {
      private cb: any;
      constructor(cb) {
        this.cb = cb;
      }
      observe() {
        this.cb([{ contentRect: { width: 200 } }]);
      }
      unobserve() {}
      disconnect() {}
    }
    global.ResizeObserver = ResizeObserver;

    const component = (
      <Box w={200}>
        <Ellipsis trim="middle">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores atque autem commodi,
          doloribus ex harum inventore modi praesentium quam ratione reprehenderit rerum tempore
          voluptas. Aliquam eos expedita illo quasi unde!
        </Ellipsis>
      </Box>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Show tooltip', async () => {
    jest.useFakeTimers();

    function fakeBoundingClientRect(node) {
      if (!node) return;
      node.getBoundingClientRect = () => {
        if (node.style.overflow === 'initial') {
          return {
            width: 400
          }
        }
        return {
          width: 200
        }
      }
    }

    const { getByTestId, baseElement } = render(
      <Box w={200}>
        <Ellipsis data-testid="text" ref={fakeBoundingClientRect}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores atque autem commodi,
          doloribus ex harum inventore modi praesentium quam ratione reprehenderit rerum tempore
          voluptas. Aliquam eos expedita illo quasi unde!
        </Ellipsis>
      </Box>
    );

    const text = getByTestId('text')
    fireEvent.mouseEnter(text);
    act(() => jest.runAllTimers());

    expect(baseElement.querySelector('[data-ui-name="Tooltip.Popper"]')).not.toBe(null)

    jest.useRealTimers();
  });

  test('Dont show tooltip', async () => {
    jest.useFakeTimers();

    function fakeBoundingClientRect(node) {
      if (!node) return;
      node.getBoundingClientRect = () => {
        if (node.style.overflow === 'initial') {
          return {
            width: 100
          }
        }
        return {
          width: 200
        }
      }
    }

    const { getByTestId, baseElement } = render(
      <Box w={200}>
        <Ellipsis data-testid="text" ref={fakeBoundingClientRect}>
          Lorem ipsum dolor sit amet
        </Ellipsis>
      </Box>
    );

    const text = getByTestId('text')
    fireEvent.mouseEnter(text);
    act(() => jest.runAllTimers());

    expect(baseElement.querySelector('[data-ui-name="Tooltip.Popper"]')).toBe(null)

    jest.useRealTimers();
  });

  test('a11y', async () => {
    const { container } = render(
      <Ellipsis>Lorem ipsum dolor sit amet, consectetur adipisicing elit. </Ellipsis>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
