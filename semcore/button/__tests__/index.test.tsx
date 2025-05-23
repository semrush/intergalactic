import React from 'react';

import { snapshot } from '@semcore/testing-utils/snapshot';
import { expect, test, describe } from '@semcore/testing-utils/vitest';
import { render } from '@semcore/testing-utils/testing-library';

import NeighborLocation from '@semcore/neighbor-location';
import { Flex } from '@semcore/flex-box';
import CheckM from '@semcore/icon/Check/m';
import propsForElement from '@semcore/core/lib/utils/propsForElement';
import Button, { ButtonLink } from '../src';
import CloseM from '@semcore/icon/Close/m';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';

describe('Button Dependency imports', () => {
  runDependencyCheckTests('button');
});

describe('Button', () => {
  // beforeEach(cleanup);

  test.concurrent('renders correctly', async ({ task }) => {
    const component = <Button>Button</Button>;

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Renders correctly with Addon and Text', async ({ task }) => {
    const component = (
      <Button>
        <Button.Addon>Addon</Button.Addon>
        <Button.Text>Text</Button.Text>
      </Button>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Renders correctly with Addon as props', async ({ task }) => {
    const Addon = React.forwardRef((p, ref: React.Ref<HTMLSpanElement>) => {
      return (
        <span ref={ref} {...propsForElement(p)}>
          Addon prop
        </span>
      );
    });
    const component = (
      <Button addonLeft={Addon} addonRight={Addon}>
        Text
      </Button>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Renders correctly with one Addon as props', async ({ task }) => {
    const component = <Button addonLeft={CheckM} aria-label='Check' />;

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('should support loading', () => {
    const { queryByTestId } = render(
      <Button data-testid='button' loading>
        Text
      </Button>,
    );
    expect((queryByTestId('button')?.attributes as any)['disabled']).toBeTruthy();
    expect(queryByTestId('button')?.querySelectorAll('[data-ui-name="Spin"]')).toHaveLength(1);
  });

  test.concurrent('should not have box-shadow and focus while loading', async ({ task }) => {
    const Component = <Button loading={true}>Text</Button>;
    await expect(await snapshot(Component)).toMatchImageSnapshot(task);
  });

  test.concurrent('should support aria-busy when loading', () => {
    const { queryByTestId } = render(
      <Button data-testid='busy-button' loading>
        Text
      </Button>,
    );

    const buttonElement = queryByTestId('busy-button');

    expect((buttonElement?.attributes as any)['aria-busy'].value).toBe('true');
  });

  test.concurrent('should support save width at loading', async ({ task }) => {
    const Component = <Button loading>Text long Text long</Button>;
    await expect(await snapshot(Component)).toMatchImageSnapshot(task);
  });

  test.concurrent('should support "active" prop', async ({ task }) => {
    const Component = <Button active>Test</Button>;

    await expect(await snapshot(Component)).toMatchImageSnapshot(task);
  });

  test.concurrent('should support theme props', async ({ task }) => {
    const component = (
      <div style={{ background: '#eee' }}>
        <snapshot.ProxyProps style={{ margin: 5 }}>
          <Button use='primary'>Button</Button>
          <Button use='primary' theme='invert'>
            Button
          </Button>
          <Button use='primary' theme='success'>
            Button
          </Button>
          <Button use='primary' theme='warning'>
            Button
          </Button>
          <Button use='primary' theme='danger'>
            Button
          </Button>
        </snapshot.ProxyProps>
        <br />
        <snapshot.ProxyProps style={{ margin: 5 }}>
          <Button use='secondary'>Button</Button>
          <Button use='secondary' theme='invert'>
            Button
          </Button>
        </snapshot.ProxyProps>
        <br />
        <snapshot.ProxyProps style={{ margin: 5 }}>
          <Button use='tertiary'>Button</Button>
          <Button use='tertiary' theme='invert'>
            Button
          </Button>
          <Button use='tertiary' theme='muted'>
            Button
          </Button>
        </snapshot.ProxyProps>
      </div>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should have correct themed loading state', async ({ task }) => {
    const component = (
      <div style={{ background: '#eee' }}>
        <snapshot.ProxyProps style={{ margin: 5 }}>
          <Button use='primary' loading>
            Button
          </Button>
          <Button use='primary' theme='invert' loading>
            Button
          </Button>
          <Button use='primary' theme='success' loading>
            Button
          </Button>
          <Button use='primary' theme='warning' loading>
            Button
          </Button>
          <Button use='primary' theme='danger' loading>
            Button
          </Button>
        </snapshot.ProxyProps>
        <br />
        <snapshot.ProxyProps style={{ margin: 5 }}>
          <Button use='secondary' loading>
            Button
          </Button>
          <Button use='secondary' theme='invert' loading>
            Button
          </Button>
        </snapshot.ProxyProps>
        <br />
        <snapshot.ProxyProps style={{ margin: 5 }}>
          <Button use='tertiary' loading>
            Button
          </Button>
          <Button use='tertiary' theme='invert' loading>
            Button
          </Button>
          <Button use='tertiary' theme='muted' loading>
            Button
          </Button>
        </snapshot.ProxyProps>
      </div>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should have correct themed disabled state', async ({ task }) => {
    const component = (
      <div style={{ background: '#eee' }}>
        <snapshot.ProxyProps style={{ margin: 5 }}>
          <Button use='primary' disabled>
            Button
          </Button>
          <Button use='primary' theme='invert' disabled>
            Button
          </Button>
          <Button use='primary' theme='success' disabled>
            Button
          </Button>
          <Button use='primary' theme='warning' disabled>
            Button
          </Button>
          <Button use='primary' theme='danger' disabled>
            Button
          </Button>
        </snapshot.ProxyProps>
        <br />
        <snapshot.ProxyProps style={{ margin: 5 }}>
          <Button use='secondary' disabled>
            Button
          </Button>
          <Button use='secondary' theme='invert' disabled>
            Button
          </Button>
        </snapshot.ProxyProps>
        <br />
        <snapshot.ProxyProps style={{ margin: 5 }}>
          <Button use='tertiary' disabled>
            Button
          </Button>
          <Button use='tertiary' theme='invert' disabled>
            Button
          </Button>
          <Button use='tertiary' theme='muted' disabled>
            Button
          </Button>
        </snapshot.ProxyProps>
      </div>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should have correct themed disabled state if active', async ({ task }) => {
    const component = (
      <div style={{ background: '#eee' }}>
        <snapshot.ProxyProps style={{ margin: 5 }}>
          <Button use='primary' disabled active>
            Button
          </Button>
          <Button use='primary' theme='invert' disabled active>
            Button
          </Button>
          <Button use='primary' theme='success' disabled active>
            Button
          </Button>
          <Button use='primary' theme='warning' disabled active>
            Button
          </Button>
          <Button use='primary' theme='danger' disabled active>
            Button
          </Button>
        </snapshot.ProxyProps>
        <br />
        <snapshot.ProxyProps style={{ margin: 5 }}>
          <Button use='secondary' disabled active>
            Button
          </Button>
          <Button use='secondary' theme='invert' disabled active>
            Button
          </Button>
        </snapshot.ProxyProps>
        <br />
        <snapshot.ProxyProps style={{ margin: 5 }}>
          <Button use='tertiary' disabled active>
            Button
          </Button>
          <Button use='tertiary' theme='invert' disabled active>
            Button
          </Button>
          <Button use='tertiary' theme='muted' disabled active>
            Button
          </Button>
        </snapshot.ProxyProps>
      </div>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent(
    'Should have correct themed disabled state if active as link',
    async ({ task }) => {
      const component = (
        <div style={{ background: '#eee' }}>
          <snapshot.ProxyProps style={{ margin: 5 }}>
            <Button use='primary' disabled active tag='a'>
              Button
            </Button>
            <Button use='primary' theme='invert' disabled active tag='a'>
              Button
            </Button>
            <Button use='primary' theme='success' disabled active tag='a'>
              Button
            </Button>
            <Button use='primary' theme='warning' disabled active tag='a'>
              Button
            </Button>
            <Button use='primary' theme='danger' disabled active tag='a'>
              Button
            </Button>
          </snapshot.ProxyProps>
          <br />
          <snapshot.ProxyProps style={{ margin: 5 }}>
            <Button use='secondary' disabled active tag='a'>
              Button
            </Button>
            <Button use='secondary' theme='invert' disabled active tag='a'>
              Button
            </Button>
          </snapshot.ProxyProps>
          <br />
          <snapshot.ProxyProps style={{ margin: 5 }}>
            <Button use='tertiary' disabled active tag='a'>
              Button
            </Button>
            <Button use='tertiary' theme='invert' disabled active tag='a'>
              Button
            </Button>
            <Button use='tertiary' theme='muted' disabled active tag='a'>
              Button
            </Button>
          </snapshot.ProxyProps>
        </div>
      );

      await expect(await snapshot(component)).toMatchImageSnapshot(task);
    },
  );

  test.concurrent('should support neighbor location with [left, both, right]', async ({ task }) => {
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
  });

  test.concurrent('Should support hover', async ({ task }) => {
    await expect(
      await snapshot(<Button id='button'>Button</Button>, {
        actions: {
          hover: '#button',
        },
      }),
    ).toMatchImageSnapshot(task);
    await expect(
      await snapshot(
        <div style={{ background: '#eee' }}>
          <Button id='button' use='tertiary' theme='invert'>
            Button
          </Button>
        </div>,
        {
          actions: {
            hover: '#button',
          },
        },
      ),
    ).toMatchImageSnapshot(task);
    await expect(
      await snapshot(
        <div style={{ background: '#eee' }}>
          <Button id='button' use='secondary' theme='invert'>
            Button
          </Button>
        </div>,
        {
          actions: {
            hover: '#button',
          },
        },
      ),
    ).toMatchImageSnapshot(task);
    await expect(
      await snapshot(
        <div style={{ background: '#eee' }}>
          <Button id='button' use='primary' theme='invert'>
            Button
          </Button>
        </div>,
        {
          actions: {
            hover: '#button',
          },
        },
      ),
    ).toMatchImageSnapshot(task);
    await expect(
      await snapshot(
        <Button id='button' use='primary' theme='danger'>
          Button
        </Button>,
        {
          actions: {
            hover: '#button',
          },
        },
      ),
    ).toMatchImageSnapshot(task);
    await expect(
      await snapshot(
        <Button id='button' use='primary' theme='warning'>
          Button
        </Button>,
        {
          actions: {
            hover: '#button',
          },
        },
      ),
    ).toMatchImageSnapshot(task);
    await expect(
      await snapshot(
        <Button id='button' use='primary' theme='success'>
          Button
        </Button>,
        {
          actions: {
            hover: '#button',
          },
        },
      ),
    ).toMatchImageSnapshot(task);
    await expect(
      await snapshot(
        <Button id='button' use='primary' theme='info'>
          Button
        </Button>,
        {
          actions: {
            hover: '#button',
          },
        },
      ),
    ).toMatchImageSnapshot(task);
    await expect(
      await snapshot(
        <Button id='button' use='secondary' theme='muted'>
          Button
        </Button>,
        {
          actions: {
            hover: '#button',
          },
        },
      ),
    ).toMatchImageSnapshot(task);
    await expect(
      await snapshot(
        <Button id='button' use='secondary' theme='info'>
          Button
        </Button>,
        {
          actions: {
            hover: '#button',
          },
        },
      ),
    ).toMatchImageSnapshot(task);
    await expect(
      await snapshot(
        <Button id='button' use='tertiary' theme='info'>
          Button
        </Button>,
        {
          actions: {
            hover: '#button',
          },
        },
      ),
    ).toMatchImageSnapshot(task);
    await expect(
      await snapshot(
        <Button id='button' use='tertiary' theme='muted'>
          Button
        </Button>,
        {
          actions: {
            hover: '#button',
          },
        },
      ),
    ).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support active', async ({ task }) => {
    await expect(
      await snapshot(<Button id='button'>Button</Button>, {
        actions: {
          active: '#button',
        },
      }),
    ).toMatchImageSnapshot(task);
    await expect(
      await snapshot(
        <div style={{ background: '#eee' }}>
          <Button id='button' use='tertiary' theme='invert'>
            Button
          </Button>
        </div>,
        {
          actions: {
            active: '#button',
          },
        },
      ),
    ).toMatchImageSnapshot(task);
    await expect(
      await snapshot(
        <div style={{ background: '#eee' }}>
          <Button id='button' use='secondary' theme='invert'>
            Button
          </Button>
        </div>,
        {
          actions: {
            active: '#button',
          },
        },
      ),
    ).toMatchImageSnapshot(task);
    await expect(
      await snapshot(
        <div style={{ background: '#eee' }}>
          <Button id='button' use='primary' theme='invert'>
            Button
          </Button>
        </div>,
        {
          actions: {
            active: '#button',
          },
        },
      ),
    ).toMatchImageSnapshot(task);
    await expect(
      await snapshot(
        <Button id='button' use='primary' theme='danger'>
          Button
        </Button>,
        {
          actions: {
            active: '#button',
          },
        },
      ),
    ).toMatchImageSnapshot(task);
    await expect(
      await snapshot(
        <Button id='button' use='primary' theme='warning'>
          Button
        </Button>,
        {
          actions: {
            active: '#button',
          },
        },
      ),
    ).toMatchImageSnapshot(task);
    await expect(
      await snapshot(
        <Button id='button' use='primary' theme='success'>
          Button
        </Button>,
        {
          actions: {
            active: '#button',
          },
        },
      ),
    ).toMatchImageSnapshot(task);
    await expect(
      await snapshot(
        <Button id='button' use='primary' theme='info'>
          Button
        </Button>,
        {
          actions: {
            active: '#button',
          },
        },
      ),
    ).toMatchImageSnapshot(task);
    await expect(
      await snapshot(
        <Button id='button' use='secondary' theme='muted'>
          Button
        </Button>,
        {
          actions: {
            active: '#button',
          },
        },
      ),
    ).toMatchImageSnapshot(task);
    await expect(
      await snapshot(
        <Button id='button' use='secondary' theme='info'>
          Button
        </Button>,
        {
          actions: {
            active: '#button',
          },
        },
      ),
    ).toMatchImageSnapshot(task);
    await expect(
      await snapshot(
        <Button id='button' use='tertiary' theme='info'>
          Button
        </Button>,
        {
          actions: {
            active: '#button',
          },
        },
      ),
    ).toMatchImageSnapshot(task);
    await expect(
      await snapshot(
        <Button id='button' use='tertiary' theme='muted'>
          Button
        </Button>,
        {
          actions: {
            active: '#button',
          },
        },
      ),
    ).toMatchImageSnapshot(task);
  });
});

describe('ButtonLink', () => {
  test.concurrent('renders correctly', async ({ task }) => {
    const component = (
      <Flex direction={'column'} gap={6} alignItems={'flex-start'}>
        <ButtonLink addonLeft={CheckM}>Button Link primary</ButtonLink>
        <ButtonLink use={'secondary'}>
          <ButtonLink.Addon>
            <CheckM />
          </ButtonLink.Addon>
          <ButtonLink.Text>Button Link secondary</ButtonLink.Text>
        </ButtonLink>
        <ButtonLink addonRight={CloseM} color={'text-critical'}>
          Close
        </ButtonLink>

        <ButtonLink addonLeft={CheckM} aria-label={'Confirm'} />

        <ButtonLink addonLeft={CheckM} size={500}>
          Large size
        </ButtonLink>
      </Flex>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('disabled renders correctly', async ({ task }) => {
    const component = (
      <Flex direction={'column'} gap={6} alignItems={'flex-start'}>
        <ButtonLink addonLeft={CheckM} disabled={true}>
          Button Link primary
        </ButtonLink>
        <ButtonLink use={'secondary'} disabled={true}>
          <ButtonLink.Addon>
            <CheckM />
          </ButtonLink.Addon>
          <ButtonLink.Text>Button Link secondary</ButtonLink.Text>
        </ButtonLink>
        <ButtonLink addonRight={CloseM} color={'text-critical'} disabled={true}>
          Close
        </ButtonLink>

        <ButtonLink addonLeft={CheckM} aria-label={'Confirm'} disabled={true} />

        <ButtonLink addonLeft={CheckM} size={500} disabled={true}>
          Large size
        </ButtonLink>
      </Flex>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });
});
