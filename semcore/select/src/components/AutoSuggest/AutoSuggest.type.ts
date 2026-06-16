import type { Intergalactic } from '@semcore/core';
import type { InputValueProps } from '@semcore/input';

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
  };

  type Component = Intergalactic.Component<'input', Props>;
}

export {
  NSAutoSuggest,
};
