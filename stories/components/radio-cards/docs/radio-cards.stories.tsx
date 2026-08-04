import RadioCards from '@semcore/ui/radio-cards';
import type { Meta, StoryObj } from '@storybook/react-vite';

import AdvancedExample from './examples/advanced';
import BasicExample from './examples/basic';

const meta: Meta<typeof RadioCards> = {
  title: 'Components/RadioCards/Documentation',
  component: RadioCards,
};

export default meta;

export const BasicRadioCardsExample: StoryObj = {
  render: BasicExample,
};

export const AdvancedRadioCardsExample: StoryObj = {
  render: AdvancedExample,
};
