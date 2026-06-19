import type { NeighborItemProps } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import { Component, createComponent, Root } from '@semcore/core';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import { isFocusInside } from '@semcore/core/lib/utils/use/useFocusLock';
import Input from '@semcore/input';
import Spin from '@semcore/spin';
import React from 'react';

import type { NSAutoSuggest } from './AutoSuggest.type';
import { Highlight } from './Highlight';
// todo Brauer Ilia: change to ../../Select after rewriting to ts
import Select from '../../index';
import { localizedMessages } from '../../translations/__intergalactic-dynamic-locales';

class AutoSuggestRoot extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSAutoSuggest.Component>,
  typeof AutoSuggestRoot.enhance,
  NSAutoSuggest.Handlers,
  {},
  NSAutoSuggest.State,
  NSAutoSuggest.DefaultProps
> {
  static displayName = 'AutoSuggest';

  static defaultProps = (): NSAutoSuggest.DefaultProps => {
    return {
      defaultValue: '',
      placeholder: '',
      children: (
        <>
          <AutoSuggest.Trigger />
          <AutoSuggest.Popper />
        </>
      ),
    };
  };

  static enhance = [uniqueIDEnhancement(), i18nEnhance(localizedMessages)] as const;

  private abortController: AbortController | undefined;
  private changeDebounce = 0;
  private popperRef = React.createRef<HTMLDivElement>();

  state: NSAutoSuggest.State = {
    isVisible: false,
    highlightedIndex: -1,
    suggestions: Array.isArray(this.props.suggestions) ? this.props.suggestions : [],
    openOnChanges: true,
    isLoading: false,
  };

  protected uncontrolledProps() {
    return {
      value: (value: string) => {
        return value;
      },
    };
  }

  get id() {
    const { uid } = this.asProps;

    return `${uid}_autosuggest-trigger`;
  }

  get isStartTypingState() {
    const { statusItemPlaceholder, value } = this.asProps;
    const { suggestions } = this.state;

    return value === '' && suggestions.length === 0 && statusItemPlaceholder !== '';
  }

  get isAriaExpanded() {
    const { isVisible, isLoading } = this.state;

    return isVisible && !isLoading && !this.isStartTypingState;
  }

  get isVisiblePopper() {
    const { value, statusItemPlaceholder } = this.asProps;
    const { isVisible, isLoading, suggestions } = this.state;

    return isVisible &&
      (value === '' || suggestions.length > 0 || isLoading) &&
      !(value === '' && suggestions.length === 0 && statusItemPlaceholder === '');
  }

  get neighborLocation(): NeighborItemProps['neighborLocation'] {
    const {
      addonLeft: AddonLeft,
      addonRight: AddonRight,
    } = this.asProps;

    let neighborLocation: NeighborItemProps['neighborLocation'] = undefined;

    if (AddonLeft && AddonRight) {
      neighborLocation = 'both';
    } else if (AddonLeft) {
      neighborLocation = 'left';
    } else if (AddonRight) {
      neighborLocation = 'right';
    }

    return neighborLocation;
  }

  getTriggerProps(): NSAutoSuggest.Trigger.InnerProps {
    const { size, getI18nText } = this.asProps;
    const { isLoading } = this.state;

    return {
      'id': this.id,
      'tag': Input,
      'onFocus': this.handleFocus,
      'onBlur': this.handleBlur,
      'aria-haspopup': 'listbox',
      'aria-expanded': this.isAriaExpanded ? 'true' : 'false',
      isLoading,
      size,
      getI18nText,
    };
  }

  getTriggerValueProps(): NSAutoSuggest.Trigger.Value.InnerProps {
    const { value } = this.asProps;

    return {
      neighborLocation: this.neighborLocation,
      autoComplete: 'off',
      onChange: this.handleChange,
      onKeyDown: this.handleKeyDown,
      role: 'combobox',
      value,
    };
  }

  getPopperProps(): NSAutoSuggest.Popper.InnerProps {
    return {
      'aria-labelledby': this.id,
      'ref': this.popperRef,
    };
  }

  getPopperLoadingStateProps(): NSAutoSuggest.Popper.LoadingState.InnerProps {
    const { isLoading } = this.state;

    return {
      isLoading,
    };
  }

  getPopperStartTypingStateProps(): NSAutoSuggest.Popper.StartTypingState.InnerProps {
    const { getI18nText } = this.asProps;
    const { isLoading } = this.state;

    return {
      isLoading,
      isStartTypingState: this.isStartTypingState,
      children: getI18nText('AutoSuggest.Popper.placeholderText'),
    };
  }

  getPopperListProps(): NSAutoSuggest.Popper.List.InnerProps {
    const { value } = this.asProps;
    const { isLoading, suggestions } = this.state;

    return {
      value,
      isLoading,
      suggestions,
      isStartTypingState: this.isStartTypingState,
    };
  }

  getPopperSuggestionItemProps(_: never, index: number): NSAutoSuggest.Popper.SuggestionItem.InnerProps {
    const { suggestions } = this.state;
    const { value } = this.asProps;

    const option = suggestions[index];

    return {
      value: option,
      selected: false,
      onClick: () => this.handleChangeSelect(option),
      children: (
        <Highlight highlight={value}>{option}</Highlight>
      ),
    };
  }

  handleChange = (value: string) => {
    this.handlers.value(value);

    if (this.changeDebounce) {
      clearTimeout(this.changeDebounce);
    }
    if (this.abortController) {
      this.abortController.abort();
    }

    if (value !== this.asProps.value) {
      const { suggestions } = this.asProps;

      if (!Array.isArray(suggestions)) {
        this.setState({ isLoading: true });
      }

      this.changeDebounce = window.setTimeout(async () => {
        if (Array.isArray(suggestions)) {
          const filteredSuggestions = value === '' ? [] : suggestions.filter((s) => s.toLowerCase().includes(value.toLowerCase()));

          this.setState({ suggestions: filteredSuggestions });
        } else {
          this.abortController = new AbortController();
          const abortSignal = this.abortController.signal;

          const filteredSuggestions = await suggestions(value, abortSignal);
          this.setState({ suggestions: filteredSuggestions, isLoading: false });
        }

        if (this.state.openOnChanges) {
          this.handleChangeVisible(true);
        }
      }, 300);
    }
  };

  handleChangeVisible = (isVisible: boolean) => {
    this.setState({ isVisible });
  };

  handleChangeHighlightedIndex = (index: number | null) => {
    this.setState({ highlightedIndex: index ?? -1 });
  };

  handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!e.key.startsWith('Arrow')) {
      this.setState({ highlightedIndex: -1 });
    }

    const { value } = this.asProps;
    const { isVisible, suggestions } = this.state;

    if (isVisible) {
      if (e.key === 'Escape') {
        this.setState({ openOnChanges: false });
      }
    } else {
      const filteredSuggestions = suggestions.filter((s) => {
        return value !== '' && s.toLowerCase().includes(value.toLowerCase());
      });

      if (e.key === 'ArrowDown') {
        this.setState({
          suggestions: filteredSuggestions,
          highlightedIndex: 0,
        });
      }
      if (e.key === 'ArrowUp') {
        this.setState({
          suggestions: filteredSuggestions,
          highlightedIndex: filteredSuggestions.length - 1,
        });
      }
    }
  };

  handleChangeSelect = (value: string) => {
    this.handlers.value(value);
  };

  handleFocus = () => {
    const { value, statusItemPlaceholder } = this.asProps;
    const { suggestions } = this.state;
    this.setState({
      openOnChanges: true,
      isVisible: statusItemPlaceholder === '' ? value !== '' : true,
      suggestions: suggestions.filter((s) => {
        return value !== '' && s.toLowerCase().includes(value.toLowerCase());
      }),
    });
  };

  handleBlur = () => {
    setTimeout(() => {
      const popperElement = this.popperRef.current;

      if (!popperElement || !isFocusInside(popperElement)) {
        this.handleChangeVisible(false);
      }
    });
  };

  render() {
    const {
      size,
      Children,
    } = this.asProps;
    const { highlightedIndex } = this.state;

    return (
      <Select
        interaction='none'
        visible={this.isVisiblePopper}
        onVisibleChange={this.handleChangeVisible}
        highlightedIndex={highlightedIndex}
        onHighlightedIndexChange={this.handleChangeHighlightedIndex}
        size={size}
      >
        <Children />
      </Select>
    );
  }
}

