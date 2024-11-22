import type { Meta, StoryObj } from '@storybook/react';

import BasicUsageExample from './examples/basic_usage';
import BaseColorExample from './examples/base_color';

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
