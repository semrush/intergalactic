import React from 'react';
import { testing } from '@semcore/jest-preset-ui';
const { render, fireEvent, cleanup } = testing;
import { snapshot } from '@semcore/jest-preset-ui';
import { shared as testsShared } from '@semcore/jest-preset-ui';
const { shouldSupportClassName, shouldSupportRef } = testsShared;
import FullscreenModal from '../src';

describe('FullscreenModal', () => {
  afterEach(cleanup);

  shouldSupportClassName(FullscreenModal);
  shouldSupportRef(FullscreenModal);

  test('should support hidden props', () => {
    const { rerender, queryByText } = render(
      <FullscreenModal visible={false}>Text</FullscreenModal>,
    );
    expect(queryByText(/Text/)).toBeNull();

    rerender(<FullscreenModal>Text</FullscreenModal>);
    expect(queryByText(/Text/)).toBeTruthy();
  });

  test('should support onClose for CloseIcons', () => {
    const spy = jest.fn();
    const { getByTestId } = render(
      <FullscreenModal onClose={spy}>
        <FullscreenModal.Close data-testid="close" />
      </FullscreenModal>,
    );
    fireEvent.click(getByTestId('close'));
    expect(spy).toBeCalledWith('onCloseClick', expect.anything());
  });

  test('should support onClose for BackClick', () => {
    const spy = jest.fn();
    const { getByTestId } = render(
      <FullscreenModal onClose={spy}>
        <FullscreenModal.Back data-testid="back" />
      </FullscreenModal>,
    );
    fireEvent.click(getByTestId('back'));
    expect(spy).toBeCalledWith('onBackClick', expect.anything());
  });

  test('should support onClose for Escape', () => {
    const spy = jest.fn();
    const { getByTestId } = render(<FullscreenModal onClose={spy} data-testid="modal" />);
    fireEvent.keyDown(getByTestId('modal'), { key: 'Escape' });
    expect(spy).toBeCalledWith('onEscape', expect.anything());
  });

  test('should support render', async () => {
    const Component = (
      <div style={{ width: '785px', height: '600px' }}>
        <FullscreenModal disablePortal>
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
    const { unmount } = await render(<FullscreenModal />);
    expect(document.body.style.overflow).toBe('hidden');
    // Why it's not work in console
    // unmount();
    // expect(document.body.style.overflow).toBe('');
  });
});

describe('FullscreenModal.Header', () => {
  afterEach(cleanup);

  shouldSupportClassName(FullscreenModal.Header, FullscreenModal);
  shouldSupportRef(FullscreenModal.Header, FullscreenModal);

  test('should support title', () => {
    const { queryByText } = render(
      <FullscreenModal>
        <FullscreenModal.Header title="Text" />
      </FullscreenModal>,
    );
    expect(queryByText(/Text/)).toBeTruthy();
  });

  test('should support description', () => {
    const { queryByText } = render(
      <FullscreenModal>
        <FullscreenModal.Header description="Text" />
      </FullscreenModal>,
    );
    expect(queryByText(/Text/)).toBeTruthy();
  });
});
