import React from 'react';
import Accordion from '@semcore/accordion';
import { Text } from '@semcore/typography';
import styled from 'styled-components';
import { Box } from '@semcore/flex-box';

const Trigger = styled(Accordion.Item.Toggle)`
  background: #f2f3f4;
  text-align: left;
  margin-bottom: 1px;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  ${({ selected }) => (selected ? 'background: rgb(223, 224, 224);' : '')}
  &:hover {
    background: rgb(223, 224, 224);
  }
`;

const Demo = () => (
  <Accordion>
    {[...new Array(3)].map((_, index) => (
      <Accordion.Item value={index} key={index}>
        {({ selected }) => (
          <>
            <Trigger selected={selected}>
              <Accordion.Item.Chevron color="stone" mr={2} />
              <Text size={200} color="gray20">{`Section ${index + 1}`}</Text>
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
