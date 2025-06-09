
import InlineInput from '../src/InlineInput';
import * as sharedTests from '@semcore/testing-utils/shared-tests';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { cleanup, fireEvent, render, act } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import React from 'react';

import Input from '../src';
import InlineInput from '../src/InlineInput';

describe('inline-input Dependency imports', () => {
  runDependencyCheckTests('inline-input');
});

const { shouldSupportClassName, shouldSupportRef } = sharedTests;

describe('InlineInput', () => {
  beforeEach(cleanup);

  shouldSupportClassName(Input);
  shouldSupportRef(Input.Value, Input);

  test.concurrent('Verify blur behavior', () => {
    vi.useFakeTimers();
    const spyCancel = vi.fn();
    const spyConfirm = vi.fn();
    const spyNone = vi.fn();
    const spyUndefined = vi.fn();

    const { getByTestId } = render(
      <>
        <InlineInput data-testid='behavior-cancel' onBlurBehavior='cancel' onCancel={spyCancel}>
          <InlineInput.Value />
        </InlineInput>
        <InlineInput data-testid='behavior-confirm' onBlurBehavior='confirm' onConfirm={spyConfirm}>
          <InlineInput.Value />
        </InlineInput>
        <InlineInput data-testid='behavior-none' onBlurBehavior='none' onConfirm={spyNone}>
          <InlineInput.Value />
        </InlineInput>
        <InlineInput
          data-testid='behavior-undefined'
          onBlurBehavior={undefined}
          onConfirm={spyUndefined}
        >
          <InlineInput.Value />
        </InlineInput>
      </>,
    );

    expect(spyCancel).toHaveBeenCalledTimes(0);
    expect(spyConfirm).toHaveBeenCalledTimes(0);
    expect(spyNone).toHaveBeenCalledTimes(0);
    expect(spyUndefined).toHaveBeenCalledTimes(0);

    /** bubbling doesn't work in jest? */
    fireEvent.blur(getByTestId('behavior-cancel'));
    act(() => {
      vi.runAllTimers();
    });
    expect(spyCancel).toHaveBeenCalledTimes(1);
    fireEvent.blur(getByTestId('behavior-confirm'));
    act(() => {
      vi.runAllTimers();
    });
    expect(spyConfirm).toHaveBeenCalledTimes(1);
    fireEvent.blur(getByTestId('behavior-none'));
    act(() => {
      vi.runAllTimers();
    });
    expect(spyNone).toHaveBeenCalledTimes(0);
    fireEvent.blur(getByTestId('behavior-undefined'));
    act(() => {
      vi.runAllTimers();
    });
    expect(spyUndefined).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });
});
