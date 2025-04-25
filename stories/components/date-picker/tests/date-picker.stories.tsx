import type { Meta, StoryObj } from '@storybook/react';

import CustomDateRangesExample from './examples/date_picker_fixed_dates';
import CustomDayFixedForTestsExample from './examples/custom_day_test';
import TriggerExample from './examples/day-trigger';
import CalendarUnitPropsExample from './examples/calendar_props';
import DatePickerPropsExample from './examples/date-picker-props';
import DateRandeTriggerExample from './examples/day-range-trigger';


const meta: Meta = {
  title: 'Components/DatePicker/Tests',
};
export default meta;

export const CustomDateRanges: StoryObj = {
  render: CustomDateRangesExample,
};

export const CustomDayFixedForTests: StoryObj = {
  render: CustomDayFixedForTestsExample,
};

export const Trigger: StoryObj = {
  render: TriggerExample,
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
