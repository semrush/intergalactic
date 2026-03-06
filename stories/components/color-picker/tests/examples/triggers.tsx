import { Flex, Box } from '@semcore/ui/base-components';
import { FilterTrigger } from '@semcore/ui/base-trigger';
import Button, { ButtonLink } from '@semcore/ui/button';
import ColorPicker from '@semcore/ui/color-picker';
import Input from '@semcore/ui/input';
import Tag from '@semcore/ui/tag';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  const [value, setValue] = React.useState('#C695FF');

  return (
    <Flex direction='column' gap={2}>
      <Text tag='label' size={300} htmlFor='new-tag'>
        New tag
      </Text>
      <ColorPicker value={value} onChange={setValue}>

        <Input w={300} size='l'>
          <Input.Addon>
            <ColorPicker.Trigger tag={ButtonLink} aria-label='New tag color'>
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
          </Input.Addon>
          <Input.Value placeholder='Tag name' id='new-tag' />
        </Input>
        <ColorPicker.Popper>
          <ColorPicker.Colors />
        </ColorPicker.Popper>
      </ColorPicker>

      <ColorPicker value={value} onChange={setValue} stretch='min'>
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

      <ColorPicker value={value} onChange={setValue} stretch='min'>
        <ColorPicker.Trigger tag={Tag} interactive aria-label='New tag color' w={300}>
          <Tag.Addon>
            <div
              style={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                border: '1px solid var(--intergalactic-border-secondary)',
                backgroundColor: value,
              }}
            />
          </Tag.Addon>
          <Tag.Text>Tag</Tag.Text>
        </ColorPicker.Trigger>
        <ColorPicker.Popper>
          <ColorPicker.Colors />
        </ColorPicker.Popper>
      </ColorPicker>

      <ColorPicker value={value} onChange={setValue} stretch='min'>
        <ColorPicker.Trigger tag={FilterTrigger} aria-label='New tag color' w={300}>
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
