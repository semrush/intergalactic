import React from 'react';
import { render, fireEvent, cleanup } from 'jest-preset-ui/testing';
import snapshot from 'jest-preset-ui/snapshot';
import SidePanel, { SidePanelPlacement } from '../src';

describe('Drawer', () => {
  afterEach(cleanup);

  test('Should support placements', async () => {
    const placements: SidePanelPlacement[] = ['left', 'right', 'bottom'];
    for (const placement of placements) {
      const Component = (
        <SidePanel placement={placement} disablePortal visible>
          Hello, world!
        </SidePanel>
      );

      expect(await snapshot(Component, { selector: 'body' })).toMatchImageSnapshot();
    }
  });

  test('Should support closable property', async () => {
    const Component = (
      <SidePanel closable disablePortal visible>
        Hello, world!
      </SidePanel>
    );

    expect(await snapshot(Component, { selector: 'body' })).toMatchImageSnapshot();
  });

  test('Should support visible property', () => {
    const component = render(<SidePanel>Content</SidePanel>);
    expect(component.queryByText('Content')).toBeNull();

    component.rerender(<SidePanel visible>Content</SidePanel>);
    expect(component.queryByText('Content')).not.toBeNull();
  });

  test('Should support closable false property', () => {
    const component = render(<SidePanel visible>Content</SidePanel>);
    expect(component.queryByTitle('Close')).not.toBeNull();

    component.rerender(
      <SidePanel visible closable={false}>
        Content
      </SidePanel>,
    );
    expect(component.queryByTitle('Close')).toBeNull();
  });

  test('Should support onClose for Esc keypress', () => {
    const spy = jest.fn();
    const component = render(
      <SidePanel visible onClose={spy}>
        Content
      </SidePanel>,
    );

    const sidebarNode = component.getByText('Content');

    fireEvent.keyDown(sidebarNode, { key: 'Escape' });
    expect(spy).toBeCalledWith('onEscape', expect.any(Object));
  });

  test('Should support onClose for click outside of SidePanel.Panel', () => {
    const spy = jest.fn();
    const component = render(
      <SidePanel visible onClose={spy}>
        <SidePanel.Overlay data-testid={'overlay'}>
          <SidePanel.Panel />
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

  test('Should support onClose for Sidebar.Close click', () => {
    const spy = jest.fn();
    const component = render(<SidePanel visible closable onClose={spy} />);
    const closeNode = component.getByTitle('Close');
    fireEvent.click(closeNode);
    expect(spy).toBeCalledWith('onCloseClick', expect.any(Object));
  });

  test('Should block page scroll', () => {
    render(<SidePanel visible />);
    expect(document.body).toHaveStyle('overflow: hidden');
  });

  xtest('Should support not block page scroll without Overlay', () => {
    render(
      <SidePanel visible>
        <SidePanel.Panel />
      </SidePanel>,
    );
    expect(document.body).not.toHaveStyle('overflow: hidden');
  });
});
