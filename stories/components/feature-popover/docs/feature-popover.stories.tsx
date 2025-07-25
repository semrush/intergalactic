import FeaturePopover from '@semcore/feature-popover';
import type { Meta, StoryObj } from '@storybook/react-vite';

import FeaturePopoverExample, { defaultProps as ExampleProps } from './examples/Basic';

const meta: Meta<typeof FeaturePopover> = {
  title: 'Components/FeaturePopover/Documentation',
  component: FeaturePopover,
};

export default meta;

export const AnimationExample: StoryObj<typeof ExampleProps> = {
  render: FeaturePopoverExample,
  argTypes: {
    disabled: {
      control: { type: 'boolean' },
    },
    placement: {
      control: { type: 'select' },
      options: ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'],
    },
    interaction: {
      control: { type: 'select' },
      options: ['none', 'hover', 'focus', 'click'],
    },
    timeout: {
      control: { type: 'number' },
    },
    defaultVisible: {
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
    closeIcon: {
      control: { type: 'boolean' },
    },
  },
  args: ExampleProps,
};
