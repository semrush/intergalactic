import type { Meta, StoryObj } from '@storybook/react-vite';

import HorizontalFormExample from './examples/horizontal-form';
import VerticalFormExample from './examples/vertical-form';

const meta: Meta = {
  title: 'Patterns/UX Patterns/Form/Tests',
};

export const HorizontalForm: StoryObj = {
  render: HorizontalFormExample,
};

export const VerticalForm: StoryObj = {
  render: VerticalFormExample,
};

export default meta;
