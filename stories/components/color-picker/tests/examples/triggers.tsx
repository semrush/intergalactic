import React from 'react';
import ColorPicker from '@semcore/color-picker';
import Input from '@semcore/input';
import Button from '@semcore/button';
import Select from '@semcore/select';
import DropdownMenu from '@semcore/dropdown-menu';
import Tag, { TagContainer } from '@semcore/tag';
import { FilterTrigger } from '@semcore/base-trigger';
import Pills from '@semcore/ui/pills';

import { Flex, Box } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

const Demo = () => {
  const [value, setValue] = React.useState('#C695FF');

  return (
    <Flex direction='column' gap={2}>
      <Text tag='label' size={300} htmlFor='new-tag'>
        New tag
      </Text>
      <ColorPicker value={value} onChange={setValue} >
        <Input w={300} size='l'>
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

      <ColorPicker value={value} onChange={setValue} stretch={'min'}>

        <ColorPicker.Trigger tag={Button} aria-label='New tag color' w={300}>
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

        <ColorPicker.Popper>
          <ColorPicker.Colors />
        </ColorPicker.Popper>
      </ColorPicker>


      <ColorPicker value={value} onChange={setValue} stretch={'min'}>
        <ColorPicker.Trigger tag={Tag} interactive aria-label='New tag color' w={300}>
          <div
            style={{
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              border: '1px solid var(--intergalactic-border-secondary)',
              backgroundColor: value,
            }}
          />
          <Tag.Text>Tag</Tag.Text>
        </ColorPicker.Trigger>

        <ColorPicker.Popper>
          <ColorPicker.Colors />
        </ColorPicker.Popper>

      </ColorPicker>


      <ColorPicker value={value} onChange={setValue} stretch={'min'}>

        <ColorPicker.Trigger tag={FilterTrigger} interactive aria-label='New tag color' w={300}>
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

        <ColorPicker.Popper>
          <ColorPicker.Colors />
        </ColorPicker.Popper>

      </ColorPicker>


    </Flex>
  );
};

export default Demo;
