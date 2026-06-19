import type { NeighborItemProps } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import type Dropdown from '@semcore/dropdown';
import type { DropdownTriggerProps } from '@semcore/dropdown';
import type { InputValueProps, InputProps } from '@semcore/input';
import type Input from '@semcore/input';
import type React from 'react';

import type Select from '../../index';

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
    children: React.ReactNode;
  };

  type Handlers = {
    value: (value: string) => string;
  };

  namespace Trigger {
    type Props = {};

    type InnerProps = {
      'id': string;
      'tag': typeof Input;
      'onFocus': () => void;
      'onBlur': () => void;
      'aria-haspopup': 'listbox';
      'aria-expanded': 'true' | 'false';
      'addonLeft'?: React.ElementType;
      'addonRight'?: React.ElementType;
      'isLoading': NSAutoSuggest.State['isLoading'];
      'size': NSAutoSuggest.Props['size'];
      'getI18nText': (str: string) => string;
      'neighborLocation': NeighborItemProps['neighborLocation'];
    };

    namespace Value {
      type Props = {};

      type InnerProps = {
        neighborLocation: NeighborItemProps['neighborLocation'];
        value: string;
        role: 'combobox';
        onChange: (value: string) => void;
        onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
        autoComplete: 'off';
        ref?: React.RefObject<any>;
      };

      type Component = Intergalactic.Component<typeof Input.Value, Props>;
    }

    type Component = Intergalactic.Component<typeof Dropdown.Trigger & typeof Input, DropdownTriggerProps & InputProps> & {
      Value: Value.Component;
    };
  }
  namespace Popper {
    type Props = {};

    type InnerProps = {
      'aria-labelledby': string;
      'ref': React.RefObject<HTMLDivElement>;
    };

    namespace LoadingState {
      type InnerProps = {
        isLoading: boolean;
      };

      type Component = Intergalactic.Component<typeof Dropdown.StatusItem>;
    }
    namespace StartTypingState {
      type InnerProps = {
        isLoading: boolean;
        isStartTypingState: boolean;
        children: string;
      };

      type Component = Intergalactic.Component<typeof Dropdown.StatusItem>;
    }
    namespace List {
      type InnerProps = {
        value: string;
        isLoading: boolean;
        suggestions: Suggestion[];
        isStartTypingState: boolean;
      };

      type Component = Intergalactic.Component<typeof Select.List>;
    }
    namespace SuggestionItem {
      type InnerProps = {
        value: Suggestion;
        selected: false;
        onClick: () => void;
        children: React.ReactNode;
      };

      type Component = Intergalactic.Component<typeof Dropdown.StatusItem>;
    }

    type Component = Intergalactic.Component<typeof Select.Popper, Props> & {
      LoadingState: LoadingState.Component;
      StartTypingState: StartTypingState.Component;
      List: List.Component;
      SuggestionItem: SuggestionItem.Component;
    };
  }

  type Component = Intergalactic.Component<typeof Input, Props> & {
    Trigger: Trigger.Component;
    Popper: Popper.Component;
  };
}

export {
  NSAutoSuggest,
};
