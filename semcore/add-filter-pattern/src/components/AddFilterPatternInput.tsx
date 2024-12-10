import React from 'react';
import createComponent, { Component, Root } from '@semcore/core';
import Input from '@semcore/input';
import { AddFilterPatternItemProps } from '../AddFilterPattern.types';
import { InputValueProps } from '@semcore/input';
import { ButtonLink } from '@semcore/ui/button';

type AsPropsWithOnClear<T> = T & { onClear: () => void };
class AddFilterPatternInputRoot extends Component<AddFilterPatternItemProps> {
  static displayName = 'AddFilterPatternInput';

  getValueProps(props: InputValueProps) {
    const { value, onClear } = this.asProps as AsPropsWithOnClear<typeof this.asProps>;

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
      autoFocus: true,
    };
  }

  getClearProps() {
    const { onClear } = this.asProps as AsPropsWithOnClear<typeof this.asProps>;

    return {
      onClick: onClear,
    };
  }

  render() {
    return <Root render={Input} w={'auto'} inline={false} />;
  }
}

const Clear = () => {
  return <Root render={ButtonLink} />;
};

const AddFilterPatternInput = createComponent(AddFilterPatternInputRoot, {
  Value: Input.Value,
  Addon: Input.Addon,
  Clear: Clear,
});

export default AddFilterPatternInput;
