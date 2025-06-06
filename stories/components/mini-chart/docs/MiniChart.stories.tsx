import type { Meta, StoryObj } from '@storybook/react-vite';

import BaseColorExample from './examples/base_color';
import BasicUsageExample from './examples/basic_usage';

const meta: Meta = {
  title: 'Components/MiniChart/Documentation',
};

export default meta;

export const BasicUsage: StoryObj = {
  render: BasicUsageExample,
};

export const BaseColor: StoryObj = {
  render: BaseColorExample,
};
