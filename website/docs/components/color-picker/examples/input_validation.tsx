import React from 'react';
import ColorPicker, { PaletteManager } from 'intergalactic/color-picker';

const Demo = () => {
  const [state, setState] = React.useState<'normal' | 'invalid'>('normal');

  const onChange = (value) => {
    if (value.toLowerCase() === 'ffffff') {
      setState('invalid');
    }

    return false;
  };

  return (
    <ColorPicker>
      <ColorPicker.Trigger />
      <ColorPicker.Popper>
        <ColorPicker.Colors />
        <PaletteManager>
          <PaletteManager.Colors />
          <PaletteManager.InputColor state={state} onChange={onChange} />
        </PaletteManager>
      </ColorPicker.Popper>
    </ColorPicker>
  );
};

export default Demo;
