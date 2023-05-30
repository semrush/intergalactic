import React from 'react';
import { testing, shared as testsShared } from '@semcore/jest-preset-ui';

const { cleanup, fireEvent, render, act } = testing;

const { shouldSupportClassName, shouldSupportRef } = testsShared;
import Popper from '../src';

jest.mock('@popperjs/core', () => {
  const PopperJS = jest.requireActual('@popperjs/core');

  return {
    ...PopperJS,
    destroy: () => {},
    scheduleUpdate: () => {},
  };
});

describe('Popper', () => {
  afterEach(cleanup);
  test('should render popper to outside container', () => {
    const { getByTestId } = render(
      <Popper visible>
        <Popper.Trigger data-testid="reference" />
        <Popper.Popper data-testid="popper" />
      </Popper>,
    );

    expect(getByTestId('reference')).toBeTruthy();
    expect(getByTestId('popper')).toBeTruthy();
  });

  test('should support a custom handler a reference', () => {
    jest.useFakeTimers();
    const spy = jest.fn();
    const { getByTestId } = render(
      <Popper onVisibleChange={spy} interaction="hover">
        <Popper.Trigger data-testid="reference" />
        <Popper.Popper data-testid="popper" />
      </Popper>,
    );

    fireEvent.mouseEnter(getByTestId('reference'));
    // because wait call onVisibleChange
    act(() => jest.runAllTimers());
    expect(spy).toBeCalledWith(true, expect.anything());

    fireEvent.mouseLeave(getByTestId('reference'));
    // because wait call onVisibleChange
    act(() => jest.runAllTimers());
    expect(spy).toBeCalledWith(false, expect.anything());

    jest.useRealTimers();
  });

  test('should support timeout for change visible', () => {
    jest.useFakeTimers();
    const spy = jest.fn();
    const { getByTestId } = render(
      <Popper onVisibleChange={spy} timeout={100}>
        <Popper.Trigger data-testid="reference" />
        <Popper.Popper data-testid="popper" />
      </Popper>,
    );

    fireEvent.click(getByTestId('reference'));
    // because wait call onVisibleChange
    act(() => jest.advanceTimersByTime(50));
    expect(spy).not.toBeCalledWith(true, expect.anything());

    // because wait call onVisibleChange
    act(() => jest.advanceTimersByTime(100));
    expect(spy).toBeCalledWith(true, expect.anything());

    jest.useRealTimers();
  });

  test('should proxy style', async () => {
    const { getByTestId } = render(
      <Popper visible>
        <Popper.Trigger data-testid="reference" />
        <Popper.Popper data-testid="popper" />
      </Popper>,
    );

    expect(getByTestId('popper').style.position).toEqual('absolute');
  });

  test('should nested popper', async () => {
    const { getByTestId } = render(
      <Popper visible>
        <Popper.Trigger children="trigger 1" />
        <Popper.Popper>
          content 1
          <Popper visible>
            <Popper.Trigger children="trigger 2" />
            <Popper.Popper data-testid="popper">content 2</Popper.Popper>
          </Popper>
        </Popper.Popper>
      </Popper>,
    );

    expect(getByTestId('popper').style.position).toEqual('absolute');
  });
});

describe('Popper.Trigger', () => {
  afterEach(cleanup);

  shouldSupportClassName(Popper.Trigger, (props) => <Popper visible {...props} />);
  shouldSupportRef(Popper.Trigger, (props) => <Popper visible {...props} />);

  test('should support custom attributes', () => {
    const { getByTestId } = render(
      <Popper>
        <Popper.Trigger data-testid="trigger" name="trigger" />
      </Popper>,
    );

    expect(getByTestId('trigger').attributes['name'].value).toBe('trigger');
  });

  test('should support children', async () => {
    const component = (
      <Popper>
        <Popper.Trigger>
          <p data-testid="child">Test</p>
        </Popper.Trigger>
      </Popper>
    );
    const { getByTestId } = render(component);

    expect(getByTestId('child')).toBeTruthy();
  });
});

