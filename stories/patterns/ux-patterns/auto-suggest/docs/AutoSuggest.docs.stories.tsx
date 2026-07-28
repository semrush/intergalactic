import type { Meta, StoryObj } from '@storybook/react-vite';

import { AutoSuggestTest } from './__tests__/autosuggest_example.test';
import { ComboboxTest } from './__tests__/combobox_example.test';
import AutosuggestAsyncExample from './examples/autosuggest_async_example';
import AutosuggestSyncExample from './examples/autosuggest_sync_example';
import ComboboxExample from './examples/combobox_example';
import { playWrapper } from '../../../../utils/playWrapper';

const meta: Meta = {
  title: 'Patterns/UX Patterns/AutoSuggest',
};
export default meta;

export const AutosuggestAsync: StoryObj = {
  render: AutosuggestAsyncExample,
  play: playWrapper(AutoSuggestTest),
};

export const AutosuggestSync: StoryObj = {
  render: AutosuggestSyncExample,
  play: playWrapper(AutoSuggestTest),
};

export const Combobox: StoryObj = {
  render: ComboboxExample,
  play: playWrapper(ComboboxTest),
};
