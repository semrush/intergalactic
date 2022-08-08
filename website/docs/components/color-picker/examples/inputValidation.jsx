import React from 'react';
import ColorPicker, { PaletteManager } from '@semcore/color-picker';

const onChange = (v, e) => {
  console.log('value', v);
  console.log('event', e);

  return false;
};

const Demo = () => {
  return (
    <ColorPicker>
      <ColorPicker.Trigger />
      <ColorPicker.Popper>
        <ColorPicker.Colors />
        <PaletteManager>
          <PaletteManager.Colors />
          <PaletteManager.InputColor onChange={onChange} />
        </PaletteManager>
      </ColorPicker.Popper>
    </ColorPicker>
  );
};

export default Demo;
