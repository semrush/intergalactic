import type { Meta, StoryObj } from '@storybook/react-vite';

import BaseExample, { baseExampleProps } from './examples/input-base-example';
import WithLabelExample, { withLabelExampleProps } from './examples/input-with-label';
import WithNeighborLocationExample, { withNeighborLocationExampleProps } from './examples/input-with-neighborlocation';

const meta: Meta = {
  title: 'Components/Input/Tests',
};

const baseArgTypes = {
  size: {
    control: { type: 'select' },
    options: [
      'm',
      'l',
    ],
  },
  state: {
    control: { type: 'select' },
    options: [
      'valid',
      'invalid',
      'normal',
    ],
  },
  w: { control: { type: 'number' } },
  autoFocus: { control: { type: 'boolean' } },
  placeholder: { control: { type: 'text' } },
  disabled: { control: { type: 'boolean' } },
  readOnly: { control: { type: 'boolean' } },
} as const;

export default meta;

export const Base: StoryObj<typeof baseExampleProps> = {
  render: BaseExample,
  argTypes: baseArgTypes,
  args: baseExampleProps,
};

export const WithLabel: StoryObj<typeof withLabelExampleProps> = {
  render: WithLabelExample,
  argTypes: baseArgTypes,
  args: withLabelExampleProps,
};

export const WithNeighborLocation: StoryObj<typeof withNeighborLocationExampleProps> = {
  render: WithNeighborLocationExample,
  argTypes: baseArgTypes,
  args: withNeighborLocationExampleProps,
};
