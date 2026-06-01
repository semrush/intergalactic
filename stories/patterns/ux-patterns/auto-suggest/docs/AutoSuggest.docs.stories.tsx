import type { Meta, StoryObj } from '@storybook/react-vite';

import { AutoSuggestTest } from './__tests__/autosuggest_example.test';
import { ComboboxTest } from './__tests__/combobox_example.test';
import AutosuggestExample from './examples/autosuggest_example';
import ComboboxExample from './examples/combobox_example';
import { playWrapper } from '../../../../utils/playWrapper';

const meta: Meta = {
  title: 'Patterns/UX Patterns/AutoSuggest',
};
export default meta;

export const Autosuggest: StoryObj = {
  render: AutosuggestExample,
  play: playWrapper(AutoSuggestTest),
};

export const Combobox: StoryObj = {
  render: ComboboxExample,
  play: playWrapper(ComboboxTest),
};
