import type { Meta, StoryObj } from '@storybook/react-vite';

import CustomErrorExample from './examples/custom-error-cases';

const meta: Meta = {
  title: 'Patterns/UX Patterns/GlobalErrors/Tests',
};

export const CustomError: StoryObj = {
  render: CustomErrorExample,
};

export default meta;
