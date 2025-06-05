import type { Meta, StoryObj } from '@storybook/react';

import WithSubmitExample from './examples/input-styles';
import WithLabelExample from './examples/input--with-label';
import WithLNeighborLocationExample from './examples/with-neighborlocation';

const meta: Meta = {
  title: 'Components/Input/Tests',
};

export default meta;
type Story = StoryObj;

export const WithSubmit: Story = {
  render: WithSubmitExample,
};

export const WithLabel: Story = {
  render: WithLabelExample,
};

export const WithLNeighborLocation: Story = {
  render: WithLNeighborLocationExample,
};
