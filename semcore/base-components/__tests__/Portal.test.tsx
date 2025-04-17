import React from 'react';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import { cleanup, render } from '@semcore/testing-utils/testing-library';
import { Portal, PortalProvider } from '../src';

import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';

describe('portal Dependency imports', () => {
  runDependencyCheckTests('portal');
});

describe('Portal', () => {
  beforeEach(cleanup);

  test.concurrent('Verify render children to outside container', () => {
    const { getByTestId } = render(
      <div data-testid='parent'>
        <Portal>
          <div data-testid='child' />
        </Portal>
      </div>,
    );
    // Not render to container,
    expect(getByTestId('parent').children.length).toEqual(0);
    // but render to body
    expect((document.body.lastChild as HTMLElement)?.dataset.testid).toEqual('child');
  });

  test.sequential('Verify render supports disablePortal', () => {
    const { getByTestId } = render(
      <div data-testid='parent'>
        <Portal disablePortal>
          <div data-testid='child' />
        </Portal>
      </div>,
    );
    // Render to container,
    expect(getByTestId('parent').children.length).toEqual(1);
    // but not render to body
    expect((document.body.lastChild as HTMLElement)?.dataset.testid).toEqual(undefined);
  });

  test.concurrent('Verify render change containerNode', () => {
    const containerRef = React.createRef<any>();
    const { getByTestId } = render(
      <>
        <div data-testid='container' ref={containerRef} />
        <PortalProvider value={containerRef}>
          <Portal>
            <div data-testid='child' />
          </Portal>
          <Portal>
            <div data-testid='child' />
          </Portal>
        </PortalProvider>
      </>,
    );
    expect(getByTestId('container').querySelectorAll('[data-testid="child"]').length).toEqual(2);
  });

  test.concurrent(
    'Verify portal attached directly to document.body when ignorePortalsStacking is true',
    () => {
      const { getByTestId } = render(
        <div data-testid='parent'>
          <Portal ignorePortalsStacking>
            <div data-testid='child' />
          </Portal>
        </div>,
      );
      // Not render to container,
      expect(getByTestId('parent').children.length).toEqual(0);
      // but render to body
      expect((document.body.lastChild as HTMLElement)?.dataset.testid).toEqual('child');
    },
  );

  test.concurrent('Verify onMount callback', () => {
    const onMount = vi.fn();
    const Component = (
      <Portal onMount={onMount}>
        <div>Test Content</div>
      </Portal>
    );

    const { unmount, rerender } = render(Component);

    expect(onMount).toHaveBeenCalledWith(true);

    rerender(Component);
    expect(onMount).toHaveBeenCalledTimes(1);

    unmount();
    expect(onMount).toHaveBeenCalledTimes(1);
  });
});
