import Accordion from '@semcore/ui/accordion';
import { Box } from '@semcore/ui/base-components';
import React from 'react';

const Demo = () => {
  return (
    <Accordion defaultValue={1}>
      <Accordion.Item value={1}>
        <Accordion.Item.Toggle pb={2}>
          <Accordion.Item.ToggleButton>
            <Accordion.Item.Chevron />
            Section 1
          </Accordion.Item.ToggleButton>
        </Accordion.Item.Toggle>
        <Accordion.Item.Collapse data-test-id='default-value'>
          <Box pt={3} px={5} pb={6}>Hello Section 1</Box>
        </Accordion.Item.Collapse>
      </Accordion.Item>

      <Accordion.Item value='two'>
        <Accordion.Item.Toggle pb={2}>
          <Accordion.Item.ToggleButton>
            <Accordion.Item.Chevron />
            Section "two"
          </Accordion.Item.ToggleButton>
        </Accordion.Item.Toggle>
        <Accordion.Item.Collapse>
          <Box pt={3} px={5} pb={6}>Hello Section "two"</Box>
        </Accordion.Item.Collapse>
      </Accordion.Item>
    </Accordion>
  );
};

export default Demo;
