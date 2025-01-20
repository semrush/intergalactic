import React from 'react';
import * as sharedTests from '@semcore/testing-utils/shared-tests';

import { cleanup, fireEvent, render, act, userEvent } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';

const { shouldSupportClassName, shouldSupportRef } = sharedTests;
import { Popper } from '../src';

describe('Popper', () => {
  beforeEach(cleanup);
  test.concurrent('should render popper to outside container', () => {
    const { getByTestId } = render(
      <Popper visible>
        <Popper.Trigger data-testid='reference' />
        <Popper.Popper data-testid='popper' />
      </Popper>,
    );

    expect(getByTestId('reference')).toBeTruthy();
    expect(getByTestId('popper')).toBeTruthy();
  });

  test.sequential('should support a custom handler a reference', () => {
    vi.useFakeTimers();
    const spy = vi.fn();
    const { getByTestId } = render(
      <Popper onVisibleChange={spy} interaction='hover'>
        <Popper.Trigger data-testid='reference' />
        <Popper.Popper data-testid='popper' />
      </Popper>,
    );

    fireEvent.mouseMove(getByTestId('reference'));
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

  test.sequential('should support timeout for change visible', () => {
    vi.useFakeTimers();
    const spy = vi.fn();
    const { getByTestId } = render(
      <Popper onVisibleChange={spy} timeout={100}>
        <Popper.Trigger data-testid='reference' />
        <Popper.Popper data-testid='popper' />
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

  test.sequential('should proxy style', async () => {
    const { getByTestId } = render(
      <Popper visible>
        <Popper.Trigger data-testid='reference' />
        <Popper.Popper data-testid='popper' />
      </Popper>,
    );

    expect(getByTestId('popper').style.position).toEqual('absolute');
  });

  test.sequential('should nested popper', async () => {
    const { getByTestId } = render(
      <Popper visible>
        <Popper.Trigger children='trigger 1' />
        <Popper.Popper>
          content 1
          <Popper visible>
            <Popper.Trigger children='trigger 2' />
            <Popper.Popper data-testid='popper'>content 2</Popper.Popper>
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
        <Popper.Trigger data-testid='trigger' name='trigger' />
      </Popper>,
    );

    expect(getByTestId('trigger').attributes['name'].value).toBe('trigger');
  });

  test.concurrent('should support children', async () => {
    const component = (
      <Popper>
        <Popper.Trigger>
          <p data-testid='child'>Test</p>
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
        <Popper.Popper data-testid='trigger' name='trigger' />
      </Popper>,
    );

    expect(getByTestId('trigger').attributes['name'].value).toBe('trigger');
  });

  test.concurrent('should support children', async () => {
    const component = (
      <Popper visible>
        <Popper.Popper>
          <p data-testid='child'>Test</p>
        </Popper.Popper>
      </Popper>
    );
    const { getByTestId } = render(component);

    expect(getByTestId('child')).toBeTruthy();
  });
});

describe('focus control', () => {
  beforeEach(cleanup);

  test('auto focus', () => {
    vi.useFakeTimers();
    const { getByTestId } = render(
      <Popper visible disablePortal>
        <Popper.Popper autoFocus data-testid='popper' tabIndex={0}>
          <input />
        </Popper.Popper>
      </Popper>,
    );

    act(() => {
      vi.runAllTimers();
    });

    expect(getByTestId('popper')).toHaveFocus();
    vi.useRealTimers();
  });
  test('trap', async () => {
    const { getByTestId } = render(
      <div>
        <input />
        <input />
        <input />
        <Popper visible disablePortal>
          <Popper.Popper autoFocus data-testid='popper' tabIndex={0}>
            <div tabIndex={0} />
          </Popper.Popper>
        </Popper>
        <input />
        <input />
        <input />
      </div>,
    );

    await new Promise((r) => setTimeout(r, 0));

    const PopperElement = getByTestId('popper');

    expect(PopperElement).toHaveFocus();

    await userEvent.keyboard('[Tab]');
    await userEvent.keyboard('[Tab]');

    expect(PopperElement).toHaveFocus();

    await userEvent.keyboard('{Shift>}[Tab]');
    await userEvent.keyboard('{Shift>}[Tab]');

    expect(PopperElement).toHaveFocus();
  });

  test('should lock focus inside popper', async () => {
    const { getByTestId } = render(
      <div>
        <input />
        <input />
        <input />
        <Popper visible disablePortal>
          <Popper.Popper autoFocus data-testid='popper' tabIndex={0}>
            <div tabIndex={0} data-testid='div-1' />
            <div tabIndex={0} data-testid='div-2' />
            <div tabIndex={0} data-testid='div-3' />
          </Popper.Popper>
        </Popper>
        <input />
        <input />
        <input />
      </div>,
    );

    await new Promise((r) => setTimeout(r, 0));

    const popperElement = getByTestId('popper');
    const div1Element = getByTestId('div-1');
    const div2Element = getByTestId('div-2');
    const div3Element = getByTestId('div-3');
    expect(popperElement).toHaveFocus();
    await userEvent.keyboard('[Tab]');
    expect(div1Element).toHaveFocus();
    await userEvent.keyboard('[Tab]');
    expect(div2Element).toHaveFocus();
    await userEvent.keyboard('[Tab]');
    expect(div3Element).toHaveFocus();
    await userEvent.keyboard('[Tab]');
    expect(popperElement).toHaveFocus();
    await userEvent.keyboard('[Tab]');
    expect(div1Element).toHaveFocus();
    await userEvent.keyboard('{Shift>}[Tab]');
    expect(popperElement).toHaveFocus();
    await userEvent.keyboard('{Shift>}[Tab]');
    expect(div3Element).toHaveFocus();
  });

  test('focus return', () => {
    let hidePopper = undefined;
    vi.useFakeTimers();
    const Component = () => {
      const [visible, setVisible] = React.useState(true);
      hidePopper = () => setVisible(false);

      return (
        <Popper visible={visible} disablePortal onVisibleChange={() => {}}>
          <Popper.Trigger data-testid='trigger' tabIndex={0}>
            trigger
          </Popper.Trigger>
          <Popper.Popper autoFocus data-testid='popper' tabIndex={0}>
            <div tabIndex={0} data-testid='focusable-in-popper'>
              popper
            </div>
          </Popper.Popper>
        </Popper>
      );
    };
    const { getByTestId } = render(
      <div data-testid='container'>
        <Component />
      </div>,
    );

    act(() => {
      vi.runAllTimers();
    });

    expect(getByTestId('popper')).toHaveFocus();

    act(() => {
      vi.runAllTimers();
    });

    getByTestId('focusable-in-popper').focus();

    act(() => {
      vi.runAllTimers();
    });
    expect(getByTestId('focusable-in-popper')).toHaveFocus();
    act(() => hidePopper());
    act(() => {
      vi.runAllTimers();
    });

    expect(getByTestId('trigger')).toHaveFocus();
    vi.useRealTimers();
  });

  test('focus follow', async ({ expect }) => {
    const { getByTestId } = render(
      <>
        <input data-testid='input-before-popper' />
        <Popper disablePortal interaction='focus'>
          <Popper.Trigger data-testid='trigger'>
            <div tabIndex={0} data-testid='focusable-in-trigger' />
          </Popper.Trigger>
          <Popper.Popper autoFocus data-testid='popper' tabIndex={0}>
            <div tabIndex={0}>button</div>
          </Popper.Popper>
        </Popper>
        <input data-testid='input-after-popper' />
      </>,
    );

    await userEvent.keyboard('[Tab]');
    expect(getByTestId('input-before-popper')).toHaveFocus();

    await userEvent.keyboard('[Tab]');
    expect(getByTestId('focusable-in-trigger')).toHaveFocus();
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(getByTestId('popper')).toHaveFocus();

    await userEvent.keyboard('[Escape]');
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(getByTestId('focusable-in-trigger')).toHaveFocus();
  });
});
