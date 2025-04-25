import type { Meta, StoryObj } from '@storybook/react';

import CustomDateRangesExample from './examples/date_picker_fixed_dates';
import CustomDayFixedForTestsExample from './examples/custom_day_test';
import TriggerExample from './examples/trigger';


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


