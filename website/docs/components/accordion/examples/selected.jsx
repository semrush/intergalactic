import React from 'react';
import Accordion from '@semcore/accordion';
import { Text } from '@semcore/typography';
import { Box } from '@semcore/flex-box';

const styles = `
  .accordion-selected-toggle {
    background: #f4f5f9;
    text-align: left;
    margin-bottom: 1px;
    padding: 8px 12px;
    display: flex;
    align-items: center;
  }
  .accordion-selected-toggle:hover {
    background: #e0e1e9;
  }
`;

const Demo = () => (
  <>
    <style>{styles}</style>
    <Accordion>
      {[...new Array(3)].map((_, index) => (
        <Accordion.Item value={index} key={index}>
          {({ selected }) => (
            <>
              <Accordion.Item.Toggle
                className="accordion-selected-toggle"
                style={{ background: selected ? '#e0e1e9' : '' }}
              >
                <Accordion.Item.Chevron color="gray-300" mr={2} />
                <Text size={200} color="gray-800">{`Section ${index + 1}`}</Text>
              </Accordion.Item.Toggle>
              <Accordion.Item.Collapse>
                <Box p="12px 32px">{`Hello Section ${index + 1}`}</Box>
              </Accordion.Item.Collapse>
            </>
          )}
        </Accordion.Item>
      ))}
    </Accordion>
  </>
);

export default Demo;
