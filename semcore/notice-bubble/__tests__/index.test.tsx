import { extractUIName } from '@semcore/testing-utils/shared/extractUINameTree.ts';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import {
  act,
  render,
  cleanup,
  waitFor,
} from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import React from 'react';

import { NoticeBubbleContainer } from '../src';
import { NoticeBubbleManager } from '../src/NoticeBubbleManager';

describe('notice-bubble Dependency imports', () => {
  runDependencyCheckTests('notice-bubble');
});

describe('NoticeBubbleContainer', () => {
  beforeEach(cleanup);

  test('Verify data-ui-name', async () => {
    const manager = new NoticeBubbleManager();
    const { container, getByText } = render(
      <NoticeBubbleContainer disablePortal manager={manager} />,
    );

    manager.add({
      type: 'warning',
      children: 'Warning notice',
      action: 'Warning action',
      duration: 0,
      initialAnimation: false,
    });
    manager.add({
      type: 'info',
      children: 'Info notice',
      action: 'Info action',
      duration: 0,
      initialAnimation: false,
    });

    await waitFor(() => expect(getByText('Info notice')).toBeInTheDocument());

    const result = extractUIName(container);

    expect(result).toMatchSnapshot();
  });

  test('Verify supports rendering outside DOM', () => {
    const { queryByTestId } = render(
      <div data-testid='container'>
        <NoticeBubbleContainer data-testid='notice' />
      </div>,
    );

    // not renders in container
    expect(queryByTestId('container')?.children.length).toBe(0);

    // should be in body
    expect(
      Array.from(document.body.querySelectorAll('[data-testid="notice"]')).length,
    ).toBeGreaterThan(0);
  });

  test('Verify notices render in custom container element when containerNode is provided', async () => {
    const customContainer = document.createElement('div');
    customContainer.setAttribute('id', 'custom-notice-container');
    document.body.appendChild(customContainer);

    const manager = new NoticeBubbleManager();

    render(<NoticeBubbleContainer containerNode={customContainer} manager={manager} />);

    const notice = manager.add({
      type: 'info',
      children: 'Test notice in custom container',
      initialAnimation: false,
    });

    await waitFor(() => {
      const noticeInCustomContainer = customContainer.querySelector('[aria-live="polite"]');
      expect(noticeInCustomContainer).toBeTruthy();
      expect(noticeInCustomContainer?.textContent).toContain('Test notice in custom container');
    });

    notice.remove();
    document.body.removeChild(customContainer);
  });

  test('Verify manager keeps notice visible when initialAnimation is disabled', async () => {
    vi.useFakeTimers();

    try {
      const manager = new NoticeBubbleManager();
      const changes: boolean[][] = [];
      const unsubscribe = manager.addListener((items) => {
        changes.push(items.map((item) => item.visible));
      });

      manager.add({
        type: 'info',
        children: 'First notice',
        initialAnimation: false,
      });

      expect(changes[changes.length - 1]).toEqual([true]);

      const replacePromise = manager.replaceLast({
        type: 'info',
        children: 'Second notice',
        initialAnimation: false,
      });

      expect(changes[changes.length - 1]).toEqual([false]);

      await vi.advanceTimersByTimeAsync(300);
      await replacePromise;

      expect(changes[changes.length - 1]).toEqual([false, true]);

      await vi.advanceTimersByTimeAsync(700);

      expect(changes[changes.length - 1]).toEqual([true]);

      unsubscribe();
    } finally {
      vi.useRealTimers();
    }
  });
});
