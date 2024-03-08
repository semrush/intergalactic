import React from 'react';
import ColorPicker from 'intergalactic/color-picker';
import Input from 'intergalactic/input';
import { Box } from 'intergalactic/flex-box';

const Demo = () => {
  const [value, setValue] = React.useState('#C695FF');

  return (
    <ColorPicker value={value} onChange={setValue}>
      <Input ml={1} w={200}>
        <Input.Addon role='button' interactive>
          <ColorPicker.Trigger tag={Box}>
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                border: '1px solid #C4C7CF',
                backgroundColor: value,
              }}
            />
          </ColorPicker.Trigger>
        </Input.Addon>
        <Input.Value placeholder='Placeholder' />
      </Input>
      <ColorPicker.Popper>
        <ColorPicker.Colors />
      </ColorPicker.Popper>
    </ColorPicker>
  );
};

export default Demo;
