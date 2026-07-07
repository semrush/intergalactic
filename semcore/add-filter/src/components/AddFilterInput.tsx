import { ButtonLink } from '@semcore/button';
import { createComponent, Component, Root } from '@semcore/core';
import Input from '@semcore/input';
import type { NSInput } from '@semcore/input';
import React from 'react';

import type { AddFilterInputType, AddFilterItemProps } from '../AddFilter.types';

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

  getValueProps(props: NSInput.Value.Props) {
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
    return <Root render={Input} w='auto' inline={false} />;
  }
}

function Clear() {
  return <Root render={ButtonLink} />;
}

const AddFilterInput = createComponent<
  typeof AddFilterInputType,
  typeof AddFilterInputRoot
>(AddFilterInputRoot, {
  Value: Input.Value,
  Addon: Input.Addon,
  Clear,
});

export default AddFilterInput;
