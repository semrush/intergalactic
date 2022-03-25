import React from 'react';
import { testing, shared as testsShared, snapshot } from '@semcore/jest-preset-ui';
import InlineInput from '../src/InlineInput';
import UserM from '@semcore/icon/User/m';
import SerpM from '@semcore/icon/Serp/m';
const { cleanup, fireEvent, render, axe } = testing;

const { shouldSupportClassName, shouldSupportRef } = testsShared;
import Input from '../src';

const makePlayground = () => (
  <>
    <br />
    <label htmlFor="simple">Simple</label>
    <br />
    <InlineInput onBlurBehavior="cancel" inputId="simple" />
    <br />
    <label htmlFor="loading">Loading state</label>
    <br />
    <InlineInput loading inputId="loading" />
    <br />
    <label htmlFor="disabled">Disabled</label>
    <br />
    <InlineInput state="disabled" inputId="disabled" />
    <br />
    <label htmlFor="custom-text">Custom text</label>
    <br />
    <InlineInput state="invalid" confirmText="Good" cancelText="Awfull" inputId="custom-text" />
    <br />
    <label htmlFor="valid">Valid </label>
    <br />
    <InlineInput state="valid" inputId="valid" />
    <br />
    <label htmlFor="with-icons">With icons</label>
    <br />
    <InlineInput inputId="with-icons">
      <InlineInput.Addon tag={UserM} />
      <InlineInput.Underline>
        <InlineInput.Addon tag={SerpM} />
        <InlineInput.Value />
      </InlineInput.Underline>
      <InlineInput.Controls />
    </InlineInput>
    <br />
    <label htmlFor="decomposed">Decomposed</label>
    <br />
    <InlineInput inputId="decomposed">
      <InlineInput.Underline>
        <InlineInput.Value />
      </InlineInput.Underline>
      <InlineInput.ConfirmControl />
      <InlineInput.CancelControl />
    </InlineInput>
    <br />
    <label htmlFor="primitive">Primitve</label>
    <br />
    <InlineInput inputId="primitive" />
    <br />
    <label htmlFor="const-placeholder">Constant placeholder</label>
    <br />
    <InlineInput inputId="const-placeholder">
      <InlineInput.Underline>
        <InlineInput.Addon>I am a don't care, I punk:</InlineInput.Addon>
        <InlineInput.Value />
      </InlineInput.Underline>
    </InlineInput>
    <br />
    <label htmlFor="size-s">size=s</label>
    <br />
    <InlineInput inputId="size-s" size="s" />
    <br />
    <label htmlFor="size-m">size=m</label>
    <br />
    <InlineInput inputId="size-m" size="m" />
    <br />
    <label htmlFor="size-l">size=l</label>
    <br />
    <InlineInput inputId="size-l" size="l" />
    <br />
    <label htmlFor="size-xl">size=xl</label>
    <br />
    <InlineInput inputId="size-xl" size="xl" />
  </>
);

describe('InlineInput', () => {
  afterEach(cleanup);

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
        <InlineInput
          confirmText="Sh**ck is love"
          cancelText="DRAIN THE SWAMP!"
          tooltipsProps={{ visible: true, disablePortal: true }}
        >
          <InlineInput.Underline>
            <InlineInput.Value />
          </InlineInput.Underline>
          <InlineInput.ConfirmControl />
          <InlineInput.CancelControl />
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
    jest.useFakeTimers();
    const spyCancel = jest.fn();
    const spyConfirm = jest.fn();

    const { getByPlaceholderText } = render(
      <>
        <InlineInput placeholder="behavior-cancel" onBlurBehavior="cancel" onCancel={spyCancel} />
        <InlineInput
          placeholder="behavior-confirm"
          onBlurBehavior="confirm"
          onConfirm={spyConfirm}
        />
      </>,
    );

    expect(spyCancel).toHaveBeenCalledTimes(0);
    expect(spyConfirm).toHaveBeenCalledTimes(0);

    /** bubbling doesn't work in jest? */
    fireEvent.blur(getByPlaceholderText('behavior-cancel'));
    jest.runAllTimers();
    expect(spyCancel).toHaveBeenCalledTimes(1);
    fireEvent.blur(getByPlaceholderText('behavior-confirm'));
    jest.runAllTimers();
    expect(spyConfirm).toHaveBeenCalledTimes(1);
    jest.useRealTimers();
  });

  test('a11y', async () => {
    const { container } = render(makePlayground());

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
