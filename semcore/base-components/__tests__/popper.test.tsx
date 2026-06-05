import '@semcore/testing-utils/mockCanvasContext';
import { shouldHaveDataUiName } from '@semcore/testing-utils/shared-tests';
import { cleanup, render, userEvent } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import React from 'react';

import { Popper } from '../src';

const PopperWrapper = ({ children }: { children: React.ReactNode }) => (
  <Popper disablePortal>{children}</Popper>
);

const VisiblePopperWrapper = ({ children }: { children: React.ReactNode }) => (
  <Popper visible disablePortal>
    <Popper.Trigger>Trigger</Popper.Trigger>
    {children}
  </Popper>
);

describe('Popper', () => {
  beforeEach(cleanup);

  shouldHaveDataUiName({
    Component: Popper.Trigger,
    Wrapper: PopperWrapper,
    props: { children: 'Trigger' },
    expectedDataUiName: 'Popper.Trigger',
  });

  shouldHaveDataUiName({
    Component: Popper.Popper,
    Wrapper: VisiblePopperWrapper,
    props: { children: 'Popper content' },
    expectedDataUiName: 'Popper.Popper',
  });

  describe('Visibility', () => {
    test('Verify popper content is removed from DOM when visible is false', () => {
      const { queryByText } = render(
        <Popper visible={false} disablePortal>
          <Popper.Trigger>Trigger</Popper.Trigger>
          <Popper.Popper>Popper content</Popper.Popper>
        </Popper>,
      );

      expect(queryByText('Popper content')).not.toBeInTheDocument();
    });

    test('Verify popper content appears in DOM when visible is true', () => {
      const { getByText } = render(
        <Popper visible={true} disablePortal>
          <Popper.Trigger>Trigger</Popper.Trigger>
          <Popper.Popper>Popper content</Popper.Popper>
        </Popper>,
      );

      expect(getByText('Popper content')).toBeInTheDocument();
    });
    test('Verify defaultVisible=false keeps popper hidden initially', () => {
      const { queryByText } = render(
        <Popper defaultVisible={false} disablePortal>
          <Popper.Trigger>Trigger</Popper.Trigger>
          <Popper.Popper>Content</Popper.Popper>
        </Popper>,
      );

      expect(queryByText('Content')).not.toBeInTheDocument();
    });

    test('Verify defaultVisible=true shows popper initially', () => {
      const { getByText } = render(
        <Popper defaultVisible={true} disablePortal>
          <Popper.Trigger>Trigger</Popper.Trigger>
          <Popper.Popper>Content</Popper.Popper>
        </Popper>,
      );

      expect(getByText('Content')).toBeInTheDocument();
    });
  });

  describe('onVisibleChange callback', () => {
    test('Verify onVisibleChange is called on trigger click', async () => {
      const onVisibleChange = vi.fn();

      const { getByText } = render(
        <Popper onVisibleChange={onVisibleChange} interaction='click' disablePortal>
          <Popper.Trigger>Trigger</Popper.Trigger>
          <Popper.Popper>Content</Popper.Popper>
        </Popper>,
      );

      await userEvent.click(getByText('Trigger'));

      expect(onVisibleChange).toHaveBeenCalledWith(true, expect.anything());
    });
  });
});
