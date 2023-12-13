import React from 'react';
import ColorPicker from '@semcore/ui/color-picker';
import Tooltip from '@semcore/ui/tooltip';

const colors = [
  '#A7AB38',
  '#229229',
  '#36E341',
  '#369AE3',
  '#66A9DA',
  '#9DEBE9',
  '#8F331C',
  '#7441B0',
  '#B9A0D6',
  '#C43DD2',
];

const Demo = () => {
  return (
    <ColorPicker>
      <ColorPicker.Trigger />
      <ColorPicker.Popper>
        <ColorPicker.Colors>
          {colors.map((color) => (
            <Tooltip title={color} key={color}>
              <ColorPicker.Item value={color} />
            </Tooltip>
          ))}
        </ColorPicker.Colors>
      </ColorPicker.Popper>
    </ColorPicker>
  );
};

export default Demo;
