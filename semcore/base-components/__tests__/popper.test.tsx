import {
  cleanup,
  render,
  fireEvent,
  act,
} from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import React from 'react';

import { Popper } from '../src';

describe('Popper', () => {
  beforeEach(cleanup);

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
    test('Verify onVisibleChange is called on trigger click', () => {
      vi.useFakeTimers();
      const onVisibleChange = vi.fn();

      const { getByText } = render(
        <Popper onVisibleChange={onVisibleChange} interaction='click' disablePortal>
          <Popper.Trigger>Trigger</Popper.Trigger>
          <Popper.Popper>Content</Popper.Popper>
        </Popper>,
      );

      fireEvent.click(getByText('Trigger'));
      act(() => {
        vi.advanceTimersByTime(0);
      });

      expect(onVisibleChange).toHaveBeenCalledWith(true, expect.anything());
      vi.useRealTimers();
    });
  });
});
