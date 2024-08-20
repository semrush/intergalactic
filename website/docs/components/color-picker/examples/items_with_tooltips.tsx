import React from 'react';
import ColorPicker from 'intergalactic/color-picker';
import { Hint } from 'intergalactic/tooltip';
import { Text } from 'intergalactic/typography';
import { Flex } from 'intergalactic/flex-box';

const colors = [
  '#A7AB38',
  '#229229',
  '#36E341',
  '#369AE3',
  '#66A9DA',
  '#9DEBE9',
  '#8F331C',
  '#7441B0',
  '#B9A0D6',
  '#C43DD2',
];

const Demo = () => {
  return (
    <Flex direction='column'>
      <Text tag='label' size={200} htmlFor='cake-color'>
        Cake color
      </Text>
      <ColorPicker>
        <ColorPicker.Trigger mt={2} id='main-theme-color' />
        <ColorPicker.Popper>
          <ColorPicker.Colors>
            {colors.map((color) => (
              <Hint title={color} key={color} tag={ColorPicker.Item} value={color} />
            ))}
          </ColorPicker.Colors>
        </ColorPicker.Popper>
      </ColorPicker>
    </Flex>
  );
};

export default Demo;
