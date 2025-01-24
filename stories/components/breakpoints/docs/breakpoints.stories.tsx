import type { Meta, StoryObj } from '@storybook/react';

import Breakpoints from '@semcore/breakpoints';

import CustomMediaExample from './examples/custom-media';
import ManualControlExample from './examples/manual-control';
import MockingExample from './examples/mocking';
import SimpleUseExample from './examples/simple-use';


const meta: Meta<typeof Breakpoints> = {
  title: 'Components/Breakpoints/Documentation',
};

export default meta;

export const CustomMedia: StoryObj<typeof Breakpoints> = {
  render: CustomMediaExample,
};

export const ManualControl: StoryObj<typeof Breakpoints> = {
  render: ManualControlExample,
};

export const Mocking: StoryObj<typeof Breakpoints> = {
    render: MockingExample,
  };

  export const SimpleUse: StoryObj<typeof Breakpoints> = {
    render: SimpleUseExample,
  };