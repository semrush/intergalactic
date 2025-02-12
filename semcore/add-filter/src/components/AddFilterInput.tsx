import React from 'react';
import { createComponent, Component, Root } from '@semcore/core';
import Input from '@semcore/input';
import { AddFilterItemProps } from '../AddFilter.types';
import { InputValueProps } from '@semcore/input';
import { ButtonLink } from '@semcore/button';

type AsPropsWithOnClear<T> = T & {
  onClear: () => void;
  unsetFocusRef: () => void;
  setFocusRef: (el: HTMLElement) => {};
};
class AddFilterInputRoot extends Component<AddFilterItemProps> {
  static displayName = 'AddFilterInput';

  componentWillUnmount() {
    this.asProps.onUnmount?.();
  }

  getValueProps(props: InputValueProps) {
    const { value, onClear, setFocusRef } = this.asProps as AsPropsWithOnClear<typeof this.asProps>;

    return {
      ...props,
      ref: setFocusRef,
      onBlur: () => {
        if (!value) {
          setTimeout(onClear, 200);
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

const AddFilterInput = createComponent(AddFilterInputRoot, {
  Value: Input.Value,
  Addon: Input.Addon,
  Clear,
});

export default AddFilterInput;
