import type { Meta, StoryObj } from '@storybook/react';

import Breadcrumbs from '@semcore/breadcrumbs';

import BaseTruncationExample from './examples/item-truncation';
import CasesWithSeparatorAndActiveExample from './examples/edge-cases';


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
