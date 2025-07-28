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
    closeIcon: {
      control: { type: 'boolean' },
    },
  },
  args: ExampleProps,
};
