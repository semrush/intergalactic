import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { cleanup, render, userEvent } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, afterEach, vi } from '@semcore/testing-utils/vitest';
import React from 'react';

import { mockDate, RealDate } from './utils';
import {
  DatePicker,
  DateRangePicker,
} from '../src';

describe('date-picker Dependency imports', () => {
  runDependencyCheckTests('date-picker');
});

describe('DatePicker', () => {
  beforeEach(() => {
    global.Date = RealDate;
    cleanup();
  });
  afterEach(cleanup);

  test('Verify supports onChange with format time 00:00:00:000', async () => {
    const spy = vi.fn();
    mockDate('2020-02-10T12:00:00.808Z');

    const { getByText } = render(<DatePicker onChange={spy} visible />);

    await userEvent.click(getByText('Today'));
    expect(spy).toBeCalledWith(new Date(new Date().setHours(0, 0, 0, 0)));
  });

  test('Verify supports set custom displayPeriod', () => {
    const marchInstance = render(
      <DatePicker visible defaultDisplayedPeriod='2020-03-10T12:00:00.808Z' />,
    );
    expect(marchInstance.getByText('March 2020')).toBeTruthy();
    const aprilInstance = render(<DatePicker visible displayedPeriod='2020-04-10T12:00:00.808Z' />);
    expect(aprilInstance.getByText('April 2020')).toBeTruthy();
  });

  test('Verify supports set custom displayPeriod after changed value date', async () => {
    const component = (
      <DatePicker defaultVisible defaultDisplayedPeriod='2021-09-10T12:00:00.808Z' />
    );
    const { getByText, getByLabelText } = render(component);
    await userEvent.click(getByLabelText('Previous month'));
    await userEvent.click(getByText('15'));
    // change visible
    expect(getByText('Aug 15, 2021')).toBeTruthy();
  });
});

