import React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import * as sharedTests from '@semcore/testing-utils/shared-tests';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import { render, fireEvent, cleanup } from '@semcore/testing-utils/testing-library';

const { shouldSupportClassName, shouldSupportRef } = sharedTests;
import FullscreenModal from '../src';

describe('FullscreenModal', () => {
  beforeEach(cleanup);

  shouldSupportClassName(FullscreenModal, React.Fragment, { visible: true });
  shouldSupportRef(FullscreenModal, React.Fragment, { visible: true });

  test('should support hidden props', () => {
    const { rerender, queryByText } = render(<FullscreenModal>Text</FullscreenModal>);
    expect(queryByText(/Text/)).toBeNull();

    rerender(<FullscreenModal visible>Text</FullscreenModal>);
    expect(queryByText(/Text/)).toBeTruthy();
  });

  test('should support onClose for CloseIcons', () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <FullscreenModal onClose={spy} visible>
        <FullscreenModal.Close data-testid="close" />
      </FullscreenModal>,
    );
    fireEvent.click(getByTestId('close'));
    expect(spy).toBeCalledWith('onCloseClick', expect.anything());
  });

  test('should support onClose for BackClick', () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <FullscreenModal onClose={spy} visible>
        <FullscreenModal.Back data-testid="back" />
      </FullscreenModal>,
    );
    fireEvent.click(getByTestId('back'));
    expect(spy).toBeCalledWith('onBackClick', expect.anything());
  });

  test('should support onClose for Escape', () => {
    const spy = vi.fn();
    const { getByTestId } = render(<FullscreenModal visible onClose={spy} data-testid="modal" />);
    fireEvent.keyDown(getByTestId('modal'), { key: 'Escape' });
    expect(spy).toBeCalledWith('onEscape', expect.anything());
  });

  test.concurrent('should support render', async ({ task }) => {
    const component = (
      <div style={{ width: '785px', height: '600px' }}>
        <FullscreenModal disablePortal visible>
          <FullscreenModal.Close />
          <FullscreenModal.Back>Go to Tool Name</FullscreenModal.Back>
          <FullscreenModal.Header>
            <FullscreenModal.Title>Heading 4, 25px very very long</FullscreenModal.Title>
            <FullscreenModal.Description>Some additional information</FullscreenModal.Description>
          </FullscreenModal.Header>
          <FullscreenModal.Body>
            <FullscreenModal.Section>
              <h4>Head content 1</h4>
            </FullscreenModal.Section>
            <FullscreenModal.Section style={{ background: '#ccc', overflow: 'auto' }}>
              <div style={{ height: '1000px' }}>
                <h4>Head content 2</h4>
              </div>
            </FullscreenModal.Section>
          </FullscreenModal.Body>
          <FullscreenModal.Footer>Footer</FullscreenModal.Footer>
        </FullscreenModal>
      </div>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test('should change overflow style for body in modal', async () => {
    // const { unmount } =
    await render(<FullscreenModal />);
    expect(document.body.style.overflow).toBe('hidden');
    // Why it's not work in console
    // unmount();
    // expect(document.body.style.overflow).toBe('');
  });
});

describe('FullscreenModal.Header', () => {
  beforeEach(cleanup);

  shouldSupportClassName(FullscreenModal.Header, ({ children }) => (
    <FullscreenModal visible>{children}</FullscreenModal>
  ));
  shouldSupportRef(FullscreenModal.Header, ({ children }) => (
    <FullscreenModal visible>{children}</FullscreenModal>
  ));

  test('should support title', () => {
    const { queryByText } = render(
      <FullscreenModal visible>
        <FullscreenModal.Header title="Text" />
      </FullscreenModal>,
    );
    expect(queryByText(/Text/)).toBeTruthy();
  });

  test('should support description', () => {
    const { queryByText } = render(
      <FullscreenModal visible>
        <FullscreenModal.Header description="Text" />
      </FullscreenModal>,
    );
    expect(queryByText(/Text/)).toBeTruthy();
  });

  test.concurrent('Title and Back should correctly if a very long text', async ({ task }) => {
    const component = (
      <FullscreenModal disablePortal visible>
        <FullscreenModal.Header>
          <FullscreenModal.Back>Go to Tool Name Go to Tool Name</FullscreenModal.Back>
          <FullscreenModal.Title>Heading 6, 16px Heading 6, 16px</FullscreenModal.Title>
        </FullscreenModal.Header>
      </FullscreenModal>
    );

    await expect(
      await snapshot(component, { selector: 'body', width: 320, height: 100 }),
    ).toMatchImageSnapshot(task);
  });

  test.concurrent('Close icon should support hover', async ({ task }) => {
    await expect(
      await snapshot(
        <FullscreenModal disablePortal visible>
          <FullscreenModal.Close id="close" />
        </FullscreenModal>,
        { selector: 'body', width: 320, height: 100, actions: { hover: '#close' } },
      ),
    ).toMatchImageSnapshot(task);
  });

  test.concurrent('Back icon should support hover', async ({ task }) => {
    await expect(
      await snapshot(
        <FullscreenModal disablePortal visible>
          <FullscreenModal.Back id="back">Go to Tool Name</FullscreenModal.Back>
        </FullscreenModal>,
        { selector: 'body', width: 320, height: 100, actions: { hover: '#back' } },
      ),
    ).toMatchImageSnapshot(task);
  });
});
