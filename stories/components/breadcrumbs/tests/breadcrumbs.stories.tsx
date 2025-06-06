import type Breadcrumbs from '@semcore/breadcrumbs';
import type { Meta, StoryObj } from '@storybook/react-vite';

import CasesWithSeparatorAndActiveExample from './examples/edge-cases';
import BaseTruncationExample from './examples/item-truncation';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components/Breadcrumbs/Tests',
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

export const BaseTruncation: Story = {
  render: BaseTruncationExample,
};

export const CasesWithSeparatorAndActive: Story = {
  render: CasesWithSeparatorAndActiveExample,
};
