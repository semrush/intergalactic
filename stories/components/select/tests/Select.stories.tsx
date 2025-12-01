import Select from '@semcore/ui/select';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import AdvancedConfigExample, { defaultProps as AdvancedConfigProps } from './examples/advanced_configuration';
import BasicExample, { defaultProps as BasicProps } from './examples/basic_usage';
import ComponentConfigExample, { defaultProps as ComponentConfigProps } from './examples/component_configuration';
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

export const Basic: StoryObj<typeof BasicProps> = {
  render: BasicExample,
  argTypes: {
    labelText: {
      control: { type: 'text' },
    },
    showLabel: {
      control: { type: 'boolean' },
    },
    optionCount: {
      control: { type: 'number' },
    },
    placeholder: {
      control: { type: 'text' },
    },
    size: {
      control: { type: 'select' },
      options: ['m', 'l'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    state: {
      control: { type: 'select' },
      options: ['normal', 'valid', 'invalid'],
    },
    multiselect: {
      control: { type: 'boolean' },
    },
    interaction: {
      control: { type: 'select' },
      options: ['click', 'focus', 'hover'],
    },
    scrollToSelected: {
      control: { type: 'boolean' },
    },
  },
  args: BasicProps,
};

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

export const AdvancedConfiguration: StoryObj<typeof AdvancedConfigProps> = {
  render: AdvancedConfigExample,
  argTypes: {
    // Main Select props
    labelText: { control: { type: 'text' } },
    showLabel: { control: { type: 'boolean' } },
    triggerPlaceholder: { control: { type: 'text' } },
    size: {
      control: { type: 'select' },
      options: ['m', 'l'],
    },
    disabled: { control: { type: 'boolean' } },
    state: {
      control: { type: 'select' },
      options: ['normal', 'valid', 'invalid'],
    },

    // Option 1 - Default option (SelectOptionProps)
    option1Value: { control: { type: 'text' } },
    option1Text: { control: { type: 'text' } },
    option1Disabled: { control: { type: 'boolean' } },
    option1Selected: { control: { type: 'boolean' } },

    // Option 2 - Checkbox option (SelectOptionProps + SelectOptionCheckboxProps)
    option2Value: { control: { type: 'text' } },
    option2Text: { control: { type: 'text' } },
    option2Disabled: { control: { type: 'boolean' } },
    option2Selected: { control: { type: 'boolean' } },
    option2ShowCheckbox: { control: { type: 'boolean' } },
    option2CheckboxTheme: { control: { type: 'text' } },
    option2CheckboxIndeterminate: { control: { type: 'boolean' } },

    // Option 3 - Option with hint (SelectOptionProps + SelectOptionCheckboxProps + Hint)
    option3Value: { control: { type: 'text' } },
    option3Text: { control: { type: 'text' } },
    option3Disabled: { control: { type: 'boolean' } },
    option3Selected: { control: { type: 'boolean' } },
    option3ShowCheckbox: { control: { type: 'boolean' } },
    option3CheckboxIndeterminate: { control: { type: 'boolean' } },
    option3HintText: { control: { type: 'text' } },

    // Group (Select.Group props)
    showGroup: { control: { type: 'boolean' } },
    groupTitle: { control: { type: 'text' } },
    groupSubTitle: { control: { type: 'text' } },
    groupOption1Value: { control: { type: 'text' } },
    groupOption1Text: { control: { type: 'text' } },
    groupOption2Value: { control: { type: 'text' } },
    groupOption2Text: { control: { type: 'text' } },
  },
  args: AdvancedConfigProps,
};

export const ComponentConfiguration: StoryObj<typeof ComponentConfigProps> = {
  render: ComponentConfigExample,
  argTypes: {
    // Main props
    labelText: { control: { type: 'text' } },
    showLabel: { control: { type: 'boolean' } },
    optionCount: { control: { type: 'number' } },

    // Trigger props
    triggerPlaceholder: { control: { type: 'text' } },
    triggerSize: {
      control: { type: 'select' },
      options: ['m', 'l'],
    },
    triggerDisabled: { control: { type: 'boolean' } },
    triggerState: {
      control: { type: 'select' },
      options: ['normal', 'valid', 'invalid'],
    },
    triggerLoading: { control: { type: 'boolean' } },

    // Popper props
    popperPlacement: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
    },
    popperFlip: { control: { type: 'boolean' } },
    popperOffset: { control: { type: 'number' } },
    popperArrow: { control: { type: 'boolean' } },

    // Menu props
    menuSize: {
      control: { type: 'select' },
      options: ['m', 'l'],
    },
    menuW: { control: { type: 'number' } },
    menuMaxH: { control: { type: 'number' } },

    // List props
    listSize: {
      control: { type: 'select' },
      options: ['m', 'l'],
    },

    // InputSearch props
    showInputSearch: { control: { type: 'boolean' } },
    inputSearchPlaceholder: { control: { type: 'text' } },
    inputSearchSize: {
      control: { type: 'select' },
      options: ['m', 'l'],
    },
  },
  args: ComponentConfigProps,
};
