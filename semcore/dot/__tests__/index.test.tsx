import React from 'react';
import { testing, snapshot, shared as testsShared } from '@semcore/jest-preset-ui';
import { assert, expect, test, describe, afterEach, vi } from 'vitest';
const { cleanup, render } = testing;

const { shouldSupportClassName, shouldSupportRef } = testsShared;
import Dot from '../src';
import Button from '@semcore/button';

describe('Dot', () => {
  afterEach(cleanup);

  shouldSupportClassName(Dot, undefined, { 'aria-label': 'test dot' });
  shouldSupportRef(Dot, undefined, { 'aria-label': 'test dot' });

  test('Renders correctly', async () => {
    const component = (
      <button>
        Button
        <Dot aria-label="Our brand new button!" />
      </button>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Renders correctly with up', async () => {
    const component = (
      <button>
        Button
        <Dot up aria-label="Our brand new button!" />
      </button>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support value', async () => {
    const component = (
      <>
        <Button>
          Button
          <Dot up aria-label="Our brand new button!">
            12
          </Dot>
        </Button>
        <Button>
          Button
          <Dot aria-label="Our brand new button!">12</Dot>
        </Button>
      </>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support size', async () => {
    const component = (
      <snapshot.ProxyProps style={{ margin: '3px', position: 'relative' }}>
        <button>
          Button <Dot size="xl" aria-label="Our brand new button!" />
        </button>
        <button>
          Button <Dot size="l" aria-label="Our brand new button!" />
        </button>
        <button>
          Button <Dot size="m" aria-label="Our brand new button!" />
        </button>
        <button>
          Button <Dot up size="xl" aria-label="Our brand new button!" />
        </button>
        <button>
          Button <Dot up size="l" aria-label="Our brand new button!" />
        </button>
        <button>
          Button <Dot up size="m" aria-label="Our brand new button!" />
        </button>
      </snapshot.ProxyProps>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support hidden', async () => {
    const { queryByTestId } = render(
      <Button>
        Button
        <Dot hidden size="m" data-testid="dot" aria-label="Our brand new button!" />
      </Button>,
    );
    expect(queryByTestId('dot')).toBeFalsy();
  });
});
