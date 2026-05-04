import type { Meta, StoryObj } from '@storybook/react-vite';

import IconWithAllColorsExample from './examples/icon-all-colors';

const meta: Meta = {
  title: 'Components/Icon/Advanced',
};

export default meta;

export const IconWithAllColors: StoryObj = {
  name: 'Icon with all colors',
  render: IconWithAllColorsExample,
};
