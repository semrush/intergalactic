import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { cleanup, render, userEvent, waitFor } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import React from 'react';

import InlineInput from '../src/InlineInput';

describe('inline-input Dependency imports', () => {
  runDependencyCheckTests('inline-input');
});

describe('InlineInput', () => {
  beforeEach(cleanup);

  test.sequential('Verify blur behavior', async () => {
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

    const blurInlineInput = async (testId: string) => {
      const input = getByTestId(testId).querySelector('input');
      if (!(input instanceof HTMLInputElement)) {
        throw new Error(`Expected ${testId} to contain an input element`);
      }

      await userEvent.click(input);
      await userEvent.tab();
    };

    await blurInlineInput('behavior-cancel');
    await waitFor(() => expect(spyCancel).toHaveBeenCalledTimes(1));

    await blurInlineInput('behavior-confirm');
    await waitFor(() => expect(spyConfirm).toHaveBeenCalledTimes(1));

    // onBlurBehavior='none' must never trigger a callback; the undefined case
    // below settles afterwards, proving enough ticks elapsed for any handler to run.
    await blurInlineInput('behavior-none');
    await blurInlineInput('behavior-undefined');
    await waitFor(() => expect(spyUndefined).toHaveBeenCalledTimes(1));
    expect(spyNone).toHaveBeenCalledTimes(0);
  });

  test.concurrent('Verify onConfirm behaviour', async () => {
    const spyConfirm = vi.fn();

    const { getByLabelText, getByTestId } = render(
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
