import Badge from '@semcore/ui/badge';
import { Box } from '@semcore/ui/flex-box';
import Input from '@semcore/ui/input';
import Tag from '@semcore/ui/tag';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  const [value, setValue] = React.useState('heh');

  return (
    <div>
      <Text tag='label' htmlFor='count-example' size={200}>
        Input with character counter
      </Text>
      <Box mt={2} mb={4}>
        <Input w={320}>
          <Input.Value
            placeholder='Count some characters right here'
            value={value}
            onChange={(v) => setValue(v)}
            maxLength={10}
            id='count-example'
            aria-describedby='chars-counter'
          />
          <Input.Addon>
            <Tag size='m' id='chars-counter'>
              {value.length}
              /10
            </Tag>
          </Input.Addon>
        </Input>
      </Box>
      <Text tag='label' htmlFor='badge-example' size={200}>
        Input with badge
      </Text>
      <Box mt={2}>
        <Input w={320}>
          <Input.Value
            placeholder='Wow! Such input. So new.'
            id='badge-example'
            aria-describedby='badge-new'
          />
          <Input.Addon>
            <Badge type='new' id='badge-new' />
          </Input.Addon>
        </Input>
      </Box>
    </div>
  );
};

export default Demo;
