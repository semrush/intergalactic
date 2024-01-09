import React from 'react';
import Accordion from '@semcore/ui/accordion';
import { Text } from '@semcore/ui/typography';
import { Box, Flex } from '@semcore/ui/flex-box';

const Demo = () => {
  return (
    <Accordion>
      {[...new Array(3)].map((_, index) => (
        <Accordion.Item value={index} key={index}>
          {({ selected }) => (
            <>
              <Accordion.Item.Toggle
                tag={Flex}
                alignItems='center'
                style={{
                  backgroundColor: selected ? 'var(--intergalactic-bg-secondary-neutral)' : '',
                  padding: '8px 12px',
                  marginBottom: '1px',
                }}
              >
                <Accordion.Item.Chevron mr={2} />
                <Text size={300} tag='h3' my={0}>{`Section ${index + 1}`}</Text>
              </Accordion.Item.Toggle>
              <Accordion.Item.Collapse>
                <Box p='12px 36px'>{`Hello Section ${index + 1}`}</Box>
              </Accordion.Item.Collapse>
            </>
          )}
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default Demo;
