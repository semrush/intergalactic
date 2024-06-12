import React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import { cleanup, render, fireEvent, act, userEvent } from '@semcore/testing-utils/testing-library';
import { axe } from '@semcore/testing-utils/axe';
import { Box, Flex } from '@semcore/flex-box';

import {
  DatePicker,
  DateRangePicker,
  MonthRangePicker,
  DateRangeComparator,
  MonthDateRangeComparator,
} from '../src';

const RealDate = global.Date;

// https://github.com/facebook/jest/issues/2234#issuecomment-384884729
function mockDate(isoDate: any) {
  (global as any).Date = class extends RealDate {
    constructor(...theArgs: any[]) {
      super();
      if (theArgs.length) {
        return new (RealDate as any)(...theArgs);
      }
      return new RealDate(isoDate);
    }

    static now() {
      return new RealDate(isoDate).getTime();
    }
  };
}
describe('DatePicker', () => {
  beforeEach(() => {
    global.Date = RealDate;
    cleanup();
  });

  test('Should support onChange with format time 00:00:00:000', () => {
    const spy = vi.fn();
    mockDate('2020-02-10T12:00:00.808Z');

    const { getByText } = render(<DatePicker onChange={spy} visible />);

    fireEvent.click(getByText('Today'));
    expect(spy).toBeCalledWith(new Date(new Date().setHours(0, 0, 0, 0)));
  });

  test('Should support set custom displayPeriod', () => {
    const marchInstance = render(
      <DatePicker visible defaultDisplayedPeriod='2020-03-10T12:00:00.808Z' />,
    );
    expect(marchInstance.getByText('March 2020')).toBeTruthy();
    const aprilInstance = render(<DatePicker visible displayedPeriod='2020-04-10T12:00:00.808Z' />);
    expect(aprilInstance.getByText('April 2020')).toBeTruthy();
  });

  test('Should support set custom displayPeriod after changed displayedPeriod', () => {
    vi.useFakeTimers();
    const { getByText, getByLabelText } = render(
      <DatePicker defaultVisible defaultDisplayedPeriod='2020-03-10T12:00:00.808Z'>
        <DatePicker.ButtonTrigger aria-label='date picker'>Date picker</DatePicker.ButtonTrigger>
        <DatePicker.Popper />
      </DatePicker>,
    );
    fireEvent.click(getByLabelText('Next period'));
    // change visible
    fireEvent.click(getByText('Select date'));
    act(() => {
      vi.runAllTimers();
    });
    fireEvent.click(getByText('Select date'));
    act(() => {
      vi.runAllTimers();
    });
    expect(getByText('March 2020')).toBeTruthy();
    vi.useRealTimers();
  });

  test('Should support set custom displayPeriod after changed value date', () => {
    vi.useFakeTimers();
    const component = (
      <DatePicker defaultVisible defaultDisplayedPeriod='2021-09-10T12:00:00.808Z' />
    );
    const { getByText, getByLabelText } = render(component);
    fireEvent.click(getByLabelText('Previous period'));
    // change visible
    fireEvent.click(getByText('15'));
    act(() => {
      vi.runAllTimers();
    });
    // change visible
    expect(getByText('Aug 15, 2021')).toBeTruthy();
    vi.useRealTimers();
  });

  test('a11y', async () => {
    const { container } = render(
      <div>
        <label htmlFor='date-picker-a11y-test-trigger'>Date picker</label>
        <DatePicker visible disablePortal aria-label='date picker'>
          <DatePicker.Trigger>
            <DatePicker.Trigger.SingleDateInput>
              <DatePicker.Trigger.SingleDateInput.MaskedInput id='date-picker-a11y-test-trigger' />
            </DatePicker.Trigger.SingleDateInput>
          </DatePicker.Trigger>
          <DatePicker.Popper />
        </DatePicker>
      </div>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('DateRangePicker', () => {
  beforeEach(() => {
    global.Date = RealDate;
    cleanup();
  });

  test('Should support onChange with format time 00:00:00:000', async () => {
    const spy = vi.fn();
    mockDate('2020-02-10T12:00:00.808Z');

    const { getByText } = render(<DateRangePicker onChange={spy} visible />);

    fireEvent.click(getByText('Last 2 days'));
    fireEvent.click(getByText('Apply'));
    const today = new Date(new Date().setHours(0, 0, 0, 0));
    expect(spy).toBeCalledWith([DateRangePicker.subtract(today, 1, 'day'), today]);
  });

  test('Should render correctly with selected date', async ({ task }) => {
    const component = (
      <DatePicker value={new Date('January 1, 2021 00:00:00')}>
        <DatePicker.ButtonTrigger size='l' />
        <DatePicker.Popper />
      </DatePicker>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test('Should render placeholder correctly', async ({ task }) => {
    const component = (
      <DatePicker>
        <DatePicker.Trigger />
        <DatePicker.Popper />
      </DatePicker>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test('Should render localized placeholder correctly', async ({ task }) => {
    const component = (
      <DatePicker locale='ja'>
        <DatePicker.Trigger />
        <DatePicker.Popper />
      </DatePicker>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test('Should show error tooltip when inputed date is not allowed and datePicker is opening', async ({
    task,
  }) => {
    const component = (
      <Box w={200} h={200}>
        <DatePicker
          value={new Date('January 1, 2021 00:00:00')}
          disabled={[new Date('January 1, 2021 00:00:00')]}
          visible
        >
          <DatePicker.Trigger disablePortal />
          <DatePicker.Popper />
        </DatePicker>
      </Box>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test('Should not show error tooltip when inputed date is not allowed and datePicker is closing', async ({
    task,
  }) => {
    const component = (
      <Box w={200} h={200}>
        <DatePicker
          value={new Date('January 1, 2021 00:00:00')}
          disabled={[new Date('January 1, 2021 00:00:00')]}
        >
          <DatePicker.Trigger disablePortal />
          <DatePicker.Popper />
        </DatePicker>
      </Box>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test('Should render range of selected date', async ({ task }) => {
    const component = (
      <DateRangePicker
        value={[new Date('December 31, 2020 00:00:00'), new Date('January 2, 2021 00:00:00')]}
      />
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test('Should render correctly if one day is selected', async ({ task }) => {
    const component = (
      <DateRangePicker
        value={[new Date('December 31, 2020 00:00:00'), new Date('December 31, 2020 00:00:00')]}
      />
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test('Should render correctly if the same month of a different year is selected', async ({
    task,
  }) => {
    const component = (
      <MonthRangePicker
        value={[new Date('December 31, 2020 00:00:00'), new Date('December 31, 2021 00:00:00')]}
      />
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test('Should render correctly', async ({ task }) => {
    const component = (
      <DatePicker>
        <DatePicker.Header w={100}>
          <DatePicker.Prev />
          <DatePicker.Title>Header</DatePicker.Title>
          <DatePicker.Next />
        </DatePicker.Header>
      </DatePicker>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test('Should support hover item', async ({ task }) => {
    await expect(
      await snapshot(
        <DatePicker value={new Date('January 1, 2021 00:00:00')}>
          <DatePicker.ButtonTrigger id='datapicker' />
          <DatePicker.Popper />
        </DatePicker>,
        {
          actions: {
            hover: '#datapicker',
          },
        },
      ),
    ).toMatchImageSnapshot(task);
    await expect(
      await snapshot(
        <DatePicker>
          <DatePicker.Header w={100}>
            <DatePicker.Prev id='datapicker' />
            <DatePicker.Title>Header</DatePicker.Title>
            <DatePicker.Next />
          </DatePicker.Header>
        </DatePicker>,
        {
          actions: {
            hover: '#datapicker',
          },
        },
      ),
    ).toMatchImageSnapshot(task);
  });

  test('Should support active item', async ({ task }) => {
    const component = (
      <DatePicker value={new Date('January 1, 2021 00:00:00')}>
        <DatePicker.ButtonTrigger id='datapicker' />
        <DatePicker.Popper />
      </DatePicker>
    );

    await expect(
      await snapshot(component, {
        actions: {
          active: '#datapicker',
        },
      }),
    ).toMatchImageSnapshot(task);
  });

  test('Should support set custom displayPeriod', () => {
    mockDate('2020-02-10T12:00:00.808Z');
    const { getByText, rerender } = render(
      <DateRangePicker visible defaultDisplayedPeriod='2020-03-10T12:00:00.808Z' />,
    );
    expect(getByText('March 2020')).toBeTruthy();
    rerender(<DateRangePicker visible displayedPeriod='2020-04-10T12:00:00.808Z' />);
    expect(getByText('April 2020')).toBeTruthy();
  });

  test('Should support set custom displayPeriod after changed displayedPeriod', () => {
    vi.useFakeTimers();
    const component = (
      <DateRangePicker defaultVisible defaultDisplayedPeriod={'2020-03-10T12:00:00.808Z'}>
        <DateRangePicker.ButtonTrigger aria-label='date picker'>
          Date picker
        </DateRangePicker.ButtonTrigger>
        <DateRangePicker.Popper />
      </DateRangePicker>
    );
    const { getByText, getByLabelText } = render(component);
    fireEvent.click(getByLabelText('Next period'));
    // change visible
    fireEvent.click(getByText('Select date period'));
    act(() => {
      vi.runAllTimers();
    });
    fireEvent.click(getByText('Select date period'));
    act(() => {
      vi.runAllTimers();
    });
    expect(getByText('March 2020')).toBeTruthy();
    vi.useRealTimers();
  });

  test('Should support set custom displayPeriod after changed value date', () => {
    vi.useFakeTimers();
    const { getByText, getByLabelText } = render(
      <DateRangePicker visible defaultDisplayedPeriod={'2021-09-10T12:00:00.808Z'} />,
    );
    fireEvent.click(getByLabelText('Previous period'));
    // change visible
    fireEvent.click(getByText('31'));
    fireEvent.click(getByText('Apply'));
    expect(getByText('August 2021')).toBeTruthy();
    vi.useRealTimers();
  });

  test.sequential('Should not select disabled date from the keyboard', async ({ expect }) => {
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

  test('Should change month after select new date from the keyboard', async ({ expect }) => {
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

  test('Should render correctly with empty period', async ({ task, expect }) => {
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

  test('a11y', async () => {
    const { container } = render(
      <DateRangePicker visible disablePortal aria-label='data range picker'>
        <DateRangePicker.ButtonTrigger aria-label='date range picker'>
          Open date range picker
        </DateRangePicker.ButtonTrigger>
        <DateRangePicker.Popper />
      </DateRangePicker>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('DatePicker.Header', () => {
  test('Should render correctly', async ({ task }) => {
    const component = (
      <DatePicker>
        <DatePicker.Header w={100}>
          <DatePicker.Prev />
          <DatePicker.Title>Header</DatePicker.Title>
          <DatePicker.Next />
        </DatePicker.Header>
      </DatePicker>
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

  test('Should render correctly', async ({ task }) => {
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

  test('Should render correctly', async ({ task }) => {
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

  test('Should render correctly monthes', async ({ task }) => {
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

  test('Should render disabled compare input by default', async ({ task }) => {
    const value = {
      value: [new Date('January 5, 2021 00:00:00'), new Date('January 10, 2021 00:00:00')],
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

  test('a11y', async () => {
    const { container } = render(
      <div>
        <DateRangeComparator>
          <DateRangeComparator.Trigger />
          <DateRangeComparator.Popper>
            <DateRangeComparator.Header>
              <DateRangeComparator.ValueDateRange aria-label='date-range from' />
              <DateRangeComparator.CompareToggle />
              <DateRangeComparator.CompareDateRange aria-label='date-range to' />
            </DateRangeComparator.Header>
            <DateRangeComparator.Body>
              <DateRangeComparator.RangeCalendar>
                <Flex direction='column'>
                  <DateRangeComparator.CalendarHeader tag={Flex}>
                    <DateRangeComparator.Prev />
                    <DateRangeComparator.Title />
                  </DateRangeComparator.CalendarHeader>
                  <DateRangeComparator.Calendar />
                </Flex>
                <Flex direction='column'>
                  <DateRangeComparator.CalendarHeader tag={Flex}>
                    <DateRangeComparator.Title />
                    <DateRangeComparator.Next />
                  </DateRangeComparator.CalendarHeader>
                  <DateRangeComparator.Calendar />
                </Flex>
              </DateRangeComparator.RangeCalendar>
              <DateRangeComparator.Periods>
                <DateRangeComparator.Periods.Divider />
                <DateRangeComparator.Periods.Column>
                  <DateRangeComparator.Periods.Options />
                  <DateRangeComparator.Periods.Controls>
                    <DateRangeComparator.Apply />
                    <DateRangeComparator.Reset />
                  </DateRangeComparator.Periods.Controls>
                </DateRangeComparator.Periods.Column>
              </DateRangeComparator.Periods>
            </DateRangeComparator.Body>
            <DateRangeComparator.Footer>
              <DateRangeComparator.Apply />
              <DateRangeComparator.Reset />
            </DateRangeComparator.Footer>
          </DateRangeComparator.Popper>
        </DateRangeComparator>
      </div>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
