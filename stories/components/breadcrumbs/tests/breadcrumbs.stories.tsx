import type Breadcrumbs from '@semcore/ui/breadcrumbs';
import type { Meta, StoryObj } from '@storybook/react-vite';

import EdgeCasesExample from './examples/edge-cases';
import ItemTruncationExample, { breadcrumbsExampleProps } from './examples/item-truncation';
import WithUpdateValuesExample from './examples/with-update-values';

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
    hintProps: {
      control: 'select',
      options: ['default', 'false'],
      mapping: {
        default: undefined,
        false: false,
      },
    },
    hintPlacement: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
    },
  },
  args: breadcrumbsExampleProps,
};

export const EdgeCases: Story = {
  render: EdgeCasesExample,
};

export const WithUpdateValues: Story = {
  render: WithUpdateValuesExample,
};
