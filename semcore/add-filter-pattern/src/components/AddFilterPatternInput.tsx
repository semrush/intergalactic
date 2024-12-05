import React from 'react';
import createComponent, { Component, Root } from '@semcore/core';
import Input from '@semcore/input';
import { AddFilterPatternInputProps } from '../AddFilterPattern.types';
import { InputValueProps } from '@semcore/input';
import { Flex } from '@semcore/flex-box';
import NeighborLocation from '@semcore/neighbor-location';

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
    const { addonLeft: AddonLeft, addonRight: AddonRight } = this.asProps;
    return (
      <Flex>
        <NeighborLocation>
          {AddonLeft ? <AddonLeft /> : null}
          <Root render={Input} w={'auto'} inline={false} />
          {AddonRight ? <AddonRight /> : null}
        </NeighborLocation>
      </Flex>
    );
  }
}

const AddFilterPatternInput = createComponent(AddFilterPatternInputRoot, {
  Value: Input.Value,
  Addon: Input.Addon,
});

export default AddFilterPatternInput;
