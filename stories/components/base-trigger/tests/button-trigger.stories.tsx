import type { Meta, StoryObj } from '@storybook/react-vite';

import BaseExample, { buttonTriggerBaseExampleProps } from './examples/button-trigger/base';
import NeighborLocationExample, { buttonTriggerNeighborLocationExampleProps } from './examples/button-trigger/neighbor-location';
import AddobExample, { buttonTriggerWithAddonExampleProps } from './examples/button-trigger/with-addons';

const meta: Meta = {
  title: 'Components/BaseTrigger/Test/ButtonTrigger',
};

export const Base: StoryObj<typeof buttonTriggerBaseExampleProps> = {
  render: BaseExample,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['m', 'l', undefined],
    },
    state: {
      control: { type: 'select' },
      options: ['normal', 'valid', 'invalid', undefined],
    },
    active: {
      control: { type: 'boolean' },
    },
    empty: {
      control: { type: 'boolean' },
    },
    placeholder: {
      control: { type: 'text' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    loading: {
      control: { type: 'boolean' },
    },
    chevron: {
      control: { type: 'boolean' },
    },
  },
  args: buttonTriggerBaseExampleProps,
};

// export const NeighborLocation: StoryObj<typeof buttonTriggerNeighborLocationExampleProps> = {
//   render: NeighborLocationExample,
//   argTypes: {
//     size: {
//       control: { type: 'select' },
//       options: ['m', 'l', undefined],
//     },
//     state: {
//       control: { type: 'select' },
//       options: ['normal', 'valid', 'invalid', undefined],
//     },
//     active: {
//       control: { type: 'boolean' },
//     },
//     empty: {
//       control: { type: 'boolean' },
//     },
//     placeholder: {
//       control: { type: 'text' },
//     },
//     disabled: {
//       control: { type: 'boolean' },
//     },
//     loading: {
//       control: { type: 'boolean' },
//     },
//     chevron: {
//       control: { type: 'boolean' },
//     },
//   },
//   args: buttonTriggerNeighborLocationExampleProps,
// };

export const NeighborLocation: StoryObj<typeof buttonTriggerNeighborLocationExampleProps> = {
  render: NeighborLocationExample,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['m', 'l', undefined],
    },
    state: {
      control: { type: 'select' },
      options: ['normal', 'valid', 'invalid', undefined],
    },
    active: {
      control: { type: 'boolean' },
    },
    empty: {
      control: { type: 'boolean' },
    },
    placeholder: {
      control: { type: 'text' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    loading: {
      control: { type: 'boolean' },
    },
    chevron: {
      control: { type: 'boolean' },
    },
  },
  args: buttonTriggerNeighborLocationExampleProps,
};
export default meta;
