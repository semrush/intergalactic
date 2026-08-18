import RadioCards from '@semcore/ui/radio-cards';
import type { Meta, StoryObj } from '@storybook/react-vite';

import RadioCardAllPropsExample, { defaultRadioCardsProps } from './examples/radio-card-all-props';

const meta: Meta<typeof RadioCards> = {
  title: 'Components/RadioCards/Tests',
  component: RadioCards,
};

export default meta;

export const RadioCardAllProps: StoryObj<typeof defaultRadioCardsProps> = {
  render: RadioCardAllPropsExample,
  argTypes: {
    'aria-label': {
      control: { type: 'text' },
      description: 'Accessible name for the radio group',
    },
    'value': {
      control: { type: 'select' },
      options: ['1', '2', '3', '4'],
      description: 'Currently selected radio card value (group)',
    },
    'disabled': {
      control: { type: 'boolean' },
      description: 'Disables the entire radio group and all radio cards',
    },
    'itemDisabled': {
      control: { type: 'boolean' },
      description: 'Disables only "Top New" to demonstrate item-level disabled',
    },
    'text': {
      control: { type: 'text' },
      description: 'Text of the 4th card (RadioCards.Item text prop)',
    },
    'textAddon': {
      control: { type: 'text' },
      description: 'Text addon of the 4th card (RadioCards.Item textAddon prop)',
    },
    'description': {
      control: { type: 'text' },
      description: 'Description of the 4th card (RadioCards.Item description prop)',
    },
    'showIconAddon': {
      control: { type: 'boolean' },
      description: 'Toggles iconAddon on the 4th card (RadioCards.Item iconAddon prop)',
    },
    'dot': {
      control: { type: 'text' },
      description: 'Accessible name for Dot (RadioCards.Item dot prop)',
    },
  },
  args: defaultRadioCardsProps,
};
