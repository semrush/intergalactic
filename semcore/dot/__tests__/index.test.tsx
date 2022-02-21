import React from 'react';
import { cleanup, render } from '@semcore/jest-preset-ui/testing';
import snapshot from '@semcore/jest-preset-ui/snapshot';
import { shouldSupportClassName, shouldSupportRef } from '@semcore/jest-preset-ui/shared';
import Dot from '../src';
import Button from '@semcore/button';

describe('Dot', () => {
  afterEach(cleanup);

  shouldSupportClassName(Dot);
  shouldSupportRef(Dot);

  test('Renders correctly', async () => {
    const component = (
      <button>
        Button
        <Dot />
      </button>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Renders correctly with up', async () => {
    const component = (
      <button>
        Button
        <Dot up />
      </button>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support value', async () => {
    const component = (
      <>
        <Button>
          Button
          <Dot up>12</Dot>
        </Button>
        <Button>
          Button
          <Dot>12</Dot>
        </Button>
      </>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support size', async () => {
    const component = (
      <snapshot.ProxyProps style={{ margin: '3px', position: 'relative' }}>
        <button>
          Button <Dot size="xl" />
        </button>
        <button>
          Button <Dot size="l" />
        </button>
        <button>
          Button <Dot size="m" />
        </button>
        <button>
          Button <Dot up size="xl" />
        </button>
        <button>
          Button <Dot up size="l" />
        </button>
        <button>
          Button <Dot up size="m" />
        </button>
      </snapshot.ProxyProps>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support hidden', async () => {
    const { queryByTestId } = render(
      <Button>
        Button
        <Dot hidden size="m" data-testid="dot" />
      </Button>,
    );
    expect(queryByTestId('dot')).toBeFalsy();
  });
});
