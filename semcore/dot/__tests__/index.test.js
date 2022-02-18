import React from 'react';
import { testing } from '@semcore/jest-preset-ui';
const { cleanup, render } = testing;
import { snapshot } from '@semcore/jest-preset-ui';
import { shared as testsShared } from '@semcore/jest-preset-ui';
const { shouldSupportClassName, shouldSupportRef } = testsShared;
import Dot from '../src';
import Button from '@semcore/button';

describe('Dot', () => {
  afterEach(cleanup);

  shouldSupportClassName(Dot);
  shouldSupportRef(Dot);

  test('Should supported size', async () => {
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
          Button <Dot>12</Dot>
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
        <button>
          Button <Dot up>12</Dot>
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
