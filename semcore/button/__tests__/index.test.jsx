import React from 'react';
import { testing, snapshot } from '@semcore/jest-preset-ui';
const { cleanup, render } = testing;

import NeighborLocation from '@semcore/neighbor-location';
import { Flex } from '@semcore/flex-box';
import Button from '../src';
import propsForElement from '@semcore/utils/lib/propsForElement';

describe('Button', () => {
  afterEach(cleanup);

  test('renders correctly', async () => {
    const component = <Button>Button</Button>;

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Renders correctly with Addon and Text', async () => {
    const component = (
      <Button>
        <Button.Addon>Addon</Button.Addon>
        <Button.Text>Text</Button.Text>
      </Button>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Renders correctly with Addon as props', async () => {
    const Addon =
      React.forwardRef <
      HTMLElement >
      function (p, ref) {
        return (
          <span ref={ref} {...propsForElement(p)}>
            Addon prop
          </span>
        );
      };
    const component = (
      <Button addonLeft={Addon} addonRight={Addon}>
        Text
      </Button>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('should support loading', () => {
    const { queryByTestId } = render(<Button data-testid="button" loading />);
    expect(queryByTestId('button').attributes['disabled']).toBeTruthy();
    expect(queryByTestId('button').querySelectorAll('[data-ui-name="Spin"]')).toHaveLength(1);
  });

  test('should support "active" prop', async () => {
    const Component = <Button active>Test</Button>;

    expect(await snapshot(Component)).toMatchImageSnapshot();
  });

  test('should support size props', async () => {
    const component = (
      <snapshot.ProxyProps style={{ margin: 5 }}>
        <Button size="l">Button</Button>
        <Button size="m">Button</Button>
      </snapshot.ProxyProps>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('should support theme props', async () => {
    const component = (
      <div style={{ background: '#eee' }}>
        <snapshot.ProxyProps style={{ margin: 5 }}>
          <Button use="primary">Button</Button>
          <Button use="primary" theme="invert">
            Button
          </Button>
          <Button use="primary" theme="success">
            Button
          </Button>
          <Button use="primary" theme="warning">
            Button
          </Button>
          <Button use="primary" theme="danger">
            Button
          </Button>
        </snapshot.ProxyProps>
        <br />
        <snapshot.ProxyProps style={{ margin: 5 }}>
          <Button use="secondary">Button</Button>
          <Button use="secondary" theme="invert">
            Button
          </Button>
        </snapshot.ProxyProps>
        <br />
        <snapshot.ProxyProps style={{ margin: 5 }}>
          <Button use="tertiary">Button</Button>
          <Button use="tertiary" theme="invert">
            Button
          </Button>
          <Button use="tertiary" theme="muted">
            Button
          </Button>
        </snapshot.ProxyProps>
      </div>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should have correct themed loading state', async () => {
    const component = (
      <div style={{ background: '#eee' }}>
        <snapshot.ProxyProps style={{ margin: 5 }}>
          <Button use="primary" loading>
            Button
          </Button>
          <Button use="primary" theme="invert" loading>
            Button
          </Button>
          <Button use="primary" theme="success" loading>
            Button
          </Button>
          <Button use="primary" theme="warning" loading>
            Button
          </Button>
          <Button use="primary" theme="danger" loading>
            Button
          </Button>
        </snapshot.ProxyProps>
        <br />
        <snapshot.ProxyProps style={{ margin: 5 }}>
          <Button use="secondary" loading>
            Button
          </Button>
          <Button use="secondary" theme="invert" loading>
            Button
          </Button>
        </snapshot.ProxyProps>
        <br />
        <snapshot.ProxyProps style={{ margin: 5 }}>
          <Button use="tertiary" loading>
            Button
          </Button>
          <Button use="tertiary" theme="invert" loading>
            Button
          </Button>
          <Button use="tertiary" theme="muted" loading>
            Button
          </Button>
        </snapshot.ProxyProps>
      </div>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should have correct themed disabled state', async () => {
    const component = (
      <div style={{ background: '#eee' }}>
        <snapshot.ProxyProps style={{ margin: 5 }}>
          <Button use="primary" disabled>
            Button
          </Button>
          <Button use="primary" theme="invert" disabled>
            Button
          </Button>
          <Button use="primary" theme="success" disabled>
            Button
          </Button>
          <Button use="primary" theme="warning" disabled>
            Button
          </Button>
          <Button use="primary" theme="danger" disabled>
            Button
          </Button>
        </snapshot.ProxyProps>
        <br />
        <snapshot.ProxyProps style={{ margin: 5 }}>
          <Button use="secondary" disabled>
            Button
          </Button>
          <Button use="secondary" theme="invert" disabled>
            Button
          </Button>
        </snapshot.ProxyProps>
        <br />
        <snapshot.ProxyProps style={{ margin: 5 }}>
          <Button use="tertiary" disabled>
            Button
          </Button>
          <Button use="tertiary" theme="invert" disabled>
            Button
          </Button>
          <Button use="tertiary" theme="muted" disabled>
            Button
          </Button>
        </snapshot.ProxyProps>
      </div>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should have correct themed disabled state if active', async () => {
    const component = (
      <div style={{ background: '#eee' }}>
        <snapshot.ProxyProps style={{ margin: 5 }}>
          <Button use="primary" disabled active>
            Button
          </Button>
          <Button use="primary" theme="invert" disabled active>
            Button
          </Button>
          <Button use="primary" theme="success" disabled active>
            Button
          </Button>
          <Button use="primary" theme="warning" disabled active>
            Button
          </Button>
          <Button use="primary" theme="danger" disabled active>
            Button
          </Button>
        </snapshot.ProxyProps>
        <br />
        <snapshot.ProxyProps style={{ margin: 5 }}>
          <Button use="secondary" disabled active>
            Button
          </Button>
          <Button use="secondary" theme="invert" disabled active>
            Button
          </Button>
        </snapshot.ProxyProps>
        <br />
        <snapshot.ProxyProps style={{ margin: 5 }}>
          <Button use="tertiary" disabled active>
            Button
          </Button>
          <Button use="tertiary" theme="invert" disabled active>
            Button
          </Button>
          <Button use="tertiary" theme="muted" disabled active>
            Button
          </Button>
        </snapshot.ProxyProps>
      </div>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should have correct themed disabled state if active as link', async () => {
    const component = (
      <div style={{ background: '#eee' }}>
        <snapshot.ProxyProps style={{ margin: 5 }}>
          <Button use="primary" disabled active tag="a">
            Button
          </Button>
          <Button use="primary" theme="invert" disabled active tag="a">
            Button
          </Button>
          <Button use="primary" theme="success" disabled active tag="a">
            Button
          </Button>
          <Button use="primary" theme="warning" disabled active tag="a">
            Button
          </Button>
          <Button use="primary" theme="danger" disabled active tag="a">
            Button
          </Button>
        </snapshot.ProxyProps>
        <br />
        <snapshot.ProxyProps style={{ margin: 5 }}>
          <Button use="secondary" disabled active tag="a">
            Button
          </Button>
          <Button use="secondary" theme="invert" disabled active tag="a">
            Button
          </Button>
        </snapshot.ProxyProps>
        <br />
        <snapshot.ProxyProps style={{ margin: 5 }}>
          <Button use="tertiary" disabled active tag="a">
            Button
          </Button>
          <Button use="tertiary" theme="invert" disabled active tag="a">
            Button
          </Button>
          <Button use="tertiary" theme="muted" disabled active tag="a">
            Button
          </Button>
        </snapshot.ProxyProps>
      </div>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('should support neighbor location with [left, both, right]', async () => {
    const component = (
      <snapshot.ProxyProps style={{ margin: 5 }}>
        <Flex inline alignItems="center">
          <NeighborLocation>
            <Button>Left</Button>
            <Button>Both</Button>
            <Button>Right</Button>
          </NeighborLocation>
        </Flex>
        <Flex inline alignItems="center">
          <NeighborLocation>
            <Button use="primary">Left</Button>
            <Button use="primary">Both</Button>
            <Button use="primary">Right</Button>
          </NeighborLocation>
        </Flex>
        <Flex inline alignItems="center">
          <NeighborLocation>
            <Button use="primary" theme="invert">
              Left
            </Button>
            <Button use="primary" theme="invert">
              Both
            </Button>
            <Button use="primary" theme="invert">
              Right
            </Button>
          </NeighborLocation>
        </Flex>
        <Flex inline alignItems="center">
          <NeighborLocation>
            <Button use="tertiary">Left</Button>
            <Button use="tertiary">Both</Button>
            <Button use="tertiary">Right</Button>
          </NeighborLocation>
        </Flex>
      </snapshot.ProxyProps>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support hover', async () => {
    expect(
      await snapshot(<Button id="button">Button</Button>, {
        actions: {
          hover: '#button',
        },
      }),
    ).toMatchImageSnapshot();
    expect(
      await snapshot(
        <div style={{ background: '#eee' }}>
          <Button id="button" use="tertiary" theme="invert">
            Button
          </Button>
        </div>,
        {
          actions: {
            hover: '#button',
          },
        },
      ),
    ).toMatchImageSnapshot();
    expect(
      await snapshot(
        <div style={{ background: '#eee' }}>
          <Button id="button" use="secondary" theme="invert">
            Button
          </Button>
        </div>,
        {
          actions: {
            hover: '#button',
          },
        },
      ),
    ).toMatchImageSnapshot();
    expect(
      await snapshot(
        <div style={{ background: '#eee' }}>
          <Button id="button" use="primary" theme="invert">
            Button
          </Button>
        </div>,
        {
          actions: {
            hover: '#button',
          },
        },
      ),
    ).toMatchImageSnapshot();
    expect(
      await snapshot(
        <Button id="button" use="primary" theme="danger">
          Button
        </Button>,
        {
          actions: {
            hover: '#button',
          },
        },
      ),
    ).toMatchImageSnapshot();
    expect(
      await snapshot(
        <Button id="button" use="primary" theme="warning">
          Button
        </Button>,
        {
          actions: {
            hover: '#button',
          },
        },
      ),
    ).toMatchImageSnapshot();
    expect(
      await snapshot(
        <Button id="button" use="primary" theme="success">
          Button
        </Button>,
        {
          actions: {
            hover: '#button',
          },
        },
      ),
    ).toMatchImageSnapshot();
    expect(
      await snapshot(
        <Button id="button" use="primary" theme="info">
          Button
        </Button>,
        {
          actions: {
            hover: '#button',
          },
        },
      ),
    ).toMatchImageSnapshot();
    expect(
      await snapshot(
        <Button id="button" use="secondary" theme="muted">
          Button
        </Button>,
        {
          actions: {
            hover: '#button',
          },
        },
      ),
    ).toMatchImageSnapshot();
    expect(
      await snapshot(
        <Button id="button" use="secondary" theme="info">
          Button
        </Button>,
        {
          actions: {
            hover: '#button',
          },
        },
      ),
    ).toMatchImageSnapshot();
    expect(
      await snapshot(
        <Button id="button" use="tertiary" theme="info">
          Button
        </Button>,
        {
          actions: {
            hover: '#button',
          },
        },
      ),
    ).toMatchImageSnapshot();
    expect(
      await snapshot(
        <Button id="button" use="tertiary" theme="muted">
          Button
        </Button>,
        {
          actions: {
            hover: '#button',
          },
        },
      ),
    ).toMatchImageSnapshot();
  });

  test('Should support active', async () => {
    expect(
      await snapshot(<Button id="button">Button</Button>, {
        actions: {
          active: '#button',
        },
      }),
    ).toMatchImageSnapshot();
    expect(
      await snapshot(
        <div style={{ background: '#eee' }}>
          <Button id="button" use="tertiary" theme="invert">
            Button
          </Button>
        </div>,
        {
          actions: {
            active: '#button',
          },
        },
      ),
    ).toMatchImageSnapshot();
    expect(
      await snapshot(
        <div style={{ background: '#eee' }}>
          <Button id="button" use="secondary" theme="invert">
            Button
          </Button>
        </div>,
        {
          actions: {
            active: '#button',
          },
        },
      ),
    ).toMatchImageSnapshot();
    expect(
      await snapshot(
        <div style={{ background: '#eee' }}>
          <Button id="button" use="primary" theme="invert">
            Button
          </Button>
        </div>,
        {
          actions: {
            active: '#button',
          },
        },
      ),
    ).toMatchImageSnapshot();
    expect(
      await snapshot(
        <Button id="button" use="primary" theme="danger">
          Button
        </Button>,
        {
          actions: {
            active: '#button',
          },
        },
      ),
    ).toMatchImageSnapshot();
    expect(
      await snapshot(
        <Button id="button" use="primary" theme="warning">
          Button
        </Button>,
        {
          actions: {
            active: '#button',
          },
        },
      ),
    ).toMatchImageSnapshot();
    expect(
      await snapshot(
        <Button id="button" use="primary" theme="success">
          Button
        </Button>,
        {
          actions: {
            active: '#button',
          },
        },
      ),
    ).toMatchImageSnapshot();
    expect(
      await snapshot(
        <Button id="button" use="primary" theme="info">
          Button
        </Button>,
        {
          actions: {
            active: '#button',
          },
        },
      ),
    ).toMatchImageSnapshot();
    expect(
      await snapshot(
        <Button id="button" use="secondary" theme="muted">
          Button
        </Button>,
        {
          actions: {
            active: '#button',
          },
        },
      ),
    ).toMatchImageSnapshot();
    expect(
      await snapshot(
        <Button id="button" use="secondary" theme="info">
          Button
        </Button>,
        {
          actions: {
            active: '#button',
          },
        },
      ),
    ).toMatchImageSnapshot();
    expect(
      await snapshot(
        <Button id="button" use="tertiary" theme="info">
          Button
        </Button>,
        {
          actions: {
            active: '#button',
          },
        },
      ),
    ).toMatchImageSnapshot();
    expect(
      await snapshot(
        <Button id="button" use="tertiary" theme="muted">
          Button
        </Button>,
        {
          actions: {
            active: '#button',
          },
        },
      ),
    ).toMatchImageSnapshot();
  });
});
