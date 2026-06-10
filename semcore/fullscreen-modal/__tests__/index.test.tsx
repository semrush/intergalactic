import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { render, cleanup, screen, userEvent } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import React from 'react';

import FullscreenModal from '../src';

describe('fullscreen-modal Dependency imports', () => {
  runDependencyCheckTests('fullscreen-modal');
});

describe('FullscreenModal', () => {
  beforeEach(cleanup);

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
        <FullscreenModal.Back aria-label='Back' data-testid='back' />
      </FullscreenModal>,
    );
    await userEvent.click(getByTestId('back'));
    expect(spy).toBeCalledWith('onBackClick', expect.anything());
  });

  test.sequential('Verify onClose supported for Escape', async () => {
    const spy = vi.fn();
    const { getByTestId } = render(<FullscreenModal visible onClose={spy} data-testid='modal' />);
    const modal = getByTestId('modal');
    modal.focus();
    expect(modal).toHaveFocus();

    await userEvent.keyboard('[Escape]');
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
