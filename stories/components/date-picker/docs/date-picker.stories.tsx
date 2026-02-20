import type { Meta, StoryObj } from '@storybook/react-vite';

import { CustomDateRangesTest } from './__tests__/custom_date_ranges.test';
import { CustomDaysTest } from './__tests__/custom_days.test';
import { CustomHeaderTest } from './__tests__/custom_header.test';
import { DatePickerTest } from './__tests__/date_picker.test';
import { DateRangeComparatorTest } from './__tests__/date_range_comparator.test';
import { DateRangeComparatorAdvancedTest } from './__tests__/date_range_comparator_advanced.test';
import { DisabledDatesTest } from './__tests__/disabled_dates.test';
import { MonthRangeComparatorTest } from './__tests__/month_range_comparator.test';
import { MonthRangePickerTest } from './__tests__/month_range_picker.test';
import { ResetDatePickerTest } from './__tests__/reset_date_picker.test';
import { TriggerAndPopperTest } from './__tests__/trigger_popper.test';
import { WeekPickerTest } from './__tests__/week_picker.test';
import CustomDateRangesExample from './examples/custom_date_ranges';
import CustomDayExample from './examples/custom_day';
import CustomHeaderExample from './examples/custom_header';
import DateRangeComparatorExample from './examples/date_range_comparator';
import DateRangeComparatorAdvanceUseExample from './examples/date_range_comparator_advanced_use';
import DatepickerExample from './examples/datepicker';
import DisabledDatesExample from './examples/disabled_dates';
import MonthRangeComparatorAdvanceUseExample from './examples/month_range_comparator_advanced_use';
import MonthRangePickerExample from './examples/monthrangepicker';
import ResetDatePickerExample from './examples/reset_date_picker';
import TriggerAndPopperExample from './examples/trigger_and_popper';
import WeekPickerExample from './examples/week_picker';
import { playWrapper } from '../../../utils/playWrapper';

const meta: Meta = {
  title: 'Components/DatePicker/Documentation',
};
export default meta;

export const CustomDateRanges: StoryObj = {
  render: CustomDateRangesExample,
  play: playWrapper(CustomDateRangesTest),

};

export const ResetDatePicker: StoryObj = {
  render: ResetDatePickerExample,
  play: playWrapper(ResetDatePickerTest),

};

export const CustomDay: StoryObj = {
  render: CustomDayExample,
  play: playWrapper(CustomDaysTest),

};

export const CustomHeader: StoryObj = {
  render: CustomHeaderExample,
  play: playWrapper(CustomHeaderTest),

};

export const DateRangeComparator: StoryObj = {
  render: DateRangeComparatorExample,
  play: playWrapper(DateRangeComparatorTest),
};

export const DateRangeComparatorAdvanceUse: StoryObj = {
  render: DateRangeComparatorAdvanceUseExample,
  play: playWrapper(DateRangeComparatorAdvancedTest),

};

export const Datepicker: StoryObj = {
  render: DatepickerExample,
  play: playWrapper(DatePickerTest),
};

export const DisabledDates: StoryObj = {
  render: DisabledDatesExample,
  play: playWrapper(DisabledDatesTest),
};

export const MonthRangeComparatorAdvanceUse: StoryObj = {
  render: MonthRangeComparatorAdvanceUseExample,
  play: playWrapper(MonthRangeComparatorTest),
};

export const MonthRangePicker: StoryObj = {
  render: MonthRangePickerExample,
  play: playWrapper(MonthRangePickerTest),
};

export const TriggerAndPopper: StoryObj = {
  render: TriggerAndPopperExample,
  play: playWrapper(TriggerAndPopperTest),
};

export const WeekPicker: StoryObj = {
  render: WeekPickerExample,
  play: playWrapper(WeekPickerTest),
};
