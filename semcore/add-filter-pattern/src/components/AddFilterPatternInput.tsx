import React from 'react';
import createComponent, { Component, Root } from '@semcore/core';
import Input from '@semcore/input';
import { AddFilterPatternInputProps } from '../AddFilterPattern.types';
import { InputValueProps } from '@semcore/input';

type AsPropsWithOnClear<T> = T & { onClear: () => void };
class AddFilterPatternInputRoot extends Component<AddFilterPatternInputProps> {
  static displayName = 'AddFilterPatternInput';

  getValueProps(props: InputValueProps) {
    const { value, onClear, alwaysVisible } = this.asProps as AsPropsWithOnClear<
      typeof this.asProps
    >;

    return {
      ...props,
      onBlur: () => {
        if (!value) {
          setTimeout(onClear, 100);
        }
      },
      onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!value && e.key === 'Escape') {
          onClear();
        }
      },
      autoFocus: !alwaysVisible,
    };
  }

  render() {
    return <Root render={Input} w={'auto'} inline={false} />;
  }
}

const AddFilterPatternInput = createComponent(AddFilterPatternInputRoot, {
  Value: Input.Value,
  Addon: Input.Addon,
});

export default AddFilterPatternInput;
