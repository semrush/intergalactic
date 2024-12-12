import React from 'react';
import ColorPicker, { PaletteManager } from '@semcore/color-picker';
import { Text } from '@semcore/typography';
import { Flex } from '@semcore/flex-box';

const Demo = () => {
  const [value, setValue] = React.useState('#98848D');
  const [customColors, setCustomColors] = React.useState(['#8649E6', '#8649E7', '#8649E8']);

  return (
    <Flex gap={5} flexWrap>
      <Flex direction='column'>
        <Text tag='label' size={200} htmlFor='player-1-color'>
          Color 1
        </Text>
        <ColorPicker value={value} onChange={setValue}>
          <ColorPicker.Trigger mt={2} id='player-1-color' />
          <ColorPicker.Popper>
            <ColorPicker.Colors
              colors={[
                null,
                '#8649E1',
                '#FF5733',
                '#98848D',
                '#8E3B29',
                '#B0E727',
                '#27D3E7',
                '#2D747C',
                '#6ad0de',
                '#6E2D7C',
              ]}
            />
            <PaletteManager colors={customColors} onColorsChange={setCustomColors}>
              <PaletteManager.Colors />
              <PaletteManager.InputColor />
            </PaletteManager>
          </ColorPicker.Popper>
        </ColorPicker>
      </Flex>
      <Flex direction='column'>
        <Text tag='label' size={200} htmlFor='player-2-color'>
          Color 2
        </Text>
        <ColorPicker value={value} onChange={setValue}>
          <ColorPicker.Trigger mt={2} id='player-2-color' />
          <ColorPicker.Popper>
            <ColorPicker.Colors>
              <ColorPicker.Item value={null} />
              <ColorPicker.Item value='#8649E1' />
              <ColorPicker.Item value='#FF5733' />
              <ColorPicker.Item value='#98848D' />
              <ColorPicker.Item value='#8E3B29' />
              <ColorPicker.Item value='#B0E727' />
              <ColorPicker.Item value='#27D3E7' />
              <ColorPicker.Item value='#2D747C' />
              <ColorPicker.Item value='#6ad0de' />
              <ColorPicker.Item value='#6E2D7C' />
            </ColorPicker.Colors>
            <PaletteManager onColorsChange={setCustomColors}>
              <PaletteManager.Colors>
                {customColors.map((color) => (
                  <PaletteManager.Item value={color} key={color} />
                ))}
              </PaletteManager.Colors>
              <PaletteManager.InputColor />
            </PaletteManager>
          </ColorPicker.Popper>
        </ColorPicker>
      </Flex>
    </Flex>
  );
};

export default Demo;
