import React from 'react';
import { cleanup, fireEvent, render, axe } from '@semcore/jest-preset-ui/testing';
import snapshot from '@semcore/jest-preset-ui/snapshot';
import Tooltip from '../src';

describe('Tooltip', () => {
  afterEach(cleanup);

  test('Renders correctly', async () => {
    const component = (
      <div style={{ width: '100px', height: '100px' }}>
        <Tooltip visible disablePortal>
          <Tooltip.Trigger>
            <button>Test</button>
          </Tooltip.Trigger>
          <Tooltip.Popper style={{ opacity: 1 }}>text text text</Tooltip.Popper>
        </Tooltip>
      </div>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Renders correctly with warning theme', async () => {
    const component = (
      <div style={{ width: '100px', height: '100px' }}>
        <Tooltip visible disablePortal>
          <Tooltip.Trigger>
            <button>Test</button>
          </Tooltip.Trigger>
          <Tooltip.Popper style={{ opacity: 1 }} theme="warning">
            text text text
          </Tooltip.Popper>
        </Tooltip>
      </div>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Renders correctly with invert theme', async () => {
    const component = (
      <div style={{ width: '100px', height: '100px' }}>
        <Tooltip visible disablePortal>
          <Tooltip.Trigger>
            <button>Test</button>
          </Tooltip.Trigger>
          <Tooltip.Popper style={{ opacity: 1 }} theme="invert">
            text text text
          </Tooltip.Popper>
        </Tooltip>
      </div>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Renders correctly with custom theme', async () => {
    const component = (
      <div style={{ width: '100px', height: '100px' }}>
        <Tooltip visible disablePortal>
          <Tooltip.Trigger>
            <button>Test</button>
          </Tooltip.Trigger>
          <Tooltip.Popper style={{ opacity: 1 }} theme="green">
            text text text
          </Tooltip.Popper>
        </Tooltip>
      </div>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});

describe('Tooltip.Trigger', () => {
  afterEach(cleanup);

  test('should support custom className', () => {
    const { getByTestId } = render(
      <Tooltip>
        <Tooltip.Trigger data-testid="trigger" className="more-than one-class" />
      </Tooltip>,
    );

    expect(getByTestId('trigger').attributes['class'].value).toContain('more-than one-class');
  });

  test('should support custom attributes', () => {
    const { getByTestId } = render(
      <Tooltip>
        <Tooltip.Trigger data-testid="trigger" name="trigger" />
      </Tooltip>,
    );

    expect(getByTestId('trigger').attributes['name'].value).toBe('trigger');
  });

  test('should support ref', () => {
    const ref = React.createRef();
    render(
      <Tooltip>
        <Tooltip.Trigger tag="button" ref={ref} />
      </Tooltip>,
    );
    expect(ref.current.nodeName).toBe('BUTTON');
  });

  test('should support children', async () => {
    const component = (
      <Tooltip>
        <Tooltip.Trigger>
          <p data-testid="child">Test</p>
        </Tooltip.Trigger>
      </Tooltip>
    );
    const { getByTestId } = render(component);

    expect(getByTestId('child')).toBeTruthy();
  });
});

describe('Tooltip.Popper', () => {
  afterEach(cleanup);

  test('should support custom className', () => {
    const { getByTestId } = render(
      <Tooltip visible>
        <Tooltip.Trigger />
        <Tooltip.Popper data-testid="popper" className="more-than one-class" />
      </Tooltip>,
    );

    expect(getByTestId('popper').attributes['class'].value).toContain('more-than one-class');
  });

  test('should support custom attributes', () => {
    const { getByTestId } = render(
      <Tooltip visible>
        <Tooltip.Trigger />
        <Tooltip.Popper data-testid="popper" name="popper" />
      </Tooltip>,
    );

    expect(getByTestId('popper').attributes['name'].value).toBe('popper');
  });

  test('should support ref', () => {
    const ref = React.createRef();
    render(
      <Tooltip visible>
        <Tooltip.Trigger />
        <Tooltip.Popper tag="div" ref={ref} />
      </Tooltip>,
    );
    expect(ref.current.nodeName).toBe('DIV');
  });

  test('should support children', async () => {
    const component = (
      <Tooltip visible>
        <Tooltip.Trigger />
        <Tooltip.Popper>
          <p data-testid="child">Test</p>
        </Tooltip.Popper>
      </Tooltip>
    );
    const { getByTestId } = render(component);

    expect(getByTestId('child')).toBeTruthy();
  });

  test('should support render function for children', () => {
    const component = (
      <Tooltip visible>
        {() => (
          <>
            <Tooltip.Trigger />
            <Tooltip.Popper />
          </>
        )}
      </Tooltip>
    );
    render(component);

    expect(document.querySelectorAll('[data-ui-name="Tooltip.Popper"]').length).toBe(1);
  });
});

describe('TooltipBase', () => {
  afterEach(cleanup);

  test('should support ref', () => {
    const ref = React.createRef();
    render(<Tooltip ref={ref} tag="button" title="test" />);
    expect(ref.current.nodeName).toBe('BUTTON');
  });

  test('open/hide', () => {
    jest.useFakeTimers();
    const spy = jest.fn();
    const { getByTestId } = render(
      <Tooltip title="Test test test" disablePortal onVisibleChange={spy}>
        <button data-testid="trigger">trigger</button>
      </Tooltip>,
    );

    fireEvent.mouseEnter(getByTestId('trigger'));
    jest.runAllTimers();
    expect(spy).toHaveBeenCalledTimes(1);
    fireEvent.mouseLeave(getByTestId('trigger'));
    jest.runAllTimers();
    expect(spy).toHaveBeenCalledTimes(2);
    jest.useRealTimers();
  });

  test('a11y', async () => {
    const { container } = render(
      <Tooltip visible disablePortal>
        <Tooltip.Trigger tag="button">trigger</Tooltip.Trigger>
        <Tooltip.Popper>text tooltip</Tooltip.Popper>
      </Tooltip>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
