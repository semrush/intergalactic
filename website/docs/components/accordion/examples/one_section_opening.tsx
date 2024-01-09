import React from 'react';
import Accordion from '@semcore/ui/accordion';
import { Text } from '@semcore/ui/typography';
import { Box, Flex } from '@semcore/ui/flex-box';

const Demo = () => {
  const [value, onChange] = React.useState(null); // or []
  return (
    <Accordion value={value} onChange={onChange}>
      {[...new Array(3)].map((_, index) => (
        <Accordion.Item value={index} key={index} disabled={index === 2}>
          <Accordion.Item.Toggle pb={2}>
            <Flex alignItems='center'>
              <Accordion.Item.Chevron mr={2} />
              <Text size={300} tag='h3' my={0}>{`Section ${index + 1}`}</Text>
            </Flex>
          </Accordion.Item.Toggle>
          <Accordion.Item.Collapse>
            <Box p='12px 24px 24px'>{`Hello Section ${index + 1}`}</Box>
          </Accordion.Item.Collapse>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default Demo;
