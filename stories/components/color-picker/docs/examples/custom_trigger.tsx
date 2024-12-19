import React from 'react';
import ColorPicker from '@semcore/color-picker';
import Input from '@semcore/input';
import { Flex, Box } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

const Demo = () => {
  const [value, setValue] = React.useState('#C695FF');

  return (
    <Flex gap={5} direction='column'>
      <Flex direction='column'>
        <Text tag='label' size={200} htmlFor='new-tag'>
          New tag
        </Text>
        <ColorPicker value={value} onChange={setValue}>
          <Input ml={1} w={300} mt={2}>
            <ColorPicker.Trigger tag={Input.Addon} interactive aria-label='New tag color'>
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  border: '1px solid var(--intergalactic-border-secondary)',
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
      <Flex direction='column'>
        <Text tag='label' size={300} htmlFor='new-tag1'>
          New tag
        </Text>
        <ColorPicker value={value} onChange={setValue}>
          <Input ml={1} w={300} mt={2} size='l'>
            <ColorPicker.Trigger tag={Input.Addon} interactive aria-label='New tag color'>
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  border: '1px solid var(--intergalactic-border-secondary)',
                  backgroundColor: value,
                }}
              />
            </ColorPicker.Trigger>
            <Input.Value placeholder='Tag name' id='new-tag1' />
          </Input>
          <ColorPicker.Popper>
            <ColorPicker.Colors />
          </ColorPicker.Popper>
        </ColorPicker>
      </Flex>
    </Flex>
  );
};

export default Demo;
