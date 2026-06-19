import type { Meta, StoryObj } from '@storybook/react-vite';

import AutosuggestCompositionExample, {
  autosuggestCompositionDefaultProps,
} from './examples/autosuggest_composition';
import type { AutosuggestCompositionProps } from './examples/autosuggest_composition';
import AutosuggestTestExample, { autosuggestTestDefaultProps } from './examples/autosuggest_test';
import type { AutosuggestTestProps } from './examples/autosuggest_test';

const meta: Meta = {
  title: 'Patterns/UX Patterns/AutoSuggest/Tests',
};
export default meta;

export const Autosuggest: StoryObj<AutosuggestTestProps> = {
  render: AutosuggestTestExample,
  args: autosuggestTestDefaultProps,
  argTypes: {
    suggestionsSource: {
      control: { type: 'radio' },
      options: ['sync', 'async'],
    },
    initialValue: {
      control: 'text',
    },
    asyncDelay: {
      control: { type: 'number', min: 0, step: 100 },
    },
    autoFocus: {
      control: 'boolean',
    },
    width: {
      control: { type: 'number', min: 160, step: 20 },
    },
    withPlaceholder: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
    size: {
      control: { type: 'radio' },
      options: ['m', 'l'],
    },
    readOnly: {
      control: 'boolean',
    },
    statusItemPlaceholder: {
      control: 'text',
    },
    addonLeft: {
      control: { type: 'select' },
      options: ['none', 'icon', 'badge', 'tag'],
    },
    addonRight: {
      control: { type: 'select' },
      options: ['none', 'icon', 'badge', 'tag'],
    },
    button: {
      control: { type: 'radio' },
      options: ['none', 'left', 'right', 'both'],
    },
  },
};

export const Composition: StoryObj<AutosuggestCompositionProps> = {
  render: AutosuggestCompositionExample,
  args: autosuggestCompositionDefaultProps,
  argTypes: {
    suggestionsSource: {
      control: { type: 'radio' },
      options: ['sync', 'async'],
    },
    asyncDelay: {
      control: { type: 'number', min: 0, step: 100 },
    },
    size: {
      control: { type: 'radio' },
      options: ['m', 'l'],
    },
    width: {
      control: { type: 'number', min: 160, step: 20 },
    },
    popperWidth: {
      control: { type: 'number', min: 0, step: 20 },
    },
    popperMaxHeight: {
      control: { type: 'number', min: 0, step: 20 },
    },
    statusItemPlaceholder: {
      control: 'text',
    },
    addonLeft: {
      control: { type: 'select' },
      options: ['none', 'icon', 'badge', 'tag'],
    },
    addonRight: {
      control: { type: 'select' },
      options: ['none', 'icon', 'badge', 'tag'],
    },
    customStartTyping: {
      control: 'boolean',
    },
    customLoadingState: {
      control: 'boolean',
    },
    customSuggestionItem: {
      control: 'boolean',
    },
  },
};
