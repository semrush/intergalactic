import React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import * as sharedTests from '@semcore/testing-utils/shared-tests';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import InlineInput from '../src/InlineInput';
import SerpM from '@semcore/icon/Serp/m';

import { cleanup, fireEvent, render, act } from '@semcore/testing-utils/testing-library';
import { axe } from '@semcore/testing-utils/axe';

const { shouldSupportClassName, shouldSupportRef } = sharedTests;
import Input from '../src';

const makePlayground = () => (
  <>
    <br />
    <label htmlFor="simple">Simple</label>
    <br />
    <InlineInput onBlurBehavior="cancel">
      <InlineInput.Value id="simple" />
      <InlineInput.ConfirmControl />
      <InlineInput.CancelControl />
    </InlineInput>
    <br />
    <label htmlFor="loading">Loading state</label>
    <br />
    <InlineInput loading>
      <InlineInput.Value id="loading" />
      <InlineInput.ConfirmControl />
      <InlineInput.CancelControl />
    </InlineInput>
    <br />
    <label htmlFor="disabled">Disabled</label>
    <br />
    <InlineInput disabled>
      <InlineInput.Value id="disabled" />
      <InlineInput.ConfirmControl />
      <InlineInput.CancelControl />
    </InlineInput>
    <br />
    <label htmlFor="custom-text">Custom text</label>
    <br />
    <InlineInput state="invalid">
      <InlineInput.Value id="custom-text" />
      <InlineInput.ConfirmControl title="Good" />
      <InlineInput.CancelControl title="Awfull" />
    </InlineInput>
    <br />
    <label htmlFor="valid">Valid </label>
    <br />
    <InlineInput state="valid">
      <InlineInput.Value id="valid" />
      <InlineInput.ConfirmControl />
      <InlineInput.CancelControl />
    </InlineInput>
    <br />
    <label htmlFor="with-icons">With icons</label>
    <br />
    <InlineInput>
      <InlineInput.Addon tag={SerpM} />
      <InlineInput.Value id="with-icons" />
      <InlineInput.ConfirmControl />
      <InlineInput.CancelControl />
    </InlineInput>
    <br />
    <label htmlFor="decomposed">Decomposed</label>
    <br />
    <InlineInput>
      <InlineInput.Value id="decomposed" />
      <InlineInput.ConfirmControl />
      <InlineInput.CancelControl />
    </InlineInput>
    <br />
    <label htmlFor="primitive">Primitve</label>
    <br />
    <InlineInput>
      <InlineInput.Value id="primitive" />
      <InlineInput.ConfirmControl />
      <InlineInput.CancelControl />
    </InlineInput>
    <br />
    <label htmlFor="const-placeholder">Constant placeholder</label>
    <br />
    <InlineInput>
      <InlineInput.Addon>I am a don't care, I punk:</InlineInput.Addon>
      <InlineInput.Value id="const-placeholder" />
    </InlineInput>
  </>
);

describe('InlineInput', () => {
  beforeEach(cleanup);

  shouldSupportClassName(Input);
  shouldSupportRef(Input.Value, Input);

  test('Should render in different ways', async () => {
    const component = makePlayground();

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('custom texts', async () => {
    const component = (
      <>
        <br />
        <br />
        <br />
        <br />
        <br />
        <InlineInput>
          <InlineInput.Value />
          <InlineInput.ConfirmControl
            title="Sh**ck is love"
            $tooltipsProps={{ visible: true, disablePortal: true }}
          />
          <InlineInput.CancelControl
            title="DRAIN THE SWAMP!"
            $tooltipsProps={{ visible: true, disablePortal: true }}
          />
        </InlineInput>
        <br />
        <br />
        <br />
        <br />
        <br />
      </>
    );

    /**
     * Tooltip overlay may be possitioned in weird place,
     * it's expected when disablePortal option is enabled
     */

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('on blur behavior', () => {
    vi.useFakeTimers();
    const spyCancel = vi.fn();
    const spyConfirm = vi.fn();

    const { getByTestId } = render(
      <>
        <InlineInput data-testid="behavior-cancel" onBlurBehavior="cancel" onCancel={spyCancel}>
          <InlineInput.Value />
        </InlineInput>
        <InlineInput data-testid="behavior-confirm" onBlurBehavior="confirm" onConfirm={spyConfirm}>
          <InlineInput.Value />
        </InlineInput>
      </>,
    );

    expect(spyCancel).toHaveBeenCalledTimes(0);
    expect(spyConfirm).toHaveBeenCalledTimes(0);

    /** bubbling doesn't work in jest? */
    fireEvent.blur(getByTestId('behavior-cancel'));
    act(() => vi.runAllTimers());
    expect(spyCancel).toHaveBeenCalledTimes(1);
    fireEvent.blur(getByTestId('behavior-confirm'));
    act(() => vi.runAllTimers());
    expect(spyConfirm).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });

  test('a11y', async () => {
    const { container } = render(makePlayground());

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
