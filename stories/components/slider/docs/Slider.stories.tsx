import type { Meta, StoryObj } from '@storybook/react';

import Slider from '@semcore/slider';

import NumericSliderExample from './examples/numeric_slider';
import CustomizedOptionsViewExample from './examples/customized_options_view';
import SliderWithOptionsExample from './examples/slider_with_options';

const meta: Meta<typeof Slider> = {
    title: 'Components/Slider/Documentation',
    component: Slider,
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const NumericSlider: Story = {
    render: NumericSliderExample,
};

export const CustomizedOptionsView: Story = {
    render: CustomizedOptionsViewExample,
};

export const SliderWithOptions: Story = {
    render: SliderWithOptionsExample,
};
