import React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import * as sharedTests from '@semcore/testing-utils/shared-tests';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';
import { cleanup, render } from '@semcore/testing-utils/testing-library';

const { shouldSupportClassName, shouldSupportRef } = sharedTests;
import Dot from '../src';
import Button from '@semcore/button';

describe('Dot', () => {
  beforeEach(cleanup);

  shouldSupportClassName(Dot, undefined, { 'aria-label': 'test dot' });
  shouldSupportRef(Dot, undefined, { 'aria-label': 'test dot' });

  test.concurrent('Renders correctly', async ({ task }) => {
    const component = (
      <button>
        Button
        <Dot aria-label="Our brand new button!" />
      </button>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Renders correctly with up', async ({ task }) => {
    const component = (
      <button>
        Button
        <Dot up aria-label="Our brand new button!" />
      </button>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support value', async ({ task }) => {
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
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support size', async ({ task }) => {
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

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support hidden', async ({ task }) => {
    const { queryByTestId } = render(
      <Button>
        Button
        <Dot hidden size="m" data-testid="dot" aria-label="Our brand new button!" />
      </Button>,
    );
    expect(queryByTestId('dot')).toBeFalsy();
  });
});
