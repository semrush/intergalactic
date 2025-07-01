import { Flex } from '@semcore/base-components';
import ColorPicker, { PaletteManager } from '@semcore/color-picker';
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
          <PaletteManager>
            <PaletteManager.Colors />
            <PaletteManager.InputColor />
          </PaletteManager>
        </ColorPicker.Popper>
      </ColorPicker>
    </Flex>
  );
};

export default Demo;
