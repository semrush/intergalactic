import Tag from '@semcore/tag';
import type { Meta, StoryObj } from '@storybook/react-vite';

import StylesThemeSizesExample from './examples/styles-themes-sizes';
import DisabledStylesThemeSizesExample from './examples/styles-themes-sizes-disabled';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag/Tests',
  component: Tag,
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const StylesThemeSizes: Story = {
  render: StylesThemeSizesExample,
};

export const DisabledStylesThemeSizes: Story = {
  render: DisabledStylesThemeSizesExample,
};
