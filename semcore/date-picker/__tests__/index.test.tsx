import React from 'react';
import { cleanup, render } from 'jest-preset-ui/testing';
import { DatePicker, DateRangePicker } from '../src';

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
});
