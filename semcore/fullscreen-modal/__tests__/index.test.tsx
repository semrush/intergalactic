import { shouldHaveDataUiName, runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { render, fireEvent, cleanup, screen, userEvent } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import React from 'react';

import FullscreenModal from '../src';

const VisibleFullscreenModal = ({ children }: any) => (
  <FullscreenModal visible disablePortal>{children}</FullscreenModal>
);

describe('fullscreen-modal Dependency imports', () => {
  runDependencyCheckTests('fullscreen-modal');
});

describe('FullscreenModal', () => {
  beforeEach(cleanup);

  shouldHaveDataUiName({
    Component: FullscreenModal,
    props: { visible: true },
    expectedDataUiName: 'FullscreenModal',
  });

  shouldHaveDataUiName({
    Component: FullscreenModal.Body,
    Wrapper: VisibleFullscreenModal,
    props: { children: 'Body' },
    expectedDataUiName: 'FullscreenModal.Body',
  });

  shouldHaveDataUiName({
    Component: FullscreenModal.Section,
    Wrapper: VisibleFullscreenModal,
    props: { children: 'Section' },
    expectedDataUiName: 'FullscreenModal.Section',
  });

  shouldHaveDataUiName({
    Component: FullscreenModal.Footer,
    Wrapper: VisibleFullscreenModal,
    props: { children: 'Footer' },
    expectedDataUiName: 'FullscreenModal.Footer',
  });

  shouldHaveDataUiName({
    Component: FullscreenModal.Close,
    Wrapper: VisibleFullscreenModal,
    expectedDataUiName: 'FullscreenModal.Close',
  });

  shouldHaveDataUiName({
    Component: FullscreenModal.Back,
    Wrapper: VisibleFullscreenModal,
    props: { children: 'Back' },
    expectedDataUiName: 'FullscreenModal.Back',
  });

  shouldHaveDataUiName({
    Component: FullscreenModal.Title,
    Wrapper: VisibleFullscreenModal,
    props: { children: 'Title' },
    expectedDataUiName: 'FullscreenModal.Title',
  });

  shouldHaveDataUiName({
    Component: FullscreenModal.Description,
    Wrapper: VisibleFullscreenModal,
    props: { children: 'Description' },
    expectedDataUiName: 'FullscreenModal.Description',
  });

  test('should support hidden props', () => {
    const { rerender, queryByText } = render(<FullscreenModal>Text</FullscreenModal>);
    expect(queryByText(/Text/)).toBeNull();

    rerender(<FullscreenModal visible>Text</FullscreenModal>);
    expect(queryByText(/Text/)).toBeTruthy();
  });

  test.sequential('Verify onClose supported for CloseIcons', async () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <FullscreenModal onClose={spy} visible>
        <FullscreenModal.Close data-testid='close' />
      </FullscreenModal>,
    );
    await userEvent.click(getByTestId('close'));
    expect(spy).toBeCalledWith('onCloseClick', expect.anything());
  });

  test('Verify onClose supported for BackClick', async () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <FullscreenModal onClose={spy} visible>
        <FullscreenModal.Back data-testid='back' />
      </FullscreenModal>,
    );
    await userEvent.click(getByTestId('back'));
    expect(spy).toBeCalledWith('onBackClick', expect.anything());
  });

  test.sequential('Verify onClose supported for Escape', () => {
    const spy = vi.fn();
    const { getByTestId } = render(<FullscreenModal visible onClose={spy} data-testid='modal' />);
    fireEvent.keyDown(getByTestId('modal'), { key: 'Escape' });
    expect(spy).toBeCalledWith('onEscape', expect.anything());
  });

  test('Verify overflow changes style for body in modal', async () => {
    const { unmount } = await render(<FullscreenModal />);
    expect(document.body.style.overflow).toBe('hidden');

    unmount();
    expect(document.body.style.overflow).toBe('');
  });

  test('Verify not render when visible is false', async () => {
    render(<FullscreenModal visible={false} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});

describe('FullscreenModal.Header', () => {
  beforeEach(cleanup);

  shouldHaveDataUiName({
    Component: FullscreenModal.Header,
    Wrapper: VisibleFullscreenModal,
    expectedDataUiName: 'FullscreenModal.Header',
  });

  test('Verify supports title', () => {
    const { queryByText } = render(
      <FullscreenModal visible>
        <FullscreenModal.Header title='Text' />
      </FullscreenModal>,
    );
    expect(queryByText(/Text/)).toBeTruthy();
  });

  test('Verify supports description', () => {
    const { queryByText } = render(
      <FullscreenModal visible>
        <FullscreenModal.Header description='Text' />
      </FullscreenModal>,
    );
    expect(queryByText(/Text/)).toBeTruthy();
  });
});
