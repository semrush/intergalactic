import type { Meta, StoryObj } from '@storybook/react';
import Slider from '@semcore/slider';

import TextExample from './examples/different-types-states';
import SliderWithOptionsExample from './examples/numeric_slider';
import CustomizesOptionsViewExample from './examples/customized_options_view';


const meta: Meta<typeof Slider> = {
  title: 'Components/Slider/Tests',
  component: Slider,
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Text: Story = {
  render: TextExample,
};

export const SliderWithOptions: Story = {
  render: SliderWithOptionsExample,
};

export const CustomizesOptionsView: Story = {
  render: CustomizesOptionsViewExample,
};