import React from 'react';
import createComponent, { Component, Root } from '@semcore/core';
import { Flex } from '@semcore/flex-box';
import Input from '@semcore/input';

import { AddFilterPatternItemProps } from '../AddFilterPattern.types';
import { Hint } from '@semcore/tooltip';
import { InputValueProps } from '@semcore/input';

type AsPropsWithOnClear<T> = T & { onClear: () => void };
class AddFilterPatternInputRoot extends Component<AddFilterPatternItemProps> {
  static displayName = 'AddFilterPatternInput';

  getValueProps(props: InputValueProps) {
    const { onChange, value, onClear, alwaysVisible } = this.asProps as AsPropsWithOnClear<
      typeof this.asProps
    >;

    return {
      ...props,
      onChange,
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

  getCloseHintProps(props: { onClick: (e: React.SyntheticEvent) => void }) {
    const { onClear } = this.asProps as AsPropsWithOnClear<typeof this.asProps>;

    return {
      ...props,
      onClick: onClear,
    };
  }

  render() {
    return (
      <Flex>
        <Root render={Input} __excludeProps={['onChange']} />
      </Flex>
    );
  }
}

const AddFilterPatternInput = createComponent(AddFilterPatternInputRoot, {
  Value: Input.Value,
  Addon: Input.Addon,
  CloseHint: Hint,
});

export default AddFilterPatternInput;
