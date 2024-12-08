import type { Meta, StoryObj } from '@storybook/react';

import AutosuggestExample from './examples/autosuggest_example';
import ComboboxExample from './examples/combobox_example';

const meta: Meta = {
  title: 'Patterns/AutoSuggest',
};
export default meta;

export const Autosuggest: StoryObj = {
  render: AutosuggestExample,
};

export const Combobox: StoryObj = {
  render: ComboboxExample,
};
