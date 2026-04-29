import Carousel from '@semcore/ui/carousel';
import type { Meta, StoryObj } from '@storybook/react-vite';

import WithIndicatorsExample from './examples/carousel_with_indicators_only';
import PrevNextExample from './examples/carousel_with_prev_next';
import BasicExample, { defaultProps as basicProps } from './examples/carousel_with_props';
const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel/Tests',
  component: Carousel,
};
export default meta;
type Story = StoryObj<typeof Carousel>;
export const PrevNext: Story = {
  render: PrevNextExample,
};
export const Basic: StoryObj<typeof basicProps> = {
  render: BasicExample,
  argTypes: {
    bounded: {
      control: { type: 'boolean' },
    },
    zoom: {
      control: { type: 'boolean' },
    },
    zoomWidth: {
      control: { type: 'number' },
    },
    defaultIndex: {
      control: { type: 'number' },
    },
    index: {
      control: { type: 'number' },
    },
    duration: {
      control: { type: 'number' },
    },
    step: {
      control: { type: 'number' },
    },
    indicators: {
      control: { type: 'select' },
      options: ['default', 'hide', 'preview'],
    },
  },
  args: basicProps,
};
export const WithIndicators: Story = {
  render: WithIndicatorsExample,
};
