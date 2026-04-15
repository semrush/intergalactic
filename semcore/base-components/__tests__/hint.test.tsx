import { expect, test, describe, vi, afterEach } from '@semcore/testing-utils/vitest';
import { render, fireEvent, waitFor, cleanup, act } from '@testing-library/react';
import React, { useRef } from 'react';
import { userEvent } from 'storybook/test';

import { Hint } from '../src';

describe('Hint', () => {
  afterEach(cleanup);
  test('Should support controlled visible mode', async () => {
    const TestComponent = () => {
      const [visible, setVisible] = React.useState(false);
      const ref = useRef<HTMLButtonElement>(null);

      return (
        <>
          <button data-testid='toggle' onClick={() => setVisible(!visible)}>
            Toggle
          </button>
          <button ref={ref} data-testid='trigger'>Hover</button>
          <Hint triggerRef={ref} visible={visible} data-testid='hint'>
            Hint text
          </Hint>
        </>
      );
    };

    const { getByTestId } = render(<TestComponent />);

    expect(document.body.querySelector('[data-testid="hint"]')).toBeNull();

    fireEvent.click(getByTestId('toggle'));
    await waitFor(() => {
      expect(document.body.querySelector('[data-testid="hint"]')).not.toBeNull();
    });

    fireEvent.click(getByTestId('toggle'));
    await waitFor(() => {
      expect(document.body.querySelector('[data-testid="hint"]')).toBeNull();
    });
  });

  test('Should call onVisibleChange callback', async () => {
    const handleChange = vi.fn();

    const TestComponent = () => {
      const ref = useRef<HTMLButtonElement>(null);
      return (
        <>
          <button ref={ref} data-testid='trigger'>Hover</button>
          <Hint triggerRef={ref} onVisibleChange={handleChange} timeout={[50, 50]}>
            Hint text
          </Hint>
        </>
      );
    };

    const { getByTestId } = render(<TestComponent />);

    await userEvent.hover(getByTestId('trigger'));

    await new Promise((resolve) => setTimeout(resolve, 70));
    expect(handleChange).toHaveBeenCalledWith(true);

    await userEvent.unhover(getByTestId('trigger'));

    await new Promise((resolve) => setTimeout(resolve, 70));
    expect(handleChange).toHaveBeenCalledWith(false);
  });

  test('Should use defaultVisible for initial state', () => {
    const TestComponent = () => {
      const ref = useRef<HTMLButtonElement>(null);
      return (
        <>
          <button ref={ref} data-testid='trigger'>Hover</button>
          <Hint triggerRef={ref} defaultVisible={true}>
            <div data-testid='hint'>Hint text</div>
          </Hint>
        </>
      );
    };

    render(<TestComponent />);

    expect(document.body.querySelector('[data-testid="hint"]')).not.toBeNull();
  });

  test('Should not show hint when children is false', async () => {
    vi.useFakeTimers();
    const handleChange = vi.fn();

    const TestComponent = () => {
      const ref = useRef<HTMLButtonElement>(null);
      return (
        <>
          <button ref={ref} data-testid='trigger'>Hover</button>
          <Hint triggerRef={ref} onVisibleChange={handleChange} timeout={[50, 50]}>
            {false}
          </Hint>
        </>
      );
    };

    const { getByTestId } = render(<TestComponent />);

    fireEvent.mouseEnter(getByTestId('trigger'));
    vi.advanceTimersByTime(60);

    await waitFor(() => {
      expect(handleChange).not.toHaveBeenCalled();
    });

    vi.useRealTimers();
  });

  test('Should not show hint when children is empty string', async () => {
    vi.useFakeTimers();
    const handleChange = vi.fn();

    const emptyString = '';
    const TestComponent = () => {
      const ref = useRef<HTMLButtonElement>(null);
      return (
        <>
          <button ref={ref} data-testid='trigger'>Hover</button>
          <Hint triggerRef={ref} onVisibleChange={handleChange} timeout={[50, 50]}>
            {emptyString}
          </Hint>
        </>
      );
    };

    const { getByTestId } = render(<TestComponent />);

    fireEvent.mouseEnter(getByTestId('trigger'));
    vi.advanceTimersByTime(60);

    await waitFor(() => {
      expect(handleChange).not.toHaveBeenCalled();
    });

    vi.useRealTimers();
  });
});
