import React from 'react';
import ColorPicker, { PaletteManager } from '@semcore/color-picker';

const Demo = () => {
  const [value, setValue] = React.useState('#98848D');
  const [customColors, setCustomColors] = React.useState(['#8649E6', '#8649E7', '#8649E8']);

  return (
    <ColorPicker value={value} onChange={setValue}>
      <ColorPicker.Trigger />
      <ColorPicker.Popper>
        <ColorPicker.Colors>
          <ColorPicker.Item value={null} />
          <ColorPicker.Item value="#8649E1" />
          <ColorPicker.Item value="#FF5733" />
          <ColorPicker.Item value="#98848D" />
          <ColorPicker.Item value="#8E3B29" />
          <ColorPicker.Item value="#B0E727" />
          <ColorPicker.Item value="#27D3E7" />
          <ColorPicker.Item value="#2D747C" />
          <ColorPicker.Item value="#6ad0de" />
          <ColorPicker.Item value="#6E2D7C" />
        </ColorPicker.Colors>
        <PaletteManager onColorsChange={setCustomColors}>
          <PaletteManager.Colors>
            {customColors.map((color) => (
              <PaletteManager.Item value={color} key={color} />
            ))}
          </PaletteManager.Colors>
          <PaletteManager.InputColor />
        </PaletteManager>
      </ColorPicker.Popper>
    </ColorPicker>
  );
};

export default Demo;
