import type { Meta, StoryObj } from '@storybook/react';

import WidgetEmpty from '@semcore/widget-empty';

import Custom1Example from './examples/custom_examples';
import Custom2Example from './examples/custom-examples';
import ErrorExample from './examples/error_example';
import NoDataExample from './examples/nodata_example';
import TestEx from './examples/test';

const meta: Meta<typeof WidgetEmpty> = {
  title: 'Components/WidgetEmpty/Documentation',
  component: WidgetEmpty,
};
export default meta;

type Story = StoryObj<typeof WidgetEmpty>;

export const Custom1: Story = {
  render: Custom1Example,
};

export const Custom2: Story = {
  render: Custom2Example,
};

export const Error: Story = {
  render: ErrorExample,
};

export const NoData: Story = {
  render: NoDataExample,
};

export const Test: Story = {
    render: TestEx,
  };
