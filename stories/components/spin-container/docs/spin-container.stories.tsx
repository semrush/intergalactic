import type { Meta, StoryObj } from '@storybook/react';
import SpinContainer from '@semcore/spin-container';

import ContentExample from './examples/usage_in_content';
import DropDownExample from './examples/usage_in_dropdowns';

import { playWrapper } from '../../../utils/playWrapper';
import { UsageinDDTest } from './__tests__/usage-in-dropdowns.test';

const meta: Meta<typeof SpinContainer> = {
  title: 'Components/SpinContainer/Documentation',
  component: SpinContainer,
};

export default meta;
type Story = StoryObj<typeof SpinContainer>;

export const Content: Story = {
  render: ContentExample,
};

export const DropDown: Story = {
  render: DropDownExample,
  play: playWrapper(UsageinDDTest),
};
