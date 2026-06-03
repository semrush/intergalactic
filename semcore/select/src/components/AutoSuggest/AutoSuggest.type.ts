import type { Intergalactic } from '@semcore/core';

declare namespace NSAutoSuggest {
  type Suggestion = string;

  type Props = {
    value?: string;
    onChange?: (value: string) => void;
    suggestions: Suggestion[] | ((value: string, signal: AbortSignal) => Promise<Suggestion[]>);
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
