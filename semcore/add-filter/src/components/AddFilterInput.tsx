import { ButtonLink } from '@semcore/button';
import type { Intergalactic } from '@semcore/core';
import { createComponent, Component, Root } from '@semcore/core';
import Input from '@semcore/input';
import type { InputValueProps } from '@semcore/input';
import React from 'react';

import type { RootAddFilterType } from '../AddFilter';
import type { NSAddFilter } from '../AddFilter.types';
class AddFilterInputRoot extends Component<
  Intergalactic.InternalTypings.InferChildComponentProps<NSAddFilter.Input.Component, RootAddFilterType, 'Input'>
> {
  static displayName = 'AddFilterInput';

  componentWillUnmount() {
    this.asProps.onUnmount?.();
  }

  getValueProps(props: InputValueProps) {
    const { value, onClear, setFocusRef } = this.asProps;

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
    const { onClear } = this.asProps;

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
  NSAddFilter.Input.Component,
  typeof AddFilterInputRoot
>(AddFilterInputRoot, {
  Value: Input.Value,
  Addon: Input.Addon,
  Clear,
});

export default AddFilterInput;
