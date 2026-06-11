import {
  cleanup,
  render,
  userEvent,
  waitFor,
} from '@semcore/testing-utils/testing-library';
import { expect, test, describe, vi, afterEach } from '@semcore/testing-utils/vitest';
import React, { useRef } from 'react';

import { Hint, PortalProvider } from '../src';

describe('Hint', () => {
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

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

    await userEvent.click(getByTestId('toggle'));
    await waitFor(() => {
      expect(document.body.querySelector('[data-testid="hint"]')).not.toBeNull();
    });

    await userEvent.click(getByTestId('toggle'));
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

    const trigger = getByTestId('trigger');
    await userEvent.hover(trigger);

    await waitFor(() => {
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenLastCalledWith(true);
    });

    await waitFor(() => {
      const hint = document.body.querySelector('[data-ui-name="Hint"]');
      expect(hint).toBeInstanceOf(HTMLElement);
      expect((hint as HTMLElement).style.left).not.toBe('');
      expect((hint as HTMLElement).style.top).not.toBe('');
      expect((hint as HTMLElement).style.cssText).toContain('--keyframesInitialize');
    });

    await userEvent.unhover(trigger);

    await waitFor(() => {
      expect(handleChange).toHaveBeenCalledTimes(2);
      expect(handleChange).toHaveBeenLastCalledWith(false);
    });
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

    await userEvent.hover(getByTestId('trigger'));
    await new Promise((resolve) => setTimeout(resolve, 60));

    expect(handleChange).not.toHaveBeenCalled();
  });

  test('Should not show hint when children is empty string', async () => {
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

    await userEvent.hover(getByTestId('trigger'));
    await new Promise((resolve) => setTimeout(resolve, 60));

    expect(handleChange).not.toHaveBeenCalled();
  });

  test('Should ignore portal stacking by default and render into document.body', async () => {
    const containerRef = React.createRef<HTMLDivElement>();

    const TestComponent = () => {
      const ref = useRef<HTMLButtonElement>(null);
      return (
        <>
          <div data-testid='portal-container' ref={containerRef} />
          <PortalProvider value={containerRef}>
            <button ref={ref} data-testid='trigger'>Hover</button>
            <Hint triggerRef={ref} defaultVisible={true} data-testid='hint'>
              Hint text
            </Hint>
          </PortalProvider>
        </>
      );
    };

    render(<TestComponent />);

    await waitFor(() => {
      expect(document.body.querySelector('[data-testid="hint"]')).not.toBeNull();
    });

    const container = document.querySelector('[data-testid="portal-container"]');
    expect(container?.querySelector('[data-testid="hint"]')).toBeNull();
  });

  test('Should respect portal stacking when ignorePortalsStacking is false', async () => {
    const containerRef = React.createRef<HTMLDivElement>();

    const TestComponent = () => {
      const ref = useRef<HTMLButtonElement>(null);
      return (
        <>
          <div data-testid='portal-container' ref={containerRef} />
          <PortalProvider value={containerRef}>
            <button ref={ref} data-testid='trigger'>Hover</button>
            <Hint triggerRef={ref} defaultVisible={true} ignorePortalsStacking={false} data-testid='hint'>
              Hint text
            </Hint>
          </PortalProvider>
        </>
      );
    };

    render(<TestComponent />);

    await waitFor(() => {
      const container = document.querySelector('[data-testid="portal-container"]');
      expect(container?.querySelector('[data-testid="hint"]')).not.toBeNull();
    });
  });
});
