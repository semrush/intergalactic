import { shouldHaveDataUiName, runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import {
  render,
  cleanup,
  waitFor,
} from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';
import React from 'react';

import {
  NoticeBubbleContainer,
} from '../src';
import { NoticeBubbleManager } from '../src/NoticeBubbleManager';

const TestNoticeBubble = React.forwardRef((props: any, ref: React.Ref<HTMLElement>) => (
  <>
    <NoticeBubbleContainer
      disablePortal
      style={{ position: 'static', width: 'auto' }}
    />
    <NoticeBubbleContainer
      ref={ref}
      style={{ marginBottom: 0 }}
      {...props}
    />
  </>
));

describe('notice-bubble Dependency imports', () => {
  runDependencyCheckTests('notice-bubble');
});

describe('NoticeBubbleContainer', () => {
  beforeEach(cleanup);

  shouldHaveDataUiName({
    Component: TestNoticeBubble,
    expectedDataUiName: 'NoticeBubbleContainer',
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
});
