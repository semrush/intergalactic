import Card from '@semcore/ui/card';
import type { Meta, StoryObj } from '@storybook/react-vite';

import CardWithHoverExample from './examples/card-with-hover';

const meta: Meta<typeof Card> = {
  title: 'Components/Card/Advanced',
  component: Card,
};

export default meta;

type Story = StoryObj<typeof Card>;

export const CardWithHover: Story = {
  render: CardWithHoverExample,
};
