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
    // Leaving the field with Tab always discards changes (calls onCancel),
    // regardless of onBlurBehavior. onBlurBehavior governs mouse blur only.
    const spyCancelOnCancelInput = vi.fn();
    const spyConfirmOnCancelInput = vi.fn();
    const spyConfirmOnConfirmInput = vi.fn();
    const spyCancelOnConfirmInput = vi.fn();

    const { getByTestId } = render(
      <>
        <InlineInput
          data-testid='behavior-cancel'
          onBlurBehavior='cancel'
          onCancel={spyCancelOnCancelInput}
          onConfirm={spyConfirmOnCancelInput}
        >
          <InlineInput.Value />
        </InlineInput>
        <InlineInput
          data-testid='behavior-confirm'
          onBlurBehavior='confirm'
          onConfirm={spyConfirmOnConfirmInput}
          onCancel={spyCancelOnConfirmInput}
        >
          <InlineInput.Value />
        </InlineInput>
      </>,
    );

    expect(spyCancelOnCancelInput).toHaveBeenCalledTimes(0);
    expect(spyConfirmOnConfirmInput).toHaveBeenCalledTimes(0);

    const tabOut = async (testId: string) => {
      const input = getByTestId(testId).querySelector('input');
      if (!(input instanceof HTMLInputElement)) {
        throw new Error(`Expected ${testId} to contain an input element`);
      }

      input.focus();
      await userEvent.tab();
    };

    // onBlurBehavior='cancel' + Tab -> discards (onCancel), never onConfirm.
    await tabOut('behavior-cancel');
    await waitFor(() => expect(spyCancelOnCancelInput).toHaveBeenCalledTimes(1));
    expect(spyConfirmOnCancelInput).toHaveBeenCalledTimes(0);

    // onBlurBehavior='confirm' + Tab -> still discards (onCancel), NOT onConfirm.
    await tabOut('behavior-confirm');
    await waitFor(() => expect(spyCancelOnConfirmInput).toHaveBeenCalledTimes(1));
    expect(spyConfirmOnConfirmInput).toHaveBeenCalledTimes(0);
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
