import Accordion from '@semcore/ui/accordion';
import { Box } from '@semcore/ui/base-components';
import React from 'react';

const Demo = () => {
  return (
    <Accordion defaultValue={1}>
      <Accordion.Item value={1}>
        <Accordion.Item.Toggle pb={2}>
          <Accordion.Item.ToggleButton>
            <Accordion.Item.Chevron mr={2} />
            Section 1
          </Accordion.Item.ToggleButton>
        </Accordion.Item.Toggle>
        <Accordion.Item.Collapse data-test-id='default-value'>
          <Box p='12px 24px 24px'>Hello Section 1</Box>
        </Accordion.Item.Collapse>
      </Accordion.Item>

      <Accordion.Item value='two'>
        <Accordion.Item.Toggle pb={2}>
          <Accordion.Item.ToggleButton>
            <Accordion.Item.Chevron mr={2} />
            Section "two"
          </Accordion.Item.ToggleButton>
        </Accordion.Item.Toggle>
        <Accordion.Item.Collapse>
          <Box p='12px 24px 24px'>Hello Section "two"</Box>
        </Accordion.Item.Collapse>
      </Accordion.Item>
    </Accordion>
  );
};

export default Demo;
