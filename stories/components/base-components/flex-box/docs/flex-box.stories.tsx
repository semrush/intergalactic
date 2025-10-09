import type { Meta, StoryObj } from '@storybook/react-vite';

import BoxExample from './examples/box';
import FlexExample from './examples/flex';

const meta: Meta = {
  title: 'Components/Base Components/Flex-Box/Documentation',
};

export const Flex: StoryObj = {
  render: FlexExample,
};

export const Box: StoryObj = {
  render: BoxExample,
};

export default meta;
