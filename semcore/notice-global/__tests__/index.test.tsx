import * as sharedTests from '@semcore/testing-utils/shared-tests';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { render, fireEvent, cleanup } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import React from 'react';

import NoticeGlobal from '../src';

const { shouldSupportClassName, shouldSupportRef } = sharedTests;

describe('notice-global Dependency imports', () => {
  runDependencyCheckTests('notice-global');
});

describe('NoticeGlobal', () => {
  beforeEach(cleanup);

  shouldSupportClassName(NoticeGlobal);
  shouldSupportRef(NoticeGlobal);

  test.concurrent('Verify supports custom close icon', () => {
    const component = (
      <NoticeGlobal>
        <NoticeGlobal.CloseIcon data-testid='close'>Close Icon</NoticeGlobal.CloseIcon>
      </NoticeGlobal>
    );
    const { getByTestId } = render(component);
    expect(getByTestId('close')).toBeTruthy();
  });

  test.sequential('Verify handler for close', () => {
    const spy = vi.fn();
    const component = <NoticeGlobal closable onClose={spy} />;
    const { getByLabelText } = render(component);
    fireEvent.click(getByLabelText(/Close/i));
    expect(spy).toBeCalled();
  });

  test.concurrent('Verify support custom content', () => {
    const component = (
      <NoticeGlobal>
        <NoticeGlobal.Content data-testid='content'>Test</NoticeGlobal.Content>
      </NoticeGlobal>
    );
    const { getByTestId } = render(component);
    expect(getByTestId('content')).toBeTruthy();
  });
});
