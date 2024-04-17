import React from 'react';
import ColorPicker from 'intergalactic/color-picker';
import Input from 'intergalactic/input';
import { Flex, Box } from 'intergalactic/flex-box';
import { Text } from 'intergalactic/typography';

const Demo = () => {
  const [value, setValue] = React.useState('#C695FF');

  return (
    <Flex direction='column'>
      <Text tag='label' size={200} htmlFor='new-tag'>
        New tag
      </Text>
      <ColorPicker value={value} onChange={setValue}>
        <Input ml={1} w={200} mt={2}>
          <ColorPicker.Trigger tag={Input.Addon} interactive aria-label='New tag color'>
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                border: '1px solid #C4C7CF',
                backgroundColor: value,
              }}
            />
          </ColorPicker.Trigger>
          <Input.Value placeholder='Tag name' id='new-tag' />
        </Input>
        <ColorPicker.Popper>
          <ColorPicker.Colors />
        </ColorPicker.Popper>
      </ColorPicker>
    </Flex>
  );
};

export default Demo;
