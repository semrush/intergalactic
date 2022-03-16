import React from 'react';
import { testing } from '@semcore/cli/tools/jest-preset-ui';
const { cleanup, render } = testing;
import Portal, { PortalProvider } from '../src';

describe('Portal', () => {
  afterEach(cleanup);

  test('should render children to outside container', () => {
    const { getByTestId } = render(
      <div data-testid="parent">
        <Portal>
          <div data-testid="child" />
        </Portal>
      </div>,
    );
    // Not render to container,
    expect(getByTestId('parent').children.length).toEqual(0);
    // but render to body
    expect(document.body.lastChild.dataset.testid).toEqual('child');
  });

  test('should render support disablePortal', () => {
    const { getByTestId } = render(
      <div data-testid="parent">
        <Portal disablePortal>
          <div data-testid="child" />
        </Portal>
      </div>,
    );
    // Render to container,
    expect(getByTestId('parent').children.length).toEqual(1);
    // but not render to body
    expect(document.body.lastChild.dataset.testid).toEqual(undefined);
  });

  test('should render change containerNode', () => {
    const containerRef = React.createRef<any>();
    const { getByTestId } = render(
      <>
        <div data-testid="container" ref={containerRef} />
        <PortalProvider value={containerRef}>
          <Portal>
            <div data-testid="child" />
          </Portal>
          <Portal>
            <div data-testid="child" />
          </Portal>
        </PortalProvider>
      </>,
    );
    expect(getByTestId('container').querySelectorAll('[data-testid="child"]').length).toEqual(2);
  });
});
