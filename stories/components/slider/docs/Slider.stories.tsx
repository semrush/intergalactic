import Slider from '@semcore/slider';
import type { Meta, StoryObj } from '@storybook/react-vite';

import CustomizesOptionsViewExample from './examples/customized_options_view';
import NumericExampleExample from './examples/numeric_slider';
import SliderWithOptionsExample from './examples/slider_with_options';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider/Documentation',
  component: Slider,
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const NumericExample: Story = {
  render: NumericExampleExample,
};

export const SliderWithOptions: Story = {
  render: SliderWithOptionsExample,
};

export const CustomizesOptionsView: Story = {
  render: CustomizesOptionsViewExample,
};
