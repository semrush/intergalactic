import type { Meta, StoryObj } from '@storybook/react-vite';

import AliasesExample from './examples/aliases';
import InputMaskExample from './examples/inputmask';
import PipeExample from './examples/pipe';

const meta: Meta = {
  title: 'Components/Input-Mask/Documentation',
};

export default meta;
type Story = StoryObj;

export const Aliases: Story = {
  render: AliasesExample,
};

export const InputMask: Story = {
  render: InputMaskExample,
};

export const Pipe: Story = {
  render: PipeExample,
};
