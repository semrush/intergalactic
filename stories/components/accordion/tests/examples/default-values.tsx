import Accordion from '@semcore/ui/accordion';
import React from 'react';

const Demo = () => {
  return (
    <Accordion defaultValue={1}>
      <Accordion.Item value={1}>
        <Accordion.Item.Toggle>
          <Accordion.Item.ToggleButton>
            <Accordion.Item.Chevron />
            Section 1
          </Accordion.Item.ToggleButton>
        </Accordion.Item.Toggle>
        <Accordion.Item.Collapse data-test-id='default-value'>
          Hello Section 1
        </Accordion.Item.Collapse>
      </Accordion.Item>

      <Accordion.Item value='two'>
        <Accordion.Item.Toggle>
          <Accordion.Item.ToggleButton>
            <Accordion.Item.Chevron />
            Section "two"
          </Accordion.Item.ToggleButton>
        </Accordion.Item.Toggle>
        <Accordion.Item.Collapse>
          Hello Section "two"
        </Accordion.Item.Collapse>
      </Accordion.Item>
    </Accordion>
  );
};

export default Demo;
