import React from 'react';
import ColorPicker, { PaletteManager } from '@semcore/color-picker';

const Demo = () => {
  const [state, setState] = React.useState('normal');

  const onChange = (value, event) => {
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
