import React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import { render, fireEvent, cleanup } from '@semcore/testing-utils/testing-library';

import SidePanel from '../src';

describe('SidePanel', () => {
  beforeEach(cleanup);

  test.concurrent('Should support placements', async ({ task }) => {
    const placements = ['left', 'right', 'bottom'];
    for (const placement of placements) {
      const Component = (
        <SidePanel placement={placement} disablePortal visible>
          Hello, world!
        </SidePanel>
      );

      await expect(await snapshot(Component, { selector: 'body' })).toMatchImageSnapshot(task);
    }
  });

  test.concurrent('Should support closable property', async ({ task }) => {
    const Component = (
      <SidePanel closable disablePortal visible>
        Hello, world!
      </SidePanel>
    );

    await expect(
      await snapshot(Component, { selector: 'body', width: 300, height: 100 }),
    ).toMatchImageSnapshot(task);
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
    const spy = vi.fn();
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
    const spy = vi.fn();
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
    const spy = vi.fn();
    const component = render(<SidePanel visible closable onClose={spy} />);
    const closeNode = component.getByTitle('Close');
    fireEvent.click(closeNode);
    expect(spy).toBeCalledWith('onCloseClick', expect.any(Object));
  });

  test('Should block page scroll', () => {
    render(<SidePanel visible />);
    expect(document.body).toHaveStyle('overflow: hidden');
  });

  test.concurrent('should support render function for children', () => {
    const component = <SidePanel visible>{() => <SidePanel.Overlay />}</SidePanel>;
    render(component);

    expect(
      document.querySelectorAll('[data-ui-name^="SidePanel"][data-ui-name$="Overlay"]').length,
    ).toBe(1);
  });

  test('Should support not block page scroll without Overlay', () => {
    render(
      <SidePanel visible>
        <SidePanel.Panel />
      </SidePanel>,
    );
    expect(document.body).not.toHaveStyle('overflow: hidden');
  });

  test.concurrent('Close icon should support hover', async ({ task }) => {
    await expect(
      await snapshot(
        <SidePanel disablePortal visible>
          <SidePanel.Close id='close' />
        </SidePanel>,
        { selector: 'body', width: 320, height: 100, actions: { hover: '#close' } },
      ),
    ).toMatchImageSnapshot(task);
  });

  test.concurrent('Should correctly render', async ({ task }) => {
    const Component = (
      <SidePanel disablePortal visible>
        <SidePanel.Close />
        <SidePanel.Header>
          <SidePanel.Back>Go to Tool Name</SidePanel.Back>
          <SidePanel.Title>Heading 6, 16px</SidePanel.Title>
        </SidePanel.Header>
        <SidePanel.Body> ???? </SidePanel.Body>
        <SidePanel.Footer justifyContent='center' pt={2}>
          <button type='button'>Primary</button>
          <button type='button' style={{ marginLeft: '8px' }}>
            Cancel
          </button>
        </SidePanel.Footer>
      </SidePanel>
    );
    await expect(
      await snapshot(Component, { selector: 'body', width: 300, height: 300 }),
    ).toMatchImageSnapshot(task);
  });

  test.concurrent('Title and Back should correctly if a very long text', async ({ task }) => {
    const component = (
      <SidePanel disablePortal visible>
        <SidePanel.Header>
          <SidePanel.Back>Go to Tool Name Go to Tool Name</SidePanel.Back>
          <SidePanel.Title>Heading 6, 16px Heading 6, 16px</SidePanel.Title>
        </SidePanel.Header>
      </SidePanel>
    );

    await expect(
      await snapshot(component, { selector: 'body', width: 320, height: 100 }),
    ).toMatchImageSnapshot(task);
  });

  test.concurrent('Close icon should support hover', async ({ task }) => {
    await expect(
      await snapshot(
        <SidePanel disablePortal visible>
          <SidePanel.Close id='close' />
        </SidePanel>,
        { selector: 'body', width: 320, height: 100, actions: { hover: '#close' } },
      ),
    ).toMatchImageSnapshot(task);
  });

  test.concurrent('Back icon should support hover', async ({ task }) => {
    await expect(
      await snapshot(
        <SidePanel disablePortal visible>
          <SidePanel.Header>
            <SidePanel.Back id='back'>Go to Tool Name</SidePanel.Back>
          </SidePanel.Header>
        </SidePanel>,
        { selector: 'body', width: 320, height: 100, actions: { hover: '#back' } },
      ),
    ).toMatchImageSnapshot(task);
  });
});
