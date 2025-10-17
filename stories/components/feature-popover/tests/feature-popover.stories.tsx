import FeaturePopover from '@semcore/ui/feature-popover';
import type { Meta, StoryObj } from '@storybook/react-vite';

import FeaturePopoverExample, { defaultProps as ExampleProps } from './examples/base-usage-with-all-props';
import FeaturePopoverMediumIllustrationExample, {
  defaultProps as Example2Props,
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

export const FeaturePopoverProps: StoryObj<typeof ExampleProps> = {
  render: FeaturePopoverExample,
  argTypes: {
    ...baseArgTypes,
    theme: {
      control: { type: 'select' },
      options: ['accent', 'neutral'],
    },
    autoFocus: {
      control: { type: 'select' },
      options: [true, false, 'enforced', undefined],
    },
    disableEnforceFocus: { control: { type: 'boolean' } },
  },

  args: ExampleProps,
};

export const FeaturePopoverMediumIllustration: StoryObj<typeof Example2Props> = {
  render: FeaturePopoverMediumIllustrationExample,
  argTypes: {
    ...baseArgTypes,

    visible: {
      control: { type: 'boolean' },
    },
  },

  args: Example2Props,
};
