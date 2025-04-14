import React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import * as sharedTests from '@semcore/testing-utils/shared-tests';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import { render, fireEvent, cleanup, screen } from '@semcore/testing-utils/testing-library';

const { shouldSupportClassName, shouldSupportRef } = sharedTests;
import FullscreenModal from '../src';

import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';

describe('fullscreen-modal Dependency imports', () => {
  runDependencyCheckTests('fullscreen-modal');
});

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

  test.sequential('Verify onClose supported for CloseIcons', () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <FullscreenModal onClose={spy} visible>
        <FullscreenModal.Close data-testid='close' />
      </FullscreenModal>,
    );
    fireEvent.click(getByTestId('close'));
    expect(spy).toBeCalledWith('onCloseClick', expect.anything());
  });

  test('Verify onClose supported for BackClick', () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <FullscreenModal onClose={spy} visible>
        <FullscreenModal.Back data-testid='back' />
      </FullscreenModal>,
    );
    fireEvent.click(getByTestId('back'));
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

  shouldSupportClassName(FullscreenModal.Header, ({ children }: any) => (
    <FullscreenModal visible>{children}</FullscreenModal>
  ));
  shouldSupportRef(FullscreenModal.Header, ({ children }: any) => (
    <FullscreenModal visible>{children}</FullscreenModal>
  ));

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
