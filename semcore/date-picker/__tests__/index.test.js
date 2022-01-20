import React from 'react';
import { axe, cleanup, render, fireEvent } from 'jest-preset-ui/testing';
import snapshot from 'jest-preset-ui/snapshot';
import { DatePicker, DateRangePicker, MonthRangePicker } from '../src';

const RealDate = Date;

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
  afterEach(() => {
    global.Date = RealDate;
    cleanup();
  });

  test('Should support onChange with format time 00:00:00:000', () => {
    const spy = jest.fn();
    mockDate('2020-02-10T12:00:00.808Z');

    const { getByText } = render(<DatePicker onChange={spy} visible />);

    getByText('Today').click();
    expect(spy).toBeCalledWith(new Date(new Date().setHours(0, 0, 0, 0)));
  });

  test('Should support set custom displayPeriod', () => {
    const { getByText, rerender } = render(
      <DatePicker visible defaultDisplayedPeriod="2020-03-10T12:00:00.808Z" />,
    );
    expect(getByText('March 2020')).toBeTruthy();
    rerender(<DatePicker visible displayedPeriod="2020-04-10T12:00:00.808Z" />);
    expect(getByText('April 2020')).toBeTruthy();
  });

  test('Should support set custom displayPeriod after changed displayedPeriod', () => {
    jest.useFakeTimers();
    const component = (
      <DatePicker defaultVisible defaultDisplayedPeriod="2020-03-10T12:00:00.808Z" />
    );
    const { getByText, getByLabelText } = render(component);
    fireEvent.click(getByLabelText('Next period'));
    // change visible
    fireEvent.click(getByText('Select date'));
    jest.runAllTimers();
    fireEvent.click(getByText('Select date'));
    jest.runAllTimers();
    expect(getByText('March 2020')).toBeTruthy();
    jest.useRealTimers();
  });

  test('Should support set custom displayPeriod after changed value date', () => {
    jest.useFakeTimers();
    const component = (
      <DatePicker defaultVisible defaultDisplayedPeriod="2021-09-10T12:00:00.808Z" />
    );
    const { getByText, getByLabelText } = render(component);
    fireEvent.click(getByLabelText('Prev period'));
    // change visible
    fireEvent.click(getByText('15'));
    jest.runAllTimers();
    // change visible
    fireEvent.click(getByText('Aug 15, 2021'));
    jest.runAllTimers();
    expect(getByText('August 2021')).toBeTruthy();
    jest.useRealTimers();
  });

  test('a11y', async () => {
    const { container } = render(<DatePicker visible disablePortal />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('DateRangePicker', () => {
  afterEach(() => {
    global.Date = RealDate;
    cleanup();
  });

  test('Should support onChange with format time 00:00:00:000', async () => {
    const spy = jest.fn();
    mockDate('2020-02-10T12:00:00.808Z');

    const { getByText } = render(<DateRangePicker onChange={spy} visible />);

    getByText('Last 2 days').click();
    getByText('Apply').click();
    const today = new Date(new Date().setHours(0, 0, 0, 0));
    expect(spy).toBeCalledWith([DateRangePicker.subtract(today, 1, 'day'), today]);
  });

  test('Should render correctly with selected date', async () => {
    const component = (
      <DatePicker value={new Date('January 1, 2021 00:00:00')}>
        <DatePicker.Trigger size="xl" />
        <DatePicker.Popper />
      </DatePicker>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should render range of selected date', async () => {
    const component = (
      <DateRangePicker
        value={[new Date('December 31, 2020 00:00:00'), new Date('January 2, 2021 00:00:00')]}
      />
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should render correctly if one day is selected', async () => {
    const component = (
      <DateRangePicker
        value={[new Date('December 31, 2020 00:00:00'), new Date('December 31, 2020 00:00:00')]}
      />
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should render correctly if the same month of a different year is selected', async () => {
    const component = (
      <MonthRangePicker
        value={[new Date('December 31, 2020 00:00:00'), new Date('December 31, 2021 00:00:00')]}
      />
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support set custom displayPeriod', () => {
    mockDate('2020-02-10T12:00:00.808Z');
    const { getByText, rerender } = render(
      <DateRangePicker visible defaultDisplayedPeriod="2020-03-10T12:00:00.808Z" />,
    );
    expect(getByText('March 2020')).toBeTruthy();
    rerender(<DateRangePicker visible displayedPeriod="2020-04-10T12:00:00.808Z" />);
    expect(getByText('April 2020')).toBeTruthy();
  });

  test('Should support set custom displayPeriod after changed displayedPeriod', () => {
    jest.useFakeTimers();
    const component = (
      <DateRangePicker defaultVisible defaultDisplayedPeriod={['2020-03-10T12:00:00.808Z']} />
    );
    const { getByText, getByLabelText } = render(component);
    fireEvent.click(getByLabelText('Next period'));
    // change visible
    fireEvent.click(getByText('Select date period'));
    jest.runAllTimers();
    fireEvent.click(getByText('Select date period'));
    jest.runAllTimers();
    expect(getByText('March 2020')).toBeTruthy();
    jest.useRealTimers();
  });

  test('Should support set custom displayPeriod after changed value date', () => {
    jest.useFakeTimers();
    const component = (
      <DateRangePicker defaultVisible defaultDisplayedPeriod={['2021-09-10T12:00:00.808Z']} />
    );
    const { getByText, getByLabelText } = render(component);
    fireEvent.click(getByLabelText('Prev period'));
    // change visible
    fireEvent.click(getByText('31'));
    fireEvent.click(getByText('Apply'));
    jest.runAllTimers();
    // trigger
    fireEvent.click(getByText('Aug 31, 2021'));
    jest.runAllTimers();
    expect(getByText('August 2021')).toBeTruthy();
    jest.useRealTimers();
  });

  test('a11y', async () => {
    const { container } = render(<DateRangePicker visible disablePortal />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('DatePicker.Header', () => {
  test('Should render correctly', async () => {
    const component = (
      <DatePicker>
        <DatePicker.Header w={100}>
          <DatePicker.Prev />
          <DatePicker.Title>Header</DatePicker.Title>
          <DatePicker.Next />
        </DatePicker.Header>
      </DatePicker>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});
