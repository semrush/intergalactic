import React, { useState } from 'react';
import Accordion from '@semcore/ui/accordion';
import { Text } from '@semcore/ui/typography';
import { Flex, Box } from '@semcore/ui/flex-box';

const Demo = () => {
  const [value, onChange] = useState([0]);
  return (
    <Accordion value={value} onChange={onChange}>
      {[...new Array(3)].map((_, index) => (
        <Accordion.Item value={index} key={index} disabled={index === 2}>
          <Accordion.Item.Toggle p="8px 12px">
            <Flex alignItems="center">
              <Accordion.Item.Chevron color="gray-300" mr={2} />
              <Text size={200} color="gray-800" tag="h3" my={0}>{`Section ${index + 1}`}</Text>
            </Flex>
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
