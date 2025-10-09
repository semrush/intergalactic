import Breakpoints from '@semcore/ui/breakpoints';
import type { Meta, StoryObj } from '@storybook/react-vite';

import CustomMediaExample from './examples/custom-media';
import ManualControlExample from './examples/manual-control';
import MockingExample from './examples/mocking';
import SimpleUseExample from './examples/simple-use';

const meta: Meta<typeof Breakpoints> = {
  title: 'Components/Base Components/Breakpoints/Documentation',
  component: Breakpoints,
};

export default meta;
type Story = StoryObj<typeof Breakpoints>;

export const CustomMedia: StoryObj = {
  render: CustomMediaExample,
};

export const ManualControl: StoryObj = {
  render: ManualControlExample,
};

export const Mocking: StoryObj = {
  render: MockingExample,
};

export const SimpleUse: StoryObj<typeof Breakpoints> = {
  render: SimpleUseExample,
};
