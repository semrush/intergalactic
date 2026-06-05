import { Flex } from '@semcore/ui/base-components';
import ColorPicker, { PaletteManager } from '@semcore/ui/color-picker';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  const [value, setValue] = React.useState('#666bdb');
  const [customColors, setCustomColors] = React.useState(['#4C4AA4']);

  return (
    <Flex direction='column'>
      <Text tag='label' size={200} htmlFor='player-1-color'>
        Color
      </Text>
      <ColorPicker value={value} onChange={setValue}>
        <ColorPicker.Trigger mt={2} id='player-1-color' />
        <ColorPicker.Popper>
          <ColorPicker.Colors
            colors={[
              null,
              '#666bdb', // --blue-400
              '#00CC9A', // --green-300
              '#C18DFF', // --violet-300
              '#FFB400', // --yellow-200
              '#FF7073', // --red-300
              '#B0C1FE', // --blue-200
              '#F56BED', // --pink-300
              '#00CE40', // --salad-300
              '#5C5CC4', // --blue-500
              '#38E3B5', // --green-200
              '#A261FD', // --violet-400
            ]}
          />
          <PaletteManager colors={customColors} onColorsChange={setCustomColors}>
            <PaletteManager.Colors />
            <PaletteManager.InputColor />
          </PaletteManager>
        </ColorPicker.Popper>
      </ColorPicker>
    </Flex>
  );
};

export default Demo;
