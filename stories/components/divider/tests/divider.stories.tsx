import Divider from '@semcore/ui/divider';
import type { Meta, StoryObj } from '@storybook/react-vite';

import DividerStylesExample, { baseExampleProps } from './examples/divider-styles';
import RenderInCenterExample from './examples/render-in-center';

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider/Tests',
  component: Divider,
};

const baseArgTypes = {
  use: {
    control: { type: 'select' },
    options: ['primary', 'secondary'],
  },
  orientation: {
    control: { type: 'select' },
    options: ['horizontal', 'vertical'],
  },
  theme: {
    control: { type: 'select' },
    options: ['default', 'invert', 'border-warning-active'],
  },
  w: { control: { type: 'number' } },
  h: { control: { type: 'number' } },
} as const;

export default meta;
type Story = StoryObj<typeof Divider>;

export const DividerStyles: StoryObj<typeof baseExampleProps> = {
  render: DividerStylesExample,
  argTypes: baseArgTypes,
  args: baseExampleProps,
};

export const RenderInCenter: Story = {
  render: RenderInCenterExample,
};
