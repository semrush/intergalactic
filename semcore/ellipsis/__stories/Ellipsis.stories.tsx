import Ellipsis from '@semcore/ellipsis';
import type { Meta, StoryObj } from '@storybook/react';
import { EllipsisWithOnVisibleChangeHandler } from './examples/Ellipsis-with-on-visible-change-handler';

const meta: Meta<typeof Ellipsis> = {
  title: 'Components/Ellipsis',
  component: Ellipsis,
};

export default meta;
type Story = StoryObj<typeof Ellipsis>;

export const EllipsisWithOnVisibleChangeHandlerExample: Story = {
  render: EllipsisWithOnVisibleChangeHandler,
};
