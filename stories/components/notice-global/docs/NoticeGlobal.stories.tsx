import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicExample from './examples/basic_usage';

const meta: Meta = {
  title: 'Components/Notice Global/Documentation',
};
export default meta;

export const Basic: StoryObj = {
  render: BasicExample,
};
