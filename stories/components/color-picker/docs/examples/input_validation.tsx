import { Flex } from '@semcore/ui/base-components';
import ColorPicker, { PaletteManager } from '@semcore/ui/color-picker';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  const [state, setState] = React.useState<'normal' | 'invalid'>('normal');

  const onChange = (value: any) => {
    if (value.toLowerCase() === 'ffffff') {
      setState('invalid');
    }

    return false;
  };

  return (
    <Flex direction='column'>
      <Text tag='label' size={200} htmlFor='t-shirt-color'>
        T-shirt color
      </Text>
      <ColorPicker>
        <ColorPicker.Trigger mt={2} id='t-shirt-color' />
        <ColorPicker.Popper>
          <ColorPicker.Colors />
          <PaletteManager>
            <PaletteManager.Colors />
            <PaletteManager.InputColor state={state} onChange={onChange} />
          </PaletteManager>
        </ColorPicker.Popper>
      </ColorPicker>
    </Flex>
  );
};

export default Demo;
