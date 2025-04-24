import type { Meta, StoryObj } from '@storybook/react';
import Slider from '@semcore/slider';

import NumericExampleExample from './examples/numeric_slider';
import SliderWithOptionsExample from './examples/slider_with_options';
import CustomizesOptionsViewExample from './examples/customized_options_view';


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