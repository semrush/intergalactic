import type { Meta, StoryObj } from '@storybook/react-vite';

import FeaturePopoverExample from './examples/animation-feature-popover';
import AnimationExample, { defaultAnimationProps } from './examples/basic-usage';
import ModalExample from './examples/in-modal-fadeinout-slide';

const meta: Meta = {
  title: 'Components/Base Components/Animation/Tests',
};

export const AnimationBase: StoryObj<typeof defaultAnimationProps> = {
  render: AnimationExample,
  argTypes: {
    duration: {
      control: { type: 'number' },
    },
    delay: {
      control: { type: 'number' },
    },
    initialAnimation: {
      control: { type: 'boolean' },
    },
    visible: {
      control: { type: 'boolean' },
    },

  },
  args: defaultAnimationProps,
};

export const FeaturePopover: StoryObj = {
  render: FeaturePopoverExample,
};

export const Modal: StoryObj = {
  render: ModalExample,
};

export default meta;
