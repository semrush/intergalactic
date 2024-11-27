import React from 'react';
import createComponent, { Component, Root } from '@semcore/core';
import { Flex } from '@semcore/flex-box';
import Input from '@semcore/input';

import { AddFilterPatternItemProps } from '../AddFilterPattern.types';
import { Hint } from '@semcore/tooltip';
import { InputValueProps } from '@semcore/input';

type AsPropsWithOnClear<T> = T & { onClear: () => void };
class AddFilterPatternSearchRoot extends Component<AddFilterPatternItemProps> {
  static displayName = 'AddFilterPatternSearch';

  getInputValueProps(props: InputValueProps) {
    const { onChange, value, onClear, alwaysVisible } = this.asProps as AsPropsWithOnClear<
      typeof this.asProps
    >;
    const rewiredOnChange = (value: string, event: React.SyntheticEvent<HTMLInputElement>) => {
      props.onChange?.(value, event);
      onChange?.(value as any);
    };

    return {
      ...props,
      onChange: rewiredOnChange,
      onBlur: () => {
        if (!value) {
          setTimeout(onClear, 50);
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

  getInputCloseHintProps(props: { onClick: (e: React.SyntheticEvent) => void }) {
    const { onClear } = this.asProps as AsPropsWithOnClear<typeof this.asProps>;

    const rewiredOnClick = (e: React.SyntheticEvent) => {
      props.onClick?.(e);
      onClear?.();
    };

    return {
      ...props,
      onClick: rewiredOnClick,
    };
  }

  render() {
    return <Root render={Flex} __excludeProps={['onChange']} />;
  }
}

const AddFilterPatternSearchItem = createComponent(AddFilterPatternSearchRoot, {
  Input: [
    Input,
    {
      Value: Input.Value,
      Addon: Input.Addon,
      CloseHint: Hint,
    },
  ],
});

export default AddFilterPatternSearchItem;
