import type { Meta, StoryObj } from '@storybook/react-vite';

import PlaygroundExample from './Playground';

const meta: Meta = {
  title: 'Playground',
};

export default meta;

export const Playground = {
  render: PlaygroundExample,
};
