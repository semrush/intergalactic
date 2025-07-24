import {
  runDependencyCheckTests,
  shouldSupportClassName,
  shouldSupportRef,
} from '@semcore/testing-utils/shared-tests';
import {
  render,
  cleanup,
} from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';
import React from 'react';

import {
  NoticeBubbleContainer,
} from '../src';

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

  shouldSupportClassName(TestNoticeBubble);
  shouldSupportRef(TestNoticeBubble);

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
});
