import Checkbox from '@semcore/ui/checkbox';
import type { Meta, StoryObj } from '@storybook/react-vite';

import AriaLabelPropsDrillingExample from './examples/aria_label_props_drilling';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox/Advanced',
  component: Checkbox,
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const AriaLabelPropsDrilling: Story = {
  render: AriaLabelPropsDrillingExample,
};
