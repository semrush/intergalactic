import React from 'react';
import createComponent, { Component, Root } from '@semcore/core';
import { Box, Flex } from '@semcore/ui/flex-box';
import Input from '@semcore/input';

import { AddFilterPatternItemProps, AddFilterPatternSearchProps } from '../AddFilterPattern.types';

class AddFilterPatternSearchRoot extends Component<AddFilterPatternItemProps> {
  static displayName = 'AddFilterPatternSearch';
  inputRef?: HTMLElement;

  render() {
    return (
      <Root
        render={Flex}
        __excludeProps={['onChange']}
        // visible={this.asProps.visible}
        // onVisibleChange={this.handlers.visible}
      />
    );
  }
}

const Addon = () => {
  const AddFilterPatternSearchAddon = Root;
  return <AddFilterPatternSearchAddon render={Box} />;
};

const AddFilterPatternSearchItem = createComponent(AddFilterPatternSearchRoot, {
  Input: [
    Input,
    {
      Value: Input.Value,
      Addon: Input.Addon,
    },
  ],
  Addon,
});

export default AddFilterPatternSearchItem;
