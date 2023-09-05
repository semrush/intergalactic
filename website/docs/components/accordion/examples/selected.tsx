import React from 'react';
import Accordion from '@semcore/ui/accordion';
import { Text } from '@semcore/ui/typography';
import { Box } from '@semcore/ui/flex-box';

const Demo = () => {
  return (
    <>
      <Accordion>
        {[...new Array(3)].map((_, index) => (
          <Accordion.Item value={index} key={index}>
            {({ selected }) => (
              <>
                <Accordion.Item.Toggle
                  className='accordion-selected-toggle'
                  style={{ background: selected ? '#e0e1e9' : '' }}
                >
                  <Accordion.Item.Chevron color='gray-500' mr={2} />
                  <Text size={200} color='gray-800' tag='h3' my={0}>{`Section ${index + 1}`}</Text>
                </Accordion.Item.Toggle>
                <Accordion.Item.Collapse>
                  <Box p='12px 32px'>{`Hello Section ${index + 1}`}</Box>
                </Accordion.Item.Collapse>
              </>
            )}
          </Accordion.Item>
        ))}
      </Accordion>
    </>
  );
};
