import React from 'react';
import ColorPicker from '@semcore/color-picker';
import Tooltip from '@semcore/tooltip';

const COLORS = [
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
          {COLORS.map((color) => (
            <Tooltip title={color}>
              <ColorPicker.Item value={color} />
            </Tooltip>
          ))}
        </ColorPicker.Colors>
      </ColorPicker.Popper>
    </ColorPicker>
  );
};

export default Demo;
