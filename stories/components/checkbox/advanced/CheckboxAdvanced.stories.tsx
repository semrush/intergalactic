import type { Meta, StoryObj } from '@storybook/react';

import Checkbox from '@semcore/checkbox';

import AriaLabelPropsDrillingExample from './examples/aria_label_props_drilling';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox/Additional',
  component: Checkbox,
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const AriaLabelPropsDrilling: Story = {
  render: AriaLabelPropsDrillingExample,
};
