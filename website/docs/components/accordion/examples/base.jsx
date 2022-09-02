import React from 'react';
import Accordion from '@semcore/accordion';
import { Text } from '@semcore/typography';
import { Flex, Box } from '@semcore/flex-box';

const Demo = () => (
  <Accordion>
    {[...new Array(3)].map((_, index) => (
      <Accordion.Item value={index} key={index} disabled={index === 2}>
        <Accordion.Item.Toggle p="8px 12px">
          <Flex alignItems="center">
            <Accordion.Item.Chevron color="gray-300" mr={2} />
            <Text size={200} color="gray-800">{`Section ${index + 1}`}</Text>
          </Flex>
        </Accordion.Item.Toggle>
        <Accordion.Item.Collapse>
          <Box p="12px 32px">{`Hello Section ${index + 1}`}</Box>
        </Accordion.Item.Collapse>
      </Accordion.Item>
    ))}
  </Accordion>
);
export default Demo;