class TriggerRoot extends Component<
  Intergalactic.InternalTypings.InferChildComponentProps<NSAutoSuggest.Trigger.Component, typeof AutoSuggestRoot, 'Trigger'>
> {
  static displayName = 'Trigger';

  static defaultProps = () => {
    return {
      children: (
        <AutoSuggest.Trigger.Value />
      ),
    };
  };

  render() {
    const {
      isLoading,
      size,
      addonLeft: AddonLeft,
      addonRight: AddonRight,
      Children,
    } = this.asProps;

    return (
      <Root render={Select.Trigger}>
        {AddonLeft
          ? (
              <Input.Addon>
                <AddonLeft />
              </Input.Addon>
            )
          : null}
        <Children />
        {AddonRight
          ? (
              <Input.Addon>
                <AddonRight />
              </Input.Addon>
            )
          : null}
        {isLoading && (
          <Input.Addon>
            <Spin size={size === 'l' ? 's' : 'xs'} />
          </Input.Addon>
        )}
      </Root>
    );
  }
}

class ValueRoot extends Component<
  Intergalactic.InternalTypings.InferChildComponentProps<NSAutoSuggest.Trigger.Value.Component, typeof AutoSuggestRoot, 'TriggerValue'>
> {
  static displayName = 'Value';

  render() {
    return (
      <Root render={Input.Value} />
    );
  }
}

