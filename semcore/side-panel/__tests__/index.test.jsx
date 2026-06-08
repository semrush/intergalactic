import { Portal } from '@semcore/base-components';
import { shouldHaveDataUiName, runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { render, fireEvent, cleanup, userEvent } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import React from 'react';

import SidePanel from '../src';

const VisibleSidePanel = ({ children }) => (
  <SidePanel visible disablePortal aria-label='Side panel'>{children}</SidePanel>
);

const SidePanelPanelWrapper = ({ children }) => (
  <VisibleSidePanel>
    <SidePanel.Overlay>
      <SidePanel.Panel aria-label='Side panel'>{children}</SidePanel.Panel>
    </SidePanel.Overlay>
  </VisibleSidePanel>
);

describe('side-panel Dependency imports', () => {
  runDependencyCheckTests('side-panel');
});

describe('SidePanel data-ui-name', () => {
  shouldHaveDataUiName({
    Component: SidePanel,
    props: { 'visible': true, 'disablePortal': true, 'aria-label': 'Side panel', 'children': 'Content' },
    expectedDataUiName: 'SidePanel',
  });

  shouldHaveDataUiName({
    Component: SidePanel.Overlay,
    Wrapper: VisibleSidePanel,
    props: { children: <SidePanel.Panel aria-label='Side panel' /> },
    expectedDataUiName: 'SidePanel.Overlay',
  });

  shouldHaveDataUiName({
    Component: SidePanel.Panel,
    Wrapper: ({ children }) => (
      <VisibleSidePanel>
        <SidePanel.Overlay>{children}</SidePanel.Overlay>
      </VisibleSidePanel>
    ),
    props: { 'aria-label': 'Side panel' },
    expectedDataUiName: 'SidePanel.Panel',
  });

  shouldHaveDataUiName({
    Component: SidePanel.Header,
    Wrapper: VisibleSidePanel,
    props: { title: 'Header' },
    expectedDataUiName: 'SidePanel.Header',
  });

  shouldHaveDataUiName({
    Component: SidePanel.Body,
    Wrapper: SidePanelPanelWrapper,
    props: { children: 'Body' },
    expectedDataUiName: 'SidePanel.Body',
  });

  shouldHaveDataUiName({
    Component: SidePanel.Footer,
    Wrapper: SidePanelPanelWrapper,
    props: { children: 'Footer' },
    expectedDataUiName: 'SidePanel.Footer',
  });

  shouldHaveDataUiName({
    Component: SidePanel.Close,
    Wrapper: SidePanelPanelWrapper,
    expectedDataUiName: 'SidePanel.Close',
  });

  shouldHaveDataUiName({
    Component: SidePanel.Back,
    Wrapper: SidePanelPanelWrapper,
    props: { children: 'Back' },
    expectedDataUiName: 'SidePanel.Back',
  });

  shouldHaveDataUiName({
    Component: SidePanel.Title,
    Wrapper: SidePanelPanelWrapper,
    props: { children: 'Title' },
    expectedDataUiName: 'SidePanel.Title',
  });
});

describe('SidePanel', () => {
  beforeEach(cleanup);

  test('Verify visible property', () => {
    const component = render(<SidePanel aria-label='Side panel'>Content</SidePanel>);
    expect(component.queryByText('Content')).toBeNull();

    component.rerender(<SidePanel visible aria-label='Side panel'>Content</SidePanel>);
    expect(component.queryByText('Content')).not.toBeNull();
  });

  test('Verify closable false property', () => {
    const component = render(<SidePanel visible aria-label='Side panel'>Content</SidePanel>);
    expect(component.queryByLabelText('Close')).not.toBeNull();

    component.rerender(
      <SidePanel visible closable={false} aria-label='Side panel'>
        Content
      </SidePanel>,
    );
    expect(component.queryByLabelText('Close')).toBeNull();
  });

  test('Verify onClose for Esc keypress', () => {
    const spy = vi.fn();
    const component = render(
      <SidePanel visible aria-label='Side panel' onClose={spy}>
        Content
      </SidePanel>,
    );

    const sidebarNode = component.getByText('Content');

    fireEvent.keyDown(sidebarNode, { key: 'Escape' });
    expect(spy).toBeCalledWith('onEscape', expect.any(Object));
  });

  test('Verify onClose for click outside of SidePanel.Panel', () => {
    const spy = vi.fn();
    const component = render(
      <SidePanel visible aria-label='Side panel' onClose={spy}>
        <SidePanel.Overlay data-testid='overlay'>
          <SidePanel.Panel aria-label='Side panel' />
        </SidePanel.Overlay>
      </SidePanel>,
    );
    const overlayNode = component.getByTestId('overlay');

    fireEvent.mouseUp(overlayNode);
    expect(spy).toBeCalledWith('onOutsideClick', expect.any(Object));

    fireEvent.mouseUp(document.body);
    expect(spy).toBeCalledTimes(2);
    expect(spy).toBeCalledWith('onOutsideClick', expect.any(Object));
  });

  test('Verify onClose for Sidebar.Close click', async () => {
    const spy = vi.fn();
    const component = render(<SidePanel visible closable aria-label='Side panel' onClose={spy} />);
    const closeNode = component.queryByLabelText('Close');
    await userEvent.click(closeNode);
    expect(spy).toBeCalledWith('onCloseClick', expect.any(Object));
  });

  test('Verify block page scroll', () => {
    render(<SidePanel visible aria-label='Side panel' />);
    expect(document.body).toHaveStyle('overflow: hidden');
  });

  test.concurrent('Verify render function for children', () => {
    const component = <SidePanel visible aria-label='Side panel'>{() => <SidePanel.Overlay />}</SidePanel>;
    render(component);

    expect(
      document.querySelectorAll('[data-ui-name^="SidePanel"][data-ui-name$="Overlay"]').length,
    ).toBe(1);
  });

  test.skip('Verify not block page scroll without Overlay', () => {
    render(
      <SidePanel visible>
        <SidePanel.Panel aria-label='Side panel' />
      </SidePanel>,
    );
    expect(document.body).not.toHaveStyle('overflow: hidden');
  });

  test.concurrent('Verify ignorePortalsStacking prop', async () => {
    const component = render(
      <Portal>
        <SidePanel visible data-testid='inP' aria-label='Side panel in portal'>
          Content in portal
          <SidePanel ignorePortalsStacking visible data-testid='outP' aria-label='Side panel in body'>
            Content in body
          </SidePanel>
        </SidePanel>
      </Portal>,
    );

    // 4 because: empty div, canvas (from TextMeasurer for tabular-nums support),
    // div with `Content in portal` and div with `Content in body` should be in body too.
    // Without `ignorePortalsStacking`, it'll be in the first `SidePanel`.
    expect(document.body.children).toHaveLength(4);
  });
});
