import React, { useState } from 'react';
import ColorPicker, { PaletteManager } from '@semcore/color-picker';
import { Flex, Box } from '@semcore/flex-box';

const Demo = () => {

  return (
    <Flex direction='row'>
      <Box mr={50}>
        <ColorPicker value='#FF8786' disablePortal visible />
      </Box>
      <Box mr={50}>
        <ColorPicker disablePortal visible displayLabel />
      </Box>
      <Box mr={10}>
        <ColorPicker value='#FF8786' disablePortal visible displayLabel >
          <ColorPicker.Popper >
            <ColorPicker.Colors />
            <PaletteManager>
              <PaletteManager.Colors />
              <PaletteManager.InputColor />
            </PaletteManager>
          </ColorPicker.Popper>
        </ColorPicker>
      </Box>
      <Box mr={10}>
        <ColorPicker disablePortal visible >
          <ColorPicker.Popper>
            <ColorPicker.Colors />
            <PaletteManager>
              <PaletteManager.Colors />
              <PaletteManager.InputColor />
            </PaletteManager>
          </ColorPicker.Popper>
        </ColorPicker>
      </Box>

      <Box>
        <ColorPicker disablePortal visible >
          <ColorPicker.Trigger id='player-1-color' />
          <ColorPicker.Popper>
            <ColorPicker.Colors
              colors={[
                '#8649E1',
              ]}
            />
            <PaletteManager>
              <PaletteManager.Colors />
              <PaletteManager.InputColor />
            </PaletteManager>
          </ColorPicker.Popper>
        </ColorPicker>
      </Box>
    </Flex>
  );
};

export default Demo;
