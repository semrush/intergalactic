import { Flex } from '@semcore/flex-box';
import NeighborLocation from '@semcore/neighbor-location';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { snapshot } from '@semcore/testing-utils/snapshot';
import { render } from '@semcore/testing-utils/testing-library';
import { expect, test, describe } from '@semcore/testing-utils/vitest';
import React from 'react';

import Button from '../src';

describe('Button Dependency imports', () => {
  runDependencyCheckTests('button');
});

describe('Button', () => {
  test('Verify loading attributes', () => {
    const { queryByTestId } = render(
      <Button data-testid='button' loading>
        Text
      </Button>,
    );
    expect((queryByTestId('button')?.attributes as any)['disabled']).toBeTruthy();
    expect(queryByTestId('button')?.querySelectorAll('[data-ui-name="Spin"]')).toHaveLength(1);
  });

  test.concurrent('Verify aria-busy when loading', () => {
    const { queryByTestId } = render(
      <Button data-testid='busy-button' loading>
        Text
      </Button>,
    );

    const buttonElement = queryByTestId('busy-button');

    expect((buttonElement?.attributes as any)['aria-busy'].value).toBe('true');
  });

  test.concurrent('Verify saves width at loading', async ({ task }) => {
    const Component = <Button loading>Text long Text long</Button>;
    await expect(await snapshot(Component)).toMatchImageSnapshot(task);
  });

  test.concurrent(
    'Verify supports neighbor location with [left, both, right]',
    async ({ task }) => {
      const component = (
        <snapshot.ProxyProps style={{ margin: 5 }}>
          <Flex inline alignItems='center'>
            <NeighborLocation>
              <Button>Left</Button>
              <Button>Both</Button>
              <Button>Right</Button>
            </NeighborLocation>
          </Flex>
          <Flex inline alignItems='center'>
            <NeighborLocation>
              <Button use='primary'>Left</Button>
              <Button use='primary'>Both</Button>
              <Button use='primary'>Right</Button>
            </NeighborLocation>
          </Flex>
          <Flex inline alignItems='center'>
            <NeighborLocation>
              <Button use='primary' theme='invert'>
                Left
              </Button>
              <Button use='primary' theme='invert'>
                Both
              </Button>
              <Button use='primary' theme='invert'>
                Right
              </Button>
            </NeighborLocation>
          </Flex>
          <Flex inline alignItems='center'>
            <NeighborLocation>
              <Button use='tertiary'>Left</Button>
              <Button use='tertiary'>Both</Button>
              <Button use='tertiary'>Right</Button>
            </NeighborLocation>
          </Flex>
        </snapshot.ProxyProps>
      );

      await expect(await snapshot(component)).toMatchImageSnapshot(task);
    },
  );
});