describe('Popper.Popper', () => {
  afterEach(cleanup);

  shouldSupportClassName(Popper.Popper, (props) => <Popper visible {...props} />);
  shouldSupportRef(Popper.Popper, (props) => <Popper visible {...props} />);

  test('should support custom attributes', () => {
    const { getByTestId } = render(
      <Popper visible>
        <Popper.Popper data-testid="trigger" name="trigger" />
      </Popper>,
    );

    expect(getByTestId('trigger').attributes['name'].value).toBe('trigger');
  });

  test('should support children', async () => {
    const component = (
      <Popper visible>
        <Popper.Popper>
          <p data-testid="child">Test</p>
        </Popper.Popper>
      </Popper>
    );
    const { getByTestId } = render(component);

    expect(getByTestId('child')).toBeTruthy();
  });
});

describe('focus control', () => {
  afterEach(cleanup);

  test('auto focus', () => {
    const { getByTestId } = render(
      <Popper visible>
        <Popper.Popper autoFocus>
          <input data-testid="input-in-popper" />
        </Popper.Popper>
      </Popper>,
    );

    expect(getByTestId('input-in-popper')).toHaveFocus();
  });
  test('trap', async () => {
    const { getByTestId } = render(
      <div>
        <input />
        <input />
        <input />
        <Popper visible>
          <Popper.Popper>
            <input data-testid="input-in-popper" />
          </Popper.Popper>
        </Popper>
        <input />
        <input />
        <input />
      </div>,
    );

    fireEvent.keyDown(document.body, { code: 'Tab' });
    fireEvent.focusIn(document.body);
    await new Promise((resolve) => setTimeout(resolve, 1));
    expect(getByTestId('input-in-popper')).toHaveFocus();

    fireEvent.keyDown(document.body, { code: 'Tab' });
    fireEvent.focusIn(document.body);
    await new Promise((resolve) => setTimeout(resolve, 1));
    expect(getByTestId('input-in-popper')).toHaveFocus();

    fireEvent.keyDown(document.body, { code: 'Tab' });
    fireEvent.focusIn(document.body);
    await new Promise((resolve) => setTimeout(resolve, 1));
    expect(getByTestId('input-in-popper')).toHaveFocus();
  });

  test('focus return', () => {
    let hidePopper = undefined;
    jest.useFakeTimers();
    const Component = () => {
      const [visible, setVisible] = React.useState(true);
      hidePopper = () => setVisible(false);

      return (
        <Popper visible={visible} onVisibleChange={() => {}}>
          <Popper.Trigger data-testid="trigger">
            <input data-testid="input-in-trigger" />
          </Popper.Trigger>
          <Popper.Popper autoFocus data-testid="popper">
            <button data-testid="button-in-popper">button</button>
          </Popper.Popper>
        </Popper>
      );
    };
    const { getByTestId } = render(
      <div data-testid="container">
        <Component />
      </div>,
    );

    expect(getByTestId('button-in-popper')).toHaveFocus();

    act(() => jest.runAllTimers());
    act(() => hidePopper());
    act(() => jest.runAllTimers());
    fireEvent.animationEnd(getByTestId('popper'));
    act(() => jest.runAllTimers());

    expect(getByTestId('input-in-trigger')).toHaveFocus();
    jest.useRealTimers();
  });

  test('focus follow', () => {
    const { getByTestId } = render(
      <>
        <input data-testid="input-before-popper" />
        <Popper interaction="focus">
          <Popper.Trigger data-testid="trigger">
            <input data-testid="input-in-trigger" />
          </Popper.Trigger>
          <Popper.Popper autoFocus data-testid="popper">
            <button data-testid="button-in-popper">button</button>
          </Popper.Popper>
        </Popper>
        <input data-testid="input-after-popper" />
      </>,
    );

    act(() => getByTestId('input-before-popper').focus());
    expect(getByTestId('input-before-popper')).toHaveFocus();
    jest.useFakeTimers();
    fireEvent.keyDown(getByTestId('input-before-popper'), { code: 'Tab' });
    act(() => getByTestId('input-in-trigger').focus());
    fireEvent.focusIn(getByTestId('input-before-popper'));
    act(() => jest.runAllTimers());

    expect(getByTestId('button-in-popper')).toHaveFocus();

    fireEvent.keyDown(getByTestId('button-in-popper'), { key: 'Escape' });
    act(() => jest.runAllTimers());
    act(() => fireEvent.animationEnd(getByTestId('popper')));
    act(() => jest.runAllTimers());
    expect(document.activeElement.nodeName).toBe('DIV');
    jest.useRealTimers();
  });
});
