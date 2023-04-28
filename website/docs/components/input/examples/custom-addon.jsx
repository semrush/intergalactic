import React, { useState } from 'react';
import Input from '@semcore/ui/input';
import Badge from '@semcore/ui/badge';
import Tag from '@semcore/ui/tag';
import { Text } from '@semcore/ui/typography';
import { Box } from '@semcore/ui/flex-box';

const Demo = () => {
  const [value, setValue] = useState('heh');

  return (
    <div>
      <Text tag="label" htmlFor="count-example" size="300">
        Input with symbols counter
      </Text>
      <Box mt={2}>
        <Input w={240}>
          <Input.Value
            placeholder="Count some words right here"
            value={value}
            onChange={(v) => setValue(v)}
            maxLength={10}
            id="count-example"
          />
          <Input.Addon>
            <Tag size="s">{value.length}/10</Tag>
          </Input.Addon>
        </Input>
      </Box>
      <br />
      <br />
      <Text tag="label" htmlFor="badge-example">
        Input with badge
      </Text>
      <Box mt={2}>
        <Input w={240}>
          <Input.Value placeholder="Wow! Such input. So new." id="badge-example" />
          <Input.Addon>
            <Badge bg="green-300">new</Badge>
          </Input.Addon>
        </Input>
      </Box>
    </div>
  );
};

export default Demo;
