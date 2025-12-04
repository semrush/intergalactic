import Select from '@semcore/ui/select';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import FocusExample from './examples/focus_interaction';
import OnChangeInputSearchExample from './examples/on_change_input_search';
import OnVisibleExample from './examples/on_visible';
import OptionsExample from './examples/options';
import ProgrammaticallyFocusExample from './examples/programmatically_focus';
import SelectDisabledItemsExample, { defaultProps as SelectDisabledItemsProps } from './examples/select_disabled_items';
import TriggerExample from './examples/trigger';

const meta: Meta<typeof Select> = {
  title: 'Components/Select/Test',
  component: Select,
};

export default meta;
type Story = StoryObj<typeof Select>;

const commonArgTypes = {
  size: {
    control: { type: 'select' },
    options: ['m', 'l'],
  },
  visible: {
    control: { type: 'boolean' },
  },
  disablePortal: {
    control: { type: 'boolean' },
  },
  disabledAll: {
    control: { type: 'boolean' },
  },
} as const;

export const Options: Story = {
  render: OptionsExample,
};

export const Trigger: Story = {
  render: TriggerExample,
};

export const BasicSelectFocusIteracrion: Story = {
  render: FocusExample,
};

export const OnVisible: Story = {
  render: OnVisibleExample,
};

export const OnChangeInputSearch: Story = {
  render: OnChangeInputSearchExample,
};

export const ProgrammaticallyFocus: Story = {
  render: ProgrammaticallyFocusExample,
};

export const SelectDisabledItems: StoryObj<typeof SelectDisabledItemsProps> = {
  render: SelectDisabledItemsExample,
  argTypes: {
    ...commonArgTypes,
    disabledOption1: {
      control: { type: 'boolean' },
    },
    disabledOption2: {
      control: { type: 'boolean' },
    },
    disabledOption3: {
      control: { type: 'boolean' },
    },
    disabledOption4: {
      control: { type: 'boolean' },
    },
    selectedOption1: {
      control: { type: 'boolean' },
    },
    selectedOption2: {
      control: { type: 'boolean' },
    },
    selectedOption3: {
      control: { type: 'boolean' },
    },
    selectedOption4: {
      control: { type: 'boolean' },
    },
  },
  args: SelectDisabledItemsProps,
};
