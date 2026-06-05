import { Flex } from '@semcore/ui/base-components';
import ColorPicker, { PaletteManager } from '@semcore/ui/color-picker';
import { Text } from '@semcore/ui/typography';
import React, { useState } from 'react';

const Demo = () => {
  const [selectedColor, setSelectedColor] = useState('var(--blue-300)');
  const [paletteColors, setPaletteColors] = useState([
    'var(--blue-300)', 'var(--blue-400)', 'var(--blue-500)', 'var(--violet-300)', 'var(--violet-400)', 'var(--violet-500)', 'var(--green-300)', 'var(--green-400)', 'var(--green-500)', 'var(--salad-300)', 'var(--salad-400)', 'var(--salad-500)', 'var(--yellow-300)', 'var(--yellow-400)', 'var(--yellow-500)', 'var(--red-300)', 'var(--red-400)', 'var(--red-500)',
  ]);

  return (
    <Flex direction='column'>
      <Text tag='label' size={200} htmlFor='main-theme-color'>
        Main theme color
      </Text>
      <ColorPicker
        stretch='min'
        defaultValue={selectedColor}
        colors={paletteColors}
        onChange={(color) => {
          console.log('Selected color:', color);
          setSelectedColor(color);
        }}
        onColorsChange={(colors) => setPaletteColors(colors)}
        displayLabel
      >
        <ColorPicker.Trigger mt={2} id='main-theme-color' />
        <ColorPicker.Popper>
          <ColorPicker.Colors />
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
