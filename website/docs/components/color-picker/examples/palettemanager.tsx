import React from 'react';
import ColorPicker, { PaletteManager } from 'intergalactic/color-picker';

const Demo = () => {
  return (
    <ColorPicker>
      <ColorPicker.Trigger />
      <ColorPicker.Popper>
        <ColorPicker.Colors />
        <PaletteManager>
          <PaletteManager.Colors />
          <PaletteManager.InputColor />
        </PaletteManager>
      </ColorPicker.Popper>
    </ColorPicker>
  );
};

export default Demo;
