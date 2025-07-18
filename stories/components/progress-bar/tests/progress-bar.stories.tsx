import ProgressBar from '@semcore/progress-bar';
import type { Meta, StoryObj } from '@storybook/react-vite';

import CustomizingTheBarExample1, { defaultProps as CustomizingTheBarProps } from './examples/customizing_the_bar1';
import CustomizingTheValueExample, { defaultProps as CustomizingTheValueProps } from './examples/customizing_the_value';

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar/Tests',
  component: ProgressBar,
};

export default meta;

export const CustomizingTheBar1: StoryObj<typeof CustomizingTheBarProps> = {
  render: CustomizingTheBarExample1,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['s', 'm', 'l'],
    },
    theme: {
      control: { type: 'select' },
      options: ['invert', 'dark', 'violet-100'],
    },
    value: {
      control: { type: 'number' },
    },
    duration: {
      control: { type: 'number' },
    },
  },
  args: CustomizingTheBarProps,
};

export const CustomizingTheValue: StoryObj<typeof CustomizingTheValueProps> = {
  render: CustomizingTheValueExample,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['s', 'm', 'l'],
    },
    theme: {
      control: { type: 'select' },
      options: ['invert', 'dark', 'violet-500'],
    },
    value: {
      control: { type: 'number' },
    },
    duration: {
      control: { type: 'number' },
    },
  },
  args: CustomizingTheValueProps,
};
