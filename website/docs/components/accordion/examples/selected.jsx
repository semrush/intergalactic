import React from 'react';
import Accordion from '@semcore/accordion';
import { Text } from '@semcore/typography';
import styled from 'styled-components';
import { Box } from '@semcore/flex-box';

const Trigger = styled(Accordion.Item.Toggle)`
  background: #f4f5f9;
  text-align: left;
  margin-bottom: 1px;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  &:hover {
    background: #e0e1e9;
  }

  ${({ selected }) => (selected ? 'background: #e0e1e9' : '')}
`;

const Demo = () => (
  <Accordion>
    {[...new Array(3)].map((_, index) => (
      <Accordion.Item value={index} key={index}>
        {({ selected }) => (
          <>
            <Trigger selected={selected}>
              <Accordion.Item.Chevron color="gray-300" mr={2} />
              <Text size={200} color="gray-800">{`Section ${index + 1}`}</Text>
            </Trigger>
            <Accordion.Item.Collapse>
              <Box p="12px 32px">{`Hello Section ${index + 1}`}</Box>
            </Accordion.Item.Collapse>
          </>
        )}
      </Accordion.Item>
    ))}
  </Accordion>
);

export default Demo;
