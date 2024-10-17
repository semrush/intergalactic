import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Icon from '..';

import AdIcon from '../Ad/m';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Icon> = {
  title: 'Icons',
  component: Icon,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Ad: Story = {
  render: () => <AdIcon />,
};
