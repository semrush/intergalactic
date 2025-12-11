import { ButtonLink } from '@semcore/button';
import { createComponent, AbstractComponent, Root } from '@semcore/core';
import Input from '@semcore/input';
import type { InputValueProps } from '@semcore/input';
import React from 'react';

import type { AddFilterItemProps } from '../AddFilter.types';

type AsPropsWithOnClear<T> = T & {
  onClear: () => void;
  unsetFocusRef: () => void;
  setFocusRef: (el: HTMLElement) => {};
};
class AddFilterInputRoot extends AbstractComponent<AddFilterItemProps> {
  static displayName = 'AddFilterInput';

  componentWillUnmount() {
    this.asProps.onUnmount?.();
  }

  getValueProps(props: InputValueProps): any {
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
    const SInputRoot = Root();
    return <SInputRoot render={Input} w='auto' inline={false} />;
  }
}

const Clear = () => {
  const SClearRoot = Root();
  return <SClearRoot render={ButtonLink} />;
};

const AddFilterInput = createComponent(AddFilterInputRoot, {
  Value: Input.Value,
  Addon: Input.Addon,
  Clear,
});

export default AddFilterInput;
