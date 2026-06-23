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

const commonArgs = {
  suggestionsSource: 'sync',
  asyncDelay: 1000,
  size: 'm',
  statusItemPlaceholder: 'Start typing to see options',
  addonLeft: 'none',
  addonRight: 'none',
} satisfies Pick<
  AutosuggestTestProps & AutosuggestCompositionProps,
  'suggestionsSource' | 'asyncDelay' | 'size' | 'statusItemPlaceholder' | 'addonLeft' | 'addonRight'
>;

const commonArgTypes = {
  suggestionsSource: {
    control: { type: 'radio' },
    options: ['sync', 'async'],
  },
  asyncDelay: {
    control: { type: 'number', min: 0, step: 100 },
  },
  width: {
    control: { type: 'number', min: 160, step: 20 },
  },
  placeholder: {
    control: 'text',
  },
  size: {
    control: { type: 'radio' },
    options: ['m', 'l'],
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
} as const;

export const Autosuggest: StoryObj<AutosuggestTestProps> = {
  render: AutosuggestTestExample,
  args: {
    ...autosuggestTestDefaultProps,
    ...commonArgs,
  },
  argTypes: {
    ...commonArgTypes,
    initialValue: {
      control: 'text',
    },
    autoFocus: {
      control: 'boolean',
    },
    withPlaceholder: {
      control: 'boolean',
    },
    readOnly: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    button: {
      control: { type: 'radio' },
      options: ['none', 'left', 'right', 'both'],
    },
    onChangeLog: {
      control: 'boolean',
    },
  },
};

export const Composition: StoryObj<AutosuggestCompositionProps> = {
  render: AutosuggestCompositionExample,
  args: {
    ...autosuggestCompositionDefaultProps,
    ...commonArgs,
  },
  argTypes: {
    ...commonArgTypes,
    popperWidth: {
      control: { type: 'number', min: 0, step: 20 },
    },
    popperMaxHeight: {
      control: { type: 'number', min: 0, step: 20 },
    },
    neighborLocation: {
      control: { type: 'radio' },
      options: ['none', 'left', 'right', 'both'],
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
