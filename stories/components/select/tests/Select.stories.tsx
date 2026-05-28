import Select from '@semcore/ui/select';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import BasicPropsExample, { defaultProps as BasicProps } from './examples/basic_props_and_trigger_addons';
import OnChangeInputSearchExample from './examples/on_change_input_search';
import OnVisibleExample from './examples/on_visible';
import OptionsExample, { defaultProps as OptionsProps } from './examples/options_checkbox_group_and_hint';
import ProgrammaticallyFocusExample from './examples/programmatically_focus';
import type { defaultProps as SelectWithEllipsisProps } from './examples/select-with-ellipsis';
import SelectWithEllipsisExample from './examples/select-with-ellipsis';
import SubcomponentsExample, { defaultProps as SubcomponentsProps } from './examples/subcomponents_trigger_popper_list_search';

const meta: Meta<typeof Select> = {
  title: 'Components/Select/Test',
  component: Select,
};

export default meta;
type Story = StoryObj<typeof Select>;

const commonArgTypes = {
  labelText: {
    control: { type: 'text' },
  },
  showLabel: {
    control: { type: 'boolean' },
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
} as const;

export const BasicPropsAndTriggerAddons: StoryObj<typeof BasicProps> = {
  render: BasicPropsExample,
  argTypes: {
    ...commonArgTypes,
    optionCount: {
      control: { type: 'number' },
    },
    placeholder: {
      control: { type: 'text' },
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

    // Trigger Addon props
    showLeftAddon: {
      control: { type: 'boolean' },
    },
    leftAddonContent: {
      control: { type: 'select' },
      options: ['icon', 'badge', 'text'],
    },
    leftAddonText: {
      control: { type: 'text' },
    },
    leftAddonBadgeText: {
      control: { type: 'text' },
    },
    leftAddonBadgeBg: {
      control: { type: 'text' },
    },
    showRightAddon: {
      control: { type: 'boolean' },
    },
    rightAddonContent: {
      control: { type: 'select' },
      options: ['icon', 'badge', 'text'],
    },
    rightAddonText: {
      control: { type: 'text' },
    },
    rightAddonBadgeText: {
      control: { type: 'text' },
    },
    rightAddonBadgeBg: {
      control: { type: 'text' },
    },
    triggerText: {
      control: { type: 'text' },
    },
    showTriggerText: {
      control: { type: 'boolean' },
    },
  },
  args: BasicProps,
};

export const OnVisible: Story = {
  render: OnVisibleExample,
};

export const SelectWithEllipsis: StoryObj<typeof SelectWithEllipsisProps> = {
  render: SelectWithEllipsisExample,
  argTypes: {
    hintProps: {
      control: 'select',
      options: ['default', 'false'],
      mapping: {
        default: undefined,
        false: false,
      },
    },
    hintPlacement: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
    },
  },
};

export const OnChangeInputSearch: Story = {
  render: OnChangeInputSearchExample,
};

export const ProgrammaticallyFocus: Story = {
  render: ProgrammaticallyFocusExample,
};

export const OptionsCheckboxGroupAndHint: StoryObj<typeof OptionsProps> = {
  render: OptionsExample,
  argTypes: {
    ...commonArgTypes,
    triggerPlaceholder: { control: { type: 'text' } },
    visible: { control: { type: 'boolean' } },
    disablePortal: { control: { type: 'boolean' } },

    // Option 1 - Default option (SelectOptionProps)
    option1Value: { control: { type: 'number' } },
    option1Text: { control: { type: 'text' } },
    option1Disabled: { control: { type: 'boolean' } },
    option1Selected: { control: { type: 'boolean' } },

    // Option 2 - Checkbox option (SelectOptionProps + SelectOptionCheckboxProps)
    option2Value: { control: { type: 'number' } },
    option2Text: { control: { type: 'text' } },
    option2Disabled: { control: { type: 'boolean' } },
    option2Selected: { control: { type: 'boolean' } },
    option2ShowCheckbox: { control: { type: 'boolean' } },
    option2CheckboxTheme: { control: { type: 'text' } },
    option2CheckboxIndeterminate: { control: { type: 'boolean' } },

    // Option 3 - Option with hint (SelectOptionProps + SelectOptionCheckboxProps + Hint)
    option3Value: { control: { type: 'number' } },
    option3Text: { control: { type: 'text' } },
    option3Disabled: { control: { type: 'boolean' } },
    option3Selected: { control: { type: 'boolean' } },
    option3ShowCheckbox: { control: { type: 'boolean' } },
    option3CheckboxIndeterminate: { control: { type: 'boolean' } },
    option3HintText: { control: { type: 'text' } },

    // Option 4 - Simple option (SelectOptionProps)
    option4Value: { control: { type: 'number' } },
    option4Text: { control: { type: 'text' } },
    option4Disabled: { control: { type: 'boolean' } },
    option4Selected: { control: { type: 'boolean' } },

    // Group (Select.Group props)
    showGroup: { control: { type: 'boolean' } },
    groupTitle: { control: { type: 'text' } },
    groupSubTitle: { control: { type: 'text' } },
    groupOption1Value: { control: { type: 'number' } },
    groupOption1Text: { control: { type: 'text' } },
    groupOption2Value: { control: { type: 'number' } },
    groupOption2Text: { control: { type: 'text' } },

    // Bulk controls
    disabledAll: { control: { type: 'boolean' } },
  },
  args: OptionsProps,
};

export const SubcomponentsTriggerPopperListSearch: StoryObj<typeof SubcomponentsProps> = {
  render: SubcomponentsExample,
  argTypes: {
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

    // List props
    listSize: {
      control: { type: 'select' },
      options: ['m', 'l'],
    },
    listMaxH: { control: { type: 'number' } },

    // InputSearch props
    showInputSearch: { control: { type: 'boolean' } },
    inputSearchPlaceholder: { control: { type: 'text' } },
  },
  args: SubcomponentsProps,
};