class PopperRoot extends Component<
  Intergalactic.InternalTypings.InferChildComponentProps<NSAutoSuggest.Popper.Component, typeof AutoSuggestRoot, 'Popper'>
> {
  static defaultProps = () => {
    return {
      children: (
        <>
          <AutoSuggest.Popper.LoadingState itemsCount={0} />
          <AutoSuggest.Popper.StartTypingState itemsCount={0} />
          <AutoSuggest.Popper.List />
        </>
      ),
    };
  };

  render() {
    const { Children } = this.asProps;

    return (
      <Root render={Select.Popper} />
    );
  }
}

function LoadingStateRoot(
  props: Intergalactic.InternalTypings.InferChildComponentProps<NSAutoSuggest.Popper.LoadingState.Component, typeof AutoSuggestRoot, 'PopperLoadingState'>,
) {
  if (!props.isLoading) return null;

  return (
    <Select.StatusItem state='loading' itemsCount={0} />
  );
}

function StartTypingStateRoot(
  props: Intergalactic.InternalTypings.InferChildComponentProps<NSAutoSuggest.Popper.StartTypingState.Component, typeof AutoSuggestRoot, 'PopperStartTypingState'>,
) {
  const { Children, isLoading, isStartTypingState } = props;

  if (isLoading || !isStartTypingState) return null;

  return (
    <Select.StatusItem itemsCount={0}>
      <Children />
    </Select.StatusItem>
  );
}

class ListRoot extends Component<
  Intergalactic.InternalTypings.InferChildComponentProps<NSAutoSuggest.Popper.List.Component, typeof AutoSuggestRoot, 'PopperList'>
> {
  static defaultProps = () => {
    return {
      children: (<AutoSuggest.Popper.SuggestionItem itemsCount={0} />),
    };
  };

  render() {
    const { suggestions, isLoading, isStartTypingState, Children } = this.asProps;

    if (isLoading || isStartTypingState) return null;

    return (
      <Select.List>
        {suggestions.map((option) => (
          <Children key={option} />
        ))}
      </Select.List>
    );
  }
}

function SuggestionItemRoot() {
  return (
    <Root render={Select.Option} />
  );
}

export const AutoSuggest = createComponent<NSAutoSuggest.Component, typeof AutoSuggestRoot>(AutoSuggestRoot, {
  Trigger: [TriggerRoot, { Value: ValueRoot }],
  Popper: [PopperRoot, {
    LoadingState: LoadingStateRoot,
    StartTypingState: StartTypingStateRoot,
    List: ListRoot,
    SuggestionItem: SuggestionItemRoot,
  }],
});
