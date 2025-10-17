import FeaturePopover from '@semcore/ui/feature-popover';
import type { Meta, StoryObj } from '@storybook/react-vite';

import FeaturePopoverExample, { defaultProps as FeaturePopoverExampleProps } from './examples/base-usage-with-all-props';
import FeaturePopoverMediumIllustrationExample, {
  defaultProps as FeaturePopoverMediumIllustrationProps,
} from './examples/base-usage-with-medium-illustration';

const meta: Meta<typeof FeaturePopover> = {
  title: 'Components/FeaturePopover/Tests',
  component: FeaturePopover,
};

export default meta;

const baseArgTypes = {
  placement: {
    control: { type: 'select' },
    options: [
      'auto-start',
      'auto',
      'auto-end',
      'top-start',
      'top',
      'top-end',
      'right-start',
      'right',
      'right-end',
      'bottom-end',
      'bottom',
      'bottom-start',
      'left-end',
      'left',
      'left-start',
    ],
  },
  timeout: { control: { type: 'number' } },
  explicitTriggerSet: { control: { type: 'boolean' } },
  popperMargin: { control: { type: 'number' } },
  closeIcon: { control: { type: 'boolean' } },
  duration: { control: { type: 'number' } },
} as const;

export const FeaturePopoverProps: StoryObj<typeof FeaturePopoverExampleProps> = {
  render: FeaturePopoverExample,
  argTypes: {
    ...baseArgTypes,
    theme: {
      control: { type: 'select' },
      options: ['accent', 'neutral'],
    },
    autoFocus: { control: { type: 'boolean' } },
    disableEnforceFocus: { control: { type: 'boolean' } },
  },
  args: FeaturePopoverExampleProps,
};

export const FeaturePopoverMediumIllustration: StoryObj<typeof FeaturePopoverMediumIllustrationProps> = {
  render: FeaturePopoverMediumIllustrationExample,
  argTypes: {
    ...baseArgTypes,

    visible: {
      control: { type: 'boolean' },
    },
  },

  args: FeaturePopoverMediumIllustrationProps,
};
