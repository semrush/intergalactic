import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { cleanup, fireEvent, render, userEvent } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import React from 'react';

import InlineInput from '../src/InlineInput';

describe('inline-input Dependency imports', () => {
  runDependencyCheckTests('inline-input');
});

describe('InlineInput', () => {
  beforeEach(cleanup);

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
    vi.runAllTimers();
    expect(spyCancel).toHaveBeenCalledTimes(1);
    fireEvent.blur(getByTestId('behavior-confirm'));
    vi.runAllTimers();
    expect(spyConfirm).toHaveBeenCalledTimes(1);
    fireEvent.blur(getByTestId('behavior-none'));
    vi.runAllTimers();
    expect(spyNone).toHaveBeenCalledTimes(0);
    fireEvent.blur(getByTestId('behavior-undefined'));
    vi.runAllTimers();
    expect(spyUndefined).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });

  test.concurrent('Verify onConfirm behaviour', async () => {
    const spyConfirm = vi.fn();

    const { getByLabelText, getByTestId, debug } = render(
      <>
        <InlineInput onConfirm={spyConfirm}>
          <InlineInput.Addon tag='label'>User name:</InlineInput.Addon>
          <InlineInput.Value data-testid='input' />
          <InlineInput.ConfirmControl />
          <InlineInput.CancelControl />
        </InlineInput>
      </>,
    );

    expect(spyConfirm).toHaveBeenCalledTimes(0);

    getByTestId('input').focus();
    await userEvent.keyboard('ABC');

    await userEvent.click(getByLabelText('Save'));
    expect(spyConfirm).toHaveBeenCalledWith('ABC', expect.anything());

    getByTestId('input').focus();
    await userEvent.keyboard('DEF');

    await userEvent.click(getByLabelText('Save'));
    expect(spyConfirm).toHaveBeenCalledWith('ABCDEF', expect.anything());
  });
});
