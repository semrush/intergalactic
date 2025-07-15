import Accrordion from '@semcore/accordion';
import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicExample from './examples/button-on-toggle';

const meta: Meta<typeof Accrordion> = {
  title: 'Components/Accrordion/Tests',
  component: Accrordion,
};

export default meta;
type Story = StoryObj<typeof Accrordion>;

export const BasicUsage: Story = {
  render: BasicExample,
};