describe('DateRangePicker', () => {
  beforeEach(() => {
    global.Date = RealDate;
    cleanup();
  });
  afterEach(cleanup);

  test('Verify pikcer support onChange with format time 00:00:00:000', async () => {
    const spy = vi.fn();
    mockDate('2020-02-10T12:00:00.808Z');

    const { getByText } = render(<DateRangePicker onChange={spy} visible />);

    await userEvent.click(getByText('Last 2 days'));
    await userEvent.click(getByText('Apply'));
    const today = new Date(new Date().setHours(0, 0, 0, 0));
    expect(spy).toBeCalledWith([DateRangePicker.subtract(today, 1, 'day'), today]);
  });

  test('Verify trigger suppports set custom displayPeriod', () => {
    mockDate('2020-02-10T12:00:00.808Z');
    const { getByText, rerender } = render(
      <DateRangePicker visible defaultDisplayedPeriod='2020-03-10T12:00:00.808Z' />,
    );
    expect(getByText('March 2020')).toBeTruthy();
    rerender(<DateRangePicker visible displayedPeriod='2020-04-10T12:00:00.808Z' />);
    expect(getByText('April 2020')).toBeTruthy();
  });

  test('Verify supports set custom displayPeriod after changed value date', async () => {
    const { getByText, getByLabelText } = render(
      <DateRangePicker visible defaultDisplayedPeriod='2021-09-10T12:00:00.808Z' />,
    );
    await userEvent.click(getByLabelText('Previous month'));
    await userEvent.click(getByText('31'));
    await userEvent.click(getByText('Apply'));
    expect(getByText('August 2021')).toBeTruthy();
  });

  test.sequential('Verify not select disabled date from the keyboard', async () => {
    mockDate('2023-12-20T12:00:00.808Z');
    const onPreselectedValueChange = vi.fn();
    const { getByTestId, getByText } = render(
      <DateRangePicker
        disabled={[new Date('2023-12-28')]}
        defaultDisplayedPeriod={new Date()}
        onPreselectedValueChange={onPreselectedValueChange}
      >
        <DateRangePicker.Trigger />
        <DateRangePicker.Popper aria-label='Date range picker' data-testid='dd_popper' />
      </DateRangePicker>,
    );

    await userEvent.keyboard('[Tab]');
    await userEvent.keyboard('[Tab]');

    await userEvent.keyboard('[ArrowDown]');

    expect(getByText('December 2023')).toBeTruthy();
    expect(getByText('January 2024')).toBeTruthy();

    expect(getByTestId('dd_popper')).toHaveFocus();

    await userEvent.keyboard('[ArrowLeft]'); // 2023-12-20
    await userEvent.keyboard('[Space]');

    expect(onPreselectedValueChange).toBeCalledWith([new Date()]);

    await userEvent.keyboard('[ArrowDown]'); // 2023-12-27
    await userEvent.keyboard('[ArrowRight]'); // 2023-12-28
    await userEvent.keyboard('[Space]');

    expect(onPreselectedValueChange).toBeCalledTimes(1); // shouldn't be called the second time - 28 is disabled date
  });

  test('Verify change month after select new date from the keyboard', async () => {
    mockDate('2023-12-20T12:00:00.808Z');

    const { getByTestId, getByText } = render(
      <DateRangePicker visible defaultDisplayedPeriod={new Date()}>
        <DateRangePicker.Trigger data-testid='dd_trigger' />
        <DateRangePicker.Popper data-testid='dd_popper' />
      </DateRangePicker>,
    );

    expect(getByText('December 2023')).toBeTruthy();
    expect(getByText('January 2024')).toBeTruthy();

    getByTestId('dd_popper').focus();
    await userEvent.keyboard('[Tab]');

    await userEvent.keyboard('[ArrowDown]');
    await userEvent.keyboard('[ArrowDown]');
    await userEvent.keyboard('[ArrowDown]');

    expect(getByText('February 2024')).toBeTruthy();
  });

  test('Verify isDisabled works with single disabled date', () => {
    mockDate('2023-12-20T12:00:00.808Z');
    const disabledDate = new Date('2023-12-25');

    const { getByLabelText } = render(
      <DateRangePicker visible disabled={[disabledDate]} defaultDisplayedPeriod={new Date()}>
        <DateRangePicker.Trigger />
        <DateRangePicker.Popper />
      </DateRangePicker>,
    );

    const disabledCell = getByLabelText('Dec 25, 2023');
    expect(disabledCell).toHaveAttribute('aria-disabled', 'true');
  });

  test('Verify isDisabled works with date range', () => {
    mockDate('2023-12-20T12:00:00.808Z');
    const disabledRange = [new Date('2023-12-24'), new Date('2023-12-26')];

    const { getByLabelText } = render(
      <DateRangePicker visible disabled={[disabledRange]} defaultDisplayedPeriod={new Date()}>
        <DateRangePicker.Trigger />
        <DateRangePicker.Popper />
      </DateRangePicker>,
    );

    const disabledCell24 = getByLabelText('Dec 24, 2023');
    const disabledCell25 = getByLabelText('Dec 25, 2023');
    const disabledCell26 = getByLabelText('Dec 26, 2023');

    expect(disabledCell24).toHaveAttribute('aria-disabled', 'true');
    expect(disabledCell25).toHaveAttribute('aria-disabled', 'true');
    expect(disabledCell26).toHaveAttribute('aria-disabled', 'true');
  });

  test('Verify isDisabled works with multiple disabled dates', () => {
    mockDate('2023-12-20T12:00:00.808Z');
    const disabledDates = [new Date('2023-12-25'), new Date('2023-12-30')];

    const { getByLabelText } = render(
      <DateRangePicker visible disabled={disabledDates} defaultDisplayedPeriod={new Date()}>
        <DateRangePicker.Trigger />
        <DateRangePicker.Popper />
      </DateRangePicker>,
    );

    const disabledCell25 = getByLabelText('Dec 25, 2023');
    const disabledCell30 = getByLabelText('Dec 30, 2023');
    const enabledCell27 = getByLabelText('Dec 27, 2023');

    expect(disabledCell25).toHaveAttribute('aria-disabled', 'true');
    expect(disabledCell30).toHaveAttribute('aria-disabled', 'true');
    expect(enabledCell27).not.toHaveAttribute('aria-disabled', 'true');
  });

  test('Verify handleReset clears value and closes picker', async () => {
    mockDate('2023-12-20T12:00:00.808Z');
    const onChange = vi.fn();
    const onVisibleChange = vi.fn();

    const { getByText } = render(
      <DateRangePicker
        visible
        defaultValue={[new Date('2023-12-20'), new Date('2023-12-25')]}
        onChange={onChange}
        onVisibleChange={onVisibleChange}
        defaultDisplayedPeriod={new Date()}
      >
        <DateRangePicker.Trigger />
        <DateRangePicker.Popper />
      </DateRangePicker>,
    );

    const resetButton = getByText('Reset');
    await userEvent.click(resetButton);

    expect(onChange).toHaveBeenCalledWith([]);
    expect(onVisibleChange).toHaveBeenCalledWith(false);
  });

  test('Verify handleApply applies selected value and closes picker', async () => {
    mockDate('2023-12-20T12:00:00.808Z');
    const onChange = vi.fn();
    const onVisibleChange = vi.fn();

    const { getByLabelText, getByText } = render(
      <DateRangePicker
        visible
        onChange={onChange}
        onVisibleChange={onVisibleChange}
        defaultDisplayedPeriod={new Date()}
      >
        <DateRangePicker.Trigger />
        <DateRangePicker.Popper />
      </DateRangePicker>,
    );

    await userEvent.click(getByLabelText('Dec 20, 2023'));
    await userEvent.click(getByLabelText('Dec 25, 2023'));

    // Apply selection
    const applyButton = getByText('Apply');
    await userEvent.click(applyButton);

    expect(onChange).toHaveBeenCalled();
    expect(onVisibleChange).toHaveBeenCalledWith(false);
  });

  test('Verify handleApply with same start and end date', async () => {
    mockDate('2023-12-20T12:00:00.808Z');
    const onChange = vi.fn();

    const { getByLabelText, getByText } = render(
      <DateRangePicker
        visible
        onChange={onChange}
        defaultDisplayedPeriod={new Date()}
      >
        <DateRangePicker.Trigger />
        <DateRangePicker.Popper />
      </DateRangePicker>,
    );

    await userEvent.click(getByLabelText('Dec 20, 2023'));

    // Apply selection
    const applyButton = getByText('Apply');
    await userEvent.click(applyButton);

    const callArgs = onChange.mock.calls[0][0];
    expect(callArgs[0]).toEqual(callArgs[1]); // start date equals end date
  });

  test('Verify reset button is not rendered when unclearable is true', () => {
    mockDate('2023-12-20T12:00:00.808Z');

    const { queryByText } = render(
      <DateRangePicker
        visible
        unclearable
        defaultDisplayedPeriod={new Date()}
      >
        <DateRangePicker.Trigger />
        <DateRangePicker.Popper />
      </DateRangePicker>,
    );

    expect(queryByText('Reset')).toBeNull();
  });
});
