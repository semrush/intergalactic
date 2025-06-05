import ColorPicker, { PaletteManager } from '@semcore/color-picker';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import React from 'react';

const Demo = () => {
  return (
    <Flex direction='column'>
      <Text tag='label' size={200} htmlFor='main-theme-color'>
        Main theme color
      </Text>
      <ColorPicker>
        <ColorPicker.Trigger mt={2} id='main-theme-color' />
        <ColorPicker.Popper>
          <ColorPicker.Colors />
        </ColorPicker.Popper>
      </ColorPicker>
    </Flex>
  );
};

export default Demo;
