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
import Select from '../../index';
import { localizedMessages } from '../../translations/__intergalactic-dynamic-locales';

class AutoSuggestRoot extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSAutoSuggest.Component>,
  typeof AutoSuggestRoot.enhance,
  { value: (value: string) => string },
  {},
  NSAutoSuggest.State,
  NSAutoSuggest.DefaultProps
> {
  static defaultProps: NSAutoSuggest.DefaultProps = {
    defaultValue: '',
    placeholder: '',
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

  handleChange = (value: string) => {
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
    const { value, uid, getI18nText, statusItemPlaceholder, size } = this.asProps;
    const { isVisible, highlightedIndex, suggestions, isLoading } = this.state;
    const id = `${uid}_autosuggest-trigger`;

    const isVisiblePopper = isVisible &&
      (value === '' || suggestions.length > 0 || isLoading) &&
      !(value === '' && suggestions.length === 0 && statusItemPlaceholder === '');

    return (
      <Select
        interaction='none'
        visible={isVisiblePopper}
        onVisibleChange={this.handleChangeVisible}
        highlightedIndex={highlightedIndex}
        onHighlightedIndexChange={this.handleChangeHighlightedIndex}
        size={size}
      >
        <Select.Trigger id={id} tag={Input} onFocus={this.handleFocus} onBlur={this.handleBlur}>
          <Root
            render={Input.Value}
            value={value}
            role='combobox'
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            autoComplete='off'
          />
          {isLoading && (
            <Input.Addon tag={Spin} size='l' />
          )}
        </Select.Trigger>
        <Select.Popper aria-labelledby={id} ref={this.popperRef}>
          {isLoading
            ? (<Select.StatusItem state='loading' itemsCount={0} />)
            : (
                <>
                  {suggestions.length === 0
                    ? (value === '' && statusItemPlaceholder !== '' && (
                        <Select.StatusItem itemsCount={0}>
                          {statusItemPlaceholder ?? getI18nText('AutoSuggest.Popper.placeholderText')}
                        </Select.StatusItem>
                      ))
                    : (
                        <Select.List>
                          {suggestions.map((option) => (
                            <Select.Option
                              value={option}
                              key={option}
                              selected={false}
                              onClick={() => this.handleChangeSelect(option)}
                            >
                              <Highlight highlight={value}>{option}</Highlight>
                            </Select.Option>
                          ))}
                        </Select.List>
                      )}
                </>
              )}
        </Select.Popper>
      </Select>
    );
  }
}

export const AutoSuggest = createComponent<NSAutoSuggest.Component, typeof AutoSuggestRoot>(AutoSuggestRoot);
