import React, { useState } from 'react';
import Accordion from '@semcore/accordion';
import { Text } from '@semcore/typography';
import { Box, Flex } from '@semcore/flex-box';

const Demo = () => {
  const [value, onChange] = useState(null); // or []
  return (
    <Accordion value={value} onChange={onChange}>
      {[...new Array(3)].map((_, index) => (
        <Accordion.Item value={index} key={index}>
          <Accordion.Item.Toggle tag={Flex} p="8px 12px" disabled={index === 2} alignItems="center">
            <Accordion.Item.Chevron color="mist" mr={2} />
            <Text size={200} color="gray20">{`Section ${index + 1}`}</Text>
          </Accordion.Item.Toggle>
          <Accordion.Item.Collapse>
            <Box p="12px 32px">{`Hello Section ${index + 1}`}</Box>
          </Accordion.Item.Collapse>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};
export default Demo;
