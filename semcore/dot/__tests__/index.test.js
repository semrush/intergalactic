import React from 'react';
import { cleanup } from 'jest-preset-ui/testing';
import snapshot from 'jest-preset-ui/snapshot';
import { shouldSupportClassName, shouldSupportRef } from 'jest-preset-ui/shared';
import Dot from '../src';

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
});
