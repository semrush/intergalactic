import type { Intergalactic } from '@semcore/core';
import type { InputValueProps } from '@semcore/input';
import type React from 'react';

declare namespace NSAutoSuggest {
  type Suggestion = string;

  type Props = InputValueProps & {
    /**
     * List of suggestions or async function to load suggestions.
     */
    suggestions: Suggestion[] | ((value: string, signal: AbortSignal) => Promise<Suggestion[]>);
    /**
     * Placeholder in popper for init state.
     * Set an empty string to hide init state.
     */
    statusItemPlaceholder?: string;
    /** Tag for the left Addon */
    addonLeft?: React.ElementType;
    /** Tag for the right Addon */
    addonRight?: React.ElementType;
  };

  type State = {
    isVisible: boolean;
    highlightedIndex: number;
    suggestions: Suggestion[];
    openOnChanges: boolean;
    isLoading: boolean;
  };

  type DefaultProps = {
    defaultValue: string;
    placeholder: string;
  };

  type Component = Intergalactic.Component<'input', Props>;
}

export {
  NSAutoSuggest,
};
