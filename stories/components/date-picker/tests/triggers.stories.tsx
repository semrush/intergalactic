import type { Meta, StoryObj } from '@storybook/react-vite';

import DateRangeTriggerExample, {
  defaultDateRangeTriggerProps,
} from './examples/day-range-trigger';
import DayTriggerExample, { defaultTriggerProps } from './examples/day-trigger';
import MonthRangeTriggerExample, {
  defaultMonthRangeTriggerProps,
} from './examples/month-range-trigger';
import MonthTriggerExample, { defaultMonthTriggerProps } from './examples/month-trigger';

const meta: Meta = {
  title: 'Components/DatePicker/Tests/Triggers',
};
export default meta;

const triggerArgTypes = {
  size: {
    control: { type: 'select' },
    options: ['m', 'l'],
  },
  disabled: {
    control: { type: 'boolean' },
  },
  state: {
    control: { type: 'select' },
    options: ['normal', 'invalid', 'valid'],
  },
  neighborLocation: {
    control: { type: 'select' },
    options: [false, 'left', 'right', 'both'],
  },
} as const;

export const DayTrigger: StoryObj<typeof defaultTriggerProps> = {
  render: DayTriggerExample,
  argTypes: triggerArgTypes,
  args: defaultTriggerProps,
};

export const MonthTrigger: StoryObj<typeof defaultMonthTriggerProps> = {
  render: MonthTriggerExample,
  argTypes: triggerArgTypes,
  args: defaultMonthTriggerProps,
};

export const DateRangeTrigger: StoryObj<typeof defaultDateRangeTriggerProps> = {
  render: DateRangeTriggerExample,
  argTypes: triggerArgTypes,
  args: defaultDateRangeTriggerProps,
};

export const MonthRangeTrigger: StoryObj<typeof defaultMonthRangeTriggerProps> = {
  render: MonthRangeTriggerExample,
  argTypes: triggerArgTypes,
  args: defaultMonthRangeTriggerProps,
};
