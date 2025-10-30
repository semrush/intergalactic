import type Breadcrumbs from '@semcore/ui/breadcrumbs';
import type { Meta, StoryObj } from '@storybook/react-vite';

import EdgeCasesExample from './examples/edge-cases';
import ItemTruncationExample, { breadcrumbsExampleProps } from './examples/item-truncation';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components/Breadcrumbs/Tests',
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

export const ItemTruncation: StoryObj<typeof breadcrumbsExampleProps> = {
  render: ItemTruncationExample,
  argTypes: {
    active: {
      control: { type: 'boolean' },
    },
  },
  args: breadcrumbsExampleProps,
};

export const EdgeCases: Story = {
  render: EdgeCasesExample,
};
