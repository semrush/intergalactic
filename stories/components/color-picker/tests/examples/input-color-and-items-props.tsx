import { Flex } from '@semcore/ui/base-components';
import ColorPicker, { PaletteManager } from '@semcore/ui/color-picker';
import React from 'react';

const Demo = () => {
  const [value, setValue] = React.useState('#98848D');
  const [customColors, setCustomColors] = React.useState(['#00FF00', '#0000FF']);

  const presetColors = [
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
  ];

  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleRemove = (colorToRemove: string) => {
    setCustomColors((prev) => prev.filter((c) => c !== colorToRemove));
  };

  const handleAdd = (color: string, event: React.MouseEvent | React.KeyboardEvent) => {
    if (!customColors.includes(color)) {
      setCustomColors((prev) => [...prev, color]);
    }
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };
  const filteredPresetColors = presetColors.filter((color): color is string => color !== null);

  return (
    <Flex gap={5} flexWrap>

      <ColorPicker value={value} onChange={setValue}>
        <ColorPicker.Trigger mt={2} id='player-1-color' />
        <ColorPicker.Popper>
          <ColorPicker.Colors colors={filteredPresetColors} />

          <PaletteManager
            colors={customColors}
            onColorsChange={setCustomColors}
          >
            <PaletteManager.Colors />

            <PaletteManager.InputColor
              defaultValue='#ABCDEF'
              ref={inputRef}
              onAdd={handleAdd}
              size='l'
              state='normal'
            />
          </PaletteManager>
        </ColorPicker.Popper>
      </ColorPicker>
    </Flex>
  );
};

export default Demo;
