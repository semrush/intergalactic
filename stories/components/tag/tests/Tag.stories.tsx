import Tag from '@semcore/ui/tag';
import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicPropsExample, { defaultProps } from './examples/basic_usage';
import EllipsisExample from './examples/tag-with-ellipsis';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag/Tests',
  component: Tag,
};

export default meta;

export const BasicProps: StoryObj<typeof defaultProps> = {
  args: defaultProps,
  argTypes: {
    text: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    active: {
      control: 'boolean',
    },
    interactive: {
      control: 'boolean',
    },
    theme: {
      control: 'select',
      options: ['primary', 'secondary', 'additional', 'muted', 'invert'],
    },
    color: {
      control: 'select',
      options: [
        'gray-500',
        'blue-500',
        'green-500',
        'salad-500',
        'orange-500',
        'yellow-500',
        'red-500',
        'pink-500',
        'violet-500',
        'white-500',
      ],
    },
    size: {
      control: 'select',
      options: ['m', 'l', 'xl'],
    },
    showAddonLeft: {
      control: 'boolean',
    },
    showAddonRight: {
      control: 'boolean',
    },
    showClose: {
      control: 'boolean',
    },
    useTagContainer: {
      control: 'boolean',
    },
    locale: {
      control: 'text',
    },
  },
  render: BasicPropsExample,
};

export const Ellipsis: StoryObj = {
  render: EllipsisExample,
};
