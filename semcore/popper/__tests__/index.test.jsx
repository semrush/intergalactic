import React from 'react';
import * as sharedTests from '@semcore/testing-utils/shared-tests';

import { cleanup, fireEvent, render, act } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';

const { shouldSupportClassName, shouldSupportRef } = sharedTests;
import Popper from '../src';

describe('Popper', () => {
  beforeEach(cleanup);
  test.concurrent('should render popper to outside container', () => {
    const { getByTestId } = render(
      <Popper visible>
        <Popper.Trigger data-testid="reference" />
        <Popper.Popper data-testid="popper" />
      </Popper>,
    );

    expect(getByTestId('reference')).toBeTruthy();
    expect(getByTestId('popper')).toBeTruthy();
  });

  test.concurrent('should support a custom handler a reference', () => {
    vi.useFakeTimers();
    const spy = vi.fn();
    const { getByTestId } = render(
      <Popper onVisibleChange={spy} interaction="hover">
        <Popper.Trigger data-testid="reference" />
        <Popper.Popper data-testid="popper" />
      </Popper>,
    );

    fireEvent.mouseEnter(getByTestId('reference'));
    // because wait call onVisibleChange
    act(() => {
      vi.runAllTimers();
    });
    expect(spy).toBeCalledWith(true, expect.anything());

    fireEvent.mouseLeave(getByTestId('reference'));
    // because wait call onVisibleChange
    act(() => {
      vi.runAllTimers();
    });
    expect(spy).toBeCalledWith(false, expect.anything());

    vi.useRealTimers();
  });

  test.concurrent('should support timeout for change visible', () => {
    vi.useFakeTimers();
    const spy = vi.fn();
    const { getByTestId } = render(
      <Popper onVisibleChange={spy} timeout={100}>
        <Popper.Trigger data-testid="reference" />
        <Popper.Popper data-testid="popper" />
      </Popper>,
    );

    fireEvent.click(getByTestId('reference'));
    // because wait call onVisibleChange
    act(() => vi.advanceTimersByTime(50));
    expect(spy).not.toBeCalledWith(true, expect.anything());

    // because wait call onVisibleChange
    act(() => vi.advanceTimersByTime(100));
    expect(spy).toBeCalledWith(true, expect.anything());

    vi.useRealTimers();
  });

  test.concurrent('should proxy style', async ({ task }) => {
    const { getByTestId } = render(
      <Popper visible>
        <Popper.Trigger data-testid="reference" />
        <Popper.Popper data-testid="popper" />
      </Popper>,
    );

    expect(getByTestId('popper').style.position).toEqual('absolute');
  });

  test.concurrent('should nested popper', async ({ task }) => {
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
  beforeEach(cleanup);

  shouldSupportClassName(Popper.Trigger, (props) => <Popper visible {...props} />);
  shouldSupportRef(Popper.Trigger, (props) => <Popper visible {...props} />);

  test.concurrent('should support custom attributes', () => {
    const { getByTestId } = render(
      <Popper>
        <Popper.Trigger data-testid="trigger" name="trigger" />
      </Popper>,
    );

    expect(getByTestId('trigger').attributes['name'].value).toBe('trigger');
  });

  test.concurrent('should support children', async ({ task }) => {
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
  beforeEach(cleanup);

  shouldSupportClassName(Popper.Popper, (props) => <Popper visible {...props} />);
  shouldSupportRef(Popper.Popper, (props) => <Popper visible {...props} />);

  test.concurrent('should support custom attributes', () => {
    const { getByTestId } = render(
      <Popper visible>
        <Popper.Popper data-testid="trigger" name="trigger" />
      </Popper>,
    );

    expect(getByTestId('trigger').attributes['name'].value).toBe('trigger');
  });

  test.concurrent('should support children', async ({ task }) => {
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
  beforeEach(cleanup);

  test.concurrent('auto focus', () => {
    const { getByTestId } = render(
      <Popper visible>
        <Popper.Popper autoFocus data-testid="popper">
          <input />
        </Popper.Popper>
      </Popper>,
    );

    expect(getByTestId('popper')).toHaveFocus();
  });
  test.concurrent('trap', async ({ task }) => {
    const { getByTestId } = render(
      <div>
        <input />
        <input />
        <input />
        <Popper visible>
          <Popper.Popper data-testid="popper">
            <div tabIndex={0} />
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
    expect(getByTestId('popper')).toHaveFocus();

    fireEvent.keyDown(document.body, { code: 'Tab' });
    fireEvent.focusIn(document.body);
    await new Promise((resolve) => setTimeout(resolve, 1));
    expect(getByTestId('popper')).toHaveFocus();

    fireEvent.keyDown(document.body, { code: 'Tab' });
    fireEvent.focusIn(document.body);
    await new Promise((resolve) => setTimeout(resolve, 1));
    expect(getByTestId('popper')).toHaveFocus();
  });

  test.only('focus return', () => {
    let hidePopper = undefined;
    vi.useFakeTimers();
    const Component = () => {
      const [visible, setVisible] = React.useState(true);
      hidePopper = () => setVisible(false);

      return (
        <Popper visible={visible} onVisibleChange={() => {}}>
          <Popper.Trigger data-testid="trigger" tabIndex={0}>
            trigger
          </Popper.Trigger>
          <Popper.Popper autoFocus data-testid="popper">
            <div tabIndex={0} data-testid="focusable-in-popper">
              popper
            </div>
          </Popper.Popper>
        </Popper>
      );
    };
    const { getByTestId } = render(
      <div data-testid="container">
        <Component />
      </div>,
    );

    expect(getByTestId('popper')).toHaveFocus();

    getByTestId('focusable-in-popper').focus();

    act(() => {
      vi.runAllTimers();
    });
    act(() => hidePopper());
    act(() => {
      vi.runAllTimers();
    });
    fireEvent.animationEnd(getByTestId('popper'));
    act(() => {
      vi.runAllTimers();
    });

    expect(getByTestId('trigger')).toHaveFocus();
    vi.useRealTimers();
  });

  test.concurrent('focus follow', () => {
    const { getByTestId } = render(
      <>
        <input data-testid="input-before-popper" />
        <Popper interaction="focus">
          <Popper.Trigger data-testid="trigger">
            <div tabIndex={0} data-testid="focusable-in-trigger" />
          </Popper.Trigger>
          <Popper.Popper autoFocus data-testid="popper">
            <div tabIndex={0}>button</div>
          </Popper.Popper>
        </Popper>
        <input data-testid="input-after-popper" />
      </>,
    );

    act(() => getByTestId('input-before-popper').focus());
    expect(getByTestId('input-before-popper')).toHaveFocus();
    vi.useFakeTimers();
    fireEvent.keyDown(getByTestId('input-before-popper'), { code: 'Tab' });
    act(() => getByTestId('focusable-in-trigger').focus());
    fireEvent.focusIn(getByTestId('input-before-popper'));
    act(() => {
      vi.runAllTimers();
    });

    expect(getByTestId('popper')).toHaveFocus();

    fireEvent.keyDown(getByTestId('popper'), { key: 'Escape' });
    act(() => {
      vi.runAllTimers();
    });
    act(() => fireEvent.animationEnd(getByTestId('popper')));
    act(() => {
      vi.runAllTimers();
    });
    expect(document.activeElement.nodeName).toBe('DIV');
    vi.useRealTimers();
  });
});
