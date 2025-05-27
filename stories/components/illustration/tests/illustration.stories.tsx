import type { Meta, StoryObj } from '@storybook/react';

import AllIllustrationGeneratedExample from './examples/all-illustration-generated';
import SizesExample from './examples/illustration_sizes';

import { CheckButtonsIllustrations } from './__tests__/all-allustrations-test.test';
import { playWrapper } from '../../../utils/playWrapper';


const meta: Meta = {
  title: 'Components/Illustration/Tests',
};

export default meta;
type Story = StoryObj;

export const AllIllustrationGenerated: Story = {
  render: AllIllustrationGeneratedExample,
  play: playWrapper(CheckButtonsIllustrations),

};

export const Sizes: Story = {
  render: SizesExample,
};
