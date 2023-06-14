import React from 'react';
import { testing, snapshot, shared as testsShared } from '@semcore/jest-preset-ui';
import { assert, expect, test, describe, afterEach } from 'vitest';
const { render, fireEvent, cleanup } = testing;

const { shouldSupportClassName, shouldSupportRef } = testsShared;
import FullscreenModal from '../src';

describe('FullscreenModal', () => {
  afterEach(cleanup);

  shouldSupportClassName(FullscreenModal, React.Fragment, { visible: true });
  shouldSupportRef(FullscreenModal, React.Fragment, { visible: true });

  test('should support hidden props', () => {
    const { rerender, queryByText } = render(<FullscreenModal>Text</FullscreenModal>);
    expect(queryByText(/Text/)).toBeNull();

    rerender(<FullscreenModal visible>Text</FullscreenModal>);
    expect(queryByText(/Text/)).toBeTruthy();
  });

  test('should support onClose for CloseIcons', () => {
    const spy = jest.fn();
    const { getByTestId } = render(
      <FullscreenModal onClose={spy} visible>
        <FullscreenModal.Close data-testid="close" />
      </FullscreenModal>,
    );
    fireEvent.click(getByTestId('close'));
    expect(spy).toBeCalledWith('onCloseClick', expect.anything());
  });

  test('should support onClose for BackClick', () => {
    const spy = jest.fn();
    const { getByTestId } = render(
      <FullscreenModal onClose={spy} visible>
        <FullscreenModal.Back data-testid="back" />
      </FullscreenModal>,
    );
    fireEvent.click(getByTestId('back'));
    expect(spy).toBeCalledWith('onBackClick', expect.anything());
  });

  test('should support onClose for Escape', () => {
    const spy = jest.fn();
    const { getByTestId } = render(<FullscreenModal visible onClose={spy} data-testid="modal" />);
    fireEvent.keyDown(getByTestId('modal'), { key: 'Escape' });
    expect(spy).toBeCalledWith('onEscape', expect.anything());
  });

  test('should support render', async () => {
    const Component = (
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
    expect(await snapshot(Component)).toMatchImageSnapshot();
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
  afterEach(cleanup);

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

  test('Title and Back should correctly if a very long text', async () => {
    const component = (
      <FullscreenModal disablePortal visible>
        <FullscreenModal.Header>
          <FullscreenModal.Back>Go to Tool Name Go to Tool Name</FullscreenModal.Back>
          <FullscreenModal.Title>Heading 6, 16px Heading 6, 16px</FullscreenModal.Title>
        </FullscreenModal.Header>
      </FullscreenModal>
    );

    expect(
      await snapshot(component, { selector: 'body', width: 320, height: 100 }),
    ).toMatchImageSnapshot();
  });

  test('Close icon should support hover', async () => {
    expect(
      await snapshot(
        <FullscreenModal disablePortal visible>
          <FullscreenModal.Close id="close" />
        </FullscreenModal>,
        { selector: 'body', width: 320, height: 100, actions: { hover: '#close' } },
      ),
    ).toMatchImageSnapshot();
  });

  test('Back icon should support hover', async () => {
    expect(
      await snapshot(
        <FullscreenModal disablePortal visible>
          <FullscreenModal.Back id="back">Go to Tool Name</FullscreenModal.Back>
        </FullscreenModal>,
        { selector: 'body', width: 320, height: 100, actions: { hover: '#back' } },
      ),
    ).toMatchImageSnapshot();
  });
});
