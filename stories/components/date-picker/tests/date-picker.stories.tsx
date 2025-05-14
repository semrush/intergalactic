import type { Meta, StoryObj } from '@storybook/react';

import CustomDateRangesExample from './examples/date_picker_fixed_dates';
import CustomDayFixedForTestsExample from './examples/custom_day_test';

import CalendarUnitPropsExample from './examples/calendar_props';
import DatePickerPropsExample from './examples/date-picker-props';

import DateRandeTriggerExample from './examples/day-range-trigger';
import TriggerExample from './examples/day-trigger';
import MonthTriggerExample from './examples/month-trigger';
import MonthRangeTriggerExample from './examples/month-range-trigger';


import DateRandePickerPropsExample from './examples/day-range-picker';
import DateRandePickerPeriodPropsExample from './examples/day-range-picker-perios-props';
import DateRandeComparatorPropsExample from './examples/date-range-comparator-props';


const meta: Meta = {
  title: 'Components/DatePicker/Tests',
};
export default meta;

export const CustomDateRanges: StoryObj = {
  render: CustomDateRangesExample,
};

export const DateRandeComparatorProps: StoryObj = {
  render: DateRandeComparatorPropsExample,
};


export const CustomDayFixedForTests: StoryObj = {
  render: CustomDayFixedForTestsExample,
};

export const Trigger: StoryObj = {
  render: TriggerExample,
};

export const MonthTrigger: StoryObj = {
  render: MonthTriggerExample,
};

export const MonthRangeTrigger: StoryObj = {
  render: MonthRangeTriggerExample,
};
export const CalendarUnitProps: StoryObj = {
  render: CalendarUnitPropsExample,
};

export const DatePickerProps: StoryObj = {
  render: DatePickerPropsExample,
};

export const DateRandeTrigger: StoryObj = {
  render: DateRandeTriggerExample,
};

export const DateRandePickerProps: StoryObj = {
  render: DateRandePickerPropsExample,
};

export const DateRandePickerPeriodProps: StoryObj = {
  render: DateRandePickerPeriodPropsExample,
};