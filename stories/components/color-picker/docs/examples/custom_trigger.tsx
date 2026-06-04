import { Flex, Box } from '@semcore/ui/base-components';
import ColorPicker from '@semcore/ui/color-picker';
import Input from '@semcore/ui/input';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  const [value, setValue] = React.useState('#666bdb');

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
              '#666bdb', // --blue-400
              '#00CC9A', // --green-300
              '#C18DFF', // --violet-300
              '#FFB400', // --yellow-200
              '#FF7073', // --red-300
              '#B0C1FE', // --blue-200
              '#F56BED', // --pink-300
              '#00CE40', // --salad-300
              '#5C5CC4', // --blue-500
              '#38E3B5', // --green-200
              '#A261FD', // --violet-400
            ]}
          />
        </ColorPicker.Popper>
      </ColorPicker>
    </Flex>
  );
};

export default Demo;
