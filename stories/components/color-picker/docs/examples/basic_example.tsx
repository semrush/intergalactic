import { Flex } from '@semcore/ui/base-components';
import ColorPicker, { PaletteManager } from '@semcore/ui/color-picker';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  const [value, setValue] = React.useState('var(--intergalactic-chart-palette-order-1)');

  return (
    <Flex direction='column'>
      <Text tag='label' size={200} htmlFor='main-theme-color'>
        Main theme color
      </Text>
      <ColorPicker value={value} onChange={setValue}>
        <ColorPicker.Trigger mt={2} id='main-theme-color' />
        <ColorPicker.Popper>
          <ColorPicker.Colors
            colors={[
              null,
              'var(--blue-400)',
              'var(--green-300)',
              'var(--violet-300)',
              'var(--yellow-200)',
              'var(--red-300)',
              'var(--blue-200)',
              'var(--pink-300)',
              'var(--salad-300)',
            ]}
          />
          <PaletteManager>
            <PaletteManager.Colors />
            <PaletteManager.InputColor />
          </PaletteManager>
        </ColorPicker.Popper>
      </ColorPicker>
    </Flex>
  );
};

export default Demo;
