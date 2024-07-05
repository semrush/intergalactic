import React from 'react';
import Accordion from 'intergalactic/accordion';
import { Text } from 'intergalactic/typography';
import { Flex, Box } from 'intergalactic/flex-box';

const Demo = () => {
  const [value, onChange] = React.useState([0]);

  return (
    <Accordion value={value} onChange={(value) => onChange(value)}>
      {[...new Array(3)].map((_, index) => (
        <Accordion.Item value={index} key={index} disabled={index === 2}>
          <Accordion.Item.Toggle pb={2}>
            <Flex alignItems='center'>
              <Accordion.Item.Chevron mr={2} />
              <Text size={300} my={0}>{`Section ${index + 1}`}</Text>
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
