import type { Meta, StoryObj } from '@storybook/react-vite';

import CalendarUnitPropsExample from './examples/calendar_props';
import CustomDayFixedForTestsExample from './examples/custom_day_test';
import DatePickerPropsExample from './examples/date-picker-props';
import DateRangeComparatorPropsExample from './examples/date-range-comparator-props';
import CustomDateRangesExample from './examples/date_picker_fixed_dates';
import DateRangePickerPropsExample from './examples/day-range-picker';
import DateRangePickerPeriodPropsExample from './examples/day-range-picker-perios-props';

const meta: Meta = {
  title: 'Components/DatePicker/Tests',
};

export default meta;

export const CustomDateRanges: StoryObj = {
  render: CustomDateRangesExample,
};

export const DateRangeComparatorProps: StoryObj = {
  render: DateRangeComparatorPropsExample,
};

export const CustomDayFixedForTests: StoryObj = {
  render: CustomDayFixedForTestsExample,
};

export const CalendarUnitProps: StoryObj = {
  render: CalendarUnitPropsExample,
};

export const DatePickerProps: StoryObj = {
  render: DatePickerPropsExample,
};

export const DateRangePickerProps: StoryObj = {
  render: DateRangePickerPropsExample,
};

export const DateRangePickerPeriodProps: StoryObj = {
  render: DateRangePickerPeriodPropsExample,
};
