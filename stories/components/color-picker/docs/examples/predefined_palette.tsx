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
              'var(--intergalactic-chart-palette-order-1)',
              'var(--intergalactic-chart-palette-order-2)',
              'var(--intergalactic-chart-palette-order-3)',
              'var(--intergalactic-chart-palette-order-4)',
              'var(--intergalactic-chart-palette-order-5)',
              'var(--intergalactic-chart-palette-order-6)',
              'var(--intergalactic-chart-palette-order-7)',
              'var(--intergalactic-chart-palette-order-8)',
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
