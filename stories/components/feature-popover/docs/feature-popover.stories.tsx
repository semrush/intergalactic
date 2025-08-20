import FeaturePopover from '@semcore/feature-popover';
import type { Meta, StoryObj } from '@storybook/react-vite';

import type { FeaturePopoverExampleProps } from './examples/Basic';
import FeaturePopoverExample, { defaultProps } from './examples/Basic';

const meta: Meta<typeof FeaturePopover> = {
  title: 'Components/FeaturePopover/Documentation',
  component: FeaturePopover,
};

export default meta;

export const AnimationExample: StoryObj<FeaturePopoverExampleProps> = {
  render: FeaturePopoverExample,
  argTypes: {
    closeIcon: {
      control: { type: 'boolean' },
    },
    theme: {
      control: { type: 'select' },
      options: ['accent', 'neutral'],
      defaultValue: 'accent',
    },
  },
  args: defaultProps,
};
