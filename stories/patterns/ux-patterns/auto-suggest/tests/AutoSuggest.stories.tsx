import type { Meta, StoryObj } from '@storybook/react-vite';

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
    placeholder: {
      control: 'text',
    },
  },
};
