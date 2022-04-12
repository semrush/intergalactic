import React from 'react';
import { testing, snapshot } from '@semcore/jest-preset-ui';
const { cleanup, fireEvent, render } = testing;

import NeighborLocation from '@semcore/neighbor-location';
import { Flex } from '@semcore/flex-box';
import Button from '../src';

describe('Button', () => {
  afterEach(cleanup);

  test('should support custom className', () => {
    const { getByTestId } = render(<Button data-testid="button" className="more-than one-class" />);

    expect(getByTestId('button').attributes['class'].value).toContain('more-than one-class');
  });

  test('should support custom attributes', () => {
    const { getByTestId } = render(<Button data-testid="button" name="button" />);

    expect(getByTestId('button').attributes['name'].value).toBe('button');
  });

  test('should support ref', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref} />);
    expect(ref.current.nodeName).toBe('BUTTON');
  });

  test('should support children', async () => {
    const component = (
      <Button>
        <p data-testid="child">Test</p>
      </Button>
    );
    const { getByTestId } = render(component);

    expect(getByTestId('child')).toBeTruthy();
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('should support additional elements', async () => {
    const component = (
      <Button>
        <Button.Addon>Addon</Button.Addon>
        <Button.Text>Text</Button.Text>
      </Button>
    );
    const { queryAllByText } = render(component);
    const additional = queryAllByText('Addon');

    expect(additional).toHaveLength(1);
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('should support additional elements as props', async () => {
    const Addon = React.forwardRef<HTMLElement>(function (p, ref) {
      return (
        <span ref={ref} {...p}>
          Addon prop
        </span>
      );
    });
    const component = (
      <Button addonLeft={Addon} addonRight={Addon}>
        Text
      </Button>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('additional elements should support ref', () => {
    const textRef = React.createRef<HTMLSpanElement>();
    const addonRef = React.createRef<HTMLSpanElement>();
    render(
      <Button>
        <Button.Addon ref={addonRef} />
        <Button.Text ref={textRef} />
      </Button>,
    );
    expect(textRef.current.nodeName).toBe('SPAN');
    expect(addonRef.current.nodeName).toBe('SPAN');
  });

  test('should support loading', () => {
    const { queryByTestId } = render(<Button data-testid="button" loading />);
    expect(queryByTestId('button').attributes['disabled']).toBeTruthy();
    expect(queryByTestId('button').querySelectorAll('[data-ui-name="Spin"]')).toHaveLength(1);
  });

  test('should support mouse click', () => {
    const spy = jest.fn();
    const { getByTestId } = render(<Button data-testid="button" onClick={spy} />);
    fireEvent.click(getByTestId('button'));

    expect(spy).toBeCalled();
  });

  test('should support tag prop', () => {
    const { queryByTestId } = render(<Button data-testid="button" tag="a" />);
    expect(queryByTestId('button').tagName).toBe('A');
  });

  test('should support "fullWidth" prop', async () => {
    const component = (
      <div style={{ width: 200 }}>
        <Button w="100%">Button</Button>
      </div>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('should support "active" prop', async () => {
    const Component = <Button active>Test</Button>;

    expect(await snapshot(Component)).toMatchImageSnapshot();
  });

  test('should not call onClick handler when disabled', () => {
    const spy = jest.fn();
    const { getByTestId } = render(<Button data-testid="button" onClick={spy} disabled />);
    fireEvent.click(getByTestId('button'));

    expect(spy).not.toBeCalled();
  });

  test('should support size props', async () => {
    const component = (
      <snapshot.ProxyProps style={{ margin: 5 }}>
        <Button size="xl">Button</Button>
        <Button size="l">Button</Button>
        <Button size="m">Button</Button>
        <Button size="s">Button</Button>
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
});
