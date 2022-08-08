import React from 'react';
import ColorPicker from '@semcore/color-picker';
import Input from '@semcore/input';
import { Box } from '@semcore/flex-box';

const Demo = () => {
  const [value, setValue] = React.useState('#98848D');

  return (
    <ColorPicker value={value} onChange={setValue}>
      <Input ml={1} w={200}>
        <Input.Addon role="button" interactive>
          <ColorPicker.Trigger tag={Box}>
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                border: '1px solid #6c67e7',
                backgroundColor: value,
              }}
            ></div>
          </ColorPicker.Trigger>
        </Input.Addon>
        <Input.Value placeholder="Placeholder" />
      </Input>
      <ColorPicker.Popper>
        <ColorPicker.Colors />
      </ColorPicker.Popper>
    </ColorPicker>
  );
};

export default Demo;
