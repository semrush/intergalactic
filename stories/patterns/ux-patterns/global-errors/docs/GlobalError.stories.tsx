import type { Meta, StoryObj } from '@storybook/react';

import CustomErrorExample from './examples/custom-error';
import TemplatesExample from './examples/templates';

const meta: Meta = {
  title: 'Patterns/UX Patterns/GlobalErrors',
};

export const CustomError: StoryObj = {
  render: CustomErrorExample,
};

export const Templates: StoryObj = {
  render: TemplatesExample,
};

export default meta;
