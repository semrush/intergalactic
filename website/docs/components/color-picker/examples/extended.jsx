import React from 'react';
import ColorPicker, { PaletteManager } from '@semcore/color-picker';

const Demo = () => {
  const [value, setValue] = React.useState('#98848D');

  return (
    <ColorPicker value={value} onChange={setValue}>
      <ColorPicker.Trigger />
      <ColorPicker.Popper>
        <ColorPicker.Colors />
        <ColorPicker.Item value="#8649E1" />
        <ColorPicker.Item value="#FF5733" />
        <ColorPicker.Item value="#98848D" />
        <ColorPicker.Item value="#8E3B29" />
        <ColorPicker.Item value="#B0E727" />
        <ColorPicker.Item value="#27D3E7" />
        <ColorPicker.Item value="#2D747C" />
        <ColorPicker.Item value="#6ad0de" />
        <ColorPicker.Item value="#6E2D7C" />
        <PaletteManager>
          <PaletteManager.Colors>
            <PaletteManager.Item value="#8649E6" />
            <PaletteManager.Item value="#2BB1FF" />
          </PaletteManager.Colors>
          <PaletteManager.InputColor />
        </PaletteManager>
      </ColorPicker.Popper>
    </ColorPicker>
  );
};

export default Demo;
