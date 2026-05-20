import { Flex, Box } from '@semcore/ui/base-components';
import ColorPicker from '@semcore/ui/color-picker';
import Input from '@semcore/ui/input';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  const [value, setValue] = React.useState('var(--intergalactic-chart-palette-order-1)');

  return (
    <Flex direction='column' gap={2}>
      <Text tag='label' size={300} htmlFor='new-tag'>
        New tag
      </Text>
      <ColorPicker value={value} onChange={setValue}>
        <Input w={300} size='l'>
          <ColorPicker.Trigger tag={Input.Addon} tabIndex={0} aria-label='New tag color'>
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
        </ColorPicker.Popper>
      </ColorPicker>
    </Flex>
  );
};

export default Demo;
