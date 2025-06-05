import Button from '@semcore/button';
import type { Meta, StoryObj } from '@storybook/react';

import { ButtonHintColorTest } from './__tests__/ButtonHintColor.test';
import ButtonExample from './examples/Basic';
import ButtonHintExample from './examples/ButtonHint';
import ButtonSizesExample from './examples/ButtonSizes';
import { playWrapper } from '../../../utils/playWrapper';

const meta: Meta<typeof Button> = {
  title: 'Components/Button/Advanced',
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const SimpleButton: Story = {
  render: ButtonExample,
};

export const Sizes: Story = {
  render: ButtonSizesExample,
};

export const CompareHintButtonTooltip: Story = {
  render: ButtonHintExample,
  play: playWrapper(ButtonHintColorTest),
};
