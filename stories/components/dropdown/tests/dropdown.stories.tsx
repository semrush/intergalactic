import Dropdown from '@semcore/ui/dropdown';
import type { Meta, StoryObj } from '@storybook/react-vite';

import DisableEnforceFocusAndAutoFocusExample, { defaultDisableEnforceAndAutoFocusExampleProps } from './examples/disable-enforce-focus-and-auto-focus';
import OnVisibleOnFirstUpdateExample, { defaultVisibleUpdateProps } from './examples/dropdown-on-visible-on-first-update';
import ExampleWithPropsExample, { defaultDropdownExampleProps } from './examples/example-with-props';
import InputAsTriggerExample, { defaultInputTriggerExampleProps } from './examples/input-as-trigger';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown/Tests',
  component: Dropdown,
};
export default meta;

type Story = StoryObj<typeof Dropdown>;

export const DisableEnforceFocusAndAutoFocus: StoryObj<typeof defaultDisableEnforceAndAutoFocusExampleProps> = {
  render: DisableEnforceFocusAndAutoFocusExample,
  argTypes: {
    disableEnforceFocus: {
      control: { type: 'boolean' },
    },
    autoFocus: {
      control: { type: 'boolean' },
    },
  },
  args: defaultDisableEnforceAndAutoFocusExampleProps,
};

export const ExampleWithProps: StoryObj<typeof defaultDropdownExampleProps> = {
  render: ExampleWithPropsExample,
  argTypes: {

    stretch: {
      control: { type: 'select' },
      options: ['min', 'fixed', false],
    },
    placement: {
      control: { type: 'select' },
      options: ['auto', 'auto-start', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'],
    },
    interaction: {
      control: { type: 'select' },
      options: ['click', 'hover', 'focus', 'none'],
    },
    timeout: {
      control: { type: 'number' },
    },
    visible: {
      control: { type: 'boolean' },
    },
    defaultVisible: {
      control: { type: 'boolean' },
    },
    offset: {
      control: { type: 'number' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    disableEnforceFocus: {
      control: { type: 'boolean' },
    },
    focusLoop: {
      control: { type: 'boolean' },
    },
    explicitTriggerSet: {
      control: { type: 'boolean' },
    },
    cursorAnchoring: {
      control: { type: 'boolean' },
    },
    popperMargin: {
      control: { type: 'number' },
    },
    autoFocus: {
      control: { type: 'select' },
      options: [true, false, undefined],
    },
    showNotice: {
      control: { type: 'boolean' },
      table: { category: 'Notice' },
    },
    noticeTheme: {
      control: { type: 'select' },
      options: ['info', 'muted', 'warning', 'danger', 'success'],
      table: { category: 'Notice props' },
    },
    noticeHidden: {
      control: { type: 'boolean' },
      table: { category: 'Notice props' },
    },
    showNoticeLabel: {
      control: { type: 'boolean' },
      table: { category: 'Notice content' },
    },
    noticeTitle: {
      control: { type: 'text' },
      table: { category: 'Notice content' },
    },
    noticeText: {
      control: { type: 'text' },
      table: { category: 'Notice content' },
    },
    showNoticeActions: {
      control: { type: 'boolean' },
      table: { category: 'Notice content' },
    },
    noticeActionText: {
      control: { type: 'text' },
      table: { category: 'Notice content' },
    },
    showNoticeClose: {
      control: { type: 'boolean' },
      table: { category: 'Notice content' },
    },
  },
  args: defaultDropdownExampleProps,
};

export const InputAsTrigger: StoryObj<typeof defaultInputTriggerExampleProps> = {
  render: InputAsTriggerExample,
  argTypes: {
    interaction: {
      control: { type: 'select' },
      options: ['click', 'hover', 'focus', 'none'],
    },

  },
  args: defaultInputTriggerExampleProps,
};

export const OnVisibleOnFirstUpdate: StoryObj<typeof defaultVisibleUpdateProps> = {
  render: OnVisibleOnFirstUpdateExample,
  argTypes: {
    interaction: {
      control: { type: 'select' },
      options: ['click', 'hover', 'focus', 'none'],
    },

  },
  args: defaultVisibleUpdateProps,
};
