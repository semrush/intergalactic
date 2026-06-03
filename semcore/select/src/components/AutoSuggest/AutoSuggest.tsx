import type { Intergalactic } from '@semcore/core';
import { Component, createComponent, Root } from '@semcore/core';
import Input from '@semcore/input';
import Spin from '@semcore/spin';
import React from 'react';

import type { NSAutoSuggest } from './AutoSuggest.type';
import { Highlight } from './Highlight';
import Select from '../../index';

class AutoSuggestRoot extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSAutoSuggest.Component>,
  [],
  { value: string },
  {},
  NSAutoSuggest.State,
  NSAutoSuggest.DefaultProps
> {
  static defaultProps: NSAutoSuggest.DefaultProps = {
    defaultValue: '',
  };

  private abortController: AbortController | undefined;
  private changeDebounce = 0;

  state: NSAutoSuggest.State = {
    isVisible: false,
    highlightedIndex: -1,
    suggestions: [],
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

    if (value !== this.asProps.value && this.state.openOnChanges) {
      const { suggestions } = this.asProps;

      if (!Array.isArray(suggestions)) {
        this.setState({ isLoading: true });
      }

      this.changeDebounce = setTimeout(async () => {
        this.handleChangeVisible(true);

        if (Array.isArray(suggestions)) {
          const filteredSuggestions = value === '' ? [] : suggestions.filter((breed) => breed.toLowerCase().includes(value.toLowerCase()));

          this.setState({ suggestions: filteredSuggestions });
        } else {
          this.abortController = new AbortController();
          const abortSignal = this.abortController.signal;

          const filteredSuggestions = await suggestions(value, abortSignal);
          this.setState({ suggestions: filteredSuggestions, isLoading: false });
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
    if (!e.key.startsWith('Array')) {
      this.setState({ highlightedIndex: -1 });
    }
    if (e.key === 'Escape' && this.state.isVisible) {
      this.setState({ openOnChanges: false });
    }
  };

  handleChangeSelect = (value: string) => {
    this.handlers.value(value);
  };

  handleFocus = () => {
    const { value } = this.asProps;
    this.setState({ openOnChanges: true, isVisible: value === '' });
  };

  handleBlur = () => {
    this.handleChangeVisible(false);
  };

  render() {
    const { value } = this.asProps;
    const { isVisible, highlightedIndex, suggestions, isLoading } = this.state;

    return (
      <Select
        interaction='none'
        visible={isVisible}
        onVisibleChange={this.handleChangeVisible}
        highlightedIndex={highlightedIndex}
        onHighlightedIndexChange={this.handleChangeHighlightedIndex}
        defaultHighlightedIndex={null}
      >
        <Select.Trigger tag={Input} onFocus={this.handleFocus} onBlur={this.handleBlur}>
          <Root
            render={Input.Value}
            value={value}
            role='combobox'
            placeholder='Start typing for options'
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            autoComplete='off'
          />
          {isLoading && (
            <Input.Addon tag={Spin} size='l' />
          )}
        </Select.Trigger>
        {suggestions.length > 0 && (
          <Select.Menu>
            {suggestions.map((option) => (
              <Select.Option value={option} key={option} selected={false} onClick={() => this.handleChangeSelect(option)}>
                <Highlight highlight={value}>{option}</Highlight>
              </Select.Option>
            ))}
          </Select.Menu>
        )}
      </Select>
    );
  }
}

export const AutoSuggest = createComponent<NSAutoSuggest.Component, typeof AutoSuggestRoot>(AutoSuggestRoot);
