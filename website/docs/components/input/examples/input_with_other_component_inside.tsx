import React from 'react';
import Input from 'intergalactic/input';
import Badge from 'intergalactic/badge';
import Tag from 'intergalactic/tag';
import { Text } from 'intergalactic/typography';
import { Box } from 'intergalactic/flex-box';

const Demo = () => {
  const [value, setValue] = React.useState('heh');

  return (
    <div>
      <Text tag='label' htmlFor='count-example' size={200}>
        Input with symbols counter
      </Text>
      <Box mt={2} mb={4}>
        <Input w={320}>
          <Input.Value
            placeholder='Count some words right here'
            value={value}
            onChange={(v) => setValue(v)}
            maxLength={10}
            id='count-example'
            aria-describedby='chars-counter'
          />
          <Input.Addon>
            <Tag size='m' id='chars-counter'>
              {value.length}/10
            </Tag>
          </Input.Addon>
        </Input>
      </Box>
      <Text tag='label' htmlFor='badge-example' size={200}>
        Input with badge
      </Text>
      <Box mt={2}>
        <Input w={320}>
          <Input.Value placeholder='Wow! Such input. So new.' id='badge-example' />
          <Input.Addon>
            <Badge bg='green-300'>new</Badge>
          </Input.Addon>
        </Input>
      </Box>
    </div>
  );
};

export default Demo;
