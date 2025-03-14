import type { Meta, StoryObj } from '@storybook/react';

import FlexExample from './examples/flex';
import BoxExample from './examples/box';

const meta: Meta = {
  title: 'Components/FlexBox/Documentation',
};

export const Flex: StoryObj = {
  render: FlexExample,
};

export const Box: StoryObj = {
  render: BoxExample,
};

export default meta;
