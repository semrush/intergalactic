import { Flex } from '@semcore/ui/base-components';
import ColorPicker, { PaletteManager } from '@semcore/ui/color-picker';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  const [value, setValue] = React.useState('var(--intergalactic-chart-palette-order-1)');
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
              '#008ff8', // --blue-400
              '#00c192', // --green-300
              '#c695ff', // --violet-300
              '#fdc23c', // --yellow-200
              '#ff8786', // --red-300
              '#8ecdff', // --blue-200
              '#f67cf2', // --pink-300
              '#66c030', // --salad-300
              '#006dca', // --blue-500
              '#59ddaa', // --green-200
              '#ab6cfe', // --violet-400
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
