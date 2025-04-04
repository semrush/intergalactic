import React, { useState } from 'react';
import ColorPicker, { PaletteManager } from '@semcore/color-picker';
import { Text } from '@semcore/typography';
import { Flex, Box } from '@semcore/flex-box';

const Demo = () => {
    const [selectedColor, setSelectedColor] = useState('#ff0000');
  const [paletteColors, setPaletteColors] = useState([
    '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
    '#800000', '#808000', '#008000', '#800080', '#008080', '#000080',
    '#FFA500', '#FFC0CB', '#A52A2A', '#D2691E', '#B22222', '#5F9EA0',
    '#7FFF00', '#DC143C', '#FF8C00', '#E9967A', '#2E8B57', '#FF1493',
  ]);

  return (
    <Flex direction='row'>
         <Box mr = {50}>
      <ColorPicker value='#FF8786' disablePortal visible />
      </Box>
      <Box>
      <ColorPicker value='#FF8786' disablePortal visible displayLabel/>
      </Box>
    </Flex>
  );
};

export default Demo;
