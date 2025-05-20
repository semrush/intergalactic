import React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import { cleanup, render, fireEvent, act, userEvent } from '@semcore/testing-utils/testing-library';
import { mockDate, RealDate } from './utils';

import {
  DatePicker,
  DateRangePicker,
  MonthRangePicker,
  DateRangeComparator,
  MonthDateRangeComparator,
} from '../src';

import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';

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

  test('Verify picker renders correctly if one day is selected', async ({ task }) => {
    const component = (
      <DateRangePicker
        value={[new Date('December 31, 2020 00:00:00'), new Date('December 31, 2020 00:00:00')]}
      />
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test('Verify picker renders correctly if the same month of a different year is selected', async ({
    task,
  }) => {
    const component = (
      <MonthRangePicker
        value={[new Date('December 31, 2020 00:00:00'), new Date('December 31, 2021 00:00:00')]}
      />
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test('Verify localized placeholder renders correctly', async ({ task }) => {
    const component = (
      <DatePicker locale='ja'>
        <DatePicker.Trigger />
        <DatePicker.Popper />
      </DatePicker>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
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
      <DateRangePicker visible defaultDisplayedPeriod={'2021-09-10T12:00:00.808Z'} />,
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
        <DateRangePicker.Popper data-testid={'dd_popper'} />
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
        <DateRangePicker.Trigger data-testid={'dd_trigger'} />
        <DateRangePicker.Popper data-testid={'dd_popper'} />
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

  test('Verify renders correctly with empty period', async ({ task, expect }) => {
    mockDate('2024-01-20T12:00:00.000Z');

    const component = (
      <DateRangePicker
        defaultDisplayedPeriod={new Date()}
        periods={[]}
        visible
        disablePortal // only for render popper in test
        // @ts-ignore
        __disablePopper // only for render popper in test
      />
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });
});

describe('DateRangeComparator', () => {
  beforeEach(() => {
    global.Date = RealDate;
    cleanup();
  });
  const disablePopper = { __disablePopper: true } as any;

  test('Verify renders correctly', async ({ task }) => {
    const value = {
      value: [new Date('January 5, 2021 00:00:00'), new Date('January 10, 2021 00:00:00')],
      compare: [new Date('January 8, 2021 00:00:00'), new Date('January 12, 2021 00:00:00')],
    };
    const displayPeriod = new Date('January 5, 2021 00:00:00');
    const component = (
      <DateRangeComparator
        displayedPeriod={displayPeriod}
        value={value}
        visible
        disablePortal
        {...disablePopper}
      />
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test('Verify renders correctly monthes', async ({ task }) => {
    const value = {
      value: [new Date('January 5, 2021 00:00:00'), new Date('May 10, 2021 00:00:00')],
      compare: [new Date('Februrary 8, 2021 00:00:00'), new Date('September 12, 2021 00:00:00')],
    };
    const displayPeriod = new Date('January 5, 2021 00:00:00');
    const component = (
      <MonthDateRangeComparator
        displayedPeriod={displayPeriod}
        value={value}
        visible
        disablePortal
        {...disablePopper}
      />
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });
});
