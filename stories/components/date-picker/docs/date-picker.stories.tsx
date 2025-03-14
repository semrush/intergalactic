import type { Meta, StoryObj } from '@storybook/react';

import CustomDateRangesExample from './examples/custom_date_ranges';
import CustomDayExample from './examples/custom_day';
import CustomHeaderExample from './examples/custom_header';
import DateRangeComparatorExample from './examples/date_range_comparator';
import DateRangeComparatorAdvanceUseExample from './examples/date_range_comparator_advanced_use';
import DatepickerExample from './examples/datepicker';
import DisabledDatesExample from './examples/disabled_dates';
import MonthRangeComparatorAdvanceUseExample from './examples/month_range_comparator_advanced_use';
import MonthRangePickerExample from './examples/monthrangepicker';
import TriggerAndPopperExample from './examples/trigger_and_popper';
import WeekPickerExample from './examples/week_picker';

const meta: Meta = {
  title: 'Components/DatePicker/Documentation',
};
export default meta;

export const CustomDateRanges: StoryObj = {
  render: CustomDateRangesExample,
};

export const CustomDay: StoryObj = {
  render: CustomDayExample,
};

export const CustomHeader: StoryObj = {
    render: CustomHeaderExample,
  };

  export const DateRangeComparator: StoryObj = {
    render: DateRangeComparatorExample,
  };

  export const DateRangeComparatorAdvanceUse: StoryObj = {
    render: DateRangeComparatorAdvanceUseExample,
  };

  export const Datepicker: StoryObj = {
    render: DatepickerExample,
  };

  export const DisabledDates: StoryObj = {
    render: DisabledDatesExample,
  };

  export const MonthRangeComparatorAdvanceUse: StoryObj = {
    render: MonthRangeComparatorAdvanceUseExample,
  };

  export const MonthRangePicker: StoryObj = {
    render: MonthRangePickerExample,
  };

  export const TriggerAndPopper: StoryObj = {
    render: TriggerAndPopperExample,
  };

  export const WeekPicker: StoryObj = {
    render: WeekPickerExample,
  };