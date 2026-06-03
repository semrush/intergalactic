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
        </ColorPicker.Popper>
      </ColorPicker>
    </Flex>
  );
};

export default Demo;
