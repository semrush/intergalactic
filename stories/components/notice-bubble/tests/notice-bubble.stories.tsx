import type { Meta, StoryObj } from '@storybook/react-vite';

import ContainerNodeVariationsExample, { defaultProps as ContainerNodeVariationsProps } from '../tests/examples/containernode_variations';

const meta: Meta = {
  title: 'Components/NoticeBubble/Tests',
};
export default meta;

const sharedArgTypes = {
  initialAnimation: {
    control: { type: 'boolean' },
  },
  duration: {
    control: { type: 'number' },
  },
  type: {
    control: { type: 'select' },
    options: ['info', 'warning', 'none'],
  },
  focusLock: {
    control: { type: 'boolean' },
  },
} as const;

export const ContainerNodeVariations: StoryObj<typeof ContainerNodeVariationsProps> = {
  render: ContainerNodeVariationsExample,
  argTypes: {
    ...sharedArgTypes,
    containerMode: {
      control: { type: 'select' },
      options: ['default', 'custom-element'],
      description: 'Mode for containerNode prop: default (null) or custom element',
    },
  },
  args: ContainerNodeVariationsProps,
};
