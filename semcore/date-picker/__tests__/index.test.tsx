import React from 'react';
import { cleanup, render } from 'jest-preset-ui/testing';
import { DatePicker, DateRangePicker, MonthRangePicker } from '../src';
import snapshot from 'jest-preset-ui/snapshot';

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
});
