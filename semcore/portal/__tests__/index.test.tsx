import React from 'react';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';
import { cleanup, render } from '@semcore/testing-utils/testing-library';
import Portal, { PortalProvider } from '../src';

describe('Portal', () => {
  beforeEach(cleanup);

  test.concurrent('should render children to outside container', () => {
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

  test.sequential('should render support disablePortal', () => {
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

  test.concurrent('should render change containerNode', () => {
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
});
