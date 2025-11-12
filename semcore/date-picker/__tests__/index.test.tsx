import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { cleanup, render, fireEvent, act, userEvent } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
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

  test('Verify supports onChange with format time 00:00:00:000', () => {
    const spy = vi.fn();
    mockDate('2020-02-10T12:00:00.808Z');

    const { getByText } = render(<DatePicker onChange={spy} visible />);

    fireEvent.click(getByText('Today'));
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

  test('Verify supports set custom displayPeriod after changed value date', () => {
    vi.useFakeTimers();
    const component = (
      <DatePicker defaultVisible defaultDisplayedPeriod='2021-09-10T12:00:00.808Z' />
    );
    const { getByText, getByLabelText } = render(component);
    fireEvent.click(getByLabelText('Previous month'));
    // change visible
    fireEvent.click(getByText('15'));
    act(() => {
      vi.runAllTimers();
    });
    // change visible
    expect(getByText('Aug 15, 2021')).toBeTruthy();
    vi.useRealTimers();
  });
});

describe('DateRangePicker', () => {
  beforeEach(() => {
    global.Date = RealDate;
    cleanup();
  });

  test('Verify pikcer support onChange with format time 00:00:00:000', async () => {
    const spy = vi.fn();
    mockDate('2020-02-10T12:00:00.808Z');

    const { getByText } = render(<DateRangePicker onChange={spy} visible />);

    fireEvent.click(getByText('Last 2 days'));
    fireEvent.click(getByText('Apply'));
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

  test('Verify supports set custom displayPeriod after changed value date', () => {
    vi.useFakeTimers();
    const { getByText, getByLabelText } = render(
      <DateRangePicker visible defaultDisplayedPeriod='2021-09-10T12:00:00.808Z' />,
    );
    fireEvent.click(getByLabelText('Previous month'));
    // change visible
    fireEvent.click(getByText('31'));
    fireEvent.click(getByText('Apply'));
    expect(getByText('August 2021')).toBeTruthy();
    vi.useRealTimers();
  });

  test.sequential('Verify not select disabled date from the keyboard', async ({ expect }) => {
    mockDate('2023-12-20T12:00:00.808Z');
    const onPreselectedValueChange = vi.fn();
    const { getByTestId, getByText } = render(
      <DateRangePicker
        disabled={[new Date('2023-12-28')]}
        defaultDisplayedPeriod={new Date()}
        onPreselectedValueChange={onPreselectedValueChange}
      >
        <DateRangePicker.Trigger />
        <DateRangePicker.Popper data-testid='dd_popper' />
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

  test('Verify change month after select new date from the keyboard', async ({ expect }) => {
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
});
