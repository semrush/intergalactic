import Accrordion from '@semcore/accordion';
import type { Meta, StoryObj } from '@storybook/react-vite';

import ButtonsOnToggleExample from './examples/button-on-toggle';
import DefaultValuesExample from './examples/default-values';
import ValuesExample from './examples/values';

const meta: Meta<typeof Accrordion> = {
  title: 'Components/Accrordion/Tests',
  component: Accrordion,
};

export default meta;
type Story = StoryObj<typeof Accrordion>;

export const ButtonsOnToggle: Story = {
  render: ButtonsOnToggleExample,
};

export const Values: Story = {
  render: ValuesExample,
};

export const DefaultValues: Story = {
  render: DefaultValuesExample,

};
