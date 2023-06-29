import React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import { cleanup, render, fireEvent, act } from '@semcore/testing-utils/testing-library';
import { axe } from '@semcore/testing-utils/axe';

import { DatePicker, DateRangePicker, MonthRangePicker } from '../src';

const RealDate = global.Date;

// https://github.com/facebook/jest/issues/2234#issuecomment-384884729
function mockDate(isoDate) {
  global.Date = class extends RealDate {
    constructor(...theArgs) {
      if (theArgs.length) {
        return new RealDate(...theArgs);
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
      <DatePicker defaultVisible defaultDisplayedPeriod='2020-03-10T12:00:00.808Z' />,
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
      <DatePicker visible disablePortal aria-label='date picker'>
        <DatePicker.Trigger aria-label='date picker'>Open date picker</DatePicker.Trigger>
        <DatePicker.Popper />
      </DatePicker>,
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
        <DatePicker.InputTrigger size='l' />
        <DatePicker.Popper />
      </DatePicker>
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
          <DatePicker.InputTrigger id='datapicker' />
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
        <DatePicker.InputTrigger id='datapicker' />
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
      <DateRangePicker visible defaultDisplayedPeriod={['2020-03-10T12:00:00.808Z']} />
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
      <DateRangePicker visible defaultDisplayedPeriod={['2021-09-10T12:00:00.808Z']} />,
    );
    fireEvent.click(getByLabelText('Previous period'));
    // change visible
    fireEvent.click(getByText('31'));
    fireEvent.click(getByText('Apply'));
    expect(getByText('August 2021')).toBeTruthy();
    vi.useRealTimers();
  });

  test('a11y', async () => {
    const { container } = render(
      <DateRangePicker visible disablePortal aria-label='data range picker'>
        <DateRangePicker.Trigger aria-label='date range picker'>
          Open date range picker
        </DateRangePicker.Trigger>
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
