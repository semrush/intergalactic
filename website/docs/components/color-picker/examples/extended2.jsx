import React from 'react';
import ColorPicker, { PaletteManager } from '@semcore/color-picker';

const Demo = () => {
  const [value, setValue] = React.useState('#FDC23C');
  const [customColors, setCustomColors] = React.useState(['#8649E6', '#8649E7', '#8649E8']);

  return (
    <ColorPicker value={value} onChange={setValue}>
      <ColorPicker.Trigger />
      <ColorPicker.Popper>
        <ColorPicker.Colors
          colors={[
            null,
            '#2BB3FF',
            '#8649E1',
            '#C695FF',
            '#F67CF2',
            '#FFA9FA',
            '#FF8786',
            '#FF8C43',
            '#FDC23C',
            '#66C030',
            '#9BD85D',
            '#C7EE96',
          ]}
        />
        <PaletteManager colors={customColors} onColorsChange={setCustomColors}>
          <PaletteManager.Colors />
          <PaletteManager.InputColor />
        </PaletteManager>
      </ColorPicker.Popper>
    </ColorPicker>
  );
};

export default Demo;
